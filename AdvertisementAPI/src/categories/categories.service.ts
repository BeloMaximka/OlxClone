import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Section } from 'src/sections/entities/section.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Section)
    private readonly sectionsRepository: Repository<Section>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    await this.#validateSectionId(createCategoryDto.sectionId);
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async findAll(sectionId: number): Promise<Category[]> {
    await this.#validateSectionId(sectionId);
    return this.categoriesRepository.find({ where: { sectionId } });
  }

  async findOne(id: number): Promise<Category> {
    return this.categoriesRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.#validateSectionId(updateCategoryDto.sectionId);
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found.`);
    }

    await this.categoriesRepository.delete(id);
  }

  async #validateSectionId(id: number) {
    const section = await this.sectionsRepository.findOne({ where: { id } });

    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found.`);
    }
  }
}
