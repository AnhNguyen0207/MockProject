import { Paper } from '@mui/material'
import { Col, Row, Tag } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProductVariant, getSupplierById } from '../../services/api'
import { ISupplier } from '../../services/customType'
import { getInventoryById } from '../../services/statisticsService'
import { ImportSortOptions, ImportStatistic, Inventory, InventorySortOptions, InventoryStatistic, StatisticsFilter } from '../../type/allType'
interface Props {
    loadding: boolean,
    filter: StatisticsFilter,
    imports?: ImportStatistic[],
    stokes?: InventoryStatistic[]
}
const CardDetails = (props: Props) => {
    const { filter, stokes, imports } = { ...props }
    const [supplier, setSupplier] = useState<ISupplier>()
    const [inventory, setInventory] = useState<Inventory>()
    const navigate = useNavigate()
    useEffect(() => {
        if (filter.supplierId > 0)
            getSupplierById(filter.supplierId).then(r => {
                setSupplier(r.data)
                console.log(r.data);

            })
        if (filter.inventoryId > 0)
            getInventoryById(filter.inventoryId).then(r => {
                setInventory(r.data)
                console.log(r.data);

            })
    }, [props])

    const getInform = () => {
        var title = 'Thống kê '
        switch (filter.type) {
            case 1:
                title = title.concat('nhập kho ')
                break;
            case 2:
                title = title.concat('tồn kho ')
                break;
            case 3:
                title = title.concat('xuất kho ')
                break;
            default:
                break;
        }
        switch (filter.statisticsType) {
            case 1:
                title = title.concat('của tất cả sản phẩm ')

                break;
            case 2:
                title = title.concat(' sản phẩm có ')
                if (filter.keySearch.toLowerCase().match(/spv\d+/g)) {
                    title = title.concat(' mã: ')



                }

                else {
                    title = title.concat('tên chứa từ khóa:  ')


                }
                break;

            default:
                break;
        }

        return title
    }
    return (
        <Paper style={{ height: '100%', width: '100%', padding: 20 }}>

            <h1>Thông tin hiển thị             <Tag style={{ margin: '10px 0px', fontSize: 14 }} color={"green"} >{getInform()}</Tag>
</h1>

            {
                filter.keySearch?.toLowerCase().match(/spv\d+/g) ?
                    <Tag style={{ margin: '10px 0px', fontSize: 14 }} color={"orange"} ><Link to={`/products/${filter.type == 1 ? imports?.at(0)?.productId : filter.type == 2 ? stokes?.at(0)?.productId : null}?backcode=statistic`}>{filter.keySearch.toUpperCase()}</Link></Tag>
                    : <div>
                        {
                            filter.keySearch != '' ? <Tag style={{ marginBottom:10, fontSize: 14 }} color={"yellow"} >{filter.keySearch}</Tag>
                                : null
                        }

                        {/* {filter.type == 1 &&filter.viewType==1?
                            <div>
                                {
                                    imports ? imports.map((value, index) => {
                                        return (
                                            <Tag key={index} style={{ margin: '10px 10px', fontSize: 14 }} color={"orange"} ><Link to={`/products/${value.productId}?backcode=statistic`}>{value.code}</Link></Tag>

                                        )
                                    }) : null
                                }
                            </div>

                            :
                            <div>
                                {
                                    filter.type == 2 ?
                                        <div>
                                            {
                                                stokes ? stokes.map((value, index) => {
                                                    return (
                                                        <Tag key={index} style={{ margin: '10px 10px', fontSize: 14 }} color={"orange"} ><Link to={`/products/${value.productVariantId}?backcode=statistic`}>{value.productVariantCode}</Link></Tag>

                                                    )
                                                }) : null
                                            }
                                        </div>
                                        :
                                        null
                                }
                            </div>


                        } */}



                    </div>


            }




            <Row>
                <Col span={6}>
                    <p>Chi Nhánh:</p>
                </Col>
                <Col span={18}>
                    {filter.inventoryId > 0 ? <p> <b> {inventory?.name}
                    </b>
                        <Tag color='green' onClick={() => { navigate(`/stocker/inventories/${inventory?.id}`) }}>
                            <Link to={`/stocker/inventories/${inventory?.id}`}>{inventory?.code}</Link>
                        </Tag> </p>
                        :
                        <b>Tất cả chi nhánh</b>
                    }
                </Col>

            </Row>
            {
                filter.type ==1 ?
                    <Row>
                        <Col span={6}>
                            <p>Nhà cung cấp:</p>
                        </Col>
                        <Col span={18}>
                            {filter.supplierId > 0 ? <p>
                                <b> {supplier?.name}
                                </b>
                                <Tag color='green' onClick={() => { navigate(`/stocker/supplier/details/${supplier?.id}`) }}>
                                    <Link to={`/stocker/supplier/details/${supplier?.id}`}>{supplier?.code}</Link>
                                </Tag>
                            </p>
                                :
                                <b>Tất cả

                                </b>
                            }
                        </Col>

                    </Row>

                    : null
            }

            {
                filter.type == 1 ?
                    <>
                        <Row>
                            <Col span={6}>
                                <p>Từ:</p>
                            </Col>
                            <Col span={18}>
                                <b>{moment(filter.startDate).format(`HH:mm:ss `)} </b>

                                ngày
                                <b>{moment(filter.startDate).format(` DD/MM/YYYY`)}</b>
                            </Col>

                        </Row>
                        <Row>
                            <Col span={6}>
                                <p>Đến :</p>

                            </Col>
                            <Col span={18}>
                                <b>{moment(filter.endDate).format(`HH:mm:ss `)} </b>

                                ngày
                                <b>{moment(filter.endDate).format(` DD/MM/YYYY`)}</b>
                            </Col>

                        </Row>
                    </>

                    :
                    <Row>
                        <Col span={6}>
                            <p>Tính đến :</p>

                        </Col>
                        <Col span={18}>
                            <b>{moment(filter.endDate).format(`HH:mm:ss `)} </b>

                            ngày
                            <b>{moment(filter.endDate).format(` DD/MM/YYYY`)}</b>
                        </Col>

                    </Row>
            }


            < Row >
                <Col span={6}>
                    <p>Sắp xếp:  </p>
                </Col>
                <Col span={18}>

                    {filter.sortDir ? ' tăng dần theo ' : ' giảm dần theo '}
                    <Tag color='green' style={{ fontSize: 14 }}>
                        {filter.type == 1 ?
                            ImportSortOptions.filter((value, index) => {
                                if (value.key == filter.sortBy)
                                    return value.value
                            }).at(0)?.value
                            : InventorySortOptions.filter((value, index) => {
                                if (value.key == filter.sortBy)
                                    return value.value
                            }).at(0)?.value
                        }</Tag>
                </Col>


            </Row>
        </Paper>
    )
}
export default CardDetails