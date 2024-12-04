import HeroComponent from '../components/HeroComponent';
import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import ClientHome from '../components/ClientHome';

export default async function Home() {
  const user = await currentUser();

  // If no user is found, return null or the HeroComponent
  if (!user) {
    return <HeroComponent />;
  }

  // Extract plain object data (only necessary properties)
  const plainUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0].emailAddress,
  };

  // Check if the user exists in the database
  const loggedInUser = await prisma.user.findUnique({
    where: { email: plainUser.email },
  });

  // If the user does not exist, create a new record in the database
  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        name: `${plainUser.firstName} ${plainUser.lastName}`,
        email: plainUser.email,
        plan: {
          connect: { id: 1 },
        },
      },
    });
  }

  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
    },
  });

  // Return the ClientHome component with the plainUser object
  return <ClientHome user={plainUser} initialArticles={articles} />;
}
