import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { NumericTagGroup } from './entities/numeric-tag-group.entity';
import { NumericTagGroupController } from './controllers/numeric-tag-group.controller';
import { NumericTagGroupService } from './services/numeric-tag-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([NumericTagGroup])],
  controllers: [NumericTagGroupController],
  providers: [NumericTagGroupService, JwtService],
})
export class TagsModule {}
