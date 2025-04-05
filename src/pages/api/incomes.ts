import type { APIContext } from 'astro';
import { prisma } from '@/prisma/connection';
import type { Income } from '@prisma/client';

export async function POST({ params, request }: APIContext) {
  try {
    const { accountId, mount } = (await request.json()) as Income;

    await prisma.income.create({
      data: {
        accountId: Number(accountId),
        mount: Number(mount),
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Has been ocurred and unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-type': 'application/json' },
      }
    );
  }
}
