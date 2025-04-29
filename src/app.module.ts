import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinIOModule } from './minioi/minio.module';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './common/config/validation-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    MinIOModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
