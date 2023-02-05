import moment from "moment/moment"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"
import { getRecentPosts, getSimilarPosts } from "../services";

export default function PostWidget({ categories, slug }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug)
        .then(res => setRelatedPosts(res));
    } else {
      getRecentPosts().then(res => setRelatedPosts(res));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900 dark:text-white rounded-lg shadow-lg p-8 mb-8" >
      <h3 className="text-xl mb-8 font-semibold border-b dark:border-blue-900 pb-3">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map(post => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              width={60} height={60}
              src={post.featuredImage.url}
              alt={post.title}
              className="align-middle rounded-full object-cover"
            />
          </div>
          <div className="transition duration-200 first-letter:flex-grow ml-4 border-b dark:border-blue-900 text-indigo-800 dark:text-indigo-400 hover:text-indigo-400">
            <p className="text-gray-500 dark:text-gray-100 font-xs">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
