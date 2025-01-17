import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-category.dto';
import { UpdateSectionDto } from './dto/update-category.dto';
import { Section } from './entities/section.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionsRepository: Repository<Section>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    const section = this.sectionsRepository.create(createSectionDto);
    return this.sectionsRepository.save(section);
  }

  async findAll(): Promise<Section[]> {
    return this.sectionsRepository.find();
  }

  async findOne(id: number): Promise<Section> {
    const section = await this.sectionsRepository.findOneBy({ id });
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found.`);
    }
    return section
  }

  async update(
    id: number,
    updateSectionDto: UpdateSectionDto,
  ): Promise<Section> {
    await this.sectionsRepository.update(id, updateSectionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const section = await this.sectionsRepository.findOne({ where: { id } });
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found.`);
    }

    const categoriesExist = await this.categoriesRepository.exists({ where: { sectionId: id } });
    if (categoriesExist) {
      throw new BadRequestException(`Section with ID ${id} contains categories and cannot be deleted.`);
    }
    await this.sectionsRepository.delete(id);
  }
}
