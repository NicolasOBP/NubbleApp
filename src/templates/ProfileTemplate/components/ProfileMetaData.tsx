import React from 'react';

import { Box, Text } from '@components';

type Props = {
  followersCount: string;
  followingCount: string;
  publicationCount: string;
};

export function ProfileMetaData({
  followersCount,
  followingCount,
  publicationCount,
}: Props) {
  const items: ItemType[] = [
    { label: 'Publicações', value: publicationCount },
    { label: 'Seguidores', value: followersCount },
    { label: 'Seguindo', value: followingCount },
  ];

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      mt="s24"
      columnGap="s32"
    >
      {items.map(item => (
        <Item key={item.label} {...item} />
      ))}
    </Box>
  );
}

type ItemType = {
  value: string;
  label: string;
};
function Item({ label, value }: ItemType) {
  return (
    <Box alignItems="center">
      <Text preset="headingSmall">{value}</Text>
      <Text preset="paragraphSmall">{label}</Text>
    </Box>
  );
}
