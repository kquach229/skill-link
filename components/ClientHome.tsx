'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Link from 'next/link';

// Validation schema
const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(5, 'Content must be at least 5 characters'),
});

type FormFields = z.infer<typeof schema>;

export default function ClientHome({
  user,
  initialArticles,
}: {
  user: { firstName: string };
  initialArticles: { id: string; title: string; content: string }[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  console.log(initialArticles);

  const onSubmit: SubmitHandler<FormFields> = async (data: FormData) => {
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      const newArticle = await response.json();
      console.log('Article created:', newArticle);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='p-5 container mx-auto'>
      <h3>Welcome, {user.firstName}</h3>
      <div className='flex flex-col md:flex-row gap-10'>
        {/* Article Form */}
        <div className='md:w-2/3'>
          <h2 className='text-xl font-semibold mb-4'>Create an Article</h2>
          <form
            className='tutorial flex flex-col gap-12'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2'>
              <label htmlFor='title' className='font-medium'>
                Article Title
              </label>
              <input
                {...register('title')}
                id='title'
                type='text'
                placeholder='Enter the article Title'
                className={`border p-2 rounded ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <div className='text-red-500 text-sm'>
                  {errors.title.message}
                </div>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='content' className='font-medium'>
                Article Content
              </label>
              <textarea
                {...register('content')}
                rows={10}
                id='content'
                placeholder='Write your article'
                className={`border p-2 rounded ${
                  errors.content ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.content && (
                <div className='text-red-500 text-sm'>
                  {errors.content.message}
                </div>
              )}
            </div>
            <Button
              type='submit'
              disabled={isSubmitting}
              className={`py-2 px-4 rounded ${
                isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primaryColor text-white'
              }`}>
              {isSubmitting ? 'Submitting...' : 'Submit Article'}
            </Button>
          </form>
        </div>

        {/* Feed */}
        <section className='md:w-1/3'>
          <h2 className='text-xl font-semibold mb-4'>Your Feed</h2>
          <div className='flex flex-col gap-5'>
            {initialArticles.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`}>
                <Card className='p-4 h-52 bg-white rounded-lg shadow'>
                  <h3 className='font-semibold text-lg'>
                    {article.title} - {article.author.name}
                  </h3>
                  <p className='text-sm text-gray-600'>{article.content}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
