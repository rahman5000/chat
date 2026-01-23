import { SupabaseBroswer } from "@/lib/SupabaseBrowser";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await SupabaseBroswer.from("users").select("*");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json({ users: data }, { status: 200 });
  }
}
