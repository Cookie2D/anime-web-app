import { useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Card, Flex, Grid, Pagination, Skeleton, Text } from '@mantine/core';
import { useGetAnimeList } from '@/api/anime';
import { supabaseLoader } from '@/utils/common/supabaseLoader';

export const AnimeList = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 8;

  const { data, error, isLoading, isError } = useGetAnimeList({ page, limit });

  useLayoutEffect(() => {
    if (total && (!data?.count || total === data.count)) {
      return;
    }
    setTotal(data?.count ?? 0);
  }, [data, total, setTotal]);

  if (isError) {
    return <Text c="red">Error fetching data: {error.message}</Text>;
  }

  return (
    <>
      <Box>
        {isLoading ? (
          <Grid columns={4}>
            {[...Array(limit)].map((_, index) => (
              <Grid.Col span={1} key={index}>
                <Card shadow="sm" h="100%">
                  <Skeleton height={250} />
                  <Skeleton height={30} width="60%" mt="sm" />
                  <Skeleton height={14} width="80%" mt="xs" />
                  <Skeleton height={14} width="80%" mt="xs" />
                  <Skeleton height={14} width="80%" mt="xs" />
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Grid columns={4}>
            {data?.data.map((anime) => (
              <Grid.Col span={1} key={anime.id}>
                <Card shadow="sm" h="100%">
                  <Box
                    style={{
                      width: '100%',
                      height: 250,
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={anime.image}
                      alt={anime.name}
                      fill
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      loader={supabaseLoader}
                    />
                  </Box>
                  <Text
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    size="lg"
                    h={30}
                  >
                    {anime.name}
                  </Text>
                  <Text
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    h={84}
                    size="sm"
                    c="dimmed"
                  >
                    {anime.description}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Box>
      <Flex justify="center">
        <Pagination
          total={Math.ceil((total ?? 0) / limit)}
          value={page}
          onChange={setPage}
          my="sm"
        />
      </Flex>
    </>
  );
};
