//import { getHeaderData } from '@/server/header/getHeaderData';
import { getAnimeList } from "@/server/list/getAnimeList";
import AnimeItem from "./AnimeItem";

export const AnimeList = async () => {
  //const links = await getHeaderData();
  const { data } = await getAnimeList();
  //const [page, setPage] = useState(1);
  //const [total, setTotal] = useState(0);
  //const limit = 8;
  //const [category, setCategory] = useState<string | null>(null);
  //const [categories] = useState<ComboboxItem[]>(() => {
  //const categories = links.categories.map((item) => ({
  //  value: item.slug,
  //  label: item.slug,
  //}));
  //});
  //const [searchTerm, setSearchTerm] = useState('');
  //const [search] = useDebouncedValue(searchTerm, 300);

  //function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
  //  setSearchTerm(e.target.value);
  //  setPage(1);
  //}

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        {/*<Select
          label="Category"
          data={categories}
          value={category}
          onChange={setCategory}
          placeholder="Select category"
          style={{ maxWidth: 200 }}
        />*/}
        {/*<TextInput
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ maxWidth: 300 }}
        />*/}
      </div>

      <div>
        {/*{isLoading ? (
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
        ) : (*/}
        <div className="grid grid-cols-5 gap-3">
          {data?.map((anime) => (
            <AnimeItem key={anime.id} {...anime} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        {/*<Pagination
          total={Math.ceil((count ?? 0) / limit)}
          value={page}
          onChange={setPage}
          my="sm"
        />*/}
      </div>
    </>
  );
};
