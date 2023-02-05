import React, { Fragment } from 'react'
import { Header } from './'
import FeaturedPosts from '../sections/featured-posts'
import { ToastContainer } from 'react-toastify';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <>
      <ToastContainer />
      <Header />
      <FeaturedPosts />
      {children}
    </>
  )
}
