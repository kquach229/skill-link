import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const articleId = await Number(params.id);
  console.log(articleId);
  if (isNaN(articleId)) {
    return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
  }

  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        author: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Error fetching article' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const articleId = Number(params.id);

  if (isNaN(articleId)) {
    return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
  }

  try {
    // Simulate getting the current user ID from authentication
    const currentUserId = request.headers.get('user-id'); // Replace with your authentication logic

    if (!currentUserId) {
      return NextResponse.json(
        { error: 'Unauthorized: User not authenticated' },
        { status: 401 }
      );
    }

    // Fetch the article to verify ownership
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { author: true },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Check if the current user is the author of the article
    if (article.authorId !== Number(currentUserId)) {
      return NextResponse.json(
        { error: 'Forbidden: You are not the author of this article' },
        { status: 403 }
      );
    }

    // Proceed with deletion
    await prisma.article.delete({
      where: { id: articleId },
    });

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting article:', error);

    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Failed to delete the article' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const articleId = Number(params.id);

  if (isNaN(articleId)) {
    return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
  }

  try {
    // Get current user (e.g., via session or token)
    const currentUserId = request.headers.get('user-id'); // Replace with actual user id logic

    if (!currentUserId) {
      return NextResponse.json(
        { error: 'Unauthorized: User not authenticated' },
        { status: 401 }
      );
    }

    // Get the request body (updated title and content)
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Fetch the article and check ownership
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { author: true },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    if (article.authorId !== Number(currentUserId)) {
      return NextResponse.json(
        { error: 'Forbidden: You are not the author of this article' },
        { status: 403 }
      );
    }

    // Update the article
    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Article updated successfully',
      article: updatedArticle,
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update the article' },
      { status: 500 }
    );
  }
}
