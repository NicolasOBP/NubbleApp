export interface MetaDataPageAPI {
  current_page: number; // 1;
  first_page: number; // 1;
  last_page: number; //3;
  per_page: number; // 10;
  total: number; //24;
  first_page_url: string; // '/?page=1';
  last_page_url: string; //'/?page=3';
  next_page_url: string | null; //'/?page=2';
  previous_page_url: string | null;
}

/**
 * @description Interface que define o formato de dados de uma página de dados da API
 * @template Data Tipo do dado da página
 */
export interface PageAPI<Data> {
  meta: MetaDataPageAPI;
  data: Data[];
}
