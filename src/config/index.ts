import { config } from "dotenv"

config({ path: `.env.${process.env.NODE_ENV}` })

export const { PORT, DOMAIN_NAME, NODE_ENV, STAGE } = process.env

export const IS_DEV = NODE_ENV === "development"

export const IS_TEST = NODE_ENV === "test"

export const IS_OFFLINE = IS_DEV || IS_TEST

export const IS_UAT = STAGE === "uat"

export const IS_PROD = STAGE === "prod"

export const IS_ONLINE = IS_UAT || IS_PROD
