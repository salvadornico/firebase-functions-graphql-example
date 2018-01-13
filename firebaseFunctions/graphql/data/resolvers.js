const authors = [{
	id: "bPSKDXSUyLFeoKf7sj2q",
	firstName: "Tom",
	lastName: "Coleman"
},
{
	id: "bE4gU0SnIMZUYeAEOUjg",
	firstName: "Sashko",
	lastName: "Stubailo"
}
]

const posts = [{
	id: "8dyfoer8yfd8s",
	authorId: "bPSKDXSUyLFeoKf7sj2q",
	title: "Introduction to GraphQL",
	votes: 2
},
{
	id: "d78fnycn6cdsf",
	authorId: "bE4gU0SnIMZUYeAEOUjg",
	title: "GraphQL Rocks",
	votes: 3
},
{
	id: "dfc6afw6cbcsf",
	authorId: "bE4gU0SnIMZUYeAEOUjg",
	title: "Advanced GraphQL",
	votes: 1
}
]

const resolveFunctions = {
	Query: {
		posts() {
			return posts
		},
		authors() {
			return authors
		},
		author(_, {
			id
		}) {
			return authors.find(author => author.id === id)
		}
	},
	Mutation: {
		upvotePost(_, {
			postId
		}) {
			const post = posts.find(post => post.id === postId)
			if (!post) {
				throw new Error(`Couldn't find post with id ${postId}`)
			}
			post.votes += 1
			// pubsub.publish('postUpvoted', post);
			return post
		}
	},
	Author: {
		posts(author) {
			return posts.filter(post => post.authorId === author.id)
		}
	},
	Post: {
		author(post) {
			return authors.find(author => author.id === post.authorId)
		}
	}
}

export default resolveFunctions