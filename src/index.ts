import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import resolvers from './resolvers';
import typeDefs from './schema';

require('./db-connect');

const { PORT } = require('./config');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context() {
		console.log('\n\n\n\n');
		return { x: 0 };
	},
	formatError(e) {
		console.error(e);

		console.log(JSON.stringify(e, null, '\t'));

		return e;
	}
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
	console.log(
		`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
	)
);
