import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { submitComment } from "../services";

export default function CommentsForm({ slug }) {
  const [error, setError] = useState(false);
  const [state, setState] = useState({ name: '', email: '', comment: '', });
  const [checked, setChecked] = useState(false);

  const getInputValues = e => {
    console.log();
    setState(state => ({ ...state, [e.target.name]: e.target.value }));
  }

  const handleSubmit = () => {
    setError(false);
    if (!state.comment || !state.name || !state.email) {
      setError(true);
      return;
    }
    submitComment({ ...state, slug })
      .then(() => toast.success('Thanks for a comment!'))
      .catch(() => toast.error('Oops. Something went wrong!'));
    if (checked) {
      localStorage.setItem('name', state.name);
      localStorage.setItem('email', state.email);
      setState(state => ({ ...state, comment: '' }));
    } else {
      localStorage.removeItem('name', state.name);
      localStorage.removeItem('email', state.email);
      setState({ name: '', email: '', comment: '' });
    }
  }

  useEffect(() => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    if (name || email) {
      setChecked(true)
    }
    setState(state => ({ ...state, name, email }));
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900 dark:text-white text-black shadow-lg rounded-lg lg:p-8 p-4 pb-5 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b dark:border-blue-900 pb-4">Leave a comment</h3>
      <div className="grid grid-cols-1 gap-4 pb-4">
        <textarea
          onChange={getInputValues}
          value={state.comment} placeholder="Commets" name="comment"
          className="p-4 resize-none outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 dark:bg-zinc-800 dark:focus:ring-zinc-700 bg-gray-100 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4 pb-4">
        <input
          onChange={getInputValues}
          type="text" value={state.name} placeholder="Name" name="name"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 dark:bg-zinc-800 dark:focus:ring-zinc-700 bg-gray-100 text-gray-900 dark:text-gray-200"
        />
        <input
          onChange={getInputValues}
          type="email" value={state.email} placeholder="Email" name="email"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 dark:bg-zinc-800 dark:focus:ring-zinc-700 bg-gray-100 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 pb-4">
        <div className="ml-1">
          <input
            checked={checked}
            type="checkbox" id="check"
            className="cursor-pointer" onChange={e => setChecked(e.target.checked)} />
          <label htmlFor="check" className="text-gray-500 cursor-pointer ml-2">
            Remember Me
          </label>
        </div>
        {error && <p className="text-xs text-red-600">You must fill all fields!</p>}
        <div className="mt-5">
          <button
            type="button" onClick={handleSubmit}
            className="transition duration-500 ease dark:bg-indigo-800 dark:hover:bg-indigo-400 hover:bg-indigo-900 inline-block bg-indigo-400 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          >
            Post Comment
          </button>
          <span className="mt-3 text-xs block">
            Comments will be published after admin`s check!
          </span>
        </div>
      </div>
    </div>
  )
}
