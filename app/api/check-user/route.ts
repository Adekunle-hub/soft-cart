import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) {
      return NextResponse.json(
        { exists: false, error: error.message },
        { status: 500 }
      );
    }

    const exists = data.users.some((user) => user.email === email);
    return NextResponse.json({ exists }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { exists: false, error: "Server error" },
      { status: 500 }
    );
  }
}
