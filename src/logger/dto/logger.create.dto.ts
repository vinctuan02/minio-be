import {
	IsBoolean,
	IsInt,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateLogDto {
	@IsString()
	action: string;

	@IsString()
	originalUrl: string;

	@IsInt()
	statusCode: number;

	@IsString()
	content: string;

	@IsString()
	response: string;

	@IsOptional()
	@IsString()
	note: string;

	@IsBoolean()
	success: boolean;
}

export class CheckRecentLogDto {
	@IsString()
	action: string;

	@IsString()
	originalUrl: string;

	@IsString()
	ip: string;

	@IsNumber()
	statusCode: number;

	@IsString()
	userCreatorId: string;

	@IsString()
	userAgent: string;
}
