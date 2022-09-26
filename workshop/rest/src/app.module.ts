import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [GroupsModule, DocumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
