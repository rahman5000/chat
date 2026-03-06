import { SupabaseBroswer } from "@/lib/SupabaseBrowser";
import { NextRequest, NextResponse } from "next/server";

/* ================= GET ================= */

export async function GET() {
  const { data, error } = await SupabaseBroswer.from("messages")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Convert snake_case → camelCase
  const formatted = data.map((m) => ({
    id: m.id,
    message: m.message,
    senderId: m.sender_id,
    receiverId: m.receiver_id,
    createdAt: m.created_at,
  }));

  return NextResponse.json({ data: formatted }, { status: 200 });
}

/* ================= POST ================= */

export async function POST(req: NextRequest) {
  const { message, senderId, receiverId } = await req.json();

  if (!message || !senderId || !receiverId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data, error } = await SupabaseBroswer.from("messages")
    .insert([
      {
        message,
        sender_id: senderId,
        receiver_id: receiverId,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Format response
  const formatted = {
    id: data.id,
    message: data.message,
    senderId: data.sender_id,
    receiverId: data.receiver_id,
    createdAt: data.created_at,
  };

  return NextResponse.json({ data: formatted }, { status: 201 });
}
