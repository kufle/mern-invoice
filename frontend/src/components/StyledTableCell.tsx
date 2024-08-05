import { ReactNode } from 'react';
import { styled, TableCell, tableCellClasses } from '@mui/material';

interface StyledTableCellProps {
    children: ReactNode;
}

const TableCellStyled = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 15,
	},
}));

function StyledTableCell({children}: StyledTableCellProps) {
  return <TableCellStyled>{children}</TableCellStyled>;
}

export default StyledTableCell