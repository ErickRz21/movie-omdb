import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing IMDb ID" }, { status: 400 });
  }

  const apiKey = process.env.OMDB_API_KEY;

  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
  const data = await res.json();

  return NextResponse.json(data);
}