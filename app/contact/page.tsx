import React from 'react';

const Contact = () => {
  return (
    <div className='min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-6'>
      <div className='w-full max-w-3xl bg-white shadow-lg rounded-lg p-8'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Contact Me</h1>
        <form action='#' method='POST' className='space-y-4'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-600'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              required
              className='mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-teal-500'
              placeholder='Your Name'
            />
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-600'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              required
              className='mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-teal-500'
              placeholder='you@example.com'
            />
          </div>

          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-gray-600'>
              Message
            </label>
            <textarea
              id='message'
              name='message'
              rows={5}
              required
              className='mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-teal-500'
              placeholder='Write your message here...'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-teal-600 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-700 focus:ring focus:ring-teal-500'>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
