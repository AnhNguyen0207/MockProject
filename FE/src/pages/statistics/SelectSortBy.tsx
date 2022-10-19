import { Select } from "antd"
import { sortOption } from "../../type/allType"

interface ISelect{
    initValue:string,
    sortOptions:sortOption[],
    onChange:Function
}

const SelectSortby=(props:ISelect)=>{
    const {initValue,sortOptions,onChange}={...props}
    return (

        <>
        <Select onChange={(value,option)=>onChange(value)} defaultValue={initValue}>
        
            {sortOptions.map((item,index)=>{
                return (
                    <Select.Option key={item.key} value={item.key}>
                            {item.value}
                    </Select.Option>
                )
            })}

        </Select>
        
        </>
    )
}
export default SelectSortby