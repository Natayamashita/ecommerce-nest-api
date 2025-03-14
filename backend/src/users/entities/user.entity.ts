import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';

@Schema()
export class User {
    @Prop({ default: () => new Types.ObjectId() })
    @Expose({ name: 'user_id' })
    _id: string;
  
    @Prop()
    @Expose()
    username: string;

    @Prop()
    @Exclude()
    password: string;

    @Prop()
    @Expose()
    email: string;

    constructor(init: User) {
        Object.assign(this, init);
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

