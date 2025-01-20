import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { NumericTagGroupService } from '../services/numeric-tag-group.service';
import { CreateNumericTagGroupDto } from '../dto/create-numeric-tag-group.dto';
import { UpdateNumericTagGroupDto } from '../dto/update-numeric-tag-group.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('numeric-tag-groups')
export class NumericTagGroupController {
  constructor(private readonly service: NumericTagGroupService) {}

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createDto: CreateNumericTagGroupDto) {
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
  update(@Param('id') id: string, @Body() updateDto: UpdateNumericTagGroupDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
