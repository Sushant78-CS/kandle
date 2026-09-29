import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "./config";

export type ProductCategory = "Decorative" | "Gift" | "Floral" | "Aromatic";

export interface ProductData {
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  badge?: string;
  isActive: boolean;
}

export interface Product extends ProductData {
  id: string;
}

const productsCollection = collection(db, "products");

// ============================================================
// GET ALL PRODUCTS
// ============================================================

export async function getProducts(): Promise<Product[]> {
  try {
    const productsQuery = query(
      productsCollection,
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(productsQuery);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as ProductData),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// ============================================================
// ADD PRODUCT
// ============================================================

export async function addProduct(product: ProductData): Promise<string> {
  try {
    const document = await addDoc(productsCollection, {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("Product added:", document.id);

    return document.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

// ============================================================
// UPDATE PRODUCT
// ============================================================

export async function updateProduct(
  productId: string,
  product: Partial<ProductData>,
): Promise<void> {
  try {
    const productRef = doc(db, "products", productId);

    await updateDoc(productRef, {
      ...product,
      updatedAt: serverTimestamp(),
    });

    console.log("Product updated:", productId);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// ============================================================
// DELETE PRODUCT
// ============================================================

export async function deleteProduct(productId: string): Promise<void> {
  try {
    const productRef = doc(db, "products", productId);

    await deleteDoc(productRef);

    console.log("Product deleted:", productId);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// ============================================================
// ACTIVATE / DEACTIVATE PRODUCT
// ============================================================

export async function setProductActive(
  productId: string,
  isActive: boolean,
): Promise<void> {
  try {
    const productRef = doc(db, "products", productId);

    await updateDoc(productRef, {
      isActive,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error changing product status:", error);
    throw error;
  }
}
