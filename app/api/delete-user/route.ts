// app/api/verify/route.ts
import { deleteData } from "@/actions/crud-actions";
import {
  THERMAX_USER_API,
  NEXT_AUTH_USER_API,
  USER_API,
} from "@/configs/api-endpoints";
import { NextResponse } from "next/server";

// Handling POST requests
export async function POST(request: Request) {
  try {
    const data = (await request.json()) as any;
    const email = data.email;
    // Delete user
    await deleteData(`${THERMAX_USER_API}/${email}`, true);
    await deleteData(`${NEXT_AUTH_USER_API}/${email}`, true);
    await deleteData(`${USER_API}/${email}`, true);

    // Return a response
    return NextResponse.json(
      { message: "User deleted successfully!" },
      { status: 202 }
    );
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
