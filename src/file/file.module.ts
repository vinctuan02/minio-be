import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinIOModule } from 'src/minoi/minio.module';
import { FileUrlController } from './controllers/file-url.controller';
import { FileController } from './controllers/file.controller';
import { File } from './entities/file.entity';
import { FileUrlService } from './services/file-url.service';
import { FileService } from './services/file.service';

@Module({
	imports: [TypeOrmModule.forFeature([File]), MinIOModule],
	controllers: [FileController, FileUrlController],
	providers: [FileService, FileUrlService],
})
export class FileModule {}
