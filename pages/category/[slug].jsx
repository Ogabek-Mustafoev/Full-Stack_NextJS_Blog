import { getCategories, getCategoryPost } from "../../services";
import { Categories, Loader, PostCard } from '../../components';
import { useRouter } from "next/router";

export default function Category({ posts }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto lg:px-10 md:px-2 px-1 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-5 lg:top-20">
            <Categories />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-8">
          {posts.map(({ node }, idx) => (
            <PostCard key={idx} post={node} />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);
  return {
    props: { posts }
  }
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true
  }
}