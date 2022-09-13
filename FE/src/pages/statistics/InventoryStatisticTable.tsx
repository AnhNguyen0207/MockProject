import { Select, Tag } from "antd"
import Table, { ColumnProps } from "antd/lib/table"
import { useNavigate ,Link} from "react-router-dom"
import { ImportStatistic, InventoryStatistic, sortOption } from "../../type/allType"

interface Props {
    data: InventoryStatistic[],
    onChange?: Function|undefined
}

const InventoryStatisticTable = (props: Props) => {
    const { data, onChange } = { ...props }
    const navigate=useNavigate()
    const extendImportCol: ColumnProps<InventoryStatistic>[] = [
        {
            title: 'STT',
            dataIndex: 'productVariantCode',
            key: 'productVariantCode',
       
    
            render: (importCode: string,record:InventoryStatistic,index:number) => {
                return (
                    <p>{index+1}</p>
                )
            }
        },
        {
            title: 'Mã sản phẩm',
            dataIndex: 'productVariantCode',
            key: 'productVariantCode',
            width: '10%',
    
            render: (importCode: string,record:InventoryStatistic,index:number) => {
                return (
                    <Tag color="green" onClick={() => { navigate(`/warehouse/products/${record.productId}?backcode=statistic`) }}  >
                        <Link to={`/warehouse/products/${record.productId}?backcode=statistic`}>{importCode}</Link>
                    </Tag>
                )
            }
        },
    
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productVariantName',
            key: 'productVariantName',
        },
        {
            title: 'Tổng nhập',
            dataIndex: "importNumber",
            key: "importNumber",
            width: '7%',
            align: "center",
            render: (data: number) => {
                return (
                    data > 0 ? data : '---'
    
                )
            }
        },
        {
            title: "Số lượng trả",
            dataIndex: "returnNumber",
            key: "returnNumber",
            width: '7%',
            align: "center",
            render: (data: number) => {
                return (
                    data > 0 ? data : '---'
    
                )
            }
    
        },
    
       
        {
            title: "Tồn",
            dataIndex: "quantity",
            key: "quantity",
            width: '12%',
    
        }
    
    
    ]
    
    return (


        <Table style={{ height: 400 }}
            dataSource={data}
            columns={extendImportCol}
            bordered

        >

        </Table>
    )
}
export default InventoryStatisticTable