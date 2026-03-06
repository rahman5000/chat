import { getHash } from "@/lib/getHash";
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
    const { name, password } = await req.json();

    if (!name || !password) {
      return NextResponse.json(
        { error: "Name and Password is required" },
        { status: 400 },
      );
    }

    const hashedPassword = await getHash(password);

    const { data, error } = await SupabaseBroswer.from("users")
      .insert([
        {
          name,
          hashed_password: hashedPassword,
        },
      ])
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
