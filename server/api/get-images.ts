import { createClient } from "@supabase/supabase-js";

interface Image {
  id: string;
  name: string;
  url: string;
}

export default defineEventHandler(async (event): Promise<Image[]> => {
  const config = useRuntimeConfig();
  const query = getQuery(event); // Obtenemos los parámetros de consulta
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;

  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);

  const { data, error } = await supabase.storage.from("media").list();
  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  const startIndex = (page - 1) * limit;
  const paginatedData = data
    .filter((item) => item.metadata && item.metadata.mimetype.startsWith("image/"))
    .slice(startIndex, startIndex + limit)
    .map((item) => ({
      id: item.id || item.name,
      name: item.name,
      url: `${config.SUPABASE_URL}/storage/v1/object/public/media/${item.name}`,
    }));

  return paginatedData;
});
