import { ApolloClient, InMemoryCache} from "@apollo/client";
const apolloClient = new ApolloClient({
	uri: 'https://safe-shore-19032.herokuapp.com/graphql',
	cache: new InMemoryCache()
});

export default apolloClient;