import { Pagination,Checkbox } from "antd";
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
import { ImportStatistic } from "../../type/allType";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
interface Props {
  imports: ImportStatistic[]
}
interface ChartValue{
  name: string,
  
  receiveNumber:number,
  returnNumber: number,
  importNumber: number,
  totalPrice: number
}
interface BarVisible{
  name: boolean,
  receiveNumber:boolean,
  returnNumber: boolean,
  importNumber: boolean,
  totalPrice: boolean
}
const BarChartStatistic = (props: Props) => {
  const { imports } = { ...props }
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  const [visible,setVisible]=useState<BarVisible>({ name: false,
    receiveNumber:true,
    returnNumber: true,
    importNumber: true,
    totalPrice: false})
  let dataChart:ChartValue[]= props.imports.filter(item => {
    return {
      name: item.name,
      receiveNumber: item.receiveNumber,
      returnNumber: item.returnNumber,
      importNumber: item.importNumber,
      totalPrice: item.totalPrice,
      code:item.code
    }
  })
  const [data, setData] = useState<ChartValue[]>(dataChart.slice(0,5))
  

  useEffect(()=>{
    setData(dataChart.slice((page-1)*size,page*size))

  },[props.imports])

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
        
          <XAxis dataKey={'name'}  display={'none'}  >
          </XAxis>
         
          <YAxis />
          <Tooltip />
          <Legend  />
         {visible.importNumber? <Bar dataKey="importNumber" name={'Số lượng đặt'} stackId={0} fill={COLORS[0]} overflow='scroll'>

         {/* {(data.length<=10 && !visible.returnNumber&&!visible.receiveNumber)?<LabelList dataKey="name" position={'center'} />:
         <LabelList dataKey="returnNumber" position={'top'} />
        null
         } */}
                 //  <LabelList dataKey="importNumber" position={'top'} />


          </Bar>:null}  
            {visible.receiveNumber?   
             <Bar dataKey="receiveNumber" name="Số lượng nhập kho" stackId={1} fill={COLORS[1]} >
            {/* {(data.length<=10 && !visible.returnNumber)?<LabelList dataKey="name" position={'center'} />:     */}
                <LabelList dataKey="receiveNumber" position={'center'} />

          </Bar>:null}
       
          {visible.returnNumber?   
           <Bar dataKey="returnNumber" name="Số lượng trả" stackId={1} fill={COLORS[2]} >
           {/* {data.length<=10?<LabelList dataKey="name" position={'center'} />:
            <LabelList dataKey="returnNumber" position={'top'} />
           } */}
                       {/* <LabelList dataKey="returnNumber" position={'center'} /> */}

         </Bar>
          :null}
       
         
        </BarChart>
      </ResponsiveContainer>
      <div>
      <Checkbox defaultChecked={visible.receiveNumber}  onChange={(e)=>{
        setVisible({...visible,receiveNumber:!visible.receiveNumber})
      }}>SL nhập</Checkbox>
         <Checkbox defaultChecked={visible.returnNumber}  onChange={(e)=>{
        setVisible({...visible,returnNumber:!visible.returnNumber})
      }}>Trả lại</Checkbox>
         <Checkbox defaultChecked={visible.importNumber}  onChange={(e)=>{
        setVisible({...visible,importNumber:!visible.importNumber})
      }}>SL đặt</Checkbox>
      </div>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Pagination pageSize={size} total={imports.length} onChange={(page, size) => {
          setPage(page)
          setSize(size)
          setData( dataChart.slice((page - 1) * size, page * size))

        }}
          showSizeChanger
          pageSizeOptions={[ 5, 10, 20]}
        ></Pagination>
      </div>

    </div>


  );
};

export default BarChartStatistic;
