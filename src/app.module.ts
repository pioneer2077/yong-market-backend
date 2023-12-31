import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
