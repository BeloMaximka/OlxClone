import { Type } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export class SearchAdQueryDto extends PaginationQueryDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsIn(['price'])
  @Type(() => String)
  sortBy?: string = 'price';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @Type(() => String)
  order?: 'ASC' | 'DESC' = 'ASC'; 
}
