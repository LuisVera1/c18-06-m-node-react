import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

const useAuthRedirect = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirige a la página de login si no hay un usuario
    }
  }, [user, router]); // Ejecuta el efecto cuando el usuario o el router cambian
};

export default useAuthRedirect;
