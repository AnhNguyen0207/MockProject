/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import {
  Select,
  Popconfirm,
  Input,
  PageHeader,
  message,
  Spin,
  Empty,
  TablePaginationConfig,
  Modal, Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { findProductById } from "../../api/product_variant";
import "./file.css";
import {
  findInventoryById, getAllActiveInventory,
  getAllInventory,
  getProductVariants,
} from "../../api/inventory";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMutation } from "@tanstack/react-query";
import { createExport } from "../../api/export";
import { creatDetailExport } from "../../api/detail_export";
import { Button } from "antd";
import { DataType, inventory } from "../type/data_type";
import { DeleteTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { createExportStatus } from "../../api/export_status";
import { TableRowSelection } from "antd/lib/table/interface";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

const Create: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [inventorySend, setInventorySend] = useState<inventory | undefined>();
  const [inventoryReceive, setInventoryReceive] = useState<
    inventory | undefined
  >();
  const [exportId, setExportId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [inventoryId, setInventoryId] = useState(7);
  const [productVariant, setProductVariant] = useState<any>();
  const [code, setCode] = useState<any>();
  const [note, setNote] = useState<any>();
  const navigate = useNavigate();
  const exportValue = {
    exportInventory: inventorySend,
    receiveInventory: inventoryReceive,
  };
  const user = useSelector((state: RootState) => state.user)
  // console.log(user)

  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    document.title = "Tạo phiếu chuyển hàng";
    let b = 0;
    products.map((e: any) => {
      b += e.quantity * 1;
    });
    setTotal(b);
    setQuantityProducts(products.length);
  }, [products]);
  const handleDelete = (e: any) => {
    const newData = products.filter(
      (item: any) => item.getProductById.id * 1 !== e * 1
    );
    setProducts(newData);
  };
  const handleQuantity = (e: any) => {
    const quantity = e.target.value;
    const id = e.target.id * 1;
    const check = productVariant.find((a: any) => a.id === id);
    if (quantity * 1 <= 0) {
      message.warning("Số lượng sản phẩm không hợp lệ");
      const newData = products.filter(
        (item: any) => item.getProductById.id * 1 !== id
      );
      setProducts(newData);
    }
    if (quantity > check.quantity) {
      message.warning("Số lượng sản phẩm có trong kho không đủ");
    } else {
      setProducts((prev: any) => {
        prev.map((prod: any) => {
          if (prod.getProductById.id === id) {
            prod.quantity = quantity * 1;
          }
        });
        return [...prev];
      });
    }
  };
  const data: DataType[] = products;
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã hàng",
      dataIndex: "getProductById",
      render: (text) => {
        return <div>{text?.code}</div>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "getProductById",
      render: (text) => {
        return <div>{text?.name}</div>;
      },
    },
    {
      title: "Số lượng chuyển",
      dataIndex: ["quantity", "getProductById"],
      render: (a, text) => {
        return (
          <Input
            type={"number"}
            style={{ width: "50%" }}
            onChange={handleQuantity}
            id={text?.getProductById.id}
            key={text?.getProductById.id}
            value={text.quantity}
            min={0}
            size={"middle"}
          />
        );
      },
    },
    {
      dataIndex: ["getProductById"],
      render: (text) => {
        return (
          <Popconfirm
            id={text?.id}
            key={text?.id}
            title="Chắc chắn xoá ?"
            onConfirm={() => handleDelete(text?.id)}
            okText={"Ok"}
            cancelText={"No"}
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      },
    },
  ];
  const [quantityProducts, setQuantityProducts] = useState<number>(0);

  const handleClickOptionProduct = (e: any) => {
    const id = e[1] * 1;
    const isFound = products.findIndex(
      (element: any) => element.getProductById.id === id
    );
    const hanldeClick = async () => {
      const getProductById = productVariant.find((a: any) => a.id === id);
      if (getProductById.quantity === 0) {
        message.warning("Sản phẩm đã hết hàng");
      } else {
        setProducts([
          {
            getProductById: getProductById,
            quantity: 1,
          },
          ...products,
        ]);
      }
    };
    if (isFound < 0) {
      hanldeClick();
    } else {
      message.warning(
        <div style={{ color: "red" }}>Sản phẩm đã được chọn</div>
      );
      setProducts((prev: any) => {
        prev.map((prod: any) => {
          if (prod.getProductById.id === id) {
            prod.quantity = prod.quantity * 1 + 1;
          }
        });
        return [...prev];
      });
    }
  };

  const [listInventory, setListInventory] = useState<any>();
  const allQueries = async () => {
    const productVariant = await getProductVariants(inventoryId);
    const getListInventory = (await getAllActiveInventory()).data;
    setProductVariant(productVariant.productVariants);
    setListInventory(getListInventory);
  };

  useEffect(() => {
    allQueries();
    setProducts([]);
  }, [inventoryId]);

  const dataProduct = productVariant;

  const handleSubmit = async () => {
    setLoading(true);
    if (
      exportValue.receiveInventory !== undefined &&
      exportValue.exportInventory !== undefined &&
      products.length > 0
    ) {
      const saveExport = await createExport(exportValue);
      const exportId = saveExport.data.id;
      setExportId(exportId);
      const detailExport = products.map((e: any) => {
        return {
          productVariant: e.getProductById,
          quantity: e.quantity,
          export: exportId,
          code: "TPN000" + exportId,
        };
      });
      creatDetailExportSubmit.mutate(detailExport);
    } else {
      if (exportValue.receiveInventory === undefined) {
        message.error(
          <div style={{ color: "red" }}>Chi nhánh nhận chưa được chọn</div>
        );
      } else if (exportValue.exportInventory === undefined) {
        message.error(
          <div style={{ color: "red" }}>Chi nhánh chuyển chưa được chọn</div>
        );
      } else if (products.length === 0) {
        message.error(
          <div style={{ color: "red" }}>
            Vui lòng chọn sản phẩm vào phiếu chuyển hàng
          </div>
        );
      }

      setLoading(false);
    }
  };

  const creatDetailExportSubmit = useMutation((item: any) =>
    creatDetailExport(item)
  );
  const handleNote = (e: any) => {
    setNote(e.target.value);
  };
  const handleStatus = async (id?: number) => {
    if (code !== undefined) {
      await createExportStatus({
        export: id,
        status: 0,
        code: code,
        note: note,
        accountCreate:user.id
      });
    } else {
      await createExportStatus({
        export: id,
        status: 0,
        code: "TPN000" + id,
        note: note,
        accountCreate:user.id

      });
    }
    message.success(<div>Thêm mới thành công</div>, 2);
    navigate(`/coordinator/storage/stock_transfers/${id}`, { replace: true });
  };
  if (creatDetailExportSubmit.isSuccess) {
    handleStatus(exportId);
  }

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 3,
  });
  const [spin, setSpin] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    }, 1000);
  }, []);

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
  const handleClear = () =>{
    setSend(null)
    setReceive(null)
    setInSend(listInventory)
    setInReceive(listInventory)
  }
  const handleClickOptionSend = async (e: any) => {
    setSend(e)
    setInventoryId(e);
    const exportByInventory = await findInventoryById(e);
    setInventorySend(exportByInventory);
    setInReceive(listInventory.filter((i: any) => i.id !== e));
  };
  const handleClickOptionReceive = async (e: any) => {
    setReceive(e)
    const exportReceive = await findInventoryById(e);
    setInventoryReceive(exportReceive);
    setInSend(listInventory.filter((i: any) => i.id !== e));
  };
  const handleCode = (e: any) => {
    setCode(e.target.value);
  };

  const [modal2Visible, setModal2Visible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns_modal: ColumnsType<DataType> = [
    {
      title: "Mã hàng",
      dataIndex: "code",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: ["quantity", "id"],
      render: (a, text) => {
        return (
          <Input
            type={"number"}
            style={{ width: "50%" }}
            onChange={handleQuantity}
            id={text?.id + ""}
            key={text?.id}
            defaultValue={1}
            min={1}
            max={text.quantity}
            size={"middle"}
          />
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record, selected, selectedRows) => {
      const id = record.id;
      if (selected) {
        const isFound = products.findIndex(
          (element: any) => element.getProductById.id * 1 === id
        );
        const hanldeClick = async () => {
          const getProductById = await findProductById(id as any);
          setProducts([
            {
              getProductById: getProductById,
              quantity: 1,
            },
            ...products,
          ]);
        };
        if (isFound < 0) {
          hanldeClick();
        } else {
          setProducts((prev: any) => {
            prev.map((prod: any) => {
              if (prod.getProductById.id === id) {
                prod.quantity = prod.quantity * 1 + 1;
              }
            });
            return [...prev];
          });
          console.log("san pham da chon");
        }
      } else {
        const newData = products.filter(
          (item: any) => item.getProductById.id * 1 !== id
        );
        setProducts(newData);
      }
    },
    onSelectAll(selected, selectedRows, changeRows) {
      setProducts(
        selectedRows.map((e) => ({
          getProductById: e,
          quantity: 1,
        }))
      );
    },
    getCheckboxProps: (record: DataType) => {
      return {
        disabled: record.quantity === 0,
      };
    },
  };
  const [pagination1, setPagination1] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 3,
  });
  const handlePagination = (page: any) => {
    setPagination1({
      current: page.current,
    });
  };
  return (
    <Spin spinning={spin}>
      <div className="p-5">
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Tạo phiếu chuyển hàng"
            subTitle=""
            extra={[
              <Button
                key="2"
                onClick={() => window.history.back()}
                className="rounded-md"
              >
                Thoát
              </Button>,

              <Button
                key="1"
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                className="rounded-md"
              >
                Lưu
              </Button>,
            ]}
          />
        </div>
        <div className="content">
          <div className="content-top">
            <div className="select-inventory">
              <div className="title">
                <h3>Thông tin phiếu</h3>
              </div>
              <div className="select-inventory-left">
                <div className="select-inventory-top">
                  <div className="title-p">
                    <p>Chi nhánh chuyển </p>
                    <span style={{ color: "red" }}>*</span>
                  </div>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    dropdownStyle={{ height: 150, width: 1000000 }}
                    onSelect={handleClickOptionSend}
                    placeholder="Tìm kiếm chi nhánh"
                    allowClear
                    value={send}
                  >
                    {inSend &&
                      inSend?.map((item: inventory) => (
                        <Select.Option
                          style={{ width: "100%" }}
                          key={item.id}
                          value={item.id}
                        >
                          {
                            item.size ? (
                                <div>
                                  {item.name }
                                  <Tag style={{marginLeft:10}} color="red">Đã đầy </Tag>
                                </div>
                            ) : (
                                <div>
                                  {item.name }
                                  <Tag style={{marginLeft:10}} color="green">Còn trống</Tag>
                                </div>
                            )
                          }
                        </Select.Option>
                      ))}
                  </Select>
                </div>
                <div className="select-inventory-top">
                  <div className="title-p">
                    <p>Chi nhánh nhận </p>
                    <span style={{ color: "red" }}>*</span>
                  </div>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    dropdownStyle={{ height: 150, width: 3000000 }}
                    placeholder="Tìm kiếm chi nhánh"
                    onSelect={handleClickOptionReceive}
                    allowClear
                    value={receive}
                  >
                    {inReceive &&
                      inReceive?.map((item: inventory) => (
                        <Select.Option
                          style={{ width: "100%" }}
                          key={item.id}
                          value={item.id}
                        >
                          {
                            item.size ? (
                                <div>
                                  {item.name }
                                  <Tag style={{marginLeft:10}} color="red">Đã đầy </Tag>
                                </div>
                            ) : (
                                <div>
                                  {item.name }
                                  <Tag style={{marginLeft:10}} color="green">Còn trống</Tag>
                                </div>
                            )
                          }
                        </Select.Option>
                      ))}
                  </Select>
                </div>
                <div style={{display:"flex",marginTop:35}}><Button onClick={handleClear}>Xoá lựa chọn</Button></div>
              </div>
              <div className="select-inventory-left">
                <div className="select-inventory-top">
                  <div className="title-p">
                    <p>Mã phiếu chuyển</p>
                  </div>
                  <Input placeholder="Nhập mã phiếu" onChange={handleCode} />
                </div>
                <div className="select-inventory-top"></div>
              </div>
            </div>
            <div className="additional-information">
              <div className="title">
                <h3>Thông tin bổ sung</h3>
              </div>
              <div>
                <div className="title-p">
                  <p>Ghi chú</p>
                </div>
                <textarea
                  rows={3}
                  style={{ width: "100%" }}
                  placeholder={"VD : Giao hàng nhanh"}
                  onChange={handleNote}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="background-export">
            <div className="title">
              <h3>Thông tin sản phẩm</h3>
            </div>
            <div className="menu">
              <div className="menu-select">
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  dropdownStyle={{ width: 1000 }}
                  placeholder="Tìm kiếm sản phẩm"
                  onSelect={handleClickOptionProduct}
                  allowClear
                >
                  {productVariant !== undefined ? (
                    productVariant.map((item: DataType) => (
                      <Select.Option
                        value={[item.name, item.id]}
                        style={{ width: "100%" }}
                        key={item.id}
                      >
                        <div>
                          <div>Mã hàng : {item.code } -  Tên : {item.name}</div>
                          <div>
                            Số lượng : {item.quantity}
                          </div>
                        </div>
                      </Select.Option>
                    ))
                  ) : (
                    <Spin />
                  )}
                </Select>
              </div>
              <div className="Modal">
                <Button type="default" onClick={() => setModal2Visible(true)}>
                  Chọn nhanh
                </Button>

                {modal2Visible && (
                  <Modal
                    title="Chọn sản phẩm"
                    centered
                    visible={modal2Visible}
                    onCancel={() => setModal2Visible(false)}
                    footer={null}
                    width={"1000px"}
                  >
                    <div className="select-modal">
                      <Table
                        rowKey="id"
                        columns={columns_modal}
                        dataSource={dataProduct}
                        style={{ width: "100%" }}
                        scroll={{ y: 240 }}
                        rowSelection={rowSelection}
                        pagination={pagination1}
                        onChange={handlePagination}
                      />
                    </div>
                    <span style={{ color: "blue", fontWeight: 600 }}>
                      Bạn đã chọn {quantityProducts} sản phẩm
                    </span>
                  </Modal>
                )}
              </div>

            </div>
            <div>
              {products.length > 0 ? (
                <Table
                  rowKey="uid"
                  columns={columns}
                  dataSource={data}
                  style={{
                    width: "100%",
                  }}
                  scroll={{ y: 240 }}
                  pagination={pagination}
                  onChange={(page) => {
                    setPagination({
                      current: page.current,
                    });
                  }}
                />
              ) : (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 60,
                  }}
                  description={<span>Chưa chọn sản phẩm</span>}
                ></Empty>
              )}
            </div>
            <div className="export-bottom">
              <li className="">
                <div className="">
                  <span>
                    Tổng số lượng chuyển ({quantityProducts} sản phẩm) :
                  </span>
                </div>
                <div className="">
                  <span>{total}</span>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Create;
