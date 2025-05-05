// components
import Hero from "@/components/home/hero";
import WhyUs from "@/components/home/whyus";
import Categories from "@/components/home/categories";
import PersonalisationServices from "@/components/home/personalisationServices";
import Blogs from "@/components/home/blogs";
import * as api from "@/services";
import GoogleReviews from "@/components/home/googleReviews";
export const revalidate = 60;
export default async function Home() {
  const data = await api.getHomeCategories();
  const { data: blogData } = await api.getHomeBlogs();

  return (
    <>
      <Hero />
      <WhyUs />
      <Categories data={data} />
      <PersonalisationServices />
      <Blogs data={blogData} />
      <GoogleReviews />
    </>
  );
}
