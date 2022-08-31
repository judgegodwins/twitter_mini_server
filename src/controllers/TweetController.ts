import { PaginationResponse, SuccessResponse } from "../core/ApiResponse";
import * as TweetService from "../services/Tweet";
import { AuthenticatedRequest } from "../types/requests";
import asyncHandler from "../utils/asyncHandler";

export default class TweetController {
  static createTweet = asyncHandler(async (req: AuthenticatedRequest, res) => {
    const tweet = await TweetService.create({ ...req.body, userId: req.session.userId });

    return new SuccessResponse("Tweet created", tweet).send(res);
  });

  static getTweet = asyncHandler(async (req, res) => {
    const tweet = await TweetService.get({ id: req.params.id });

    return new SuccessResponse("Tweet", tweet).send(res);
  });

  static getFeed = asyncHandler(async (req, res) => {
    const tweets = await TweetService.getFeed({
      page: +(req.query.page as string),
      limit: +(req.query.limit as string),
    });

    return new PaginationResponse("Feed", tweets).send(res);
  });

  static retweet = asyncHandler(async (req, res) => {
    const tweet = await TweetService.retweet({
      type: req.query.type as any,
      ...req.body,
    });

    return new SuccessResponse("Tweet created", tweet).send(res);
  });

  static comment = asyncHandler(async (req, res) => {
    const tweet = await TweetService.comment(req.body);

    return new SuccessResponse("Comment created", tweet).send(res);
  });

  static getComments = asyncHandler(async (req, res) => {
    const tweets = await TweetService.getComments({
      id: req.query.id as string,
      page: +(req.query.page as string),
      limit: +(req.query.limit as string),
    });

    return new PaginationResponse("Comments", tweets).send(res);
  });

  static getParents = asyncHandler(async (req, res) => {
    const tweets = await TweetService.getParents({
      id: req.query.id as string,
    });

    return new SuccessResponse("Tweet parents", tweets).send(res);
  });

  static likeTweet = asyncHandler(async (req, res) => {
    const like = await TweetService.likeTweet({
      tweetId: req.query.id as string,
      userId: req.body.userId,
    });

    return new SuccessResponse("Tweet liked", like).send(res);
  });

  static getLikes = asyncHandler(async (req, res) => {
    const likes = await TweetService.getLikes({
      id: req.query.id as any,
      page: +(req.query.page as string),
      limit: +(req.query.limit as string),
    });

    return new PaginationResponse("Tweet likes", likes).send(res);
  });
}
