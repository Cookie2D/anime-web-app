import { FC, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Box,
  Card,
  ComboboxItem,
  Flex,
  Grid,
  Pagination,
  Select,
  Skeleton,
  Text,
  TextInput,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useGetAnimeList } from '@/api/anime';
import { HeaderLinks } from '@/components/share/header/types/header.types';
import { supabaseLoader } from '@/utils/common/supabaseLoader';

interface Props {
  filters: HeaderLinks;
}

export const AnimeList: FC<Props> = ({ filters }) => {
  const t = useTranslations();

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 8;
  const [category, setCategory] = useState<string | null>(null);
  const [categories] = useState<ComboboxItem[]>(() => {
    return filters.categories.map((item) => ({
      value: item.slug,
      label: t(`pages.list.categories.${item.slug}`),
    }));
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [search] = useDebouncedValue(searchTerm, 300);
  const { data, error, isLoading, isError, isPending } = useGetAnimeList({
    page,
    limit,
    category,
    search,
  });

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    setPage(1);
  }

  useLayoutEffect(() => {
    if (isPending) {
      return;
    }

    setTotal(data?.count ?? 0);
  }, [data, isPending]);

  if (isError) {
    return <Text c="red">Error fetching data: {error.message}</Text>;
  }

  return (
    <>
      <Flex justify="space-between" mb="md">
        <Select
          label="Category"
          data={categories}
          value={category}
          onChange={setCategory}
          placeholder="Select category"
          style={{ maxWidth: 200 }}
        />
        <TextInput
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ maxWidth: 300 }}
        />
      </Flex>

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
