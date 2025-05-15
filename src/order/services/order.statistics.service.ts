import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDashboardDto } from '../../dashboard/dto/query-dashboard';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderStatisticsService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
	) {}

	async groupListByDate(query: QueryDashboardDto) {
		const { startDate, endDate, dateField } = query;

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

		return await queryBuilder.getRawMany();
	}
}
