// import {} from 'react-export-table-to-excel'
import React, {useRef} from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import ImportStatisticNomal from './ImportStatisticNomal';
import { ImportStatistic } from '../../type/allType';

import { downloadExcel } from "react-export-table-to-excel";
import { Button, Space } from 'antd';
import {DeleteOutlined, DownOutlined, InfoCircleOutlined, StopOutlined} from '@ant-design/icons';


interface Props {
    imports: ImportStatistic[],
    onChange?: Function|undefined
}

const ExportExcelImportStatistic=(props:Props)=>{


const {imports}={...props}
    const tableRef = useRef(null);
    const header = ["Mã SP", "Tên sản phẩm",'Tổng đặt','Trả lại','Nhập kho','Số tiền thanh toán'];
  const body =imports.map((item)=>{

    return [item.code,item.name,item.importNumber,item.returnNumber,item.receiveNumber,item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')]
  })


  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Thống kê nhập sản phẩm ",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        body: body ,
      },
    });
  }
    return (
        <Button style={{  width: '150px', fontSize: '14px', marginRight: 20 ,marginLeft:0}} type="primary" onClick={handleDownloadExcel}>
                                                <Space>
                                                    <DownOutlined />
                                                    Xuất báo cáo
                                                </Space>
                                            </Button>
      );
    };
    



export default ExportExcelImportStatistic