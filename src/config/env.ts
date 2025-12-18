import { cleanEnv, str } from "envalid";

export const ENV = cleanEnv(process.env, {
    JWT_ACCESS_SECRET_KEY: str(),
    JWT_EXPIRES_IN: str()
})