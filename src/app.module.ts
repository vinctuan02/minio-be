import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envValidationSchema } from './common/config/validation-config';
import { DatabaseOptions } from './common/typeorm/ormconfig';
import { DashboardModule } from './dashboard/dashboard.module';
import { HelperModule } from './helper/hepler.module';
import { FileModule } from './file/file.module';
import { MinIOModule } from './minoi/minio.module';
import { OrderModule } from './order/order.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: envValidationSchema,
		}),

		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useClass: DatabaseOptions,
		}),
		MinIOModule,
		FileModule,
		OrderModule,
		HelperModule,
		DashboardModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
