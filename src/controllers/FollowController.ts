import asyncHandler from "../utils/asyncHandler";
import * as FollowService from '../services/Follow';
import { SuccessMsgResponse, SuccessResponse } from "../core/ApiResponse";

export default class FollowController {
  static followAction = asyncHandler(async (req, res) => {
    await FollowService.followAction({
      ...req.query as any,
      userId: req.body.userId,
    });

    return new SuccessMsgResponse('Action successful').send(res);
  });

  static getFollowData = asyncHandler(async (req, res) => {
    const data = await FollowService.getFollowData(req.query as any);

    return new SuccessResponse('Follow successful', data).send(res);
  });
}