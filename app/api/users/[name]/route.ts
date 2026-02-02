import { SupabaseBroswer } from "@/lib/SupabaseBrowser";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    name: string;
  }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { name } = await params;
    if (!name) {
      return NextResponse.json({ error: "No name found" }, { status: 401 });
    }

    const { data, error } = await SupabaseBroswer.from("users")
      .select("*")
      .eq("name", name)
      .single();

    if (error) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: `Error fetching User data ${err}` },
      { status: 500 },
    );
  }
}
