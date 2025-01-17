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
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { OwnershipGuard } from '../common/guards/ownership.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  @Roles('user', 'admin')
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createAdDto: CreateAdDto, @Request() req: any) {
    const userId = req.user.sub; // Extracted from JWT payload
    return this.adsService.create({ ...createAdDto, authorId: userId });
  }

  @Get()
  findAll() {
    return this.adsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('user', 'admin')
  @UseGuards(RolesGuard, OwnershipGuard)
  update(
    @Param('id') id: string,
    @Body() updateAdDto: UpdateAdDto,
    @Request() req: any,
  ) {
    return this.adsService.update(+id, updateAdDto);
  }

  @Delete(':id')
  @Roles('user', 'admin')
  @UseGuards(RolesGuard, OwnershipGuard)
  remove(@Param('id') id: string) {
    return this.adsService.remove(+id);
  }
}
