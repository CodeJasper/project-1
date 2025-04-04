import type { APIContext } from "astro";
import { prisma } from "../../../prisma/connection";


export async function GET({ params, request }: APIContext) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? 1;
  const pageSize = 10;
  const accounts = await prisma.account.findMany({
    skip: (Number(page) - 1 ) * pageSize,
    take: 10
  });
  return new Response(JSON.stringify({
    data: accounts
  }))
};