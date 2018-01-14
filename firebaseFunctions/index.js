import {
	https
} from "firebase-functions"
import setupGraphQLServer from "./graphql/server"
import express from "express"

const expressApp = express()
expressApp.get("*", (request, response) => {
	response.send("Hello from Express on Firebase!")
})
const expressHello = https.onRequest(expressApp)

const graphQLServer = setupGraphQLServer()
const api = https.onRequest(graphQLServer)

import authorsArray from "./firestore"

const testServer = express()
testServer.get("*", (req, res) => {
	res.setHeader("Content-Type", "application/json")
	res.send(JSON.stringify({
		data: authorsArray
	}))
})
const test = https.onRequest(testServer)

module.exports = {
	api,
	expressHello,
	test
}