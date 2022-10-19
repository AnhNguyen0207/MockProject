import {IDetailImportInvoice} from "../../services/customType";
import {Document, Font, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import React, {Fragment} from "react";
import {exportById, exportStatus, typeDetailExport} from "../type/data_type";
import moment from "moment";

type Props ={
    statusExport: exportStatus,
    anExport:exportById,
    detailExport:typeDetailExport[],
    accountCreate:any;
}
const PDFStockTransfer = ({statusExport,anExport,detailExport,accountCreate}:Props) =>{
    Font.register({
        family: "Roboto",
        src:
            "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
    });

    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Roboto',
            fontSize: 11,
            paddingTop: 30,
            paddingLeft:60,
            paddingRight:60,
            lineHeight: 1.5,
            flexDirection: 'column',
        }
    });
    const stylesInvoiceTitle = StyleSheet.create({
        titleContainer:{
            flexDirection: 'row',
            marginTop: 20,
            borderBottom:'1px solid #dfdcdc',
            paddingBottom:"20",
        },
        reportTitle:{
            color: 'black',
            letterSpacing: 4,
            fontSize: 25,
            textAlign: 'justify',
            textTransform: 'uppercase',
        }
    });
    const stylesInvoiceNo = StyleSheet.create({
        container:{
            borderBottom:'1px solid #dfdcdc',
            paddingBottom:"20",
        },
        invoiceNoContainer: {
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'flex-start',
        },
        invoiceDateContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },
        invoiceDate: {
            fontSize: 12,
            width:120
        },
        label: {
            width: 90
        }

    });

    const stylesSupplierInfo = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent:'space-between',
            borderBottom:'1px solid #dfdcdc',
            paddingBottom:20,
        },
        headerContainer: {
            marginTop: 20,
        },
        billTo: {
            fontWeight:"bold",
            paddingBottom: 3,
        },
    });


    const stylesTable = StyleSheet.create({
        tableContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 24,
            borderWidth: 1,
            borderColor: 'black',
        },
    });

    const SupplierInfo = ({exports,accountCreate}:any) => (
        <View style={stylesSupplierInfo.container}>
            <View style={stylesSupplierInfo.headerContainer}>
                <Text style={stylesSupplierInfo.billTo}>Nhân viên tạo:</Text>
                <Text>Tên nhân viên: {accountCreate.fullName} </Text>
                <Text>SĐT: {accountCreate.phone}</Text>
            </View>
            <View style={stylesSupplierInfo.headerContainer}>
                <Text style={stylesSupplierInfo.billTo}>Chi nhánh chuyển:</Text>
                <Text>{exports?.exportInventory?.name}</Text>
            </View>

            <View style={stylesSupplierInfo.headerContainer}>
                <Text style={stylesSupplierInfo.billTo}>Chi nhánh nhận:</Text>
                <Text>{exports?.receiveInventory?.name}</Text>
            </View>
        </View>
    );

    const InvoiceNo = ({statusExport}:any) => (
        <Fragment>
            <View style={stylesInvoiceNo.container}>
                <View style={stylesInvoiceNo.invoiceNoContainer}>
                    <Text style={stylesInvoiceNo.label}>Mã đơn chuyển:</Text>
                    <Text style={stylesInvoiceNo.invoiceDate}>{statusExport.code}</Text>
                </View >
                <View style={stylesInvoiceNo.invoiceDateContainer}>
                    <Text style={stylesInvoiceNo.label}>Ngày tạo: </Text>
                    <Text  style={stylesInvoiceNo.invoiceDate}>{moment(statusExport.createAt).format('DD/MM/YYYY HH:mm')}</Text>
                </View >
                <View style={stylesInvoiceNo.invoiceDateContainer}>
                    <Text style={stylesInvoiceNo.label}>Ngày chuyển: </Text>
                    <Text  style={stylesInvoiceNo.invoiceDate} >{statusExport.dateSend}</Text>
                </View >
                <View style={stylesInvoiceNo.invoiceDateContainer}>
                    <Text style={stylesInvoiceNo.label}>Ngày nhận: </Text>
                    <Text  style={stylesInvoiceNo.invoiceDate} >{statusExport.dateReceive}</Text>
                </View >
            </View>

        </Fragment>
    );
    const InvoiceTitle = ({title}:any) => (
        <View style={stylesInvoiceTitle.titleContainer}>
            <Text style={stylesInvoiceTitle.reportTitle}>{title}</Text>
        </View>
    );
    const stylesTableHeader = StyleSheet.create({
        container: {
            flexDirection: 'row',
            borderBottomColor: 'black',
            backgroundColor: 'black',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            textAlign: 'center',
            flexGrow: 1,
            color:'white'
        },
        description: {
            width: '60%',
            borderRightWidth: 1,
            color:'white'
        },
        code: {
            width: '20%',
            borderRightWidth: 1,
            color:'white'
        },
        amount: {
            width: '20%',
            color:'white'
        },
    });
    const InvoiceTableHeader = () => (
        <View style={stylesTableHeader.container}>
            <Text style={stylesTableHeader.code}>Mã sản phẩm</Text>
            <Text style={stylesTableHeader.description}>Tên sản phẩm</Text>
            <Text style={stylesTableHeader.amount}>Số lượng</Text>
        </View>
    );

    const stylesTableRows = StyleSheet.create({
        row: {
            flexDirection: 'row',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,

        },
        description: {
            width: '60%',
            textAlign: 'left',
            borderRightColor: 'black',
            borderRightWidth: 1,
            paddingLeft: 8,
        },
        qty: {
            width: '20%',
            textAlign: 'center',
            paddingRight: 8,
        },
        code: {
            width: '20%',
            borderRightColor: 'black',
            borderRightWidth: 1,
            textAlign: 'center',
            paddingRight: 8,
        },

    });

    const stylesTableFooter = StyleSheet.create({
        row: {
            flexDirection: 'row',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            fontSize: 12,

        },
        description: {
            width: '80%',
            textAlign: 'right',
            borderRightColor: 'black',
            borderRightWidth: 1,
            paddingRight: 8,
        },
        total: {
            width: '20%',
            textAlign: 'center',
            paddingRight: 8,
        },
    });
    const InvoiceTableFooter = ({items}:any) => {
        let totalQty = 0
        items.forEach((item: { quantity: number }) => {
            totalQty+=item.quantity
        })
        return(
            <View style={stylesTableFooter.row}>
                <Text style={stylesTableFooter.description}>Tổng số lượng</Text>
                <Text style={stylesTableFooter.total}>{totalQty}</Text>
            </View>
        )
    };

    const InvoiceTableRow = ({items}:any) => {
        const rows = items.map((item: { productVariant: { id: React.Key | null | undefined; code: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; })  =>
            <View style={stylesTableRows.row} key={item.productVariant.id}>
                <Text style={stylesTableRows.code}>{item.productVariant.code}</Text>
                <Text style={stylesTableRows.description}>{item.productVariant.name}</Text>
                <Text style={stylesTableRows.qty}>{item.quantity}</Text>
            </View>
        )
        return (<Fragment>{rows}</Fragment> )
    };

    const InvoiceItemsTable = ({detailExport}:any) => (
        <View style={stylesTable.tableContainer}>
            <InvoiceTableHeader />
            <InvoiceTableRow items={detailExport} />
            <InvoiceTableFooter items={detailExport} />
        </View>
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle title='Phiếu chuyển hàng'/>
                <InvoiceNo statusExport={statusExport} />
                <SupplierInfo exports={anExport} accountCreate={accountCreate}/>
                <InvoiceItemsTable detailExport={detailExport} />
            </Page>
        </Document>
    )
}
export default PDFStockTransfer