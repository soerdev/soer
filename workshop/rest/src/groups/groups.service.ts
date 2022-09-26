import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';

@Injectable()
export class GroupsService {
  private groups: GroupEntity[] = [];
  private autoIncrementId = 0;

  private incId(): number {
    return ++this.autoIncrementId;
  }

  create(createGroupDto: CreateGroupDto): GroupEntity {
    const oldGroup = this.findOneByName(createGroupDto.name);
    if (oldGroup) {
      return null;
    }

    const newGroup = {
      id: this.incId(),
      urn: `urn:api_v1_groups:${uuid()}`,
      name: createGroupDto.name,
    };
    this.groups.push(newGroup);
    return newGroup;
  }

  findAll(): GroupEntity[] {
    return this.groups;
  }

  findOneByName(groupName: string): GroupEntity | undefined {
    return this.groups.find((tmpGroup) => tmpGroup.name === groupName);
  }
  findOne(id: number): GroupEntity | undefined {
    return this.groups.find((tmpGroup) => tmpGroup.id === id);
  }

  update(id: number, updateGroupDto: UpdateGroupDto): GroupEntity | undefined {
    const group = this.findOne(id);
    if (group) {
      group.name = updateGroupDto.name;
    }
    return group;
  }

  remove(id: number): GroupEntity[] {
    this.groups = this.groups.filter((tmpGroup) => tmpGroup.id !== id);
    return this.groups;
  }
}
