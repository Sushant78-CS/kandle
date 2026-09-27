import { useEffect, useState } from "react";
import {
    Edit3,
    Eye,
    EyeOff,
    Plus,
    Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    deleteProduct,
    getProducts,
    setProductActive,
    type ProductData,
} from "../../firebase/products"

interface Product extends ProductData {
    id: string;
}

export default function AdminProducts() {
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) return;

        try {
            await deleteProduct(id);

            setProducts((previous) =>
                previous.filter(
                    (product) => product.id !== id
                )
            );
        } catch (error) {
            console.error(error);
            alert("Failed to delete product.");
        }
    };

    const handleToggle = async (
        product: Product
    ) => {
        try {
            await setProductActive(
                product.id,
                !product.isActive
            );

            setProducts((previous) =>
                previous.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            isActive: !item.isActive,
                        }
                        : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8ecdc]">
            <header className="border-b border-[#e5d6c5] bg-[#fffdf9]">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
                    <div>
                        <h1 className="font-serif text-2xl text-[#3d251b]">
                            Products
                        </h1>

                        <p className="text-xs text-[#806c5d]">
                            Manage your candle collection
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/admin/products/new")}
                        className="flex items-center gap-2 rounded-xl bg-[#7b421f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#633419]"
                    >
                        <Plus size={18} />
                        Add Product
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
                {loading ? (
                    <div className="py-20 text-center text-[#806c5d]">
                        Loading products...
                    </div>
                ) : products.length === 0 ? (
                    <div className="rounded-3xl bg-white p-12 text-center">
                        <h2 className="font-serif text-2xl text-[#3d251b]">
                            No products yet
                        </h2>

                        <p className="mt-2 text-sm text-[#806c5d]">
                            Add your first handmade candle.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/admin/products/new")
                            }
                            className="mt-5 rounded-xl bg-[#7b421f] px-5 py-3 text-sm font-semibold text-white"
                        >
                            Add Product
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`overflow-hidden rounded-2xl bg-white shadow-sm ${!product.isActive
                                    ? "opacity-60"
                                    : ""
                                    }`}
                            >
                                <div className="relative aspect-square">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />

                                    {product.badge && (
                                        <span className="absolute left-3 top-3 rounded-full bg-[#7b421f] px-3 py-1 text-xs font-semibold text-white">
                                            {product.badge}
                                        </span>
                                    )}

                                    {!product.isActive && (
                                        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                                            Hidden
                                        </span>
                                    )}
                                </div>

                                <div className="p-4">
                                    <p className="text-xs uppercase tracking-wider text-[#9a765d]">
                                        {product.category}
                                    </p>

                                    <h3 className="mt-1 font-serif text-xl text-[#3d251b]">
                                        {product.name}
                                    </h3>

                                    <p className="mt-2 font-semibold text-[#7b421f]">
                                        ₹{product.price}
                                    </p>

                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() =>
                                                handleToggle(product)
                                            }
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#dfd0c0] py-2 text-xs text-[#67391f]"
                                        >
                                            {product.isActive ? (
                                                <>
                                                    <EyeOff size={15} />
                                                    Hide
                                                </>
                                            ) : (
                                                <>
                                                    <Eye size={15} />
                                                    Show
                                                </>
                                            )}
                                        </button>

                                        <button
                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfd0c0] text-[#67391f]"
                                        >
                                            <Edit3 size={15} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}