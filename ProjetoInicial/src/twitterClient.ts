import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: "plbyzzSq72jfvrg4KiyOLAZ6X" ,
  appSecret: "lqwk1lwX7Aehcm4xr3Qz3KtgIvg12ngoW58fl0qBkm7YvLGpbi",
  accessToken: "1712827131217018880-jJ2bASWj1iVzMchshelzC030FUcMkU",
  accessSecret: "SlxlcRrXjNmTTtnfRviPCOVgTUyBGRld0pAcUvdFesJje",
});

const bearer = new TwitterApi("AAAAAAAAAAAAAAAAAAAAAEX8qQEAAAAAEZu5s8sSnFcCsoGdIrGtb%2Fud3hw%3DvvuOh5SaWXhC1i0cOoZcVivBOWtsfrfPCGsP5STs0jILwoxG4q>");

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

export { twitterClient, twitterBearer };