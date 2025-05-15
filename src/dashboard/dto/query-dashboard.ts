import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'src/common/dto/base-query.dto';
import { dateField } from '../enum/date-filed.enum';

export class QueryDashboardDto extends BaseQueryDto {
	@IsOptional()
	@IsDate()
	@Type(() => Date)
	startDate?: Date;

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	endDate?: Date;

	@IsEnum(dateField)
	@IsOptional()
	dateField?: dateField = dateField.DEADLINE;
}
