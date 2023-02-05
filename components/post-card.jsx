import React from 'react'
import Link from 'next/link';
import moment from 'moment/moment';
import Image from 'next/image';

export default function PostCard({ post }) {
  return (
    <div className="bg-white dark:bg-zinc-900 dark:text-white text-black shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <Image
          fill
          src={post.featuredImage.url}
          alt={post.title}
          className="absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-indigo-700 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <p className='text-center text-lg to-gray-700 font-normal px-4 lg:px-20 mb-8'>
        {post.excerpt}
      </p>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <Image
            width={35} height={35}
            src={post.author.photo.url} alt={post.author.name}
            className="align-middle rounded-full bg-zinc-800"
          />
          <p className='inline align-middle to-gray-700 ml-2 text-lg'>{post.author.name}</p>
        </div>
        <div className="font-medium text-gray-700">
          <span className='text-lg mr-1'>🗓️</span>
          <span className='dark:text-gray-400'>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
        </div>
      </div>

      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className='transition duration-500 transform hover:-translate-y-1 inline-block bg-indigo-800 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  )
}
