import { Col, Image, Row } from "antd";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { ImportStatistic, InventoryStatistic, StatisticsFilter } from "../../type/allType";


const COLORS = [ "#FFBB28",  "#00C49F","#0088FE","#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
interface Props {
  imports: ImportStatistic[],
  stokes:InventoryStatistic[],
  filter:StatisticsFilter
}
const PieChartReturnImport = (props: Props) => {
  const { imports ,stokes,filter} = { ...props }
  const getData = (imports: ImportStatistic[]) => {
    var tong = 0
    var hoanTra = 0
    var nhapKho = 0
    imports.forEach((item, index) => {
      tong = tong + item.importNumber
      hoanTra = hoanTra + item.returnNumber
      nhapKho = nhapKho + item.receiveNumber
    })
    return [
      { name: 'Hoàn trả', value: hoanTra },
      { name: 'Nhập kho', value: nhapKho }


    ]
  }
  const getData2 = (stokes: InventoryStatistic[]) => {
    var tong = 0
    var hoanTra = 0
    var nhapKho = 0
    if(stokes)
    {
      stokes.forEach((item, index) => {
        tong = tong + item.importNumber
        hoanTra = hoanTra + item.returnNumber
        nhapKho = nhapKho + item.quantity
      })
   
      
    }
    return [
      { name: 'Hoàn trả', value: hoanTra },
      { name: 'Tồn', value: nhapKho }


    ]
 
   
  }
  
  var data = getData(imports)
  var data2=getData2(stokes)
  return (
    <Row style={{ padding: 20 }}>
      {filter.type==1?
     <Col span={14} style={{ height: 200 ,width:200, padding: 20 }}>
     {
        imports.length > 0 ?
         <ResponsiveContainer width="100%" height="100%">

           <PieChart {...props}>
             <Pie
               data={data}
               labelLine={false}
               label={renderCustomizedLabel}
               outerRadius={80}
               fill="#8884d8"
               dataKey="value"
             >
               {data.map((entry, index) => (
                 <Cell
                   key={`cell-${index}`}
                   fill={COLORS[index % COLORS.length]}
                 />
               ))}
             </Pie>
           </PieChart>


         </ResponsiveContainer>
         :
         <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
           <Image
             src="/no-data-v4.png"
             preview={false}
             width={'100%'}
             height={'100%'}


           >


           </Image>
         </div>}

   </Col>
   :  
   <Col span={14} style={{ height: 200, padding: 20 }}>
   {
      stokes?.length > 0 ?
       <ResponsiveContainer width="100%" height="100%">

         <PieChart {...props}>
           <Pie
             data={data2}
             labelLine={false}
             label={renderCustomizedLabel}
             outerRadius={80}
             fill="#8884d8"
             dataKey="value"
           >
             {data2.map((entry, index) => (
               <Cell
                 key={`cell-${index}`}
                 fill={COLORS[index % COLORS.length]}
               />
             ))}
           </Pie>
         </PieChart>


       </ResponsiveContainer>
       :
       <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
         <Image
           src="/no-data-v4.png"
           preview={false}
           width={'100%'}
           height={'100%'}


         >


         </Image>
       </div>}

 </Col>
    }
     
  
      <Col span={10} style={{ marginTop: '10%' }}>
        <Row style={{}} >
          {data.map((item, index) => {
            return (
              <Col key={index} span={24} style={{ marginLeft: 20 }} >

                <Row>
                  <Col span={12} >
                    <div className="flex items-center 2" >
                      <FiberManualRecordIcon style={{ color: COLORS[index] }} fontSize="small" /> {item.name}:
                    </div>
                  </Col>
                  <Col span={12}>{item.value}</Col>
                </Row>
              </Col>

            );
          })}
        </Row>


      </Col >
      <p style={{ textAlign: 'center', width: '100%' }}>Biểu đồ: <i > Tổng quát tỉ lệ nhận trả hàng</i> </p>
    </Row >
  );
};

export default PieChartReturnImport;
