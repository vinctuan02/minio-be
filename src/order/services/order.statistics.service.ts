import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDashboardDto } from '../../dashboard/dto/query-dashboard';
import { Order } from '../entities/order.entity';
import { DateService } from 'src/helper/services/date.service';

@Injectable()
export class OrderStatisticsService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
		private readonly dateService: DateService,
	) { }

	async groupListByDate(query: QueryDashboardDto) {
		const { startDate, endDate, dateField, tzOffset, typeGroupDate } = query;

		const queryBuilder = this.orderRepository
			.createQueryBuilder('order')
			.select(`order.${dateField}`, 'dateField')
			.addSelect('COUNT(order.id)', 'count')
			.groupBy(`order.${dateField}`);

		if (startDate && endDate) {
			queryBuilder.where(
				'order.deadline BETWEEN :startDate AND :endDate',
				{
					startDate,
					endDate,
				},
			);
		}

		// const dateList = this.dateService.getListDate(startDate, endDate, typeGroupDate, tzOffset);
		// console.log(dateList)



		return await queryBuilder.getRawMany();
	}
}
