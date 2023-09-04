import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { createServer } from "http";

const app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

let server = null;

async function startServer() {
    server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });
}

startServer();
const expressApp = createServer(app);

app.get("/rest", function (req, res) {
    res.json({ data: "api working ! 😆" });
});

app.listen(4000, function () {
    console.log(`server running on port 4000`);
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});