import { Type } from "class-transformer";
import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { TweetType } from "../../database/models/enums";
import { GetUserRequest, PaginationRequest } from "../general";

export class CreateTweetRequest extends GetUserRequest {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  images: string[] = [];
}

export class CommentRequest extends CreateTweetRequest {
  @IsUUID()
  @IsNotEmpty()
  parentId: string;
}

export class QuoteRetweetRequest extends CreateTweetRequest {
  @IsUUID()
  @IsNotEmpty()
  quotedId: string;
}

export class RetweetRequest extends GetUserRequest {
  @IsString()
  @IsOptional()
  content?: string;

  @IsUUID()
  @IsNotEmpty()
  quotedId: string;

  @IsIn([TweetType.QUOTE_RETWEET, TweetType.RETWEET])
  type: Exclude<TweetType, TweetType.ORIGINAL>;
}

export class LikeTweetRequest extends GetUserRequest {
  @IsUUID()
  @IsNotEmpty()
  tweetId: string;
}