import { SupabaseAdmin } from "@/lib/SupabaseAdmin";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "No id found" }, { status: 401 });
    }

    const { error } = await SupabaseAdmin.from("messages")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: `Error deleting message ${error}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Message has been deleted" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Error deleting message ${err}` },
      { status: 500 },
    );
  }
}
