import {customTheme} from "./customTheme.ts"
import useTitle from "./hooks/useTitle.tsx"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import {ToastContainer} from "react-toastify"; 
import Layout from "./components/Layout.tsx"
import HomePage from "./pages/HomePage.tsx"
import NotFound from "./components/NotFound"
import Footer from "./components/Footer"
import "react-toastify/ReactToastify.min.css"
import RegisterPage from "./features/auth/pages/RegisterPage.tsx"
import VerifiedPage from "./features/auth/pages/VerifiedPage.tsx"
import LoginPage from "./features/auth/pages/LoginPage.tsx"
import Navbar from "./components/Navbar/index.tsx"
import { useSelector } from "react-redux"
import { RootState } from "./app/store.ts"
import ResendEmailTokenPage from "./features/auth/pages/ResendEmailTokenPage.tsx"
import PasswordResetRequestPage from "./features/auth/pages/PasswordResetRequestPage.tsx"
import PasswordResetPage from "./features/auth/pages/PasswordResetPage.tsx"
import AuthRequired from "./components/AuthRequired.tsx"
import { ROLES } from "./config/roles.ts"
import DashboardPage from "./pages/DashboardPage.tsx"
import UserListPage from "./features/users/pages/UserListPage.tsx"
import ProfilePage from "./features/users/pages/ProfilePage.tsx"
import EditProfileForm from "./features/users/pages/EditProfileForm.tsx"

function App() {
  useTitle("MERN Invoice - Home")
  const { user } = useSelector((state: RootState) => state.auth)
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="auth/verify" element={<VerifiedPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="resend" element={<ResendEmailTokenPage />} />
          <Route path="reset_password_request" element={<PasswordResetRequestPage />} />
          <Route path="auth/reset_password" element={<PasswordResetPage />} />
          {/* Private Routes - User*/}
          <Route element={<AuthRequired allowedRoles={[ROLES.User]} />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="edit-profile" element={<EditProfileForm />} />
          </Route>
          {/* Private Routes - Admin*/}
          <Route element={<AuthRequired allowedRoles={[ROLES.Admin]} />}>
            <Route path="users" element={<UserListPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer theme="dark" />
    </ThemeProvider>
  )
}

export default App
