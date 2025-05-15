import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DateService {
	constructor(
		@InjectDataSource()
		private dataSource: DataSource,
	) {}

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

	// async getListDate(startDate: Date, endDate: Date, type: TypeGroupDate) {
	// 	const dateList: string[] = [];

	// 	let current = dayjs(startDate).startOf(type);
	// 	const end = dayjs(endDate).startOf(type);

	// 	while (current.isSameOrBefore(end)) {
	// 		let bucket: string;
	// 		if (type === 'day') {
	// 			bucket = current.format('DD-MM-YYYY'); //+ tzOffset;
	// 		} else if (type === 'month') {
	// 			bucket = current.format('MM-YYYY'); //+ tzOffset;
	// 		} else {
	// 			bucket = current.format('YYYY'); //+ tzOffset;
	// 		}

	// 		dateList.push(bucket);
	// 		// dateList.push(parseToUTC(bucket));

	// 		current = current.add(1, type);
	// 	}
	// }
}
