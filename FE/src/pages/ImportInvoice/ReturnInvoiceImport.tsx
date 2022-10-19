import {IDetailImportInvoice, IImportReturn} from "../../services/customType";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {Button, Space} from "antd";
import React from "react";
import moment from "moment/moment";
import {default as NumberFormat} from "react-number-format";
import PDFReturnImportInvoice from "./PDFReturnImportInvoice";
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import PrintIcon from '@mui/icons-material/Print';
import {Link} from "react-router-dom";

type Props = {
    returnInvoice: IImportReturn[],
    invoice: IDetailImportInvoice
}
const ReturnInvoiceImport = ({returnInvoice, invoice}: Props) => {

    return (
        <>
            {
                invoice.anImport.isImport && (
                    <div className="block" style={{
                        padding: 0,
                    }}>
                        <div style={{
                            padding: '10px 20px 30px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <p style={{marginBottom: 0, fontSize: "16px"}}>
                                <b style={{display: 'flex', alignItems: 'center'}}>
                                      <span style={{marginRight: 3, display: 'flex', alignItems: 'center'}}>
                                          <AssignmentReturnIcon/>
                                      </span>
                                    Hoàn trả
                                </b>
                            </p>
                            {
                                invoice.anImport.isImport && (
                                    <>
                                        <Link to={`/coordinator/purchase_orders/return/${invoice.anImport.code}`}>
                                            <Button type={"primary"} style={{marginTop: 10, marginBottom: 10}}>
                                                Hoàn trả
                                            </Button>
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                        {
                            invoice.anImport.isReturn && <hr style={{margin: 0}}/>
                        }
                        <div style={{borderLeft: '1px solid #bebbbb', marginLeft: 20}}>
                            {
                                invoice.anImport.isReturn && returnInvoice.length > 0 ? (
                                    <div>
                                        <div>
                                            {
                                                returnInvoice.reverse().map((obj, index) => (
                                                    <div key={index} style={{
                                                        borderBottom: '1px solid #bebbbb',
                                                        paddingTop: 11,
                                                        paddingBottom: 11,
                                                        paddingLeft: 20
                                                    }}>
                                                        <PDFDownloadLink
                                                            fileName={"phieuTraHang - " + moment(obj.createDate).format('DD/MM/YYYY HH:mm:ss') + ".pdf"}
                                                            document={<PDFReturnImportInvoice invoice={invoice}
                                                                                              returnInvoice={obj}/>}>
                                                            {({blob, url, loading, error}) =>
                                                                <Button style={{
                                                                    marginTop: 15,
                                                                    marginBottom: 15,
                                                                    border: 'none',
                                                                    padding: 0
                                                                }} type='default'> <Space>
                                                                    <PrintIcon style={{position: 'relative', top: 3}}/>
                                                                    In phiếu trả hàng
                                                                </Space></Button>
                                                            }
                                                        </PDFDownloadLink>
                                                        <div>
                                                            <p>Nhân viên tạo đơn: <span>{obj.fullName} | {obj.phoneNumber}</span></p>
                                                        </div>
                                                        <div>
                                                            <p>Tổng giá trị trả hàng: <span><NumberFormat
                                                                value={obj.totalPrice} displayType='text'
                                                                thousandSeparator={true}/></span></p>
                                                        </div>
                                                        <div>
                                                            <p>Ngày
                                                                trả: <span>{moment(obj.createDate).format('DD/MM/YYYY HH:mm:ss')}</span>
                                                            </p>
                                                        </div>
                                                        <p>Sản phẩm: </p>
                                                        {
                                                            obj.detailsReturnImportResponseList.map((data, key) => (
                                                                <div key={key}>
                                                                    <p>{data.name} x {data.quantity}</p>
                                                                </div>
                                                            ))
                                                        }

                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>

    )
}
export default ReturnInvoiceImport