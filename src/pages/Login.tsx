import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

import { loginUser } from "../firebase/auth";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (
        e: FormEvent
    ) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await loginUser(email, password);

            // If user was redirected to login from somewhere,
            // return them there. Otherwise go home.
            const from =
                (location.state as {
                    from?: string;
                })?.from || "/";

            navigate(from, {
                replace: true,
            });
        } catch (error: any) {
            console.error(
                "Login error:",
                error
            );

            switch (error?.code) {
                case "auth/invalid-credential":
                    setError(
                        "Invalid email or password."
                    );
                    break;

                case "auth/user-not-found":
                    setError(
                        "No account found with this email."
                    );
                    break;

                case "auth/wrong-password":
                    setError(
                        "Incorrect password."
                    );
                    break;

                case "auth/invalid-email":
                    setError(
                        "Please enter a valid email."
                    );
                    break;

                case "auth/too-many-requests":
                    setError(
                        "Too many login attempts. Please try again later."
                    );
                    break;

                default:
                    setError(
                        "Unable to login. Please try again."
                    );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f8ecdc] px-5">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

                {/* HEADER */}

                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7b421f] text-white">
                        <LockKeyhole size={25} />
                    </div>

                    <h1 className="font-serif text-3xl text-[#3d251b]">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-[#78675b]">
                        Login to your Kanthi Candles account
                    </p>
                </div>

                {/* FORM */}

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    {/* EMAIL */}

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
                            autoComplete="email"
                            required
                            className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffdf9] px-4 py-3 text-[#3d251b] outline-none transition placeholder:text-[#aa9685] focus:border-[#8a4b29] focus:ring-2 focus:ring-[#8a4b29]/10"
                        />
                    </div>

                    {/* PASSWORD */}

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-sm font-medium text-[#4d392d]">
                                Password
                            </label>

                            <button
                                type="button"
                                className="text-xs font-medium text-[#7b421f] hover:text-[#633419]"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Your password"
                            autoComplete="current-password"
                            required
                            className="w-full rounded-xl border border-[#dfd0c0] bg-[#fffdf9] px-4 py-3 text-[#3d251b] outline-none transition placeholder:text-[#aa9685] focus:border-[#8a4b29] focus:ring-2 focus:ring-[#8a4b29]/10"
                        />
                    </div>

                    {/* ERROR */}

                    {error && (
                        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* LOGIN */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-[#7b421f] py-3.5 font-semibold text-white transition hover:bg-[#633419] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>
                </form>

                {/* REGISTER */}

                <p className="mt-6 text-center text-sm text-[#78675b]">
                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-semibold text-[#7b421f] hover:text-[#633419]"
                    >
                        Create Account
                    </Link>
                </p>

            </div>
        </div>
    );
}