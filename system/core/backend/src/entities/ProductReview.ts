import { TProductReview } from '@cromwell/core';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BasePageEntity } from './BasePageEntity';
import { Product } from './Product';

@Entity()
@ObjectType()
export class ProductReview extends BasePageEntity implements TProductReview {

    @ManyToOne(type => Product, product => product.reviews)
    product: Product;

    @Field(type => String, { nullable: true })
    get productId(): string {
        return this.product.id;
    }

    @Field(type => String, { nullable: true })
    @Column({ type: "varchar", nullable: true })
    title?: string;

    @Field(type => String, { nullable: true })
    @Column({ type: "varchar", nullable: true })
    description?: string;

    @Field(type => Number, { nullable: true })
    @Column({ type: "float", nullable: true })
    rating?: number;

    @Field(type => String, { nullable: true })
    @Column({ type: "varchar", nullable: true })
    userName?: string;
}