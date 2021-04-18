import * as dotenv from "dotenv";
dotenv.config();

export default {
  ElasticSearchHost: process.env.ELASTICSEARCH_HOST,
};
