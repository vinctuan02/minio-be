import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/common/dto/base-query.dto';
import { dateField } from '../enum/date-filed.enum';
import { TypeGroupDate, TZ_OFFSET } from 'src/helper/enum/date.enum';

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

	@IsOptional()
	@IsEnum(TZ_OFFSET)
	tzOffset?: TZ_OFFSET = TZ_OFFSET.UTC_OFFSET_7;

	@IsEnum(TypeGroupDate)
	@IsOptional()
	typeGroupDate?: TypeGroupDate = TypeGroupDate.DAY;
}
