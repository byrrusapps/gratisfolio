import { algoliaClient } from "./init";

interface AlgoliaSearchParams {
  indexName: string;
  query: string;
  hitsPerPage?: number;
  page?: number;
  typoTolerance?: boolean;
  filters?: string;
  facetFilters?: string[] | string[][];
  searchParams?: Record<string, any>;
}

interface AlgoliaSearchResult<T = any> {
  hits: T[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
}

const search = async <T = any>({
  indexName,
  query: searchQuery,
  hitsPerPage = 20,
  page = 0,
  typoTolerance = true,
  filters,
  facetFilters,
  searchParams = {}
}: AlgoliaSearchParams): Promise<AlgoliaSearchResult<T>> => {
  try {
    if (!algoliaClient) {
      throw new Error("Algolia client not initialized. Check environment variables.");
    }

    const params: Record<string, any> = {
      query: searchQuery,
      hitsPerPage,
      page,
      typoTolerance,
      ...searchParams
    };

    if (filters) params.filters = filters;
    if (facetFilters) params.facetFilters = facetFilters;

    const result = await algoliaClient.searchSingleIndex({
      indexName,
      searchParams: params
    });

    return {
      hits: result.hits as T[],
      nbHits: result.nbHits ?? 0,
      page: result.page ?? 0,
      nbPages: result.nbPages ?? 0,
      hitsPerPage: result.hitsPerPage ?? 0,
      processingTimeMS: result.processingTimeMS ?? 0
    };
  } catch (error) {
    console.error("Error searching Algolia:", error);
    throw error;
  }
};

export { search, type AlgoliaSearchParams, type AlgoliaSearchResult };