import { Inter } from "next/font/google";
import Navbar from "@/components/common/navbar/Navbar";
import ToggleTheme from "@/components/common/theme/ToggleTheme";
import Layout from "@/components/layout/Layout";
import CustomInput from "@/components/common/custom-input/CustomInput";
import Container from "@/components/common/container/Container";
import img from "@/assets/images/headphone.png";
import Image from "next/image";
import Slider from "@/components/home/slider/Slider";
import OfferCard from "@/components/home/card/OfferCard";
import ProductList from "@/components/home/product-list/ProductList";
import styles from './styles.module.css'
import ExploreCategory from "@/components/home/explore-category/ExploreCategory";
import { PrismaClient, category, product } from "@prisma/client";

interface Props {
  categories: category[];
  products: product[];
}

export default function Home({categories, products} : Props) {
  console.log(categories);
  return (
    <Layout>
      <Container className={"my-5 mt-8"}>
        <div className={"grid grid-cols-12 gap-5"}>
          <div
            className={"col-span-12 lg:col-span-8 bg-slate-100 dark:bg-slate-700 " + styles.offBanner}
          >
            <Slider />
          </div>
          <div className="col-span-12 lg:col-span-4 h-auto md:h-56 lg:h-auto">
            <div className="flex flex-row lg:flex-col justify-between h-full gap-4 sm:gap-5">
              <OfferCard />
              <OfferCard />
            </div>
          </div>
        </div>
        <ProductList products={products} />
        <ExploreCategory categories={categories} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const categories = await prisma.category.findMany()
  const products = await prisma.product.findMany()
  return {
    props: {
      categories : JSON.parse(JSON.stringify(categories)),
      products : JSON.parse(JSON.stringify(products))
    },
  };
}
