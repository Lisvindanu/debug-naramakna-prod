import { useState, useEffect } from 'react';
import { articlesAPI } from '../services/api/articles';
import type { Article } from '../services/api/articles';

interface UseTrendingParams {
  limit?: number;
  category?: string;
  type?: string;
}

interface TrendingResponse {
  posts: Article[];
  totalItems: number;
  criteria: string;
}

interface UseTrendingResult {
  data: TrendingResponse | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export const useTrending = (params: UseTrendingParams = {}): UseTrendingResult => {
  const [data, setData] = useState<TrendingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await articlesAPI.getTrending(params);
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || 'Failed to fetch trending content');
        console.warn('Trending API Error:', result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Trending fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.limit, params.category, params.type]);

  const refresh = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    refresh
  };
};