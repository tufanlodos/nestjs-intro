import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreetings(): { message: string } {
    return { message: 'Hello! This is an example app to play with NestJS' };
  }
}
