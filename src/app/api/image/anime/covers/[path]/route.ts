import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // or use a helper to get service role client

export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string }> }
) {
  const { path } = await params;

  const { data, error } = await supabase.storage
    .from("anime-covers")
    .download(path);

  if (error || !data) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new Response(data, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
