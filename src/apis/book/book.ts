import { kakaoRequest } from '@/apis/axios';
import type { GetSearchBookParams, GetSearchBookResponse } from '@/apis/book/book.types';

const URL = {
  SEARCH_BOOK: '/v3/search/book',
};

export const getSearchBookAPI = async (params: GetSearchBookParams) => {
  const { data } = await kakaoRequest<GetSearchBookResponse>({
    method: 'get',
    url: URL.SEARCH_BOOK,
    queryParams: { ...params },
  });

  return data;
};
