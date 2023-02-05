import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  }
};

export default function FeaturedPosts() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts()
      .then(res => {
        setFeaturedPosts(res);
        setDataLoaded(true);
      });
  }, []);

  return (
    <div className='mb-8 mt-20 container mx-auto'>
      <Carousel
        showDots={true} autoPlay={true}
        autoPlaySpeed={3000} infinite
        responsive={responsive} itemClass="px-4"
      >
        {dataLoaded && featuredPosts.map((post, idx) => (
          <FeaturedPostCard key={idx} post={post} />
        ))}
      </Carousel>
    </div>
  )
}
