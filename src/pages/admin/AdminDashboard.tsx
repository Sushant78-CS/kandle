import {
    LayoutDashboard,
    LogOut,
    Package,
    Plus,
    ShoppingBag,
} from "lucide-react";

import { logoutUser } from "../../firebase/auth"

export default function AdminDashboard() {
    const handleLogout = async () => {
        await logoutUser();
        window.location.href = "/admin/login";
    };

    return (
        <div className="min-h-screen bg-[#f8ecdc]">
            {/* HEADER */}

            <header className="border-b border-[#e5d6c5] bg-[#fffdf9]">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
                    <div>
                        <h1 className="font-serif text-2xl text-[#3d251b]">
                            Kanthi Candles
                        </h1>

                        <p className="text-xs text-[#806c5d]">
                            Admin Panel
                        </p>
                    </div>

                    <button
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
                        value="0"
                    />

                    <DashboardCard
                        icon={<ShoppingBag size={22} />}
                        title="Orders"
                        value="0"
                    />

                    <DashboardCard
                        icon={<ShoppingBag size={22} />}
                        title="Cart Items"
                        value="0"
                    />

                    <DashboardCard
                        icon={<LayoutDashboard size={22} />}
                        title="Active Products"
                        value="0"
                    />
                </div>

                {/* QUICK ACTIONS */}

                <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
                    <h3 className="font-serif text-2xl text-[#3d251b]">
                        Quick Actions
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 rounded-xl bg-[#7b421f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#633419]">
                            <Plus size={18} />
                            Add Product
                        </button>

                        <button className="flex items-center gap-2 rounded-xl border border-[#dfd0c0] px-5 py-3 text-sm font-semibold text-[#67391f] hover:bg-[#fffaf4]">
                            <Package size={18} />
                            Manage Products
                        </button>

                        <button className="flex items-center gap-2 rounded-xl border border-[#dfd0c0] px-5 py-3 text-sm font-semibold text-[#67391f] hover:bg-[#fffaf4]">
                            <ShoppingBag size={18} />
                            View Orders
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