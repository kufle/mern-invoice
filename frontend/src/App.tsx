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

function App() {
  useTitle("MERN Invoice - Home")
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="auth/verify" element={<VerifiedPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer theme="dark" />
    </ThemeProvider>
  )
}

export default App
