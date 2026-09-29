import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    LogOut,
    Package,
    Plus,
} from "lucide-react";

import { logoutUser } from "../../firebase/auth";
import { getProducts } from "../../firebase/products";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [productCount, setProductCount] = useState(0);
    const [activeProductCount, setActiveProductCount] = useState(0);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        const loadDashboardStats = async () => {
            try {
                setLoadingStats(true);

                const products = await getProducts();

                setProductCount(products.length);

                const activeProducts = products.filter(
                    (product) => product.isActive
                );

                setActiveProductCount(activeProducts.length);
            } catch (error) {
                console.error("Failed to load dashboard stats:", error);
            } finally {
                setLoadingStats(false);
            }
        };

        loadDashboardStats();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/admin/login", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleAddProduct = () => {
        navigate("/admin/products/new");
    };

    const handleManageProducts = () => {
        navigate("/admin/products");
    };

    return (
        <div className="min-h-screen bg-[#f8ecdc]">
            {/* HEADER */}
            <header className="border-b border-[#e5d6c5] bg-[#fffdf9]">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
                    <div>
                        <h1 className="font-serif text-2xl text-[#3d251b]">
                            Kandle
                        </h1>

                        <p className="text-xs text-[#806c5d]">
                            Admin Panel
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl border border-[#dfd0c0] px-4 py-2 text-sm text-[#67391f] transition hover:bg-[#f8ecdc]"
                    >
                        <LogOut size={17} />
                        Logout
                    </button>
                </div>
            </header>

            {/* CONTENT */}
            <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
                <div className="mb-8">
                    <h2 className="font-serif text-4xl text-[#3d251b]">
                        Dashboard
                    </h2>

                    <p className="mt-2 text-[#766456]">
                        Manage your candles and orders.
                    </p>
                </div>

                {/* STATS */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <DashboardCard
                        icon={<Package size={22} />}
                        title="Products"
                        value={
                            loadingStats ? "..." : productCount.toString()
                        }
                    />

                    <DashboardCard
                        icon={<LayoutDashboard size={22} />}
                        title="Active Products"
                        value={
                            loadingStats
                                ? "..."
                                : activeProductCount.toString()
                        }
                    />
                </div>

                {/* QUICK ACTIONS */}
                <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
                    <h3 className="font-serif text-2xl text-[#3d251b]">
                        Quick Actions
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-3">
                        {/* ADD PRODUCT */}
                        <button
                            type="button"
                            onClick={handleAddProduct}
                            className="flex items-center gap-2 rounded-xl bg-[#7b421f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#633419]"
                        >
                            <Plus size={18} />
                            Add Product
                        </button>

                        {/* MANAGE PRODUCTS */}
                        <button
                            type="button"
                            onClick={handleManageProducts}
                            className="flex items-center gap-2 rounded-xl border border-[#dfd0c0] px-5 py-3 text-sm font-semibold text-[#67391f] transition hover:bg-[#fffaf4]"
                        >
                            <Package size={18} />
                            Manage Products
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

function DashboardCard({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8ecdc] text-[#7b421f]">
                {icon}
            </div>

            <p className="mt-4 text-sm text-[#806c5d]">
                {title}
            </p>

            <p className="mt-1 text-2xl font-semibold text-[#3d251b]">
                {value}
            </p>
        </div>
    );
}