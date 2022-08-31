import ImageRepo from "../../database/repositories/ImageRepo";
import TweetRepo from "../../database/repositories/TweetRepo";
import { validateCloudinaryPublicIds, wrapServiceAction } from "../../utils";
import { CreateTweetRequest } from "../../validators";

export default wrapServiceAction({
  schema: CreateTweetRequest,
  handler: async (params) => {
    await validateCloudinaryPublicIds(params.images);

    const tweet = await TweetRepo.create(params);

    if (params.images.length > 0) {
      await ImageRepo.model.bulkCreate(
        params.images.map((img) => ({
          publicId: img,
          tweetId: tweet.id,
        }))
      );
    }

    return tweet;
  },
});
