import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

import { registerUser } from "../firebase/auth"

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (
        e: FormEvent
    ) => {
        e.preventDefault();

        setError("");

        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        setLoading(true);

        try {
            const user = await registerUser(
                name,
                email,
                password
            );

            console.log("Created user:", user.uid);

            navigate("/");
        } catch (error: any) {
            console.error(error);

            switch (error?.code) {
                case "auth/email-already-in-use":
                    setError(
                        "An account with this email already exists."
                    );
                    break;

                case "auth/invalid-email":
                    setError("Please enter a valid email.");
                    break;

                case "auth/weak-password":
                    setError("Password is too weak.");
                    break;

                default:
                    setError(
                        "Unable to create your account."
                    );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f8ecdc] px-5">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7b421f] text-white">
                        <UserPlus size={25} />
                    </div>

                    <h1 className="font-serif text-3xl text-[#3d251b]">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-[#78675b]">
                        Join the Kanthi Candles family
                    </p>
                </div>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#4d392d]">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Your name"
                            required
                            className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffdf9] px-4 py-3 outline-none focus:border-[#8a4b29]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#4d392d]">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffdf9] px-4 py-3 outline-none focus:border-[#8a4b29]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#4d392d]">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Minimum 6 characters"
                            required
                            className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffdf9] px-4 py-3 outline-none focus:border-[#8a4b29]"
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
                        className="w-full rounded-xl bg-[#7b421f] py-3.5 font-semibold text-white transition hover:bg-[#633419] disabled:opacity-60"
                    >
                        {loading
                            ? "Creating account..."
                            : "Create Account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-[#78675b]">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-[#7b421f]"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}