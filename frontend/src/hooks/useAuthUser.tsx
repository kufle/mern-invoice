import { useSelector } from "react-redux"
import { decodeToken } from "react-jwt";
import { selectCurrentUserToken } from "../features/auth/authSlice"

interface DecodedToken {
  roles: string[]; // Atau tipe yang sesuai dengan struktur token Anda
  // Tambahkan properti lain sesuai kebutuhan
}

const useAuthUser = () => {
  const token = useSelector(selectCurrentUserToken);

  let isAdmin = false;

  let accessRight = "User";

  if (token) {
    const decodedToken = decodeToken<DecodedToken>(token);
    
    if (decodedToken) {
      const { roles } = decodedToken;

      isAdmin = roles.includes("Admin")

      if (isAdmin) accessRight = "Admin";

      return {roles, isAdmin, accessRight};
    }
    
  }

  return {roles: [], isAdmin, accessRight};
}

export default useAuthUser;
