import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinIOModule } from './minioi/minio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidationSchema } from './common/config/validation-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseOptions } from './common/typeorm/ormconfig';
import { FileModule } from './file/file.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
