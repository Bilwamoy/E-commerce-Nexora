import { Product } from "@/types";
import productsData from "./products.json" assert { type: "json" };

export const products: Product[] = productsData as Product[]; 