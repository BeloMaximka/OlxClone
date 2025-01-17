import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateSectionDto } from './dto/create-category.dto';
import { UpdateSectionDto } from './dto/update-category.dto';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(+id);
  }

  @Patch(':id')
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
