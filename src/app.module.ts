import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinIOModule } from './minioi/minio.module';

@Module({
  imports: [MinIOModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
