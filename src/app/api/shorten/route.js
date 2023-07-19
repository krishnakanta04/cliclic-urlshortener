import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(request) {
  try {
    const { originalUrl } = await request.json();

    if (!originalUrl) {
      return NextResponse.json("URL missing", { status: 500 });
    }

    let shortUrlId;

    const existingShortenedUrl = await prisma.shortenedUrl.findUnique({
      where: {
        originalUrl,
      },
    });

    if (existingShortenedUrl) {
      shortUrlId = existingShortenedUrl.shortUrlId;
    } else {
      shortUrlId = nanoid(5);
      await prisma.shortenedUrl.create({
        data: {
          originalUrl,
          shortUrlId,
        },
      });
    }

    return NextResponse.json({ shortUrlId });
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
