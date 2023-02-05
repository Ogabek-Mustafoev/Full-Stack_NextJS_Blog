import moment from "moment";
import Image from "next/image";
import { Fragment } from "react";

export default function PostDetail({ post }) {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }
      if (obj.italic) {
        modifiedText = <i key={index}>{text}</i>;
      }
    }

    switch (type) {
      case "heading-four":
        return (
          <h4 key={index} className=" text-1xl font-semibold mb-4">
            {modifiedText.map((item, idx) => <Fragment key={idx}>{item}</Fragment>)}
          </h4>
        );
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, idx) => <Fragment key={idx}>{item}</Fragment>)}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, idx) => <Fragment key={idx}>{item}</Fragment>)}
          </p>
        );
      case "image":
        return (
          <Image
            src={obj.src}
            alt={obj.title}
            key={index}
            width={obj.width}
            height={obj.height}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 dark:text-white rounded-lg shadow-lg lg:p-8 pb-12 mb-12">
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image
          width={700}
          height={700}
          alt={post.title}
          src={post.featuredImage.url}
          className="object-cover h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center w-1/2 lg:mb-0">
            <div className="w-24">
              <Image
                width={100}
                height={100}
                src={post.author.photo.url}
                alt={post.author.name}
                className="align-middle rounded-full bg-zinc-800 w-full"
              />
            </div>
            <p className="inline align-middle to-gray-700 ml-4 text-lg">
              {post.author.name}
            </p>
          </div>
          <div className="flex items-center w-1/2 justify-end font-medium text-gray-700 dark:text-gray-400 lg:mr-3 md:mr-3">
            <span className="text-lg mr-1">🗓️</span>
            <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {post.content.raw.children.map((typeObj, idx) => {
          const children = typeObj.children.map((item, itemIdx) =>
            getContentFragment(itemIdx, item.text, item)
          );
          return getContentFragment(idx, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
}
