import * as admin from "firebase-admin"
import * as functions from "firebase-functions"

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

const authors = []
db
	.collection("authors")
	.get()
	.then(snapshot => {
		snapshot.forEach(doc => {
			const data = {
				id: doc.id,
				firstName: doc.data().firstName,
				lastName: doc.data().lastName
			}
			authors.push(data)
		})
	})

export default authors
