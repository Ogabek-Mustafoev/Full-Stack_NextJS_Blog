import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedPostCard({ post }) {
  return (
    <div className="relative h-60 lg:h-80 md:h-72 sm:h-60">
      <div
        className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-lg inline-block w-full h-full"
        style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
      />
      <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-full" />
      <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
        <p className="text-white mb-4 text-shadow font-semibold text-xs">
          {moment(post.createdAt).format("MMM DD, YYYY")}
        </p>
        <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">
          {post.title}
        </p>
        <div className="flex items-center absolute bottom-5 w-full justify-center">
          <Image
            unoptimized
            alt={post.author.name}
            height={30}
            width={30}
            className="align-middle drop-shadow-lg rounded-full bg-slate-400"
            src={post.author.photo.url}
          />
          <p className="inline align-middle text-white text-shadow ml-2 font-medium">
            {post.author.name}
          </p>
        </div>
      </div>
      <Link href={`/post/${post.slug}`}>
        <span className="cursor-pointer absolute w-full h-full" />
      </Link>
    </div>
  )
}
