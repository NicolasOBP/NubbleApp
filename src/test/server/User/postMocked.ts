import { PageAPI } from '@api';
import { PostAPI } from '@domain';

export const postMockedResponse: PageAPI<PostAPI> = {
  meta: {
    total: 2,
    per_page: 10,
    current_page: 1,
    last_page: 1,
    first_page: 1,
    first_page_url: '/?page=1',
    last_page_url: '/?page=1',
    next_page_url: null,
    previous_page_url: null,
  },
  data: [
    {
      id: 2,
      text: 'Vivendo no paraíso!',
      user_id: 2,
      image_url:
        'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/post2.jpg',
      is_fixed: false,
      is_activated: true,
      created_at: '2025-11-26T22:25:43.278+00:00',
      updated_at: '2025-11-26T23:05:43.289+00:00',
      reactions: [{ emoji_type: 'like', post_id: 2 }],
      user: {
        id: 2,
        first_name: 'Tamires',
        last_name: 'Silva',
        username: 'tami_silva',
        email: 'tsilva@coffstack.com',
        profile_url:
          'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/4-tamires.png',
        is_online: false,
        full_name: 'Tamires Silva',
        meta: { following_count: '0', followers_count: '1' },
      },
      status: 'published',
      meta: { like_count: '4', favorite_count: '1', comments_count: '2' },
    },
    {
      id: 10,
      text: 'Time to fly!',
      user_id: 2,
      image_url:
        'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/post10.jpg',
      is_fixed: false,
      is_activated: true,
      created_at: '2025-11-26T08:05:43.280+00:00',
      updated_at: '2025-11-26T23:05:43.296+00:00',
      reactions: [],
      user: {
        id: 2,
        first_name: 'Tamires',
        last_name: 'Silva',
        username: 'tami_silva',
        email: 'tsilva@coffstack.com',
        profile_url:
          'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/4-tamires.png',
        is_online: false,
        full_name: 'Tamires Silva',
        meta: { following_count: '0', followers_count: '1' },
      },
      status: 'published',
      meta: { like_count: '7', favorite_count: '5', comments_count: '2' },
    },
  ],
};
