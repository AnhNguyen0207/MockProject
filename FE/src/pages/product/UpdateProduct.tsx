import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, memo } from "react";
import { ISupplier } from "../../services/customType";
import { Button, Col, Dropdown, Menu, MenuProps, Row, Space } from "antd";
import Moment from "react-moment";
import { DeleteOutlined, DownOutlined, InfoCircleOutlined, LeftOutlined, SaveOutlined } from "@ant-design/icons";
import * as Mui from '@mui/material'
import * as Antd from 'antd'
import { deleteProductById, deleteVariantsById, getProductById, updateProduct, } from "../../services/productServices";
import { Category, IVariant, Product } from "../../type/allType";
import { has } from "immer/dist/internal";
import Swal from "sweetalert2";
import ToastCustom from "../../features/toast/Toast";
import AddProduct from "./AddProduct";
import SelectCategory from "./SelectCategory";
import ImageUpload from "./ImageUpload";
import { stringify } from "querystring";
import { CancelOutlined } from "@mui/icons-material";
interface ProductUpdateProps {
    product: Product | undefined,
    variants: IVariant[] | undefined,
    categories: Category[] | undefined,
    setIsUpdate: Function,


}
const variantCol = [
    {
        title: 'Mã SP',
        dataIndex: 'code',
        key: 'code',
        width: '15%',
        render: (code: string) => {
            return (<Antd.Tag color='orange'> {code}</Antd.Tag>)
        }
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',


    },
    //  {
    //     title: 'Giá bán lẻ',
    //     dataIndex: 'code',
    //     key: 'code',
    //     width: '15%',



    // }, {
    //     title: 'Tổng',
    //     dataIndex: 'code',
    //     key: 'code',
    //     width: '15%',


    // }
]

const UpdateProduct = (props: ProductUpdateProps) => {

    const { setIsUpdate, ...other } = { ...props }
    const { id } = useParams();
    const [productInfo, setProductInfo] = useState(other)
    const [load, setLoad] = useState(false)
    const [variant, setVariant] = useState<IVariant>()
    const [index, setIndex] = useState<number>(0)

    const [page, setPage] = useState(1)

    const navigate = useNavigate()
    const onSubmit = (data: Product) => {
        setLoad(true)
        updateProduct(productInfo).then(res => {
            if (res.ok) {
                ToastCustom.fire({
                    icon: 'success',
                    title: 'Sửa thành công'
                }).then()
                setIsUpdate(false)
            }
            else {
                ToastCustom.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra'
                }).then()
            }
            setLoad(false)

        })
            .catch((erorr) => {
                ToastCustom.fire({
                    icon: 'error',
                    title: 'Thêm sản phẩm thất bại'
                }).then()
            })


    }
    const changeVariantName = (variants: IVariant[] | undefined) => {
        var fixVariants: IVariant[] = []
        if (variants) {
            fixVariants = variants.map((variant, index) => {
                var dashIndex = variant.name.indexOf('-')
                var newName = productInfo?.product?.name + variant.name.slice(dashIndex, variant.name.length)
                variant.name = newName
                return variant
            })

        }
        setProductInfo({ ...productInfo, variants: fixVariants })
    }
    const setImageUrl = (url: string) => {

        if (variant) {
            setVariant({ ...variant, image: url })
            variant.image = url
        }
        onDetailChange()
    }
    const onCategoriesChange = (data: Category[]) => {

        productInfo.categories = data

    }
    const onDetailChange = () => {
        if (productInfo.variants?.at(index) && variant) {
            productInfo.variants[index] = variant

        }
    }
    useEffect(() => {
        setVariant(productInfo.variants?.at(index))
        document.title = 'Cập nhật thông tin sản phẩm'
    }, [])



    const ProductInfo = () => {
        return (

            <Mui.Paper sx={{ px: 5, py: 2, height: 400 }}>
                <div>Thông tin chung</div>
                <hr></hr>

                {/* <SelectSupplier ></SelectSupplier> */}

                <Antd.Form.Item style={{ marginTop: 20 }} labelCol={{ span: 24 }} labelAlign='left' label='Tên sản phẩm' name="name"
                    rules={[
                        { required: true, message: 'Tên sản phẩm không được để trống' }

                    ]}

                >
                    <Antd.Input size={'large'} onChange={e => {
                        if (productInfo.product)
                            productInfo.product.name = e.target.value

                    }}
                        onBlur={() => {
                            changeVariantName(productInfo.variants)

                        }}
                    ></Antd.Input>
                </Antd.Form.Item>

                <Antd.Form.Item name='description' >
                    <Antd.Input.TextArea rows={8} placeholder="Mô tả sản phẩm" onChange={e => {
                        if (productInfo.product)
                            productInfo.product.description = e.target.value
                    }} />

                </Antd.Form.Item>


            </Mui.Paper>
        )
    }
    const Variants = memo((props: any) => {

        return (
            <>
                <div style={{ background: "white", padding: 20 }}>
                    <div >
                        <Antd.Row style={{}}>
                            <Antd.Col span={8} style={{ padding: 0, margin: 0 }}>
                                <div style={{ height: '100%', paddingTop: 5 }} >Các phiên bản: </div>
                            </Antd.Col>
                        </Antd.Row>
                    </div>


                    <hr />




                    <Antd.Table dataSource={productInfo.variants}
                        sticky
                        columns={variantCol}
                        rowKey="id"
                        bordered

                        pagination={{
                            pageSize: 6, current: page, onChange(page, pageSize) {
                                setPage(page)
                            },
                        }}
                        style={{ height: 450 }}

                        onRow={(record, index) => {

                            return {
                                onClick: event => {
                                    setVariant(record)
                                    if (index)
                                        setIndex(index)
                                }
                            }
                        }}
                    >

                    </Antd.Table>
                </div>

            </>

        )
    })

    useEffect(() => {
        console.log(index, variant);

    }, [variant])
    const VariantDetails = (props: any) => {
        return (
            <>
                <Mui.Paper sx={{ p: 3, height: 535 }}>

                    <div>Thông tin chi tiết <Antd.Tag color={'orange'}>{variant?.code}</Antd.Tag></div>

                    <hr />
                    <div style={{ margin: '5% 25%' }}>
                        <ImageUpload imageUrl={variant?.image} setUrl={setImageUrl} />
                    </div>



                    <Antd.Row style={{ marginBottom: 5 }}>

                        <Antd.Col span={6}><p>Tên:</p></Antd.Col>
                        <Antd.Col span={18}><b>{props.variant?.name}</b></Antd.Col>

                    </Antd.Row>

                    <label>Giá nhập</label>

                    <Antd.InputNumber size={'large'} min={0} style={{ width: '100%', marginBottom: 10 }}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        defaultValue={variant?.importPrice}
                        onChange={(value) => {
                            if (variant) {
                                variant.importPrice = value
                                onDetailChange()

                            }


                        }}
                    >
                    </Antd.InputNumber>
                    <label>Giá bán lẻ</label>
                    <Antd.InputNumber size={'large'} min={0} style={{ width: '100%', marginBottom: 10 }}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        defaultValue={variant?.salePrice}
                        onChange={(value) => {
                            if (variant) {
                                variant.salePrice = value
                                onDetailChange()

                            }
                        }}
                    >
                    </Antd.InputNumber>

                    <label>Giá bán buôn</label>
                    <Antd.InputNumber size={'large'} min={0} style={{ width: '100%', marginBottom: 10 }}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        defaultValue={variant?.wholesalePrice}
                        onChange={(value) => {
                            if (variant) {
                                variant.wholesalePrice = value
                                onDetailChange()

                            }
                        }}

                    >
                    </Antd.InputNumber>



                </Mui.Paper>

            </>


        )
    }

    const View = () => {
        return (

            <Antd.Form
                onFinish={onSubmit}
                initialValues={productInfo.product}
                onValuesChange={(change, value) => {
                }}>
                <div>
                    <h2 style={{ margin: 20 }} onClick={() => {
                        setIsUpdate(false)
                    }} >

                        <LeftOutlined /> Quay lại
                    </h2>

                </div>
                <Mui.Grid container spacing={2} sx={{ mb: 10 }}>
                    <Mui.Grid item xs={8}>
                        <ProductInfo />

                    </Mui.Grid>
                    <Mui.Grid item xs={4}>

                        <Mui.Grid item sx={{}}>

                            <SelectCategory selectCategories={productInfo.categories} onChange={onCategoriesChange} />


                        </Mui.Grid>
                    </Mui.Grid>


                    <Mui.Grid item xs={8}>

                        <Variants setVariant={setVariant} variants={variant} />
                    </Mui.Grid>
                    <Mui.Grid item xs={4}>
                        <VariantDetails variant={variant} />
                    </Mui.Grid>


                </Mui.Grid>


                <div style={{ display: 'flex', justifyContent: 'end' }}>

                    <Antd.Button type="primary" style={{ width: 150, margin: '0px 20px' }} danger onClick={() => { setIsUpdate(false) }}>Hủy</Antd.Button>
                    <Antd.Spin spinning={load} tip={'Đang lưu...'}>
                        <Antd.Button type="primary" style={{ width: 150 }} htmlType="submit">Lưu</Antd.Button>
                    </Antd.Spin>

                </div>

            </Antd.Form>



        )
    }
    return (
        <div className ='p-5'>


            <View></View>

        </div>
    )
}
export default UpdateProduct