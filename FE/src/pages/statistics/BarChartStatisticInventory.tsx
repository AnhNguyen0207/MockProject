import { Checkbox, Col, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList, Text
} from "recharts";
import { ImportStatistic, InventoryStatistic } from "../../type/allType";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
interface Props {
  inventoryStatistic: InventoryStatistic[]
}
interface ChartValue {
  productVariantCode: string,
  productVariantName: string,
  importNumber: number,
  returnNumber: number,
  quantity: number
}
interface BarVisible {
  productVariantName: boolean,
  quantity: boolean,
  returnNumber: boolean,
  importNumber: boolean,
  totalPrice: boolean
}

const BarChartStatisticInventory = (props: Props) => {
  const [visible, setVisible] = useState<BarVisible>({
    productVariantName: false,
    quantity: true,
    returnNumber: true,
    importNumber: true,
    totalPrice: false
  })
  const { inventoryStatistic } = { ...props }
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  let dataChart: ChartValue[] = props.inventoryStatistic.filter(item => {
    var res: ChartValue = {
      productVariantCode: item.productVariantCode,
      productVariantName: item.productVariantName,
      importNumber: item.importNumber,
      returnNumber: item.returnNumber,
      quantity: item.quantity
    }
    return res
  })
  const [data, setData] = useState<ChartValue[]>(dataChart.slice(0, 10))


  useEffect(() => {
    setData(dataChart.slice((page - 1) * size, page * size))

  }, [props.inventoryStatistic])

  return (
    <div>
      <ResponsiveContainer width={'100%'} height={500}>
        <BarChart

          layout="horizontal"
          barSize={30}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}

        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={'productVariantName'} display={'none'}>
            {/* <Label value={'Biểu đồ tương quan '} position={'bottom'}></Label> */}
          </XAxis>

          <YAxis />
          <Tooltip />
          <Legend />

          {visible.importNumber ? <Bar dataKey="importNumber" name={'SL Tổng nhập'} stackId={0} fill={COLORS[0]} overflow='scroll'>

            {/* {(data.length<=10 && !visible.returnNumber&&!visible.receiveNumber)?<LabelList dataKey="name" position={'center'} />:
         <LabelList dataKey="returnNumber" position={'top'} />
        null
         } */}
                 //  <LabelList dataKey="importNumber" position={'top'} />


          </Bar> : null}
          {visible.quantity ?
            <Bar dataKey="quantity" name="SL Tồn kho" stackId={1} fill={COLORS[1]} >
              {/* {(data.length<=10 && !visible.returnNumber)?<LabelList dataKey="name" position={'center'} />:     */}
              <LabelList dataKey="quantity" position={'center'} />

            </Bar> : null}

          {visible.returnNumber ?
            <Bar dataKey="returnNumber" name="SL trả" stackId={1} fill={COLORS[2]} >
              {/* {data.length<=10?<LabelList dataKey="name" position={'center'} />:
            <LabelList dataKey="returnNumber" position={'top'} />
           } */}
              {/* <LabelList dataKey="returnNumber" position={'center'} /> */}

            </Bar>
            : null}


        </BarChart>
      </ResponsiveContainer>
      <div>
        <Row>
          <Col span={12}>
            <Checkbox defaultChecked={visible.quantity} onChange={(e) => {
              setVisible({ ...visible, quantity: !visible.quantity })
            }}>SL tồn</Checkbox>

            <Checkbox defaultChecked={visible.returnNumber} onChange={(e) => {
              setVisible({ ...visible, returnNumber: !visible.returnNumber })
            }}>Trả lại</Checkbox>
            <Checkbox defaultChecked={visible.importNumber} onChange={(e) => {
              setVisible({ ...visible, importNumber: !visible.importNumber })
            }}>SL đặt</Checkbox>
          </Col>
          <Col span={12}>

            <div style={{ display: 'flex', justifyContent: 'right' }}>
              <Pagination pageSize={size} total={data.length} onChange={(page, size) => {
                setPage(page)
                setSize(size)
                setData(dataChart.slice((page - 1) * size, page * size))

              }}
                showSizeChanger
                pageSizeOptions={[10, 20, 30]}
              ></Pagination>
            </div>

          </Col>

        </Row>



      </div >
    </div>

  );
}

export default BarChartStatisticInventory
