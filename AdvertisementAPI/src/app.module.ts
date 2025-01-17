import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AdsModule } from './ads/ads.module';
import { CategoriesModule } from './categories/categories.module';
import { SectionsModule } from './sections/sections.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,
    ImagesModule,
    AdsModule,
    CategoriesModule,
    SectionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
