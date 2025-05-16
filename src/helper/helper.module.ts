import { Module } from '@nestjs/common';
import { DateService } from './services/date.service';
import { HelperController } from './helper.controller';
import { PasswordService } from './services/password.service';

@Module({
	imports: [],
	controllers: [HelperController],
	providers: [DateService, PasswordService],
	exports: [DateService, PasswordService],
})
export class HelperModule { }
