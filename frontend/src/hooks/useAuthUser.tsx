import { useSelector } from "react-redux"
import { decodeToken } from "react-jwt";
import { 
  selectCurrentUserToken, 
  selectCurrentUserGoogleToken 
} from "../features/auth/authSlice"

interface DecodedToken {
  roles: string[]; // Atau tipe yang sesuai dengan struktur token Anda
  // Tambahkan properti lain sesuai kebutuhan
}

const useAuthUser = () => {
  const token = useSelector(selectCurrentUserToken);
  const googleToken = useSelector(selectCurrentUserGoogleToken);

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
  } else if (googleToken) {
    const gDecodedToken = decodeToken<DecodedToken>(googleToken);

    if (gDecodedToken) {
      const { roles } = gDecodedToken;

      isAdmin = roles.includes("Admin");

      if (isAdmin) accessRight = "Admin";

      return { roles, isAdmin, accessRight };
    }
  }

  return {roles: [], isAdmin, accessRight};
}

export default useAuthUser;
