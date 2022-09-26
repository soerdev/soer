import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { uuid } from 'uuidv4';
import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  private documents: DocumentEntity[] = [];
  private autoInrementId = 0;

  private nextId(): number {
    return ++this.autoInrementId;
  }

  create(createDocumentDto: CreateDocumentDto): DocumentEntity {
    const newDocument = {
      id: this.nextId(),
      urn: `urn:api_v1_documents:${uuid()}`,
      body: createDocumentDto.body,
      groupUrn: null,
    };
    this.documents.push(newDocument);
    return newDocument;
  }

  findAll(): DocumentEntity[] {
    return this.documents;
  }

  findOne(id: number): DocumentEntity {
    return this.documents.find((tmpDoc) => tmpDoc.id === id);
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    const doc = this.findOne(id);
    if (doc) {
      doc.body = updateDocumentDto.body;
    }
    return doc;
  }

  remove(id: number): DocumentEntity[] {
    this.documents = this.documents.filter((tmpDoc) => tmpDoc.id !== id);
    return this.documents;
  }
}
