import { SupabaseBroswer } from "@/lib/SupabaseBrowser";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await SupabaseBroswer.from("messages").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
