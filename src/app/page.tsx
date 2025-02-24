// components
import Hero from '@/components/home/hero';
import WhyUs from '@/components/home/whyus';
import OurClothes from '@/components/home/ourClothes';
import PersonalisationServices from '@/components/home/personalisationServices';
import ChooseUs from '@/components/home/chooseUs';
import * as api from '@/services';

export default async function Home() {
  const data = await api.getHomeCategories();
  const { data: blogData } = await api.getHomeBlogs();

  return (
    <>
      <Hero />
      <WhyUs />
      <OurClothes data={data} />
      <PersonalisationServices />
      <ChooseUs data={blogData} />
    </>
  );
}
