import * as dotenv from "dotenv";
dotenv.config();

interface AppConfig {
  elasticSearchHost: string;
}

const appConfig: AppConfig = {
  elasticSearchHost: process.env.ELASTICSEARCH_HOST || "",
};

export default appConfig;
