import { useEffect, useRef, useState } from 'react';
import { Box, Card, Flex, Grid, Pagination, Skeleton, Text } from '@mantine/core';
import { useGetAnimeList } from '@/api/anime';

export const AnimeList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const totalCountRef = useRef<number | null>(0);

  const { data, error, isLoading, isError, isFetching } = useGetAnimeList({ page, limit });

  useEffect(() => {
    if ((totalCountRef.current && !data?.count) || data?.count === totalCountRef.current) {
      return;
    }

    totalCountRef.current = data?.count ?? 0;
  }, [data]);
  if (isError) {
    return <Text c="red">Error fetching data: {error.message}</Text>;
  }

  return (
    <>
      <Box>
        {isLoading ? (
          // Skeleton loader for the card layout
          <Grid>
            {[...Array(limit)].map((_, index) => (
              <Grid.Col span={3} key={index}>
                <Card shadow="sm" h="100%">
                  <Skeleton height={200} />
                  <Skeleton height={20} width="60%" mt="sm" />
                  <Skeleton height={15} width="80%" mt="xs" />
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Grid>
            {data?.data.map((anime) => (
              <Grid.Col span={3} key={anime.id}>
                <Card shadow="sm" h="100%">
                  <Text
                    size="lg"
                    style={{
                      width: '100%',
                    }}
                  >
                    {anime.name}
                  </Text>
                  <Text
                    mah={100}
                    size="sm"
                    c="dimmed"
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
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
          disabled={isFetching}
          total={Math.ceil((totalCountRef.current ?? 0) / limit)}
          value={page}
          onChange={setPage}
          mt="sm"
        />
      </Flex>
    </>
  );
};
