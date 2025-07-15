import { PageAPI } from '@api';

import { PostAPI } from './postTypes';

async function getList(): Promise<PageAPI<PostAPI>> {
  let response = await fetch('http://localhost:3333/user/post', {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer NQ.dX0pQjpCn_vr9E97FKA7hbwbZXnmhrVOpVwkZuJwJZYlajl7TC-rQwZsNIng',
    },
  });

  let data: PageAPI<PostAPI> = await response.json();
  console.log('fetch => ', data);

  return data;
  // await new Promise(resolve => setTimeout(() => resolve(''), 1000));

  // return postListMock;
}

export const postApi = {
  getList,
};
