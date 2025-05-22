import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from './entities/logger.entity';
import { LoggerService } from './logger.service';
import { LoggerMiddleware } from './middlewares/request-logger.middleware';
import { LoggerController } from './logger.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Logger])],
	controllers: [LoggerController],
	providers: [LoggerService],
	exports: [LoggerService],
})
export class LoggerModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
