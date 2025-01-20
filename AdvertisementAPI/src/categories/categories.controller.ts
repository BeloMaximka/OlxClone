import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AdsService } from 'src/ads/ads.service';
import { SearchAdQueryDto } from 'src/ads/dto/search-ad-query.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly adsService: AdsService,
  ) {}

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req: any,
  ) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Get(':id/ads')
  findAllAds(
    @Param('id', ParseIntPipe) categoryId: number,
    @Query() searchQuery: SearchAdQueryDto,
  ) {
    return this.adsService.findAll(categoryId, searchQuery);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() req: any,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
