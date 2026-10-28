import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Liveness: no toca la base de datos. */
export function GET() {
  return NextResponse.json({ status: "ok", version: process.env.APP_VERSION ?? "dev" });
}
