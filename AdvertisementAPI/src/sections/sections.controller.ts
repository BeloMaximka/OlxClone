import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateSectionDto } from './dto/create-category.dto';
import { UpdateSectionDto } from './dto/update-category.dto';
import { SectionsService } from './sections.service';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService, private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createSectionDto: CreateSectionDto, @Request() req: any) {
    return this.sectionsService.create(createSectionDto);
  }

  @Get()
  findAll() {
    return this.sectionsService.findAll();
  }

  @Get(':id/categories')
  findAllCategories(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.sectionsService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
    @Request() req: any,
  ) {
    return this.sectionsService.update(+id, updateSectionDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.sectionsService.remove(+id);
  }
}
