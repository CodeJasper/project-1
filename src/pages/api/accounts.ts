import type { APIContext } from "astro";
import { prisma } from "@/prisma/connection"
import type { Account } from "@prisma/client";


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

export async function POST({ request }: APIContext) {
  try {
    const { name, color } = await request.json() as Account;
    await prisma.account.create({data: { name, color }})

    return new Response(null, {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify(
        { message: "Has been ocurred and unknown error"}
      ),
      {
        status: 500,
        headers: { "Content-type": "application/json" }
      }
    )
  }
}