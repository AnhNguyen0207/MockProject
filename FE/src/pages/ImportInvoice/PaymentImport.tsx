import PaymentIcon from "@mui/icons-material/Payment";
import NumberFormat from "react-number-format";
import {Button} from "antd";
import React from "react";

type Props = {
    total: number,
    isPaid: boolean
    updateStatusPaidPayment: () =>void
}
const PaymentImport = ({total, isPaid,updateStatusPaidPayment}: Props) => {
    return (
        <div className="block" style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{padding: 20, paddingBottom: 5}}>
                <p style={{marginBottom: 0, fontSize: "16px"}}>
                    <b style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginRight: 3, display: 'flex', alignItems: 'center'}}><PaymentIcon/></span>
                        Thanh toán
                    </b></p>
                <p style={{marginTop: 10}}>
                    {
                        isPaid ? (
                            <b style={{color:'#1890ff'}}>
                                Xác nhận thanh toán:
                                <span style={{marginRight:5,marginLeft:5}}>
                                    <NumberFormat value={total} thousandSeparator={true} displayType='text'/>
                                </span>
                                thành công
                            </b>
                        ) : (
                            <span>Số tiền phải trả: <NumberFormat value={total} thousandSeparator={true} displayType='text'/></span>
                        )
                    }
                </p>
            </div>
            {
                !isPaid && (
                    <div style={{padding: 20}}>
                        <Button  onClick={updateStatusPaidPayment} type='default'>Thanh toán</Button>
                    </div>
                )
            }
        </div>
    )
}
export default PaymentImport