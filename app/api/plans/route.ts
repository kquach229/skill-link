import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const plans = await prisma.plan.findMany();

    if (plans.length === 0) {
      return NextResponse.json(
        {
          message: 'No plans found',
        },
        { status: 404 }
      );
    }

    console.log('plans:', plans);
    return NextResponse.json(plans, { status: 200 });
  } catch (error) {
    console.error('Error getting plans:', error);
    return NextResponse.json(
      {
        message: 'Error getting plans',
        error: error.message, // Include a readable error message
      },
      { status: 500 }
    );
  }
}
