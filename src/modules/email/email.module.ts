import { Module } from '@nestjs/common';
import { EmailService } from './services/email-service';

@Module({
  controllers: [],
  exports: [EmailService],
  imports: [],
  providers: [EmailService]
})
export class EmailModule {}
