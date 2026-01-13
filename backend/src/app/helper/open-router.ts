import OpenAI from "openai";
import config from "src/config/index.js";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: config.openRouterApiKey,
});
