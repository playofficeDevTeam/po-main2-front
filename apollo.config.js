module.exports = {
  client: {
    includes: ["./components/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "poketing-backend",
      url: "http://192.168.0.10:4000/graphql",
    },
  },
};
