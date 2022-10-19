import {IDetailImportInvoice, IImportReturn} from "../../services/customType";
import {Document, Font, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import React, {Fragment} from "react";
import moment from "moment";

type Props ={
    invoice:IDetailImportInvoice,
    returnInvoice:IImportReturn
}
const PDFReturnImportInvoice = ({invoice,returnInvoice}:Props) =>{
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
            flexDirection: 'column',
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
        },
        createDateTitle:{
            color: 'black',
            fontSize: 14,
            marginTop:10
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

    const SupplierInfo = ({invoice,returnInvoice}:any) => (
        <View style={stylesSupplierInfo.container}>
            <View style={stylesSupplierInfo.headerContainer}>
                <Text style={stylesSupplierInfo.billTo}>Nhân viên tạo:</Text>
                <Text>Tên nhân viên: {returnInvoice.fullName} </Text>
                <Text>SĐT: {returnInvoice.phoneNumber}</Text>
            </View>
            <View style={stylesSupplierInfo.headerContainer}>
                <Text style={stylesSupplierInfo.billTo}>Nhà cung cấp:</Text>
                <Text>{invoice.supplier.code}</Text>
                <Text>{invoice.supplier.name}</Text>
            </View>

            <View style={stylesSupplierInfo.headerContainer}>
                <Text style={stylesSupplierInfo.billTo}>Kho:  {invoice.inventoryName}</Text>
            </View>
        </View>
    );

    const InvoiceTitle = ({title}:any) => (
        <View style={stylesInvoiceTitle.titleContainer}>
            <Text style={stylesInvoiceTitle.reportTitle}>{title}</Text>
            <Text style={stylesInvoiceTitle.createDateTitle}>{moment(returnInvoice.createDate).format('DD/MM/YYYY HH:mm:ss')}</Text>
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
            width: '55%',
            borderRightWidth: 1,
            color:'white'
        },
        code: {
            width: '15%',
            borderRightWidth: 1,
            color:'white'
        },
        amount: {
            width: '10%',
            color:'white',
            borderRightWidth: 1,
        },
        totalPrice: {
            width: '20%',
            color:'white',
            borderRightWidth: 1,
        },
    });
    const InvoiceTableHeader = () => (
        <View style={stylesTableHeader.container}>
            <Text style={stylesTableHeader.code}>Mã sản phẩm</Text>
            <Text style={stylesTableHeader.description}>Tên sản phẩm</Text>
            <Text style={stylesTableHeader.amount}>Số lượng</Text>
            <Text style={stylesTableHeader.totalPrice}>Thành tiền</Text>
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
            width: '55%',
            textAlign: 'left',
            borderRightColor: 'black',
            borderRightWidth: 1,
            paddingLeft: 8,
        },
        qty: {
            width: '10%',
            textAlign: 'center',
            paddingRight: 8,
            borderRightColor: 'black',
            borderRightWidth: 1,
        },
        code: {
            width: '15%',
            borderRightColor: 'black',
            borderRightWidth: 1,
            textAlign: 'center',
            paddingRight: 8,
        },
        total: {
            width: '20%',
            borderRightColor: 'black',
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
        return(
            <View style={stylesTableFooter.row}>
                <Text style={stylesTableFooter.description}>TỔNG TIỀN</Text>
                <Text style={stylesTableFooter.total}>{items.totalPrice.toLocaleString('en-US', {
                    currency: 'VND',
                })}</Text>
            </View>
        )
    };
    const InvoiceTableRow = ({items}:any) => {
        const rows = items.map((item: { detailsImportId: React.Key | null | undefined; code: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; totalPrice: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) =>(
            <View style={stylesTableRows.row} key={item.detailsImportId}>
                <Text style={stylesTableRows.code}>{item.code}</Text>
                <Text style={stylesTableRows.description}>{item.name}</Text>
                <Text style={stylesTableRows.qty}>{item.quantity}</Text>
                <Text style={stylesTableRows.total}>{item.totalPrice?.toLocaleString('en-US', {
                    currency: 'VND',
                })}</Text>
            </View>
        ))
        return (<Fragment>{rows}</Fragment> )
    };

    const InvoiceItemsTable = ({returnInvoice}:any) => (
        <View style={stylesTable.tableContainer}>
            <InvoiceTableHeader />
            <InvoiceTableRow items={returnInvoice.detailsReturnImportResponseList} />
            <InvoiceTableFooter items={returnInvoice} />
        </View>
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle title='Phiếu trả hàng'/>
                <SupplierInfo invoice={invoice} returnInvoice={returnInvoice}/>
                <InvoiceItemsTable returnInvoice={returnInvoice} />
            </Page>
        </Document>
    )
}
export default PDFReturnImportInvoice