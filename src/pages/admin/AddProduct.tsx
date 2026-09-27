import { type FormEvent, useState } from "react";
import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    addProduct,
    type ProductCategory,
} from "../../firebase/products"

import { uploadImage } from "../../services/cloudinaryService";

const categories: ProductCategory[] = [
    "Decorative",
    "Gift",
    "Floral",
    "Aromatic",
];

export default function AddProduct() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [category, setCategory] =
        useState<ProductCategory>("Decorative");

    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [badge, setBadge] = useState("");

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImage(file);

        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (
        e: FormEvent
    ) => {
        e.preventDefault();

        setError("");

        if (!image) {
            setError("Please select a product image.");
            return;
        }

        if (!name.trim()) {
            setError("Product name is required.");
            return;
        }

        if (!price || Number(price) <= 0) {
            setError("Please enter a valid price.");
            return;
        }

        setLoading(true);

        try {
            // 1. Upload image
            const uploadedImage =
                await uploadImage(image);

            // 2. Save product
            await addProduct({
                name: name.trim(),
                category,
                price: Number(price),
                description: description.trim(),
                image: uploadedImage.secure_url,
                badge: badge.trim() || undefined,
                isActive: true,
            });

            navigate("/admin/products");
        } catch (error: any) {
            console.error(error);

            setError(
                error?.message ||
                "Something went wrong while adding the product."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8ecdc]">
            <header className="border-b border-[#e5d6c5] bg-[#fffdf9]">
                <div className="mx-auto flex h-20 max-w-6xl items-center px-5 sm:px-8">
                    <button
                        onClick={() => navigate("/admin/products")}
                        className="mr-4 rounded-xl p-2 text-[#67391f] hover:bg-[#f8ecdc]"
                    >
                        <ArrowLeft size={21} />
                    </button>

                    <div>
                        <h1 className="font-serif text-2xl text-[#3d251b]">
                            Add Product
                        </h1>

                        <p className="text-xs text-[#806c5d]">
                            Add a new candle to your shop
                        </p>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
                <form
                    onSubmit={handleSubmit}
                    className="grid gap-8 lg:grid-cols-[1fr_1.3fr]"
                >
                    {/* IMAGE */}

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="font-serif text-2xl text-[#3d251b]">
                            Product Image
                        </h2>

                        <label className="mt-5 flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#d8c4af] bg-[#fffaf4]">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <>
                                    <ImagePlus
                                        size={40}
                                        className="text-[#9a775c]"
                                    />

                                    <p className="mt-3 text-sm font-medium text-[#674b38]">
                                        Click to upload image
                                    </p>

                                    <p className="mt-1 text-xs text-[#9a8170]">
                                        PNG, JPG or WEBP · Max 5MB
                                    </p>
                                </>
                            )}

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* FORM */}

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="font-serif text-2xl text-[#3d251b]">
                            Product Details
                        </h2>

                        <div className="mt-6 space-y-5">
                            <Input
                                label="Product Name"
                                value={name}
                                onChange={setName}
                                placeholder="Blue Coconut Bloom"
                            />

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#4d392d]">
                                    Category
                                </label>

                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(
                                            e.target.value as ProductCategory
                                        )
                                    }
                                    className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffdf9] px-4 py-3 outline-none focus:border-[#8a4b29]"
                                >
                                    {categories.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                label="Price"
                                value={price}
                                onChange={setPrice}
                                placeholder="499"
                                type="number"
                            />

                            <Input
                                label="Badge"
                                value={badge}
                                onChange={setBadge}
                                placeholder="Bestseller"
                            />

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#4d392d]">
                                    Description
                                </label>

                                <textarea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Beautiful handmade candle..."
                                    rows={5}
                                    className="w-full resize-none rounded-xl border border-[#dfd0c0] bg-[#fffdf9] px-4 py-3 outline-none focus:border-[#8a4b29]"
                                />
                            </div>

                            {error && (
                                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7b421f] py-3.5 font-semibold text-white transition hover:bg-[#633419] disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <Loader2
                                            size={18}
                                            className="animate-spin"
                                        />
                                        Adding Product...
                                    </>
                                ) : (
                                    "Add Product"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

function Input({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type?: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-[#4d392d]">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffdf9] px-4 py-3 outline-none focus:border-[#8a4b29]"
            />
        </div>
    );
}