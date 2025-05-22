import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerEntity } from './entities/logger.entity';
import { LoggerService } from './logger.service';
import { LoggerMiddleware } from './middlewares/request-logger.middleware';

@Module({
	imports: [TypeOrmModule.forFeature([LoggerEntity])],
	controllers: [],
	providers: [LoggerService],
	exports: [LoggerService],
})
export class LoggerModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
