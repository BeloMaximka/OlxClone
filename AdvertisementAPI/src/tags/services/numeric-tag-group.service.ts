import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NumericTagGroup } from '../entities/numeric-tag-group.entity';
import { CreateNumericTagGroupDto } from '../dto/create-numeric-tag-group.dto';
import { UpdateNumericTagGroupDto } from '../dto/update-numeric-tag-group.dto';

@Injectable()
export class NumericTagGroupService {
  constructor(
    @InjectRepository(NumericTagGroup)
    private readonly numericTagGroupRepository: Repository<NumericTagGroup>,
  ) {}

  async create(createDto: CreateNumericTagGroupDto): Promise<NumericTagGroup> {
    const numericTagGroup = this.numericTagGroupRepository.create(createDto);
    return this.numericTagGroupRepository.save(numericTagGroup);
  }

  async findAll(): Promise<NumericTagGroup[]> {
    return this.numericTagGroupRepository.find({
      relations: ['category', 'numericTags', 'numericTagValues'],
    });
  }

  async findOne(id: number): Promise<NumericTagGroup> {
    const numericTagGroup = await this.numericTagGroupRepository.findOne({
      where: { id },
      relations: ['category', 'numericTags', 'numericTagValues'],
    });

    if (!numericTagGroup) {
      throw new NotFoundException(`NumericTagGroup with ID ${id} not found.`);
    }

    return numericTagGroup;
  }

  async update(
    id: number,
    updateDto: UpdateNumericTagGroupDto,
  ): Promise<NumericTagGroup> {
    await this.numericTagGroupRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.numericTagGroupRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`NumericTagGroup with ID ${id} not found.`);
    }
  }
}
