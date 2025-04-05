import type { APIContext } from 'astro';
import { prisma } from '@/prisma/connection';
import type { Income } from '@prisma/client';
import type { PrismaClientValidationError } from '@prisma/client/runtime/library';

export async function POST({ params, request }: APIContext) {
  try {
    const { accountId, mount, dateTime } = (await request.json()) as Income;

    await prisma.income.create({
      data: {
        accountId: Number(accountId),
        mount: Number(mount),
        dateTime: new Date(dateTime),
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    const prismaError = error as PrismaClientValidationError;
    return new Response(
      JSON.stringify({
        message: `Has been ocurred and unknown error: ${prismaError.message}`,
      }),
      {
        status: 500,
        headers: { 'Content-type': 'application/json' },
      }
    );
  }
}
