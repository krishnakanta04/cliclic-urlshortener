import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const redirectUrlId = params.redirectUrlId;

  const getShortUrl = await prisma.shortenedUrl.findUnique({
    where: {
      shortUrlId: redirectUrlId,
    },
  });

  const redirectUrl = getShortUrl.originalUrl;
  return NextResponse.redirect(redirectUrl);
}
