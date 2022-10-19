import * as Antd from 'antd'

import * as Mui from '@mui/material'
import { useTheme } from '@mui/material';
import { ArrowLeft, ArrowRight, FirstPage, LastPage } from '@mui/icons-material';


const ProductPagination = (props: any) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 1);
    
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(1, Math.ceil(count / rowsPerPage) ));
  };

  return (
    <Mui.Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <Mui.IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 1}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </Mui.IconButton>
      <Mui.IconButton
        onClick={handleBackButtonClick}
        disabled={page === 1}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <ArrowRight /> : <ArrowLeft />}
      </Mui.IconButton>
      <Mui.IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage)}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <ArrowLeft /> : <ArrowRight />}
      </Mui.IconButton>
      <Mui.IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) }
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </Mui.IconButton>
    </Mui.Box>
  )
}
export default ProductPagination