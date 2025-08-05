import { useState, useEffect } from 'react';
import { articlesAPI } from '../services/api/articles';
import type { Article, FeedResponse } from '../services/api/articles';

interface UseContentParams {
  page?: number;
  limit?: number;
  type?: string;
  category?: string;
  search?: string;
  autoFetch?: boolean;
}

interface UseContentReturn {
  data: Article[];
  loading: boolean;
  error: string | null;
  pagination: FeedResponse['pagination'] | null;
  refetch: () => void;
}

export const useContent = (params: UseContentParams = {}): UseContentReturn => {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<FeedResponse['pagination'] | null>(null);

  const { autoFetch = true, ...apiParams } = params;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await articlesAPI.getFeed(apiParams);
      
      if (response.success) {
        setData(response.data.posts);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || 'Failed to fetch content');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [JSON.stringify(apiParams), autoFetch]);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    pagination,
    refetch
  };
};

// useTrendingContent has been replaced by useTrending hook
// which uses actual post_views data from the database

// Hook khusus untuk content by type
export const useContentByType = (type: string, params: Omit<UseContentParams, 'type'> = {}) => {
  return useContent({
    ...params,
    type
  });
};