import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql'
import Category from './Category'
import CategorySchema from '../../model/CategorySchema'
import { Document } from 'mongoose'

interface CategoryType {
  _id: string
  name: string
  description: string
}

@InputType()
class CategoryInput {
  @Field()
  description: string

  @Field()
  name: string
}

@Resolver(Category)
class CategoryResolver {
  @Query(() => [Category])
  async categories(): Promise<Document<CategoryType>[]> {
    const categories = await CategorySchema.find()
    return categories
  }

  @Query(() => Category)
  async category(@Arg('_id') _id: string): Promise<Document<CategoryType>> {
    const category = await CategorySchema.findById(_id)
    return category
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg('categoryInput') categoryInput: CategoryInput
  ): Promise<Document<CategoryType>> {
    const category = await CategorySchema.create(categoryInput)
    return category
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg('_id') _id: string,
    @Arg('categoryInput') categoryInput: CategoryInput
  ): Promise<Document<CategoryType>> {
    await CategorySchema.findByIdAndUpdate(_id, categoryInput)
    const category = await CategorySchema.findById(_id)
    return category
  }

  @Mutation(() => Category)
  async deleteCategory(
    @Arg('_id') _id: string
  ): Promise<Document<CategoryType>> {
    const category = await CategorySchema.findByIdAndDelete(_id)
    return category
  }
}

export default CategoryResolver
