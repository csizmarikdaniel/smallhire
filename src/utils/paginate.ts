export const paginate = <T>(
  items: T[],
  { page = 1, perPage = 10 }: { page?: number; perPage?: number } = {},
) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedData = items.slice(start, end);

  return paginatedData;
};
