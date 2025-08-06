import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  const apiKey = process.env.OMDB_API_KEY;

  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
  const data = await res.json();

  return NextResponse.json(data);
}
