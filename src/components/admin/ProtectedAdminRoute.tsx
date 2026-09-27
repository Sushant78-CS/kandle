import { type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import {
    isAdmin,
    subscribeToAuth,
} from "../../firebase/auth";

interface ProtectedAdminRouteProps {
    children: ReactNode;
}

export default function ProtectedAdminRoute({
    children,
}: ProtectedAdminRouteProps) {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeToAuth(
            async (user) => {
                if (!user) {
                    setAuthorized(false);
                    setLoading(false);
                    return;
                }

                try {
                    const admin = await isAdmin(user.uid);

                    setAuthorized(admin);
                } catch (error) {
                    console.error(
                        "Admin verification failed:",
                        error
                    );

                    setAuthorized(false);
                } finally {
                    setLoading(false);
                }
            }
        );

        return unsubscribe;
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8ecdc]">
                <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#7b421f] border-t-transparent" />

                    <p className="mt-3 text-sm text-[#78675b]">
                        Checking access...
                    </p>
                </div>
            </div>
        );
    }

    if (!authorized) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }

    return <>{children}</>;
}