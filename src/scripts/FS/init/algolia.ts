import { algoliasearch } from "algoliasearch";

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const algoliaSearchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;

const algoliaClient = algoliaAppId && algoliaSearchKey 
  ? algoliasearch(algoliaAppId, algoliaSearchKey)
  : null;

export default algoliaClient;