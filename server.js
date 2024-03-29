import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { quotes, users } from "./fakeobj.js";

const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [Quote]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    passWord: String
    quotes: [Quote]
  }

  type Quote {
    name: String
    by: ID
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    quotes: () => quotes,
  },
  User: {
    quotes: (url) => quotes.filter((quote) => quote.by == url.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`server is ready ${url}`);
});
