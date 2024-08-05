import {Typography, Link, Box, CssBaseline} from "@mui/material"
import { FaMoneyBillWave } from "react-icons/fa";

const Copyright = () => {
    return (
        <Typography variant='body2' align='center' sx={{color: "#FFFFFF"}}>
            {"Copyright © "}
            <Link href="#" color='inherit'>
                MERN Invoice
            </Link>
            {new Date().getFullYear()}
        </Typography>
    )
}

function Footer() {
  return (
    <Box
        sx={{
            bgcolor: "#000000",
            marginTop: "auto",
        }}
        // className="footer"
    >
        <CssBaseline />

        <Box
            component="footer"
            sx={{
                py: 1,
                px: 1,
                mt: "auto",
                bgColor: "#000000",
            }}
        >
            <Typography
                variant="subtitle1"
                align="center"
                component="p"
                sx={{ color: "#07f011" }}
            >
                <FaMoneyBillWave /> Because Money is as important as oxygen!{" "}
                <FaMoneyBillWave />
            </Typography>
            <Copyright />
        </Box>
    </Box>
  )
}

export default Footer