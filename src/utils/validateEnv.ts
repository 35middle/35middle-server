import { cleanEnv, host, port, str } from "envalid"

export const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DOMAIN_NAME: host()
  })
}
