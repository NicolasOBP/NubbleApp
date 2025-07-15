import { API, PageAPI } from '@api';

import { PostAPI } from './postTypes';

async function getList(): Promise<PageAPI<PostAPI>> {
  const response = await API.get<PageAPI<PostAPI>>('/user/post');

  return response.data;

  // let response = await fetch('http://localhost:3333/user/post', {
  //   method: 'GET',
  //   headers: {
  //     Authorization:
  //       'Bearer NQ.dX0pQjpCn_vr9E97FKA7hbwbZXnmhrVOpVwkZuJwJZYlajl7TC-rQwZsNIng',
  //   },
  // });

  // let data: PageAPI<PostAPI> = await response.json();
  // console.log('fetch => ', data);

  // return data;
}

export const postApi = {
  getList,
};
