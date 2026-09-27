import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

import { loginUser, isAdmin } from "../../firebase/auth"

export default function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const user = await loginUser(email, password);

            const admin = await isAdmin(user.uid);

            if (!admin) {
                setError("You are not authorized as an admin.");
                return;
            }

            navigate("/admin");
        } catch (error: any) {
            console.error(error);

            setError(
                error?.message ||
                "Unable to login. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f8ecdc] px-5">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7b421f] text-white">
                        <LockKeyhole size={25} />
                    </div>

                    <h1 className="font-serif text-3xl text-[#3d251b]">
                        Admin Login
                    </h1>

                    <p className="mt-2 text-sm text-[#78675b]">
                        Kanthi Candles administration
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#4d392d]">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@kanthicandles.com"
                            required
                            className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-[#8a4b29]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#4d392d]">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-[#8a4b29]"
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
                        className="w-full rounded-xl bg-[#7b421f] py-3.5 font-semibold text-white transition hover:bg-[#633419] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}