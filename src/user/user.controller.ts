import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { UserCreateDto } from "./dto/user.create.dto";
import { DataListSuccessDto, ResponseSuccessDto } from "src/common/dto/response.dto";
import { QueryGetListUserDto } from "./dto/user.query-get-list.dto";
import { TypeID } from "src/common/typeorm/enum/db-type.enum";
import { QueryGetDetailUserDto } from "./dto/user.query-get-detail.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() payload: UserCreateDto): Promise<ResponseSuccessDto<User>> {
        const user = await this.userService.createUser(payload);
        return new ResponseSuccessDto({ data: user });
    }

    @Get()
    async getListUser(@Query() query: QueryGetListUserDto): Promise<ResponseSuccessDto<DataListSuccessDto<User>>> {
        const data = await this.userService.getListUser(query);
        return new ResponseSuccessDto({ data });
    }

    @Get(':value')
    async getDetailUser(
        @Param('value') value: TypeID | string,
        @Query() query: QueryGetDetailUserDto
    ): Promise<ResponseSuccessDto<User>> {
        const user = await this.userService.getDetailUser(value, query);
        return new ResponseSuccessDto({ data: user });
    }
}
