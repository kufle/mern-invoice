import { Box } from '@mui/material'
import { ReactNode } from 'react';

interface AuthWrapperProps {
    children: ReactNode;
}

function AuthWrapper({children}: AuthWrapperProps) {
  return (
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "115vh",
        }}
    >
        {children}
    </Box>
  )
}

export default AuthWrapper