import { SupabaseBroswer } from "@/lib/SupabaseBrowser";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await SupabaseBroswer.from("messages").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { message, senderId } = await req.json();
  const { data, error } = await SupabaseBroswer.from("messages")
    .insert([{ message: message, sender_id: senderId }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
