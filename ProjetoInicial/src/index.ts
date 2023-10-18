import dotenv from "dotenv";
import { twitterClient } from "./twitterClient";

dotenv.config({ path: __dirname + "/.env" });

const tweet = async (): Promise<void> => {
  try {
    await twitterClient.v2.singleTweet("1714427275267965180");
  } catch (e) {
    console.log(e);
  }
};

tweet();

