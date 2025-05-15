import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeGroupDate, TZ_OFFSET } from '../enum/date.enum';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


@Injectable()
export class DateService {
	constructor(
		@InjectDataSource()
		private dataSource: DataSource,
	) { }

	async getCurrentTimes() {
		const backendTime = new Date();

		const dbTime: { dbTime: string }[] = await this.dataSource.query(
			'SELECT NOW() as "dbTime"',
		);

		return {
			backendTime,
			dbTime: dbTime[0].dbTime,
		};
	}

	getListDate(
		startDate: Date,
		endDate: Date,
		typeGroupDate: TypeGroupDate,
		tzOffset: TZ_OFFSET
	): string[] {
		const dateList: string[] = [];

		const useOffset = tzOffset.startsWith('+') || tzOffset.startsWith('-');
		const getDate = (d: Date) =>
			useOffset
				? dayjs.utc(d).utcOffset(tzOffset)
				: dayjs(d).tz(tzOffset);

		let current = getDate(startDate).startOf(typeGroupDate);
		const end = getDate(endDate).endOf(typeGroupDate);

		const formatMap = {
			[TypeGroupDate.DAY]: 'YYYY-MM-DD',
			[TypeGroupDate.MONTH]: 'YYYY-MM',
			[TypeGroupDate.YEAR]: 'YYYY',
		};

		const unitMap = {
			[TypeGroupDate.DAY]: 'day',
			[TypeGroupDate.MONTH]: 'month',
			[TypeGroupDate.YEAR]: 'year',
		};

		const format = formatMap[typeGroupDate];
		const unit = unitMap[typeGroupDate];

		if (!format || !unit) throw new Error('Invalid typeGroupDate');

		while (current.isBefore(end) || current.isSame(end)) {
			// Format ra chuỗi ở timezone đã set
			dateList.push(current.format(format));
			current = current.add(1, unit as dayjs.ManipulateType);
		}

		return dateList;
	}


}
