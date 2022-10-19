
import { Delete } from '@mui/icons-material'
import * as Mui from '@mui/material'
import * as Antd from 'antd'
import { OptionAdd } from '../../type/allType'

interface ISelectOption{
    options:OptionAdd[],
    // onChange:Function|undefined|null,
    onOptionChange:Function,
    setOptions:Function,
    // addNewOption:Function,
    size:number,
}
const SelectOption = (props:ISelectOption) => {
    const { options,onOptionChange,setOptions ,size}={...props}
   
    const deleteOption = (key: number) => {

        options.splice(key, 1)
        onOptionChange()
    }
    const addNewOptionUI = () => {
        if (options.length < size) {

           setOptions(options.concat([{
                name: '',
                values: []
            }]))

        }

    }

    return (
        <>
            <Mui.Paper sx={{ px: 5, py: 2, height: 300 }} >
                <h1>Thêm thuộc tính</h1>

                {
                    options.map
                        ((option, index) => {
                            return (
                                <>

                                    <Antd.Input size={'large'} style={{

                                        width: '20%',
                                        margin: '10px 10px',
                                        borderRadius: 5



                                    }}
                                        defaultValue={option.name}
                                        onChange={(data) => {
                                            // let { name, values } = { ...option }
                                            options[index].name = data.target.value.toString()
                                            // onchange(index,data.target.value.toString(),values)
                                        }}
                                    ></Antd.Input>


                                    <Antd.Select key={index}
                                        size={'large'}
                                        mode="tags"
                                        placeholder="Nhập thuộc tính"
                                        style={{
                                            width: '60%',
                                        }}
                                        defaultValue={[...option.values]}
                                        onChange={(values) => {
                                            options[index].values = values
                                        }}
                                        onBlur={() => {
                                            onOptionChange()

                                        }}
                                    >

                                    </Antd.Select>
                                    {index === options.length - 1 ? <Mui.Button onClick={() => deleteOption(index)} endIcon={<Delete />} color={'error'} ></Mui.Button> : null}
                                </>


                            )
                        })}
                {options.length < size ? <Mui.Button sx={{ ml: 3 }} onClick={()=>addNewOptionUI()}>+ Thêm Thuộc tính</Mui.Button> : null
                }                  


            </Mui.Paper>
        </>
    )
}
export  default SelectOption