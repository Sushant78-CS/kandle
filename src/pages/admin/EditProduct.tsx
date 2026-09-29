import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ImagePlus, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getProducts,
    updateProduct,
    type ProductData,
    type ProductCategory,
} from "../../firebase/products";

import { uploadImage } from "../../services/cloudinaryService"
import { toast } from "sonner";

type Product = ProductData & {
    id: string;
};

const categories: ProductCategory[] = [
    "Decorative",
    "Gift",
    "Floral",
    "Aromatic",
];

export default function EditProduct() {
    const navigate = useNavigate();
    const { productId } = useParams();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [existingImage, setExistingImage] = useState("");

    const [form, setForm] = useState({
        name: "",
        category: "Decorative" as ProductCategory,
        price: "",
        description: "",
        badge: "",
        isActive: true,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        const loadProduct = async () => {
            if (!productId) {
                navigate("/admin/products");
                return;
            }

            try {
                const products = await getProducts();

                const product = products.find(
                    (item) => item.id === productId
                ) as Product | undefined;

                if (!product) {
                    alert("Product not found.");
                    navigate("/admin/products");
                    return;
                }

                setForm({
                    name: product.name,
                    category: product.category,
                    price: String(product.price),
                    description: product.description,
                    badge: product.badge ?? "",
                    isActive: product.isActive,
                });

                setExistingImage(product.image);
                setImagePreview(product.image);
            } catch (error) {
                console.error("Failed to load product:", error);
                alert("Failed to load product.");
                navigate("/admin/products");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId, navigate]);

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleImageChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setImageFile(file);

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!productId) return;

        if (!form.name.trim()) {
            alert("Please enter a product name.");
            return;
        }

        if (!form.price || Number(form.price) <= 0) {
            alert("Please enter a valid price.");
            return;
        }

        if (!form.description.trim()) {
            alert("Please enter a product description.");
            return;
        }

        try {
            setSaving(true);

            let imageUrl = existingImage;

            // Upload a new image only if the admin selected one
            if (imageFile) {
                const uploaded = await uploadImage(imageFile);
                imageUrl = uploaded.secure_url;
            }

            await updateProduct(productId, {
                name: form.name.trim(),
                category: form.category,
                price: Number(form.price),
                description: form.description.trim(),
                badge: form.badge.trim() || undefined,
                image: imageUrl,
                isActive: form.isActive,
            });

            toast.success("Product updated successfully.");

            navigate("/admin/products");
        } catch (error) {
            console.error("Failed to update product:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to update product."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8ecdc]">
                <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#7b421f] border-t-transparent" />

                    <p className="mt-3 text-sm text-[#806c5d]">
                        Loading product...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8ecdc]">
            {/* HEADER */}
            <header className="border-b border-[#e5d6c5] bg-[#fffdf9]">
                <div className="mx-auto flex h-20 max-w-4xl items-center px-5 sm:px-8">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/products")}
                        className="flex items-center gap-2 text-sm font-medium text-[#75411f] transition hover:text-[#4f2d1a]"
                    >
                        <ArrowLeft size={17} />
                        Back to Products
                    </button>
                </div>
            </header>

            {/* CONTENT */}
            <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10">
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a765d]">
                        Admin
                    </p>

                    <h1 className="mt-2 font-serif text-4xl text-[#3d251b]">
                        Edit Product
                    </h1>

                    <p className="mt-2 text-sm text-[#806c5d]">
                        Update the details of your candle.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
                >
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* LEFT - IMAGE */}
                        <div>
                            <label className="text-sm font-semibold text-[#4d382c]">
                                Product Image
                            </label>

                            <div className="mt-3 overflow-hidden rounded-2xl border border-[#dfd0c0] bg-[#f8ecdc]">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt={form.name || "Product preview"}
                                        className="aspect-square w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex aspect-square items-center justify-center text-[#9a765d]">
                                        <div className="text-center">
                                            <ImagePlus
                                                size={35}
                                                className="mx-auto"
                                            />

                                            <p className="mt-2 text-sm">
                                                No image
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <label className="mt-4 flex cursor-pointer items-center justify-center rounded-xl border border-[#dfd0c0] bg-[#fffaf4] px-4 py-3 text-sm font-medium text-[#67391f] transition hover:bg-[#f8ecdc]">
                                <ImagePlus size={17} className="mr-2" />
                                Change Image

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>

                            <p className="mt-2 text-xs text-[#9a8a7e]">
                                Leave unchanged to keep the current image.
                            </p>
                        </div>

                        {/* RIGHT - DETAILS */}
                        <div className="space-y-5">
                            {/* NAME */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-[#4d382c]"
                                >
                                    Product Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffaf4] px-4 py-3 text-sm text-[#3d251b] outline-none transition focus:border-[#75411f] focus:ring-2 focus:ring-[#75411f]/10"
                                />
                            </div>

                            {/* CATEGORY */}
                            <div>
                                <label
                                    htmlFor="category"
                                    className="mb-2 block text-sm font-semibold text-[#4d382c]"
                                >
                                    Category
                                </label>

                                <select
                                    id="category"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffaf4] px-4 py-3 text-sm text-[#3d251b] outline-none focus:border-[#75411f]"
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* PRICE */}
                            <div>
                                <label
                                    htmlFor="price"
                                    className="mb-2 block text-sm font-semibold text-[#4d382c]"
                                >
                                    Price
                                </label>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#806c5d]">
                                        ₹
                                    </span>

                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="1"
                                        value={form.price}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffaf4] py-3 pl-8 pr-4 text-sm text-[#3d251b] outline-none focus:border-[#75411f]"
                                    />
                                </div>
                            </div>

                            {/* BADGE */}
                            <div>
                                <label
                                    htmlFor="badge"
                                    className="mb-2 block text-sm font-semibold text-[#4d382c]"
                                >
                                    Badge
                                    <span className="ml-1 font-normal text-[#9a8a7e]">
                                        (Optional)
                                    </span>
                                </label>

                                <input
                                    id="badge"
                                    name="badge"
                                    type="text"
                                    value={form.badge}
                                    onChange={handleChange}
                                    placeholder="Popular, New, Bestseller..."
                                    className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffaf4] px-4 py-3 text-sm text-[#3d251b] outline-none focus:border-[#75411f]"
                                />
                            </div>

                            {/* ACTIVE */}
                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#dfd0c0] bg-[#fffaf4] p-4">
                                <input
                                    type="checkbox"
                                    checked={form.isActive}
                                    onChange={(event) =>
                                        setForm((previous) => ({
                                            ...previous,
                                            isActive: event.target.checked,
                                        }))
                                    }
                                    className="h-4 w-4 accent-[#75411f]"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-[#4d382c]">
                                        Product is active
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#806c5d]">
                                        Active products are visible in the shop.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-8">
                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-semibold text-[#4d382c]"
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full resize-none rounded-xl border border-[#dfd0c0] bg-[#fffaf4] px-4 py-3 text-sm leading-6 text-[#3d251b] outline-none focus:border-[#75411f] focus:ring-2 focus:ring-[#75411f]/10"
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#eadbcb] pt-6 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            disabled={saving}
                            className="rounded-xl border border-[#dfd0c0] px-5 py-3 text-sm font-semibold text-[#67391f] transition hover:bg-[#f8ecdc] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#7b421f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#633419] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={17} />

                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}