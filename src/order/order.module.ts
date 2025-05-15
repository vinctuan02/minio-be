import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderRepository } from './repository/order.repository';
import { OrderService } from './services/order.service';
import { OrderStatisticsService } from './services/order.statistics.service';

@Module({
	imports: [TypeOrmModule.forFeature([Order])],
	providers: [OrderService, OrderRepository, OrderStatisticsService],
	exports: [OrderStatisticsService],
	controllers: [OrderController],
})
export class OrderModule {}
