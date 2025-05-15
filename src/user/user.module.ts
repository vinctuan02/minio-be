import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { HelperModule } from "src/helper/hepler.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), HelperModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }