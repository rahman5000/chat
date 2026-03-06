import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/lib/getHash";
import { SupabaseAdmin } from "@/lib/SupabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { name, password } = await req.json();

    if (!name || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Find user
    const { data: user, error } = await SupabaseAdmin.from("users")
      .select("*")
      .eq("name", name)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Compare password
    const isValid = await comparePassword(password, user.hashed_password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Login success
    return NextResponse.json(
      {
        message: "Login success",
        user: {
          id: user.id,
          name: user.name,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
