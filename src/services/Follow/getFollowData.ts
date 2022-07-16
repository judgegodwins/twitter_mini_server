import { omit } from "lodash";
import { NotFoundError } from "../../core/ApiError";
import UserRepo from "../../database/repositories/UserRepo";
import { wrapServiceAction } from "../../utils";
import { GetFollowDataRequest, GetResourceRequest } from "../../validators";

export default wrapServiceAction({
  schema: GetFollowDataRequest,
  handler: async (params) => {
    const user = await UserRepo.model.findByPk(params.userId);

    if (!user) throw new NotFoundError("User not found");

    const followerData =
      params.type === "followers"
        ? await user.getFollowers()
        : await user.getFollowing();

    return followerData.map((d) =>
      omit(d.toJSON(), UserRepo.model.sensitiveFields)
    );
  },
});
