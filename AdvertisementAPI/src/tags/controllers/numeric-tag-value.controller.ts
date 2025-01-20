import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NumericTagValueService } from '../services/numeric-tag-value.service';
import { CreateNumericTagValueDto } from '../dto/create-numeric-tag-value.dto';
import { UpdateNumericTagValueDto } from '../dto/update-numeric-tag-value.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('numeric-tag-values')
export class NumericTagValueController {
  constructor(private readonly service: NumericTagValueService) {}

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createDto: CreateNumericTagValueDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateDto: UpdateNumericTagValueDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
