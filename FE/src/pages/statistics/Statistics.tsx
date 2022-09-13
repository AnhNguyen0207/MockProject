import { FC, useEffect, useState } from "react";
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import * as Antd from 'antd'
import * as Mui from '@mui/material'
import { Grid, Paper } from '@mui/material'
import { number } from "yup";
import SelectSupplierV2 from "./SelectSupplierV2";
import SelectInventory from "./SelectInventory";
import { ImportSortOptions, ImportStatistic, InventorySortOptions, InventoryStatistic, InventoryTypeOption, StatisticsFilter, TypeOptions, ViewTypeOptions } from "../../type/allType";
import { getStatisticsImport, getStatisticsImportExtend, getStatisticsInventory } from "../../services/statisticsService";
import { ColumnProps } from "antd/es/table";
import SelectSortby from "./SelectSortBy";
import CardDetails from "./CardDetails";
import LineCharImport from "./LineChartImport";
import { Link, useNavigate } from "react-router-dom";
import ImportStatisticNomal from "./ImportStatisticNomal";
import ImportStatisticExtend from "./ImportStatisticExtend";
import BarChartStatistic from "./BarChartStatistic";
import StatisticTypeOptions from "./StatisticTypeOptions";
import InventoryStatisticTable from "./InventoryStatisticTable";
import PieChartReturnImport from "./PieChartReturnImport";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import {DeleteOutlined, DownOutlined, InfoCircleOutlined, StopOutlined,SortDescendingOutlined} from '@ant-design/icons';
import BarChartStatisticInventory from "./BarChartStatisticInventory";
import ExportExcelImportStatistic from "./ExportExcelImportStatistic";
import { downloadExcel } from "react-export-table-to-excel";
import useTitle from "../../app/useTitle";


const Statistics: FC = () => {
    const navigate = useNavigate()
    useTitle("","Thống kê báo cáo")
    var fstring = localStorage.getItem('importFilter')
    var filter: StatisticsFilter = fstring ? JSON.parse(fstring) : {
        inventoryId: -1,
        supplierId: -1,
        startDate: 0,
        endDate: new Date().getTime(),
        sortBy: 'name',
        sortDir: true,
        keySearch: '',
        tag: 0,
        page: 1,
        size: 10,
        type: 1,
        statisticsType: 1,
        viewType: 1,
    }
    const [filterProps, setFilterProps] = useState<StatisticsFilter>(filter)
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [loadding, setLoadding] = useState(false)
    // const [extend, setExtend] = useState<number>(1)
    const [imports, setImports] = useState<ImportStatistic[]>([])
    const [stokes, setStokes] = useState<InventoryStatistic[]>([])


    useEffect(() => {
        setLoadding(true)
        loadData()
    }, [])

    const onSubmitFilter = (data: any) => {
        localStorage.setItem('importFilter', JSON.stringify(filter))
        closeFilter()

        console.log(filter)
        setLoadding(true)
        loadData()
        setFilterProps(filter)

    }

    const loadData = () => {


        switch (filter.type) {
            case 1:
                switch (filter.viewType) {
                    case 2:
                        getStatisticsImportExtend(filter).then((res) => {
                            if (res.ok)
                                return res.json()
                        }).then(data => {
                            setImports(data)
                            setLoadding(false)

                        }).catch(erro => {
                            setLoadding(false)

                        })
                        break;
                    case 1:
                        getStatisticsImport(filter).then((res) => {
                            if (res.ok)
                                return res.json()
                        }).then(data => {
                            setImports(data)
                            setLoadding(false)

                        }).catch(erro => {
                            setLoadding(false)

                        })
                        break;

                    default:
                        break;
                }
                break;
            case 2:
                getStatisticsInventory(filter).then(r => {
                    if (r.ok)
                        return r.json()
                }).then(data => {

                    setStokes(data)
                    setLoadding(false)
                    console.log(data);

                })
                break;
            case 3:
                setLoadding(false)

                break;
            default:
                setLoadding(false)

                break;
        }

    }

    const closeFilter = () => {
        setIsOpenFilter(false)

    }
    const showFilter = () => {
        var filterString = localStorage.getItem('importFilter')
        filter = filterString ? JSON.parse(filterString) : filter
        setIsOpenFilter(true)
        console.log(filter);

    }

    const StatisticsFilter = () => {
        const [type, setType] = useState<number>(filter.type)
        const [statisticsType, setStatisticsType] = useState<number>(filter.statisticsType)
        const [sortDir, setSortDir] = useState<boolean>(filter.sortDir)

        const changeSupplierId = (id: number) => {
            filter.supplierId = id
        }

        const onTimeChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
            var date1 = new Date(dateStrings[0]);
            var date2 = new Date(dateStrings[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
            filter.startDate = date1.getTime()
            filter.endDate = date2.getTime()
            console.log(filter);



        };
        const onSortByChange = (value: string) => {
            filter.sortBy = value

        }

        const ImportFilter = () => {
            return (
                <>
                    <Grid item xs={12}>

                        {statisticsType == 2 ?
                            <Antd.Form.Item label={'Mã sản phẩm cụ thể: '} labelCol={{ span: 6 }} labelAlign={'left'} >
                                <Antd.Input width={'100%'} placeholder="Nhập mã sản phẩm" defaultValue={filter.keySearch} onChange={(e) => { filter.keySearch = e.target.value }}></Antd.Input>
                            </Antd.Form.Item> : null

                        }
                        <StatisticTypeOptions title="Kiểu xem: " data={ViewTypeOptions} initValue={filter.viewType} onChange={(value: number) => {
                            filter.viewType = value
                        }}></StatisticTypeOptions>

                        <Grid container spacing={2} >

                            <Grid item xs={12}>
                                <Antd.Form.Item label={'Sắp xếp theo: '} name={'sortBy'} style={{ width: '100%' }} labelAlign='left' labelCol={{ span: 6 }} >
                                    <SelectSortby initValue={filter.sortBy} sortOptions={ImportSortOptions} onChange={onSortByChange}></SelectSortby>
                                </Antd.Form.Item>

                            </Grid>
                            <Grid item xs={12}>
                                <Antd.Form.Item label={'Top: '} name={'size'} labelCol={{ span: 6 }} labelAlign={'left'}   >
                                    <Antd.InputNumber style={{ width: '100%' }} defaultValue={filter.size} onChange={(value: number) => filter.size = value} placeholder="Nhập số lượng"></Antd.InputNumber>
                                </Antd.Form.Item>

                            </Grid>
                            <Grid item xs={12}>

                                <Antd.Form.Item label={'Xắp xếp: '} name={'sortDir'} style={{ width: '100%' }} labelAlign='left' labelCol={{ span: 6 }} >
                                    <Antd.Switch defaultChecked={sortDir} onChange={(check, e) => { filter.sortDir = check 
                                    
                                        setSortDir(check)
                                    }}></Antd.Switch >
                                </Antd.Form.Item>

                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <SelectInventory initValue={filter.inventoryId} onChange={(id: number) => { filter.inventoryId = id }} spanLable={6} />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectSupplierV2 initValue={filter.supplierId} changeSupplierId={changeSupplierId} />
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <Antd.Form.Item label='Thời gian' name={'time'} labelCol={{ span: 24 }}  >
                            <Antd.DatePicker.RangePicker

                                defaultValue={[moment(filter.startDate), moment(filter.endDate)]}
                                size="large"
                                style={{ width: "100%" }}
                                ranges={{
                                    'Hôm nay': [moment().startOf('day'), moment().endOf('day')],
                                    'Tuần này': [moment().startOf('week'), moment().endOf('week')],
                                    'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                                    'Năm nay': [moment().startOf('year'), moment().endOf('year')],


                                }}
                                showTime
                                format="YYYY/MM/DD HH:mm:ss"
                                onChange={onTimeChange}
                            />
                        </Antd.Form.Item >


                    </Grid>
                </>
            )
        }
        const InventoryFilter = () => {
            return (
                <>
                    <Grid item xs={12}>

                        {statisticsType == 2 ?
                            <Antd.Form.Item label={'Mã sản phẩm cụ thể: '} labelCol={{ span: 6 }} labelAlign={'left'}>
                                <Antd.Input width={'100%'} placeholder="Nhập mã sản phẩm" defaultValue={filter.keySearch} onChange={(e) => { filter.keySearch = e.target.value }}></Antd.Input>
                            </Antd.Form.Item> : null

                        }
                        {/* <StatisticTypeOptions title="Kiểu xem: " data={ViewTypeOptions} initValue={filter.viewType} onChange={(value: number) => {
                            filter.viewType = value
                        }}></StatisticTypeOptions> */}


                        <Grid container spacing={2} >

                            <Grid item xs={12}>
                                <Antd.Form.Item label={'Sắp xếp theo: '} name={'sortBy'} style={{ width: '100%' }} labelAlign='left' labelCol={{ span: 6 }} >
                                    <SelectSortby initValue={filter.sortBy} sortOptions={InventorySortOptions} onChange={onSortByChange}></SelectSortby>
                                </Antd.Form.Item>

                            </Grid>
                            <Grid item xs={12}>
                                <Antd.Form.Item label={'Top: '} name={'size'} labelCol={{ span: 6 }} labelAlign={'left'}   >
                                    <Antd.InputNumber style={{ width: '100%' }} defaultValue={filter.size} onChange={(value: number) => filter.size = value} placeholder="Nhập số lượng"></Antd.InputNumber>
                                </Antd.Form.Item>

                            </Grid>
                            <Grid item xs={12}>

                            <Antd.Form.Item label={'Xắp xếp: '} name={'sortDir'} style={{ width: '100%' }} labelAlign='left' labelCol={{ span: 6 }} >
                                    <Antd.Switch defaultChecked={filter.sortDir} onChange={(check, e) => { filter.sortDir = check 
                                    setSortDir(check)
                                    }}></Antd.Switch >
                                    {sortDir?'Tăng dần':'Giảm dần'}
                                </Antd.Form.Item>

                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <SelectInventory  initValue={filter.inventoryId} onChange={(id: number) => { filter.inventoryId = id }} spanLable={6} />
                            </Grid>


                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <Antd.Form.Item label='Thời gian' name={'time'} labelCol={{ span: 6 }}labelAlign='left' >
                            <Antd.DatePicker
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime
                                defaultValue={moment(filter.endDate)}
                                onChange={(moment, dateString) => {
                                    var date1 = new Date(dateString);
                                    filter.endDate = date1.getTime()


                                }}
                            />

                        </Antd.Form.Item >


                    </Grid>
                </>
            )
        }

        const ExportFilter = () => {
            return (
                <>
                    <Grid item xs={12}>

                        {statisticsType == 2 ?
                            <Antd.Form.Item label={'Mã sản phẩm cụ thể: '} labelCol={{ span: 6 }} labelAlign={'left'} >
                                <Antd.Input width={'100%'} placeholder="Nhập mã sản phẩm" defaultValue={filter.keySearch} onChange={(e) => { filter.keySearch = e.target.value }}></Antd.Input>
                            </Antd.Form.Item> : null

                        }
                        <StatisticTypeOptions title="Kiểu xem: " data={ViewTypeOptions} initValue={filter.viewType} onChange={(value: number) => {
                            filter.viewType = value
                        }}></StatisticTypeOptions>

                        <Grid container spacing={2} >

                            <Grid item xs={12}>
                                <Antd.Form.Item label={'Sắp xếp theo: '} name={'sortBy'} style={{ width: '100%' }} labelAlign='left' labelCol={{ span: 6 }} >
                                    <SelectSortby initValue={filter.sortBy} sortOptions={ImportSortOptions} onChange={onSortByChange}></SelectSortby>
                                </Antd.Form.Item>

                            </Grid>
                            <Grid item xs={12}>
                                <Antd.Form.Item label={'Top: '} name={'size'} labelCol={{ span: 6 }} labelAlign={'left'}   >
                                    <Antd.InputNumber style={{ width: '100%' }} defaultValue={filter.size} onChange={(value: number) => filter.size = value} placeholder="Nhập số lượng"></Antd.InputNumber>
                                </Antd.Form.Item>

                            </Grid>
                            <Grid item xs={12}>

                                <Antd.Form.Item label={'Xắp xếp: '} name={'sortDir'} style={{ width: '100%' }} labelAlign='left' labelCol={{ span: 6 }} >
                                    <Antd.Switch defaultChecked={sortDir} onChange={(check, e) => { filter.sortDir = check 
                                    
                                        setSortDir(check)
                                    }}></Antd.Switch >
                                </Antd.Form.Item>

                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <SelectInventory initValue={filter.inventoryId} onChange={(id: number) => { filter.inventoryId = id }} spanLable={6} />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectSupplierV2 initValue={filter.supplierId} changeSupplierId={changeSupplierId} />
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <Antd.Form.Item label='Thời gian' name={'time'} labelCol={{ span: 24 }}  >
                            <Antd.DatePicker.RangePicker

                                defaultValue={[moment(filter.startDate), moment(filter.endDate)]}
                                size="large"
                                style={{ width: "100%" }}
                                ranges={{
                                    'Hôm nay': [moment().startOf('day'), moment().endOf('day')],
                                    'Tuần này': [moment().startOf('week'), moment().endOf('week')],
                                    'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                                    'Năm nay': [moment().startOf('year'), moment().endOf('year')],


                                }}
                                showTime
                                format="YYYY/MM/DD HH:mm:ss"
                                onChange={onTimeChange}
                            />
                        </Antd.Form.Item >


                    </Grid>
                </>
            )
        }
        return (

            <Antd.Drawer title="Lựa chọn thống kê" placement={'right'} onClose={closeFilter} visible={isOpenFilter}
                width={'35%'}
            >
                <Antd.Form onFinish={onSubmitFilter}>
                    <Grid item xs={12}>
                        <StatisticTypeOptions title="Thống kê: " data={TypeOptions} initValue={filter.type} onChange={(value: number) => {
                            filter.type = value
                            switch (value) {
                                case 1:
                                    filter.sortBy = ImportSortOptions[1].key
                                    filter.startDate = filter.endDate - 86399999

                                    break;
                                case 2:
                                    filter.sortBy = InventorySortOptions[2].key

                                    break;
                                    case 2:
                                        filter.sortBy = InventorySortOptions[2].key
                                        filter.startDate = filter.endDate - 86399999

                                        break;
                                default:
                                    filter.sortBy = 'import_number'

                                    break;
                            }
                            setType(value)

                        }}></StatisticTypeOptions>
                        <StatisticTypeOptions title="Kiểu thống kê: " data={InventoryTypeOption} initValue={filter.statisticsType} onChange={(value: number) => {
                            switch (value) {
                                case 1:
                                    filter.keySearch = ''
                                    break;
                                case 2:
                                    filter.keySearch = ''

                                    break;

                                default:
                                    filter.keySearch = ''
                                    break;
                            }
                            filter.statisticsType = value
                            setStatisticsType(value)
                        }}></StatisticTypeOptions>
                    </Grid>

                    {
                        type == 1 ? <ImportFilter /> : type == 2 ? <InventoryFilter /> : <ExportFilter/>

                    }


                    <Antd.Button htmlType="submit"> Lọc</Antd.Button>
                </Antd.Form  >




            </Antd.Drawer>
        )
    }

    return (
        <>
            <div className="p-5"  >
                <h1 style={{ fontSize: '30px', marginRight: 10,paddingLeft:17 }}  >Thống kê báo cáo </h1>

                <Antd.Spin spinning={loadding} tip={'Đang thống kê'} >

                    <StatisticsFilter />


                    {
                        filterProps.type == 1 ? <div className='p-5' style={{ width: '100%' }}>
                            {/* <div style={{width:'100%' ,height:800 }}> <BarChartStatistic imports={imports}></BarChartStatistic></div> */}

                            <Grid container spacing={2}>
                                <Grid item xs={4.5} container spacing={2}>
                                    <Grid item xs={12} >
                                        <Paper style={{ height: 290 }}>
                                            <CardDetails filter={filterProps} loadding={loadding} imports={imports} stokes={stokes}></CardDetails>

                                        </Paper>

                                    </Grid>

                                    <Grid item xs={12}>
                                        <Paper style={{ height: 290, width: '100%' }}>
                                            {imports ? <PieChartReturnImport imports={imports} stokes={[]} filter={filter}></PieChartReturnImport> : null}
                                        </Paper>
                                    </Grid>

                                </Grid>
                                <Grid item xs={7.5}>
                                    <Paper style={{ borderRadius: 5, height: 600, width: '100%', padding: 20 }}>
                                        {(imports  && imports.length)? <BarChartStatistic imports={imports}></BarChartStatistic> :
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>

                                                <Antd.Image
                                                    src="/no-data-rafiki.svg"
                                                    preview={false}
                                                    height={"50%"}
                                                    width={'50%'}


                                                >


                                                </Antd.Image>
                                            </div>
                                        }

                                    </Paper>
                                </Grid>
                                    <Grid item xs={12} >
                                     
                                            
                                            <Antd.Button style={{ width: '150px', fontSize: '14px', marginRight: 20,marginLeft:0 }} type="primary" onClick={()=>{showFilter()}}>
                                                <Antd.Space>
                                                    <SortDescendingOutlined />
                                                    Lọc thống kê
                                                </Antd.Space>
                                            </Antd.Button>


                                            <ExportExcelImportStatistic imports={imports}></ExportExcelImportStatistic>


                                    </Grid>
                                <Grid item xs={12}>
                                    {filterProps.viewType == 1 ? <ImportStatisticNomal imports={imports} onChange={() => { }}></ImportStatisticNomal> : <ImportStatisticExtend imports={imports} onChange={() => { }}></ImportStatisticExtend>}

                                </Grid>
                            </Grid>

                        </div> : filterProps.type == 2 ?




                            <Grid container spacing={2}>
                                <Grid item xs={4} container spacing={2}>
                                    <Grid item xs={12} >
                                        <Paper style={{ height: 300 }}>
                                        <CardDetails filter={filterProps} loadding={loadding} imports={imports} stokes={stokes}></CardDetails>

                                        </Paper>

                                    </Grid>

                                    <Grid item xs={12}>
                                        <Paper style={{ height: 300, width: '100%' }}>
                                            {imports ? <PieChartReturnImport imports={imports} stokes={stokes} filter={filter}></PieChartReturnImport> : null}
                                        </Paper>
                                    </Grid>

                                </Grid>
                                <Grid item xs={8}>
                                    <Paper style={{ borderRadius: 5, height: 620, width: '100%', padding: 20 }}>
                                        {stokes?.length > 0 ? <BarChartStatisticInventory inventoryStatistic={stokes}></BarChartStatisticInventory> :
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>

                                                <Antd.Image
                                                    src="/no-data-rafiki.svg"
                                                    preview={false}
                                                    height={"50%"}
                                                    width={'50%'}


                                                >


                                                </Antd.Image>
                                            </div>
                                        }

                                    </Paper>
                                </Grid>
                                    <Grid item xs={12} >
                                     
                                            
                                            <Antd.Button style={{ width: '150px', fontSize: '14px', marginRight: 20,marginLeft:0 }} type="primary" onClick={()=>{showFilter()}}>
                                                <Antd.Space>
                                                    <SortDescendingOutlined />
                                                    Lọc thống kê
                                                </Antd.Space>
                                            </Antd.Button>


                                            <ExportExcelImportStatistic imports={imports}></ExportExcelImportStatistic>


                                    </Grid>
                                    <Grid item xs={12}>
                                    <InventoryStatisticTable data={stokes} onChange={() => { }} ></InventoryStatisticTable>
                                    </Grid>
                                   
                            </Grid>

                            : null
                    }





                </Antd.Spin>

            </div>
            <Antd.Button style={{ right: 0, width: 40, height: 50, top: '45%', position: 'fixed', zIndex: 10 }} type={'primary'}
                icon={<KeyboardDoubleArrowLeftIcon />}
                onClick={() => { showFilter() }}></Antd.Button>


        </>


    )
}
export default Statistics