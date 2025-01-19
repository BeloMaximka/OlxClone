import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ad } from './entities/ad.entity';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

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

  async findAll(): Promise<Ad[]> {
    return this.adsRepository.find();
  }

  async findOne(id: number): Promise<Ad> {
    return this.adsRepository.findOne({ where: { id }, relations: ['images'] });
  }

  async update(id: number, updateAdDto: UpdateAdDto): Promise<Ad> {
    await this.adsRepository.update(id, updateAdDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.adsRepository.delete(id);
  }
}
