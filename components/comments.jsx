import moment from 'moment/moment';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { getComments } from '../services';

export default function Comments({ slug }) {
  const [comments, setComments] = useState([]);
  console.log(comments);

  useEffect(() => {
    getComments(slug).then(res => setComments(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 text-black dark:text-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b dark:border-blue-900 pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((comment, idx) => (
            <div className="border-b border-gray-100 mb-4 pb-4" key={idx}>
              <p className="mb-4">
                <span className="font-semibold">
                  {comment.name}
                </span>
                {' '}
                on
                {' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="whitespace-pre-line text-gray-600 dark:text-gray-300 w-full">{parse(comment.comment)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
