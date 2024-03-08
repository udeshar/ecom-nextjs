import Layout from "@/components/layout/Layout";
import Container from "@/components/common/container/Container";
import Slider from "@/components/home/slider/Slider";
import OfferCard from "@/components/home/card/OfferCard";
import ProductList from "@/components/home/product-list/ProductList";
import styles from './styles.module.css'
import ExploreCategory from "@/components/home/explore-category/ExploreCategory";
import { PrismaClient, category, product } from "@prisma/client";
import { getAllCategories, getAllProducts } from "@/services/api";

interface Props {
  categories: category[];
  products: product[];
  faeturedProducts: product[];
  bestSeller: product[];
  offered: product[];
}

export default function Home({categories, products, bestSeller, faeturedProducts, offered} : Props) {
  return (
    <Layout>
      <Container className={"my-5 mt-8"}>
        <div className={"grid grid-cols-12 gap-5"}>
          <div
            className={"col-span-12 lg:col-span-8 bg-slate-100 dark:bg-slate-700 " + styles.offBanner}
          >
            <Slider featured={faeturedProducts} />
          </div>
          <div className="col-span-12 lg:col-span-4 h-auto md:h-56 lg:h-auto">
            <div className="flex flex-row lg:flex-col justify-between h-full gap-4 sm:gap-5">
              {
                bestSeller && bestSeller[0] && <OfferCard product={bestSeller[0]} />
              }
              {
                offered && offered[0] && <OfferCard product={offered[0]} />
              }
            </div>
          </div>
        </div>
        <ProductList products={products} bestSeller={bestSeller} featured={faeturedProducts} offered={offered} />
        <ExploreCategory categories={categories} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {

  const categories = await getAllCategories();
  const products = await getAllProducts();
  const faeturedProducts = await getAllProducts('featured=true');
  const bestSeller = await getAllProducts('bestSeller=true');
  const offered = await getAllProducts('offered=true');

  return {
    props: {
      categories : JSON.parse(JSON.stringify(categories)),
      products : JSON.parse(JSON.stringify(products)),
      faeturedProducts : JSON.parse(JSON.stringify(faeturedProducts)),
      bestSeller : JSON.parse(JSON.stringify(bestSeller)),
      offered : JSON.parse(JSON.stringify(offered))
    },
    revalidate: 30
  };
}
