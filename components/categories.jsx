import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCategories } from '../services';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(res => setCategories(res));
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900 dark:text-white rounded-lg shadow-lg p-8 mb-8" >
      <h3 className="text-xl mb-8 font-semibold border-b dark:border-blue-900 pb-3">
        Categories
      </h3>
      {categories.map(category => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className='transition duration-200 cursor-pointer block pb-3 dark:text-indigo-400 text-indigo-800 hover:text-indigo-400'>
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
