import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { Auth0Controller } from './auth0.controller';
import { Auth0Service } from './auth0.service';

@Module({
	imports: [UserModule],
	controllers: [Auth0Controller],
	providers: [Auth0Service],
	exports: [Auth0Service],
})
export class Auth0Module {}
