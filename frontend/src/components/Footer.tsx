import {Typography, Link, Box, CssBaseline} from "@mui/material"
import { FaMoneyBillWave } from "react-icons/fa";

const CopyRight = () => {
    return (
        <Typography variant='body2' align='center' sx={{color: "#FFFFFF"}}>
            {"Copyright &copy;"}
            <Link href="#" color='inherit'>
                MERN Invoice
            </Link>
            {new Date().getFullYear()}
        </Typography>
    )
}

function Footer() {
  return (
    <Box sx={{position: 'fixed', bottom: 0, width: '100%'}}>
        <CssBaseline />
        <Box component="footer" sx={{
            py: 1,
            px: 1,
            mt: "auto",
            bgColor: "#000000",
        }}>
            <Typography
                variant="subtitle1"
                align="center"
                component="p"
                sx={{ color: "#07f011" }}
				>
                    <FaMoneyBillWave /> Because Money is as important as oxygen!{" "}
                    <FaMoneyBillWave />
            </Typography>
            <CopyRight />
        </Box>
    </Box>
  )
}

export default Footer