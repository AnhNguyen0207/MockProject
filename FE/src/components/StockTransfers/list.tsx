/* eslint-disable react-hooks/exhaustive-deps */
import {
    Button,
    Input,
    Modal,
    Pagination,
    PaginationProps,
    Select,
    Space,
    Spin,
    Table,
    Tag,
    Transfer,
} from "antd";
import {ColumnsType} from "antd/lib/table";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getExport} from "../../api/export";
import {
    exportById,
    inventory,
    listExport,
    paramExport,
} from "../type/data_type";
import type {TransferDirection} from "antd/es/transfer";
import SettingsIcon from "@mui/icons-material/Settings";
import Search from "antd/lib/input/Search";
import {SearchOutlined} from "@mui/icons-material";
import "./file.css";
import {getAllInventory} from "../../api/inventory";

interface RecordType {
    key: string;
    title: string;
    description: string;
    chosen: boolean;
}

export const ListExport = () => {
    const COLUMS: ColumnsType<listExport> = [
        {
            title: (
                <SettingsIcon
                    onClick={() => {
                        setColSettingModal(true);
                    }}
                />
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "exportsStatuses",
            key: "exportsStatuses",
            render: (text) => {
                // console.log(text);
                return (
                    <div>{moment(text[0]?.createAt).format("DD/MM/YYYY HH:mm")}</div>
                );
            },
        },
        {
            title: "Mã phiếu",
            dataIndex: "exportsStatuses",
            key: "exportsStatuses",
            render: (text) => {
                // console.log(text);
                return <div>{text[0].code}</div>;
            },
        },
        {
            title: "Chi nhánh chuyển",
            dataIndex: "exportInventory",
            key: "exportInventory",
            render: (text) => {
                return <div>{text?.name}</div>;
            },
        },
        {
            title: "Chi nhánh nhận",
            dataIndex: "receiveInventory",
            key: "receiveInventory",
            render: (text) => {
                return <div>{text?.name}</div>;
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "exportsStatuses",
            key: "exportsStatuses",
            render: (text) => {
                return (
                    <div>
                        {text[0].status === 0 ? (
                            <Tag color={"blue"} key={text[0].status}>
                                Chờ chuyển
                            </Tag>
                        ) : "" || text[0].status === 1 ? (
                            <Tag color={"warning"} key={text[0].status}>
                                Đang chuyển
                            </Tag>
                        ) : "" || text[0].status === 2 ? (
                            <Tag color={"green"} key={text[0].status}>
                                Đã nhận
                            </Tag>
                        ) : (
                            ""
                        )}
                    </div>
                );
            },
        },
        {
            title: "Ngày nhận",
            dataIndex: "exportsStatuses",
            key: "exportsStatuses",
            render: (text) => {
                return <div>{text[0]?.dateReceive}</div>;
            },
        },
    ];
    const [columns, setColumns] = useState<ColumnsType<listExport>>([
        {
            title: (
                <SettingsIcon
                    onClick={() => {
                        setColSettingModal(true);
                    }}
                />
            ),
            dataIndex: "expandable",
        },
        {
            title: "Ngày tạo",
            dataIndex: "exportsStatuses",
            key: "exportsStatuses",
            render: (text) => {
                // console.log(text);
                return (
                    <div>{moment(text[0]?.createAt).format("DD/MM/YYYY HH:mm")}</div>
                );
            },
        },
        {
            title: "Mã phiếu",
            dataIndex: "exportsStatuses",
            key: "exportsStatuses",
            render: (text) => {
                // console.log(text);
                return <div>{text[0].code}</div>;
            },
        },
        {
            title: "Chi nhánh chuyển",
            dataIndex: "exportInventory",
            key: "exportInventory",
            render: (text) => {
                return <div>{text?.name}</div>;
            },
        },
        {
            title: "Chi nhánh nhận",
            dataIndex: "receiveInventory",
            key: "receiveInventory",
            render: (text) => {
                return <div>{text?.name}</div>;
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "exportsStatuses",
            key: "exportsStatuses",
            render: (text) => {
                return (
                    <div>
                        {text[0].status === 0 && !text[0].statusCancel ? (
                            <Tag color={"blue"} key={text[0].status}>
                                Chờ chuyển
                            </Tag>
                        ) : "" || (text[0].status === 1 && !text[0].statusCancel) ? (
                            <Tag color={"warning"} key={text[0].status}>
                                Đang chuyển
                            </Tag>
                        ) : "" || (text[0].status === 2 && !text[0].statusCancel) ? (
                            <Tag color={"green"} key={text[0].status}>
                                Đã nhận
                            </Tag>
                        ) : "" || text[0].statusCancel ? (
                            <Tag color={"red"} key={text[0].statusCancel}>
                                Đã huỷ
                            </Tag>
                        ) : (
                            ""
                        )}
                    </div>
                );
            },
        },
    ]);
    const [mockData, setMockData] = useState<RecordType[]>([]);
    const [targetKeys, setTargetKeys] = useState<string[]>([
        "Ngày tạo",
        "Mã phiếu",
        "Chi nhánh chuyển",
        "Chi nhánh nhận",
        "Trạng thái ",
    ]);
    const getMock = () => {
        const tempTargetKeys = [];
        const tempMockData = [];
        for (let i = 1; i < COLUMS.length; i++) {
            const data = {
                key: COLUMS[i].title?.toString() || "",
                title: COLUMS[i].title?.toString() || "",
                description: COLUMS[i].title?.toString() || "",
                chosen: true,
                disabled: COLUMS[i].title?.toString() === "Mã phiếu",
            };
            if (data.chosen) {
                tempTargetKeys.push(data.key);
            }
            tempMockData.push(data);
        }
        setMockData(tempMockData);
        setTargetKeys(tempTargetKeys);
    };

    const handleChange = (newTargetKeys: string[]) => {
        const c = COLUMS.filter((c) => {
            if (c.title?.toString() === undefined) {
                return c;
            } else {
                return newTargetKeys.includes(c.title?.toString()) ? c : "";
            }
        });
        c.unshift(COLUMS[0]);
        setColumns(c);
        setTargetKeys(newTargetKeys);
    };

    //
    const [listExport, setListExport] = useState<listExport[]>([]);
    const [loading, setLoading] = useState(true);
    const [colSettingModal, setColSettingModal] = useState(false);
    const [total, setTotal] = useState();
    const [param, setParam] = useState<paramExport>();
    const [listInventory, setListInventory] = useState<any>();
    const [inSend, setInSend] = useState(listInventory);
    const [inReceive, setInReceive] = useState(listInventory);
    const [a, setA] = useState(1);
    useEffect(() => {
        if (listInventory === undefined) {
            setA(a + 1);
        }
        setInSend(listInventory);
        setInReceive(listInventory);
    }, [a]);
    const [send,setSend] = useState(null)
    const [receive,setReceive] = useState(null)
    const [status,setStatus] = useState(null)

    const handleClickOptionSend = async (e: any) => {
        setSend(e)
        setParam((prev) => ({
            ...prev,
            exportInventory: e,
        }));
        setInReceive(listInventory.filter((i: any) => i.id !== e));
    };
    const handleClickOptionReceive = async (e: any) => {
        setReceive(e)
        setParam((prev) => ({
            ...prev,
            receiveInventory: e,
        }));
        setInSend(listInventory.filter((i: any) => i.id !== e));
    };
    const onChange: PaginationProps["onChange"] = (page) => {
        // console.log(page);
        setLoading(true);
        setParam((prev) => ({
            ...prev,
            page: page,
        }));
    };
    const data = async () => {
        // @ts-ignore
        const exportData = await getExport(param);
        const getListInventory = await getAllInventory();
        setListExport(exportData.data);
        setTotal(exportData.total);
        setListInventory(getListInventory);
        setLoading(false);
    };
    useEffect(() => {
        setListExport([]);
        data();
        document.title = "Chuyển hàng";
    }, [param]);

    const dataA: listExport[] = listExport;
    const navigate = useNavigate();

    const hanldeClick = () => {
        navigate(`/coordinator/storage/stock_transfers/create`);
    };
    const hanldeRow = (e: any) => {
        navigate(`/coordinator/storage/stock_transfers/${e}`);
    };
    const [spin, setSpin] = useState(true);
    useEffect(() => {
        getMock();
        setTimeout(() => {
            setSpin(false);
        }, 1000);
    }, []);

    const onSearch = (e: any) => {
        setParam((prev) => ({
            ...prev,
            code: e,
        }));
    };
    const handleChangeSelect = (value: any) => {
        setStatus(value)
        if (value * 1 === 3) {
            // console.log("a");
            setParam((prev) => ({
                cancel: true,
            }));
        } else {
            setParam((prev) => ({
                ...prev,
                status: value,
                cancel: false,
            }));
        }
    };
    const handleSelect = () => {
        setParam({});
        setSend(null)
        setReceive(null)
        setStatus(null)
    }
    return (
        <Spin spinning={spin}>
            <div className="p-5">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "35px",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <h1 style={{fontSize: "30px", margin: 0, marginRight: 10}}>
                        Đơn chuyển hàng
                    </h1>
                    <Button type="primary" onClick={hanldeClick}>
                        + Tạo phiếu chuyển hàng
                    </Button>
                </div>
                <div style={{backgroundColor: "white"}}>
                    <div style={{display: "flex", textAlign: "center"}}>
                        <div style={{display: "flex", width: "50%"}}>
                            <Space direction="vertical">
                                <Search
                                    placeholder="Tìm kiếm theo mã phiếu"
                                    onSearch={onSearch}
                                    enterButton
                                    size="large"
                                    allowClear
                                    width={"50%"}

                                />
                            </Space>
                        </div>

                        <div
                            style={{
                                paddingTop: "20px",
                                paddingRight: "10px",
                            }}
                        >
                            <Select
                                style={{width: 120}}
                                onChange={handleChangeSelect}
                                placeholder={"Trạng thái"}
                                allowClear
                                value={status}
                            >
                                <Select.Option key={0}>Chờ chuyển</Select.Option>
                                <Select.Option key={1}>Đang chuyển</Select.Option>
                                <Select.Option key={2}>Đã nhận</Select.Option>
                                <Select.Option key={3}>Đã huỷ</Select.Option>
                            </Select>
                        </div>
                        <div
                            style={{
                                paddingTop: "20px",
                                paddingRight: "10px",
                            }}
                        >
                            <Select
                                showSearch
                                style={{width: "120px"}}
                                dropdownStyle={{height: 150, width: 1000000}}
                                onSelect={handleClickOptionSend}
                                placeholder="Chi nhánh chuuyển"
                                allowClear
                                value={send}
                            >
                                {inSend &&
                                    inSend.map((item: inventory) => (
                                        <Select.Option
                                            style={{width: "100%"}}
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </Select.Option>
                                    ))}
                            </Select>
                        </div>
                        <div
                            style={{
                                paddingTop: "20px",
                                paddingRight: "10px",
                            }}
                        >
                            <Select
                                showSearch
                                style={{width: "120px"}}
                                dropdownStyle={{height: 150, width: 3000000}}
                                placeholder="Chi nhánh nhận"
                                onSelect={handleClickOptionReceive}
                                allowClear
                                value={receive}
                            >
                                {inReceive &&
                                    inReceive.map((item: inventory) => (
                                        <Select.Option
                                            style={{width: "100%"}}
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </Select.Option>
                                    ))}
                            </Select>
                        </div>
                        <div
                            style={{
                                paddingTop: "20px",
                                paddingRight: "10px",
                            }}
                        >
                            <Button onClick={handleSelect}>Xoá bộ lọc</Button>
                        </div>
                    </div>
                    <div>
                        <Table
                            rowKey={"uid"}
                            columns={columns}
                            dataSource={dataA}
                            loading={loading}
                            bordered
                            onRow={(record, index) => {
                                return {
                                    onClick: () => hanldeRow(record?.id),
                                };
                            }}
                            pagination={false}
                        />
                        <Pagination
                            defaultCurrent={1}
                            total={total}
                            onChange={onChange}
                            style={{display: "flex", padding: 20, marginLeft: "60%"}}
                        />
                        {colSettingModal && (
                            <Modal
                                title="Điều chỉnh cột hiển thị"
                                visible={colSettingModal}
                                onCancel={() => setColSettingModal(false)}
                                footer={null}
                            >
                                <Transfer
                                    dataSource={mockData}
                                    targetKeys={targetKeys}
                                    onChange={handleChange}
                                    render={(item) => item.title}
                                />
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </Spin>
    );
};
