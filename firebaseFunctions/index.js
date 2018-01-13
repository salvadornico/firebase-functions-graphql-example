import { https } from "firebase-functions"
import setupGraphQLServer from "./graphql/server"
import express from "express"

const expressApp = express()
expressApp.get("*", (request, response) => {
	response.send("Hello from Express on Firebase!")
})
const expressHello = https.onRequest(expressApp)

const graphQLServer = setupGraphQLServer()
const api = https.onRequest(graphQLServer)

module.exports = {
	api,
	expressHello
}
