import { ApolloClient, InMemoryCache } from "@apollo/client";
const BASE_URL_NGROK = "https://pro.magurameudonch1p3.cloud/";
const client = new ApolloClient({
  uri: BASE_URL_NGROK,
  cache: new InMemoryCache(),
});

//   console.log(client.cache);

export default client;
