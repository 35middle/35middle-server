import "reflect-metadata"

import { startNodeProcessErrorMonitoring } from "@errors/node/processMonitor"
import { AccountUserResolver } from "@modules/accountUser/accountUser.resolver"
import { validateEnv } from "@utils/validateEnv"

import App from "@/app"

validateEnv()
startNodeProcessErrorMonitoring()

const app = new App([AccountUserResolver])

app.listen()
