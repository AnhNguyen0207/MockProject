import * as Antd from "antd";
import React, { useEffect, useState } from "react";
import { getAllInventory } from "../../api/inventory";
import { inventory } from "../../components/type/data_type";
import { getSuppliers } from "../../services/api";
import { ISupplier } from "../../services/customType";
import { Inventory } from "../../type/allType";


type Props = {
    initValue:number,
    onChange: (n: number) => void,
    spanLable:number
}
var all:Inventory[]=[{
    id: -1,
    code: 'Tất cả',
    name: '',
    address: '',
    createAt: '',
    updateAt: '',
    isDelete: false
}]
const SelectInventory = (props: Props) => {
const {initValue, onChange ,spanLable}={...props}
    const [inventories, setInventories] = useState<Inventory[]>([]);
    useEffect(() => {
        getAllInventory().then((r) => {
            setInventories(all.concat(r.reverse()))
        })
    }, [])
    const handleSelect = (key: number) => {
        onChange(key)
    }
    return (
        <Antd.Form.Item label='Kho:' name={'inventoryId'} labelCol={{ span: spanLable }} labelAlign='left'  >
            <Antd.Select style={{ width: '100%', marginBottom: 10, borderRadius: 5 }} size={'large'}
                showSearch
                placeholder="Nhấn để chọn nhà cung cấp"
                optionFilterProp="children"
                defaultValue={initValue}
                onChange={handleSelect}
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

                        inventories.map((inventory, index) => {
                            return (
                                <Antd.Select.Option key={inventory.id} value={inventory.id}>

                                    {inventory.code + ' | ' + inventory.name}

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
export default SelectInventory