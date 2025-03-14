import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}
  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    const result = await createdProduct.save();
    return new Product(result.toJSON());
  }

  findAll() {
    const productList = this.productModel.find().exec();
    return plainToInstance(Product,productList,{ excludeExtraneousValues: true });
  }

  findOne(id: number) {
    return plainToInstance(Product,this.productModel.findById(id).exec(),{ excludeExtraneousValues: true });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
