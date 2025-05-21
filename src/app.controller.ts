import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  // @Get('secure')
  // @UseGuards(AuthGuard('jwt'))
  // getSecureData(@Headers('authorization') authHeader: string) {
  //   console.log('📥 Received Authorization header:', authHeader);
  //   return { message: '✅ Access granted by Auth0' };
  // }
}
