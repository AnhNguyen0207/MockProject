import {Link, useNavigate} from "react-router-dom";
import {default as NumberFormat} from 'react-number-format';
import React from "react";
import {ColumnProps} from "antd/es/table";
import {IHistoryStatus, IImportInvoice, IImportInvoiceBySupplier, IMyTableData} from "../services/customType";
import {Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import moment from "moment/moment";


export const SupplierColumn = [
    {
        title: 'Mã nhà cung cấp',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Tên nhà cung cấp',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: "email",
        key: "email"
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "phone"
    },
    {
        title: "Trạng thái",
        dataIndex: "statusTransaction",
        key: "status",
        render: (status: boolean) => {
            return status ? <p style={{color: 'blue'}}>Đang giao dịch</p> :
                <p style={{color: 'red'}}>Ngừng giao dịch</p>
        },


    }
];

export const ImportInvoiceColumn: ColumnProps<IImportInvoice>[] = [
    {
        title: 'Mã đơn',
        dataIndex: 'code',
        key: 'code',
        render: (value: string) => {
            return <Link to='#'>{value}</Link>
        },
    },
    {
        title: 'Mã nhà cung cấp',
        dataIndex: 'supplierCode',
        key: 'supplierCode',
    },
    {
        title: 'Kho',
        dataIndex: "inventoryName",
        key: "inventoryName"
    },
    {
        title: "Trạng thái",
        dataIndex: "isDone",
        key: "isDone",
        render: (status: boolean) => {
            return status ? <p style={{color: '#20a917', margin: 0}}>Hoàn thành</p> :
                <p style={{color: '#f19403', margin: 0}}>Đang giao dịch</p>
        },
    },
    {
        title: "Thanh toán",
        dataIndex: "isPaid",
        key: "isDone",
        render: (status: boolean) => {
            return status ? <p style={{color: '#20a917', margin: 0}}>Đã thanh toán</p> :
                <p style={{color: '#0a77bb', margin: 0}}>Chưa thanh toán</p>
        },
    },
    {
        title: "Nhập kho",
        dataIndex: "isImport",
        key: "isImport",
        render: (status: boolean, row) => {
            if (row.isReturn) {
                return <p style={{color: 'black', margin: 0}}>Hoàn trả hàng</p>
            } else {
                return status ? <p style={{color: '#20a917', margin: 0}}>Đã nhập hàng</p> :
                    <p style={{color: '#0a77bb', margin: 0}}>Chờ nhập hàng</p>
            }
        },
    },
    {
        title: "Nhập kho",
        dataIndex: "isReturn",
        key: "isReturn",
    },
    {
        title: "Tổng tiền",
        dataIndex: "totalPrice",
        key: "totalPrice",
        align: 'right',
        render: (value: number) => {
            return <NumberFormat value={value} displayType='text' thousandSeparator={true}/>
        }
    },
    {
        title: "Nhân viên tạo",
        dataIndex: "userName",
        key: "userName",
        align: 'right',
    },
    {
        title: "Ngày hẹn giao",
        dataIndex: "deliveryDate",
        key: "deliveryDate",
        align: 'right',
        render: (value: string) => {
            return value === '0' ? "----" : value
        }
    },
];
export const columnsDetailImportInvoice = [
    {
        title: 'Mã SKU',
        key: "code",
        dataIndex: 'productVariant',
        width: '15%',
        render: (data: IMyTableData) => <p>{data?.code}</p>,
    },
    {
        title: 'Tên sản phẩm',
        key: "name",
        dataIndex: 'productVariant',
        width: '35%',
        render: (data: IMyTableData) => <p>{data?.name}</p>,

    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: "quantity",
        width: '15%',
        render: (data: number) => (
            <NumberFormat displayType='text' value={data} thousandSeparator={true}/>
        )
    },
    {
        title: 'Giá',
        dataIndex: 'importPrice',
        key: "importPrice",
        render: (data: number) => (
            <NumberFormat value={data} thousandSeparator={true} displayType='text'/>
        ),
        width: '15%'
    },
    {
        title: 'Thành tiền',
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (data: number) =>
            (
                <NumberFormat value={data} thousandSeparator={true} displayType='text'/>
            ),
        width: '20%'
    },
];

export const columnsHistoryStatus: ColumnProps<IHistoryStatus>[] = [
    {
        title: 'Người thao tác',
        key: "fullName",
        dataIndex: 'fullName',

    },
    {
        title: 'Chức năng',
        key: "statusName",
        dataIndex: 'statusName',
    },
    {
        title: 'Thao tác',
        key: "statusDesc",
        dataIndex: 'statusDesc',
    },
    {
        title: 'Thời gian',
        key: "createdAt",
        dataIndex: 'createdAt',
        render: (data: string) => {
            const moment = require('moment');
            const d = new Date(data);
            return <p>{moment(d, ["hh:mm A"]).format('DD/MM/YYYY HH:mm:ss')}</p>;
        }
    },
];



export const ImportInvoiceColumnBySupplier: ColumnProps<IImportInvoiceBySupplier>[] = [
    {
        title: 'Mã đơn',
        dataIndex: 'code',
        key: 'code',
        render: (value: string) => {
            return <Link to='#'>{value}</Link>
        },
    },
    {
        title: 'Kho',
        dataIndex: "inventoryName",
        key: "inventoryName"
    },
    {
        title: "Trạng thái",
        dataIndex: "isDone",
        key: "isDone",
        render: (status: boolean) => {
            return status ? <p style={{color: '#20a917', margin: 0}}>Hoàn thành</p> :
                <p style={{color: '#f19403', margin: 0}}>Đang giao dịch</p>
        },
    },
    {
        title: "Thanh toán",
        dataIndex: "isPaid",
        key: "isDone",
        render: (status: boolean) => {
            return status ? <p style={{color: '#20a917', margin: 0}}>Đã thanh toán</p> :
                <p style={{color: '#0a77bb', margin: 0}}>Chưa thanh toán</p>
        },
    },
    {
        title: "Nhập kho",
        dataIndex: "isImport",
        key: "isImport",
        render: (status: boolean, row) => {
            if (row.isReturn) {
                return <p style={{color: 'black', margin: 0}}>Hoàn trả hàng</p>
            } else {
                return status ? <p style={{color: '#20a917', margin: 0}}>Đã nhập hàng</p> :
                    <p style={{color: '#0a77bb', margin: 0}}>Chờ nhập hàng</p>
            }
        },
    },
    {
        title: "Nhập kho",
        dataIndex: "isReturn",
        key: "isReturn",
    },
    {
        title: "Tổng tiền",
        dataIndex: "totalPrice",
        key: "totalPrice",
        align: 'right',
        render: (value: number) => {
            return <NumberFormat value={value} displayType='text' thousandSeparator={true}/>
        }
    },
    {
        title: "Ngày tạo đơn",
        dataIndex: "first",
        key: "first",
        align: 'right',
        render: (data: string) => {
            const moment = require('moment');
            const d = new Date(data);
            return <p>{moment(d, ["hh:mm A"]).format('DD/MM/YYYY HH:mm:ss')}</p>;
        }
    },
    {
        title: "Cập nhập cuối",
        dataIndex: "last",
        key: "last",
        align: 'right',
        render: (data: string) => {
            const moment = require('moment');
            const d = new Date(data);
            return <p>{moment(d, ["hh:mm A"]).format('DD/MM/YYYY HH:mm:ss')}</p>;
        }
    },
];