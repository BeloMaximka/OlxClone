import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NumericTagValue } from '../entities/numeric-tag-value.entity';
import { CreateNumericTagValueDto } from '../dto/create-numeric-tag-value.dto';
import { UpdateNumericTagValueDto } from '../dto/update-numeric-tag-value.dto';

@Injectable()
export class NumericTagValueService {
  constructor(
    @InjectRepository(NumericTagValue)
    private readonly numericTagValueRepository: Repository<NumericTagValue>,
  ) {}

  async create(createDto: CreateNumericTagValueDto): Promise<NumericTagValue> {
    const tagValue = this.numericTagValueRepository.create(createDto);
    return this.numericTagValueRepository.save(tagValue);
  }

  async findAll(): Promise<NumericTagValue[]> {
    return this.numericTagValueRepository.find({
      relations: ['numericTagGroup'],
    });
  }

  async findOne(id: number): Promise<NumericTagValue> {
    const tagValue = await this.numericTagValueRepository.findOne({
      where: { id },
      relations: ['numericTagGroup'],
    });

    if (!tagValue) {
      throw new NotFoundException(`NumericTagValue with ID ${id} not found.`);
    }

    return tagValue;
  }

  async update(
    id: number,
    updateDto: UpdateNumericTagValueDto,
  ): Promise<NumericTagValue> {
    await this.numericTagValueRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.numericTagValueRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`NumericTagValue with ID ${id} not found.`);
    }
  }
}
