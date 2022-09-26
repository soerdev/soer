import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService]
})
export class DocumentsModule {}
