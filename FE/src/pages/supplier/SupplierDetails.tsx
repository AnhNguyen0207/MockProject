import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IImportInvoiceBySupplier, ISupplier} from "../../services/customType";
import {findAccountById, getImportInvoiceBySupplier, getSupplierById} from "../../services/api";
import {Col, Dropdown, Menu, MenuProps, Row, Space, Table, Tabs} from "antd";
import Moment from "react-moment";
import {DeleteOutlined, DownOutlined, InfoCircleOutlined, LeftOutlined} from "@ant-design/icons";
import SupplierUpdate from "./SupplierUpdate";
import {ImportInvoiceColumn, ImportInvoiceColumnBySupplier} from "../../components/Datatablesource";
import useTitle from "../../app/useTitle";
type Account = {
    id: number,
    fullName:string
}
const SupplierDetails = () => {
    useTitle("Chi tiết nhà cung cấp","Nhà cung cấp")
    const {id} = useParams();
    const [supplier, setSupplier] = useState({} as ISupplier);
    const [importInvoiceBySupplier, setImportInvoiceBySupplier] = useState<IImportInvoiceBySupplier[]>([]);
    const [account,setAccount] = useState({} as Account)
    useEffect(() => {
        getSupplierById(parseInt(id as string)).then(supplier => {
            setSupplier(supplier.data)

            findAccountById(parseInt(supplier.data.accountId as string)).then((acc) =>{
                setAccount(acc.data)
            })
        })
        getImportInvoiceBySupplier(parseInt(id as string)).then(supplier => {
            setImportInvoiceBySupplier(supplier.data)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [isLoadModal, setIsLoadModal] = useState(false)


    const handleMenuClick: MenuProps['onClick'] = (e: any) => {
        switch (e.key) {
            case '1':
                // onUpdateTrueStatus(selectedRowKeys);
                break
            case '2':
                // setIsLoadModal(true)
                break
        }
    };
    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: <Link to="#">Xóa nhà cung cấp</Link>,
                    key: '1',
                    icon: <DeleteOutlined/>,
                },
                {
                    label: <Link to="#" onClick={() => setIsLoadModal(true)}>Sửa nhà cung cấp</Link>,
                    key: '2',
                    icon: <InfoCircleOutlined/>,

                },
            ]}
        />
    );


    return (
        <div className='p-5'>

            {
                supplier && (
                    <div>
                        <h2 style={{ fontSize:'15px',marginBottom:20}} >
                            <Link to="/stocker/supplier/">
                                <LeftOutlined /> Danh sách nhà cung cấp
                            </Link>
                        </h2>
                        <div style={{background: "white"}}>
                            <div style={{padding: 20, display: 'flex', justifyContent: 'space-between', paddingBottom: 0}}>
                                <div>
                                    Thong tin khac
                                </div>
                                <div>
                                    <Dropdown overlay={menu}>
                                        <div style={{width: "190px", fontSize: '14px', textAlign: 'center'}}>
                                            <Space>
                                                Thao tác khác
                                                <DownOutlined/>
                                            </Space>
                                        </div>
                                    </Dropdown>
                                </div>
                            </div>
                            <hr/>
                            <div style={{padding: '20px'}}>
                                <Row>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={8}>
                                                <p>Tên nhà cung cấp: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{supplier.name}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <p>Mã nhà cung cấp: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{supplier.code}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <p>SĐT nhà cung cấp: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{supplier.phone}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={8}>
                                                <p>Email nhà cung cấp: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{supplier.email}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <p>Nhân viên phụ trách: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{account?.fullName}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <p>Địa chỉ nhà cung cấp: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{supplier.address}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={8}>
                                                <p>Thời giạn tạo: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>
                                                    <Moment format="DD/MM/YYYY HH:mm:ss">
                                                        {supplier.createdAt}
                                                    </Moment>
                                                </b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <p>Thời gian cập nhập: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>
                                                    <Moment format="DD/MM/YYYY HH:mm:ss">
                                                        {supplier.updateAt}
                                                    </Moment>
                                                </b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <p>Trạng thái giao dịch: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{
                                                    supplier.statusTransaction ? (
                                                        <p style={{color: 'blue'}}>Đang giao dịch</p>
                                                    ) : (<p style={{color: 'red'}}>Ngừng giao dịch</p>)
                                                }</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        {isLoadModal && <SupplierUpdate supplier={supplier} isVisible={isLoadModal}
                                                        setIsVisible={() => setIsLoadModal(false)}/>}
                    </div>
                )
            }
            {
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Lịch sử nhập hàng" key="1">
                        <Table dataSource={importInvoiceBySupplier}
                               columns={ImportInvoiceColumnBySupplier.filter(col => col.dataIndex !== 'isReturn')}
                               rowKey="code"
                               pagination={{defaultPageSize: 10}}
                            // rowSelection={rowSelection}
                        />
                    </Tabs.TabPane>
                </Tabs>
            }
        </div>
    )
}
export default SupplierDetails