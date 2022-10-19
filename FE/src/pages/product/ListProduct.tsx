/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Antd from 'antd'

import * as Mui from '@mui/material'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useLayoutEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ISupplier, TypeSupplier } from "../../services/customType";


import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import "../../styles/Table.css";

import { IProductCount, IProductFilter } from '../../type/allType';
import { countProductByFilter, deleteProductById, deleteProductsById, getProducts } from '../../services/productServices';
// import ProductPagination from './ProductPagination';
import { DeleteOutlined, DownOutlined, PlusOutlined, SortDescendingOutlined, StopOutlined, DownloadOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import ToastCustom from '../../features/toast/Toast';
import { Delete, PreviewOutlined } from '@mui/icons-material';
import { margin } from '@mui/system';
import useTitle from "../../app/useTitle";
// import { Sort } from '@mui/icons-material';
// import { margin } from '@mui/system';




const ListProduct = () => {
    var keyWord = ''
    const { searchKey } = useParams()
    const initFilter: IProductFilter = {
        key: searchKey ? searchKey : '',
        isDelete: false,
        sortBy: 'name',
        isDesc: true,
        page: 1,
        size: 7
    }
    useTitle("",'Sản phẩm')
    const ProductCol = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'code',
            key: 'code',
            render: (code: string) => {
                return (<Antd.Tag color={'orange'}>{code}</Antd.Tag>)
            }
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng phiên bản',
            dataIndex: "numberOfVariant",
            key: "numberOfVariant"
        },
        {
            title: "Số lượng",
            dataIndex: "total",
            key: "total"
        },
        {
            title: "Trạng thái",
            dataIndex: "total",
            key: "total",
            render: (total: number) => {
                return total > 0 ? <Antd.Tag icon={<CheckCircleOutlined />} color="success">Có thể bán</Antd.Tag> : <Antd.Tag icon={<CloseCircleOutlined />} color="error">Hết hàng</Antd.Tag >
            }
        }, {
            title: "Thao tác",
            key: 'id',
            dataIndex: "id",
            render: (id: number) => {
                return (
                    <>
                        <Antd.Button style={{ width: '40%', margin: 5 }} danger type={'ghost'} icon={<Delete />} onClick={() => deleteProduct(id)}></Antd.Button>
                        <Antd.Button style={{ width: '40%' }} type={'ghost'} icon={<PreviewOutlined />} onClick={() => navigate({ pathname: `/warehouse/products/${id}` })}></Antd.Button>
                    </>
                )
            }
        }
    ]

    const [productFilter, setProductFilter] = useState<IProductFilter>(initFilter)
    const [products, setProducts] = useState<Array<IProductCount>>([])
    const [reload, setReload] = useState(true)
    const navigate = useNavigate()
    const [totalPage, setTotalPage] = useState<number>(1);
    const [selectProduct, setSelectProduct] = useState<React.Key[]>([]);
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const loadData = () => {
        setReload(true)

        getProducts(productFilter).then((response) => response.json())
            .then((res) => {
                setProducts(res)
                setReload(false)

            }).catch(error => { })
        countProductByFilter(productFilter).then((response) => response.json())
            .then((res) => {
                setTotalPage(res)
            }).catch(error => {


            })
    }

    const deleteProduct = (id: number) => {
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn không thể hồi phục lại dữ liệu!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xoá!',
            cancelButtonText:'Huỷ'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProductById(id)
                    .then(res => {
                        if (res.ok) {
                            ToastCustom.fire({
                                icon: 'success',
                                title: 'Xóa thành công'
                            })
                            loadData()
                        }
                    })
                    .catch(error => {
                        ToastCustom.fire(
                            {
                                icon: 'error',
                                title: 'Xóa Thất bại'
                            }
                        )

                    })
            }

        })

    }
    const handleDeleteProduct = () => {
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn không thể hồi phục lại dữ liệu!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProductsById(selectProduct)
                    .then(res => {
                        if (res.ok) {
                            ToastCustom.fire({
                                icon: 'success',
                                title: 'Xóa thành công'
                            })
                            loadData()
                        }
                    })
                    .catch(error => {
                        ToastCustom.fire(
                            {
                                icon: 'error',
                                title: 'Xóa Thất bại'
                            }
                        )

                    })
            }

        })

    }
    const handleMenuClick: Antd.MenuProps['onClick'] = (e: any) => {
        switch (e.key) {
            case '1':
                handleDeleteProduct()
                break
            case '2':

                break

        }
    };
    const menu = (
        <Antd.Menu
            onClick={handleMenuClick}
            items={[
                {
                    key: '1',
                    label: <Antd.Button style={{ width: '100%' }} type="text" danger>Xóa Sản phẩm<DeleteOutlined /></Antd.Button>,

                },
                // {
                //     label: <Antd.Button style={{ width: '100%' }} type="text" >Sửa sản phẩm<InfoCircleOutlined /></Antd.Button>,
                //     key: '2',


                // },
            ]}
        />
    );


    useLayoutEffect(() => {
            loadData()
    }, [productFilter])

    const onPageChange = (page: number, size: number) => {
        setProductFilter({ ...productFilter, page: page, size: size })

    }

    const showFilter = () => {
        setIsOpenFilter(true)
    }
    const closeFilter = () => {
        setIsOpenFilter(false)
    }
    const Products = () => {
        return (
            <>
                <Antd.Spin tip="Loading..." spinning={reload} >

                    <Antd.Table dataSource={products}
                        sticky
                        columns={ProductCol}
                        rowKey="id"
                        bordered
                        pagination={false}
                        style={{ height: 600, maxHeight: 600, overflow: 'scroll' }}
                        // onRow={(record) => {
                        //     return {

                        //     }
                        // }}

                        rowSelection={{
                            selectedRowKeys: selectProduct,
                            onChange(selectedRowKeys, selectedRows, info) {
                                setSelectProduct(selectedRowKeys)
                                // selectProduct=selectedRowKeys
                            },
                        }}

                    />
                </Antd.Spin>

            </>
        )
    }

    return (
        <div className ='p-5'>
            <h1 style={{ fontSize: '30px', marginRight: 10}}  >Danh sách sản phẩm </h1>
            <Mui.Grid container spacing={2} sx={{ mb: 2 }}>
                <Mui.Grid item xs={1.5}>
                    <Antd.Dropdown overlay={menu} disabled={selectProduct.length < 1}>
                        <Antd.Button style={{ width: "100%", fontSize: '14px', margin: 0 }} type="primary">
                            <Antd.Space>
                                Thao tác
                                <DownOutlined />
                            </Antd.Space>
                        </Antd.Button>
                    </Antd.Dropdown>

                </Mui.Grid>
                <Mui.Grid item xs={8.5} sx={{ m: 0 }}>
                    <Antd.Input
                        placeholder='Nhập tên hoặc mã sản phẩm'
                        onChange={(e) => {
                            keyWord = e.target.value.toString()

                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter')
                                setProductFilter({ ...productFilter, key: keyWord, page: 1 })
                        }}

                    >

                    </Antd.Input>
                </Mui.Grid>

                {/* <Mui.Grid item xs={1}>
                    <Antd.Button style={{ width: "100%", fontSize: '14px', margin: 0 }} type="primary" >
                        <Antd.Space>
                            <DownloadOutlined />
                            Xuất file
                        </Antd.Space>
                    </Antd.Button>
                </Mui.Grid> */}
                <Mui.Grid item xs={2}>
                    <Antd.Button style={{ width: "100%", fontSize: '14px', margin: 0 }} type="primary" onClick={() => { navigate('/warehouse/products/add') }} >
                        <Antd.Space>
                            <PlusOutlined />
                            Thêm mới
                        </Antd.Space>
                    </Antd.Button>
                </Mui.Grid>

                <Mui.Grid item xs={12} >
                    <Mui.Paper sx={{ pb: 2 }} >
                        <Products />
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <Antd.Pagination responsive style={{ marginTop: 10, marginRight: 10 }} pageSize={productFilter.size} showSizeChanger showQuickJumper defaultCurrent={1} total={totalPage} onChange={onPageChange} pageSizeOptions={[7, 10, 20, 50]} />

                        </div>

                    </Mui.Paper>
                </Mui.Grid>

            </Mui.Grid>


        </div>
    )
}

export default ListProduct