import { pick } from "lodash";
import { BadRequestError, NotFoundError, ValidationError } from "../../core/ApiError";
import { Tweet } from "../../database/models";
import { TweetType } from "../../database/models/enums";
import TweetRepo from "../../database/repositories/TweetRepo";
import { wrapServiceAction } from "../../utils";
import { RetweetRequest } from "../../validators/tweet";

export default wrapServiceAction({
  schema: RetweetRequest,
  handler: async (params) => {
    if (params.type === TweetType.QUOTE_RETWEET && !params.content) {
      throw new ValidationError(["content is required for quote retweets"]);
    }

    const tweet = await TweetRepo.model.findByPk(params.quotedId);

    if (!tweet) throw new NotFoundError("Quoted tweet not found");

    if (params.type === TweetType.RETWEET) {
      const retweetExists = await TweetRepo.findOneByClause(pick(params, ['userId', 'quotedId']));
      if (retweetExists) throw new BadRequestError('Already retweeted');
    }

    const retweet = await TweetRepo.model.create(
      {
        content: params.type === TweetType.RETWEET ? TweetType.RETWEET : params.content!, // retweet type tweets have no content: ;
        ...params,
        type: TweetType.RETWEET,
      },
      {
        include: { model: Tweet, as: "quoted" },
      }
    );

    return { ...retweet.toJSON(), quoted: tweet };
  },
});
