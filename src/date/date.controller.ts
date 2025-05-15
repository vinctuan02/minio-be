import { Controller, Get } from '@nestjs/common';
import { ResponseSuccessDto } from 'src/common/dto/response.dto';
import { DateService } from './date.service';

@Controller('date')
export class DateController {
	constructor(private readonly dateService: DateService) {}

	@Get('current-times')
	async getCurrentTimes(): Promise<ResponseSuccessDto<any>> {
		const data = await this.dateService.getCurrentTimes();
		return new ResponseSuccessDto({ data });
	}
}
