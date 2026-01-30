import { getProducts } from "@/lib/shopify";
import { HomeClient } from "./home-client";

export default async function Home() {
  let products: any[] = [];
  try {
    products = (await getProducts({})).slice(0, 4);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return <HomeClient products={products} />;
}
