import Image from "next/image";

export default function Author({ author }) {
  return (
    <div className="bg-white dark:bg-zinc-900 dark:text-white text-black text-center mt-20 mb-8 p-12 relative rounded-lg">
      <div className="flex justify-center absolute left-0 ring-0 -top-14 w-full">
        <Image
          src={author.photo.url}
          alt={author.name}
          className="align-middle rounded-full bg-gray-400"
          width={100}
          height={100}
        />
      </div>
      <h3 className="mb-4 mt-4 text-xl font-bold">{author.name}</h3>
      <p className="text-ls">{author.bio}</p>
    </div>
  )
}
