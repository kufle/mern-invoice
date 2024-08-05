import { styled, TableRow } from "@mui/material";
import { ReactNode } from "react";

interface StyledTableRowProps {
    children: ReactNode;
}

const TableRowStyled = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

function StyledTableRow({ children }: StyledTableRowProps) {
  return <TableRowStyled>{children}</TableRowStyled>;
}

export default StyledTableRow