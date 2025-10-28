import { algoliaClient } from "./init";

interface MultiSearchQuery {
  indexName: string;
  query: string;
  searchParams?: Record<string, any>;
}

interface MultiSearchResult<T = any> {
  hits: T[];
  nbHits: number;
  page: number;
  nbPages: number;
  index: string;
}

const searchMulti = async <T = any>(
  queries: MultiSearchQuery[]
): Promise<MultiSearchResult<T>[]> => {
  try {
    if (!algoliaClient) {
      throw new Error("Algolia client not initialized. Check environment variables.");
    }

    const formattedQueries = queries.map(({ indexName, query, searchParams = {} }) => ({
      indexName,
      query,
      params: searchParams
    }));

    const results = await algoliaClient.search({ requests: formattedQueries });
    
    return results.results.map((result) => {
      // Type guard to ensure we're working with search results, not facet results
      if ('hits' in result) {
        return {
          hits: result.hits as T[],
          nbHits: result.nbHits ?? 0,
          page: result.page ?? 0,
          nbPages: result.nbPages ?? 0,
          index: result.index ?? ''
        };
      }
      throw new Error('Unexpected result type from Algolia');
    });
  } catch (error) {
    console.error("Error searching multiple Algolia indices:", error);
    throw error;
  }
};

export { searchMulti, type MultiSearchQuery, type MultiSearchResult };