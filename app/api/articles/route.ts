import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const user = await currentUser();
    // Fetch the user from Prisma based on the email
    const prismaUser = await prisma.user.findUnique({
      where: { email: user?.emailAddresses[0].emailAddress }, // Use the email to find the user in the database
    });

    if (!prismaUser) {
      return new Response(
        JSON.stringify({ error: 'User not found in the database' }),
        { status: 404 }
      );
    }

    // Access the Prisma user id
    const prismaUserId = prismaUser.id;

    // Now you can use the `prismaUserId` for operations
    const article = await prisma.article.create({
      data: {
        title,
        content,
        author: {
          connect: { id: prismaUserId }, // Use the Prisma user id here
        },
      },
    });

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    console.error('Error creating article: ', error);
    return new Response(JSON.stringify({ error: 'Failed to create article' }), {
      status: 500,
    });
  }
}
