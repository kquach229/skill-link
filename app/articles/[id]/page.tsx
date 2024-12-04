'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { formatDate } from '@/lib/utils';

interface Article {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
}

const ArticleDetails = () => {
  const router = useRouter();
  const { id } = useParams(); // Directly access id from params

  const [articleDetails, setArticleDetails] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getArticleDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/articles/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch article details');
      }
      const data = await response.json();
      setArticleDetails(data.article);
    } catch (err) {
      console.error('Error fetching article details:', err);
      setError('Unable to load article details. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getArticleDetails();
  }, [getArticleDetails]);

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'user-id': currentUser.id, // Add the current user's ID
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the article');
      }

      console.log('Article deleted');
      router.push('/'); // Redirect to homepage after deletion
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  if (loading) {
    return <p className='text-center text-gray-500'>Loading...</p>;
  }

  if (error) {
    return <p className='text-center text-red-500'>{error}</p>;
  }

  return (
    <div className='flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8 min-h-screen'>
      <Card className='max-w-3xl w-full shadow-lg bg-white rounded-lg min-h-[35rem]'>
        <CardHeader className='px-6 py-4'>
          <CardTitle className='text-2xl font-semibold text-gray-900 flex flex-col items-start  md:flex-row  md:justify-between md:text-right'>
            {articleDetails?.title}
            <div className='text-left md:text-right'>
              <h3 className='text-sm text-gray-500'>
                {articleDetails?.author?.name}
              </h3>
              <h3 className='text-sm text-gray-500'>
                {formatDate(articleDetails?.createdAt)}
              </h3>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 px-6 py-4'>
          <p className='text-gray-700 text-base min-h-[38rem]'>
            {articleDetails?.content}
          </p>
          <div className='flex flex-col sm:flex-row justify-between mt-6 gap-4'>
            <Button
              variant='outline'
              onClick={() => router.back()}
              className='w-full sm:w-auto'>
              Go Back
            </Button>
            <Button
              variant='destructive'
              onClick={handleDeletePost}
              className='w-full sm:w-auto'>
              Delete Article
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleDetails;
