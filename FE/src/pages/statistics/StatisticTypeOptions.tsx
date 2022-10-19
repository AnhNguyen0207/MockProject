import * as Antd from 'antd'
import { title } from 'process'
import { typeOption } from '../../type/allType'
interface Props{
    title:string,
    initValue:number,
    data:typeOption[],
    onChange:Function
}
const StatisticTypeOptions=(props:Props)=>{
    const {title,initValue,data,onChange}={...props}

    return (
        <Antd.Form.Item label={title} labelCol={{span:6}} labelAlign={'left'}>
        <Antd.Radio.Group defaultValue={initValue} buttonStyle="solid" onChange={(e) => {
    
            onChange( e.target.value)
        }}>
            {data.map((item,index)=>{
                return (
                    <Antd.Radio.Button value={item.key}>{item.value}</Antd.Radio.Button>

                )
            })}
        
        </Antd.Radio.Group>
    </Antd.Form.Item>
    )
}
export default StatisticTypeOptions