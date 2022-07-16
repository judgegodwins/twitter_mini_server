import { v2 as cloudinary } from "cloudinary";
import config from "../../config";
import { wrapServiceAction } from "../../utils";
import { EmptyInputRequest, GetResourceRequest } from "../../validators";

export default wrapServiceAction({
  schema: EmptyInputRequest,
  handler: async (params) => {
    const { cloudName, apiKey, apiSecret, folder } = config.cloudinary;
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      apiSecret
    );

    return { timestamp, apiKey, folder, cloudName, signature };
  },
});
