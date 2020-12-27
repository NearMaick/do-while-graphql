import { Resolver, Query, Field, InputType, Mutation, Arg } from 'type-graphql'
import Video from './Video'
import VideoSchema from '../../model/VideoSchema'
import { Document } from 'mongoose'

interface VideoType {
  _id: string
  name: string
  description: string
  category: string
}

@InputType()
class VideoInput {
  @Field()
  description: string

  @Field()
  name: string

  @Field()
  category: string
}

@Resolver(Video)
class VideoResolver {
  @Query(() => [Video])
  async videos(): Promise<Document<VideoType>[]> {
    const videos = await VideoSchema.find()
    return videos
  }

  @Mutation(() => Video)
  async createVideos(
    @Arg('videoInput') videoInput: VideoInput
  ): Promise<Document<VideoType>> {
    const video = await VideoSchema.create(videoInput)
    return video
  }
}

export default VideoResolver
