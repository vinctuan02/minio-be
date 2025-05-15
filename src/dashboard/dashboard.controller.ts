import { Controller, Get, Query } from '@nestjs/common';
import { QueryDashboardDto } from './dto/query-dashboard';
import { DashboardService } from './services/dashboard.service';

@Controller('dashboard')
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@Get()
	async getDashboard(@Query() query: QueryDashboardDto) {
		return await this.dashboardService.getDashboard(query);
	}
}
