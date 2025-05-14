import { Module } from "@nestjs/common";
import { FileController } from "./controllers/file.controller";
import { FileService } from "./services/file.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "./entities/file.entity";
import { MinIOModule } from "src/minioi/minio.module";
import { FileUrlService } from "./services/file-url.service";
import { FileUrlController } from "./controllers/file-url.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([File]),
        MinIOModule,
    ],
    controllers: [FileController, FileUrlController],
    providers: [FileService, FileUrlService],
})
export class FileModule { }