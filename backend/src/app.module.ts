import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PriceModule } from './price/price.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StockModule } from './stock/stock.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/'),
    UsersModule,
    ProductModule,
    PriceModule,
    StockModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
