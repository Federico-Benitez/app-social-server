const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://fede:YN0nYHrCE3svydRi@cluster0.jp00p.mongodb.net/merng?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log("DB is connected");
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });
