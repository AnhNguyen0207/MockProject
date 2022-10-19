import * as Antd from "antd";
import React, { useEffect, useState } from "react";
import { getSuppliers } from "../../services/api";
import { ISupplier } from "../../type/allType";



type Props = {
    initValue:number,
    changeSupplierId: (n: number) => void
}
var all:ISupplier[]=[{
    id:-1,
    code: 'Tất cả',
    name: '',
    email: '',
    address: '',
    phone: '',
    isDelete:false,
    accountId: '',
    updateAt: '',
    createdAt:'',
}]
const SelectSupplierV2 = ({ initValue,changeSupplierId }: Props) => {

    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [supplierId, setSupplierId] = useState<number>();
    useEffect(() => {
        getSuppliers().then((r) => {
            setSuppliers(all.concat(r.data))
        })
    }, [])
    const handleSelectSupplier = (key: number) => {
        setSupplierId(key)
        changeSupplierId(key)
    }
    return (
        <Antd.Form.Item label='Nhà cung cấp:' name={'supplierId'} labelCol={{ span: 6 }} labelAlign={'left'} >
            <Antd.Select style={{ width: '100%', marginBottom: 10, borderRadius: 5 }} size={'large'}
                showSearch
                placeholder="Nhấn để chọn nhà cung cấp"
                optionFilterProp="children"
                defaultValue={initValue}
                onChange={handleSelectSupplier}
                filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA!.children as unknown as string)
                        .toLowerCase()
                        .localeCompare((optionB!.children as unknown as string).toLowerCase())
                }

            >
                {

                <>
                 
                    {

                        suppliers.map((supplier, index) => {
                            return (
                                <Antd.Select.Option key={supplier.id} value={supplier.id}>
                                       {/* <Antd.Tag color=""></Antd.Tag>  */}
                                    {supplier.code + ' | ' + supplier.name}

                                </Antd.Select.Option>
                            )
                        })
                    }
                </>
                
                }

            </Antd.Select>
        </Antd.Form.Item>
    )
}
export default SelectSupplierV2