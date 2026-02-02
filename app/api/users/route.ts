import { SupabaseBroswer } from "@/lib/SupabaseBrowser";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await SupabaseBroswer.from("users").select("*");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json({ users: data }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const { data, error } = await SupabaseBroswer.from("users")
      .insert([{ name }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: `Invalid request ${err}` },
      { status: 400 },
    );
  }
}
