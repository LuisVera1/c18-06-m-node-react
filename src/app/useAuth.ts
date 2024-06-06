import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";

const useAuth = () => {
    const { setUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
                router.push("/login");
            } else {
                try {
                    const response = await fetch("/api/auth/session", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    });

                    if (response.ok) {
                        const session = await response.json();
                        setUser(session.user);
                    } else {
                        localStorage.removeItem("user");
                        router.push("/login");
                    }
                } catch (error) {
                    console.error("Error checking session:", error);
                    localStorage.removeItem("user");
                    router.push("/login");
                }
            }
        };

        checkSession();
    }, [router, setUser]);
};

export default useAuth;
