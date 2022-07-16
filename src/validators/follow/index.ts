import { IsIn, IsNotEmpty, IsUUID } from "class-validator";
import { GetUserRequest } from "..";

export class FollowActionRequest extends GetUserRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsIn(['follow', 'unfollow'])
  type: 'follow' | 'unfollow';
}

export class GetFollowDataRequest extends GetUserRequest {
  @IsIn(['following', 'followers'])
  type: 'following' | 'followers'; // kinda verbose
}