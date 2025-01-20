import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ad } from './entities/ad.entity';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { SearchAdQueryDto } from './dto/search-ad-query.dto';
import { PaginatedResult } from 'src/common/dto/paginated-result.dto';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad)
    private readonly adsRepository: Repository<Ad>,
  ) {}

  async create(createAdDto: CreateAdDto & { authorId: number }): Promise<Ad> {
    const ad = this.adsRepository.create(createAdDto);
    return this.adsRepository.save(ad);
  }

  async findAll(
    categoryId: number,
    searchAdQueryDto: SearchAdQueryDto,
  ): Promise<PaginatedResult<Ad>> {
    const skip = (searchAdQueryDto.page - 1) * searchAdQueryDto.limit;
    const take = searchAdQueryDto.limit;

    const queryBuilder = this.adsRepository
      .createQueryBuilder('ad')
      .where('ad.categoryId = :categoryId', { categoryId })
      .skip(skip)
      .take(take);

    if (searchAdQueryDto.title) {
      queryBuilder.andWhere('ad.title LIKE :title', {
        title: `%${searchAdQueryDto.title}%`,
      });
    }

    if (searchAdQueryDto.description) {
      queryBuilder.andWhere('ad.description LIKE :description', {
        description: `%${searchAdQueryDto.description}%`,
      });
    }

    if (searchAdQueryDto.sortBy && searchAdQueryDto.order) {
      queryBuilder.orderBy(`ad.${searchAdQueryDto.sortBy}`, searchAdQueryDto.order); 
    } else {
      queryBuilder.orderBy('ad.price', 'ASC');
    }

    const [ads, total] = await queryBuilder.getManyAndCount();

    return {
      data: ads,
      total,
      page: searchAdQueryDto.page,
      limit: searchAdQueryDto.limit,
      totalPages: Math.ceil(total / searchAdQueryDto.limit),
    };
  }

  async findOne(id: number): Promise<Ad> {
    const ad = await this.adsRepository.findOne({
      where: { id },
      relations: ['images'],
    });
    if (!ad) {
      throw new NotFoundException(`Ad with ID ${id} not found.`);
    }
    return ad;
  }

  async update(id: number, updateAdDto: UpdateAdDto): Promise<Ad> {
    await this.adsRepository.update(id, updateAdDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.adsRepository.delete(id);
  }
}
