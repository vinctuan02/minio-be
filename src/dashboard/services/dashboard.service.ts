import { Injectable } from '@nestjs/common';
import { OrderStatisticsService } from 'src/order/services/order.statistics.service';
import { QueryDashboardDto } from '../dto/query-dashboard';
@Injectable()
export class DashboardService {
	constructor(
		private readonly orderStatisticsService: OrderStatisticsService,
	) {}

	async getDashboard(query: QueryDashboardDto) {
		const result = await this.orderStatisticsService.groupListByDate(query);
		return result;
	}
}
