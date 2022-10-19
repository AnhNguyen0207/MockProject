import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {Button, Space} from "antd";
import React from "react";
import {PDFViewer, PDFDownloadLink} from "@react-pdf/renderer";
import PDFImportFile from "./PDFImportFile";

import {IDetailImportInvoice} from "../../services/customType";
import {DownloadOutlined} from "@ant-design/icons";

type Props = {
    createDate: string,
    importDate: string,
    fullName:string,
    phoneNumber:string
    invoice: IDetailImportInvoice,
    updateStatusImportWarehouse:()=>void
}
const ImportWarehouse = ({invoice, createDate, importDate,fullName,phoneNumber,updateStatusImportWarehouse}: Props) => {
    return (
        <div className="block" style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{padding: 20, paddingBottom: 5, paddingTop: 0}}>
                <p style={invoice.anImport.isImport ? {
                    marginBottom: 0,
                    fontSize: "16px",
                    paddingTop: 20
                } : {marginBottom: 0, fontSize: "16px"}}>
                    <b style={{display: 'flex', alignItems: 'center'}}>
                        <span
                            style={{marginRight: 3, display: 'flex', alignItems: 'center'}}><LocalShippingIcon/></span>
                        Nhập kho
                    </b>
                </p>
                {
                    invoice.anImport.isImport && (
                        <p style={{marginTop: 10}}>
                            <b style={{color: '#1890ff'}}>
                                Xác nhận nhập kho thành công
                            </b>
                        </p>
                    )
                }

            </div>
            <div style={{padding: 20}}>
                {
                    invoice.anImport.isImport && createDate !== '' ? (
                        <>
                            <PDFDownloadLink document={<PDFImportFile createDate={createDate} importDate={importDate} fullName={fullName} phoneNumber={phoneNumber}
                                                                      invoice={invoice}/>} fileName={ "phieuNhapKho - " +invoice.anImport.code +".pdf"}>
                                {({blob, url, loading, error}) =>
                                    loading ?
                                        <Button type='primary'>Nhập kho</Button> :
                                        <Button type='primary'> <Space>
                                            <DownloadOutlined/>
                                            In phiếu nhập kho
                                        </Space></Button>
                                }
                            </PDFDownloadLink>

                        </>
                    ) : (
                        <Button onClick={updateStatusImportWarehouse} type='primary'>Nhập kho</Button>
                    )
                }
            </div>
        </div>
    )
}
export default ImportWarehouse