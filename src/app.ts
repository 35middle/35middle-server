import "reflect-metadata"

import { NODE_ENV, PORT } from "@config"
import { ApolloServer } from "apollo-server-express"
import compression from "compression"
import cookieParser from "cookie-parser"
import express from "express"
import { buildSchema } from "type-graphql"
import { Container } from "typedi"

class App {
  public app: express.Application
  public env: string
  public port: string | number

  constructor(resolvers) {
    this.app = express()
    this.env = NODE_ENV || "development"
    this.port = PORT || 3000

    this.initializeMiddlewares()
    this.initApolloServer(resolvers)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`)
      console.info(`======= ENV: ${this.env} =======`)
      console.info(`🚀 App listening on the port ${this.port}`)
      console.info(`🎮 http://localhost:${this.port}/api/graphql`)
      console.info(`=================================`)
    })
  }

  private initializeMiddlewares() {
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
  }

  private async initApolloServer(resolvers) {
    const schema = await buildSchema({
      resolvers: resolvers,
      container: Container
    })

    const apolloServer = new ApolloServer({
      schema: schema
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app: this.app, cors: true, path: "/api/graphql" })
  }
}

export default App
