/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { TransportCompany } from "../../type/allType";
import type { ColumnsType } from 'antd/es/table';
import axios from "axios";
import { Table } from "antd";
import TransoprtCompanyCreate from "./TransoprtCompanyCreate";

export default function TransportCompanies() {
    const [response, setResponse] = useState<TransportCompany[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [status, setStatus] = useState(false);

    useEffect(function getAll() {
        axios.get(`http://localhost:8080/api/transport_companies`)
          .then(response => {
            setResponse(response.data);
          }).catch(error => {
            console.log(error);
          });
      }, [status])

    const data: TransportCompany[] = response;

    const columns: ColumnsType<TransportCompany> = [
        {
            title: 'Mã đơn vị vận chuyển',
            dataIndex: 'code',
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        }
    ];

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
      };
    
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };

    //   let hasSelected = selectedRowKeys.length > 0;
    //   let hasOneSelected = selectedRowKeys.length === 1;

    return (
        <>  <h1 className="ant-typography">Đơn vị vận chuyển</h1>
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
            <TransoprtCompanyCreate/>
        </div>
            <Table rowKey={'id'} rowSelection={rowSelection} columns={columns} dataSource={data} />
        </>
    )
}