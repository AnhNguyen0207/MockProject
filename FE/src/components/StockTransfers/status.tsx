/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Button,
  Card,
  Col,
  message,
  Modal,
  PageHeader,
  Row,
  Space,
  Spin,
  Steps,
  Table,
  Tabs,
  Tag,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import "./file.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findDetailByExport } from "../../api/detail_export";
import {
  addExportByInventory,
  findExportById,
  importExportByInventory,
} from "../../api/export";
import {
  findExportStatusBygetByParentId,
  findExportStatusById,
  updateExportStatusById,
} from "../../api/export_status";
import { exportById, exportStatus, typeDetailExport } from "../type/data_type";
import { getProductVariants } from "../../api/inventory";
import {employeeDetailsApi, employeesApi} from "../../api/EmployeesApi";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import PDFStockTransfer from "../stock_transfers/PDFStockTransfer";
import {PDFViewer, PDFDownloadLink} from "@react-pdf/renderer";

import PrintIcon from "@mui/icons-material/Print";
import useTitle from "../../app/useTitle";
export const Status = () => {
  const { id } = useParams();
  const [exportById, setExportById] = useState<exportById>();
  const [detailExport, setDetailExport] = useState<typeDetailExport[]>([]);
  const [status, setStatus] = useState<exportStatus>();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);

  const [total, setTotal] = useState<number>(0);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [productVariant, setProductVariant] = useState<any>([]);
  const [statusUpdate, setStatusUpdate] = useState<exportStatus[]>([]);
  const [statusSend, setStatusSend] = useState<exportStatus[]>([]);
  const [check, setCheck] = useState<any>([]);

  useTitle("","Tạo phiếu chuyển hàng")
  const now = moment(new Date()).format("DD/MM/YYYY HH:mm").toString();
  const next = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(true);
    }, 500);
  };
  const user = useSelector((state: RootState) => state.user)
  // console.log(user)
  const handleOk = () => {
    setLoading(true);
    setTimeout(async () => {
      if (status?.status === 0) {
        const productExpri = productVariant.filter(
          (e: any) => e.quantity === 0
        );
        if (productExpri.length === 0) {
          await updateExportStatusById(item, {
            id: status?.id,
            export: item,
            dateSend: now,
            status: 1,
            note:
              statusUpdate.length > 0
                ? statusUpdate[statusUpdate.length - 1].note
                : status.note,
            accountSend:user.id,
          });
          await addExportByInventory(
            exportById?.exportInventory?.id,
            detailExport
          );
          message.success("Xuất phiếu chuyển hàng thành công");
        } else {
          message.error(
            "Sản phẩm trong kho không đủ xin vui lòng huỷ hoặc sửa phiếu"
          );
        }
      } else if (status?.status === 1) {
        await updateExportStatusById(item, {
          id: status?.id,
          export: item,
          dateReceive: now,
          status: 2,
          note:
            statusSend.length > 0
              ? statusSend[statusSend.length - 1].note
              : statusUpdate.length > 0
              ? statusUpdate[statusUpdate.length - 1].note
              : status.note,
          accountReceive:user.id,
        });
        await importExportByInventory(
          exportById?.receiveInventory?.id,
          detailExport
        );
        message.success("Nhận hàng thành công");
      }
      setIsModalOpen(false);
      setLoading(false);
      setCurrent(current + 1);
    }, 1000);
  };
  const handleOkCancel = async () => {
    if (status?.status === 0) {
      await updateExportStatusById(item, {
        id: status?.id,
        export: item,
        dateCancel: now,
        status: status?.status,
        statusCancel: true,
        accountCancel:user.id
      });
    } else if (status?.status === 1) {
      await updateExportStatusById(item, {
        id: status?.id,
        export: item,
        dateCancel: now,
        status: status?.status,
        statusCancel: true,
        accountCancel:user.id,
      });
      await importExportByInventory(
        exportById?.exportInventory?.id,
        detailExport
      );
    }

    setCurrent(current + 1);
    setIsModalCancel(false);
  };
  const handleError = async () => {
    setIsModalCancel(true);
  };
  const handleCancel = () => {
    setIsModalCancel(false);
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const handleEdit = () => {
    setLoadingEdit(true);
    setTimeout(() => {
      setLoadingEdit(false);
      navigate(`/coordinator/storage/stock_transfers/edit/${id}`);
    }, 500);
  };
  const [accountCreate,setAccountCreate] = useState<any>();
  const [accountSend,setAccountSend] = useState<any>();
  const [accountReceive,setAccountReceive] = useState<any>();
  const [accountCancel,setAccountCancel] = useState<any>();

  const data = async () => {
    const exportData = await findExportById(item);
    const detailExport = await findDetailByExport(item);
    const exportStatus = await findExportStatusById(item);
    const getAccountCreate = await employeesApi(exportStatus.accountCreate);
    // console.log(getAccountCreate)
    if(exportStatus.status === 1){
      const getAccountSend = await employeesApi(exportStatus.accountSend);
      setAccountSend(getAccountSend)

    }
    if(exportStatus.status === 2){
      const getAccountSend = await employeesApi(exportStatus.accountSend);
      const getAccountReceive = await employeesApi(exportStatus.accountReceive);
      setAccountSend(getAccountSend)
      setAccountReceive(getAccountReceive)
    }
    if(exportStatus.statusCancel){
      const getAccountCancel = await employeesApi(exportStatus.accountCancel);
    setAccountCancel(getAccountCancel)
    }
    const exportStatusByParentId = await findExportStatusBygetByParentId(
      exportStatus.id
    );
    const productVariant = await getProductVariants(
      exportData.exportInventory.id
    );

    detailExport.map((e: typeDetailExport) => {
      setProductVariant(
        productVariant.productVariants.filter(
          (pro: any) => pro.id === e.productVariant?.id
        )
      );
    });

    setAccountCreate(getAccountCreate);
    setExportById(exportData);
    setDetailExport(detailExport);
    setStatus(exportStatus);


    setStatusUpdate(
      exportStatusByParentId.filter((e: exportStatus) => e.status === 0)
    );
    setStatusSend(
      exportStatusByParentId.filter((e: exportStatus) => e.status === 1)
    );
    setLoading(false);
    let b = 0;
    detailExport.map((e: any) => {
      b += e.quantity * 1;
    });
    setTotal(b);
  };
  useEffect(() => {
    data();
  }, [current]);
  const dataProductExport = detailExport;

  const columns: ColumnsType<typeDetailExport> = [
    {
      title: "Mã hàng",
      dataIndex: "productVariant",

      render: (text) => {
        return <div>{text?.code}</div>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productVariant",

      render: (text) => {
        return <div>{text?.name}</div>;
      },
    },
    {
      title: "Số lượng chuyển",
      dataIndex: "quantity",
    },
  ];
  if (status?.status === 2) {
    columns.push({
      title: "Số lượng nhận",
      dataIndex: "quantity",
    });
  }
  if (id === undefined) {
    return <div></div>;
  }
  const item = Number.parseInt(id);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const style: React.CSSProperties = {
    // background: "#0092ff",
    padding: "8px 0",
  };
  // console.log(statusUpdate);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    }, 1000);
  }, []);
  // console.log(accountCreate)
  console.log(status)
  return (
    <Spin spinning={spin}>
      <div className="p-5">
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Quay lại tạo phiếu chuyển hàng"
            subTitle=""
            extra={[
              <Button
                key="3"
                onClick={handleError}
                danger
                hidden={
                  status?.status === 2 || status?.statusCancel ? true : false
                }
                className="rounded-md"
              >
                Huỷ
              </Button>,

              <Button
                key="2"
                type="primary"
                ghost
                hidden={
                  status?.status === 2 || status?.statusCancel ? true : false
                }
                onClick={handleEdit}
                loading={loadingEdit}
                className="rounded-md"
              >
                Sửa
              </Button>,
              <Button
                key="1"
                type="primary"
                onClick={next}
                hidden={
                  status?.status === 2 || status?.statusCancel ? true : false
                }
                loading={loading}
                className="rounded-md"
              >
                {status?.status === 1 ? "Nhận hàng" : "Chuyển hàng"}
              </Button>,
            ]}
          />
          <Modal
            title={
              status?.status === 0 ? (
                <h4 style={{ fontWeight: 700 }}>Xuất phiếu chuyển hàng</h4>
              ) : (
                <h4 style={{ fontWeight: 700 }}>Nhận hàng chuyển</h4>
              )
            }
            // open={isModalOpen}
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={"Xác nhận"}
            cancelText={"Thoát"}
            confirmLoading={loading}
          >
            {status?.status === 0 ? (
              <div>
                {" "}
                <div>
                  Thao tác này sẽ thay đổi thông số kho các sản phẩm trong phiếu
                  chuyển hàng:
                </div>
                <div>
                  <li>
                    {" "}
                    - Giảm tồn kho của chi nhánh{" "}
                    <span style={{ fontWeight: 700 }}>
                      {" "}
                      {exportById?.exportInventory?.name}{" "}
                    </span>
                  </li>
                  <li>
                    {" "}
                    - Tăng số lượng hàng đang về của chi nhánh{" "}
                    <span style={{ fontWeight: 700 }}>
                      {exportById?.receiveInventory?.name}
                    </span>
                  </li>
                </div>
                Bạn muốn xuất chuyển hàng phiếu chuyển này?{" "}
              </div>
            ) : (
              <div>
                Thao tác nhận hàng này sẽ tăng số lượng tồn kho các sản phẩm
                trong phiếu chuyển hàng của chi nhánh{" "}
                <span style={{ fontWeight: 700 }}>
                  {exportById?.receiveInventory?.name}
                </span>
                . Thao tác này không thể khôi phục.
              </div>
            )}
          </Modal>
          <Modal
            title={"Bạn chắc chắn muốn hủy phiếu chuyển hàng này?"}
            // open={isModalOpen}
            visible={isModalCancel}
            onOk={handleOkCancel}
            onCancel={handleCancel}
            okText={"Xác nhận"}
            cancelText={"Thoát"}
            confirmLoading={loading}
          >
            <div>
              Thao tác này sẽ hủy phiếu chuyển hàng {detailExport[0]?.code}.
              Thao tác này không thể khôi phục.
            </div>
          </Modal>
        </div>
        <div id="top-head-status" className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div>
              <b style={{fontSize:25}}>{detailExport[0]?.code || "--"}</b>{" "}
              {status?.status === 0 && !status?.statusCancel ? (
                <Tag className="rounded-3xl ml-3" color="blue">
                  Chờ chuyển
                </Tag>
              ) : (
                " "
              )}
              {status?.status === 1 && !status?.statusCancel ? (
                <Tag className="rounded-3xl ml-3" color="warning">
                  Đang chuyển
                </Tag>
              ) : (
                " "
              )}
              {status?.status === 2 && !status?.statusCancel ? (
                <Tag className="rounded-3xl ml-3" color="green">
                  Nhận hàng
                </Tag>
              ) : (
                " "
              )}
              {status?.statusCancel ? (
                <Tag className="rounded-3xl ml-3" color="red">
                  Đã huỷ
                </Tag>
              ) : (
                " "
              )}
            </div>
            {status?.status === 2 ?
            <div>
              <Space size="small">
                {
                  (exportById !== undefined && detailExport.length > 0 && status !== undefined) ? (
                      <PDFDownloadLink
                          fileName={"phieuChuyenHang - " + moment(status.createAt).format('DD/MM/YYYY HH:mm:ss aa') + ".pdf"}
                          document={<PDFStockTransfer statusExport={status} accountCreate ={accountCreate}  anExport={exportById}
                                                      detailExport={detailExport} />}>
                        {({blob, url, loading, error}) =>
                            <Button style={{padding:0,paddingLeft: 5,paddingRight: 5}} type='default'> <Space>
                              <PrintIcon style={{position: 'relative', top: 3,fontSize:16}}/>
                              In phiếu
                            </Space></Button>
                        }
                      </PDFDownloadLink>
                  ):<></>
                }
              </Space>
            </div>
                : ""}
          </div>

          <div>
            <Steps
              current={status?.status}
              size="small"
              labelPlacement="vertical"
            >
              <Steps.Step
                status={
                  status?.statusCancel && status?.status === 0
                    ? "error"
                    : status?.status === 0
                    ? "finish"
                    : "finish"
                }
                title={
                  status?.statusCancel && status?.status === 0
                    ? "Đã huỷ"
                    : "Chờ chuyển"
                }
                description={
                  status?.statusCancel && status?.status === 0
                    ? moment(status?.dateCancel).format("DD/MM/YYYY HH:mm")
                    : moment(status?.createAt).format("DD/MM/YYYY HH:mm")
                }
              />
              <Steps.Step
                status={
                  status?.statusCancel && status?.status === 1
                    ? "error"
                    : (status?.status || 0) > 1
                    ? "finish"
                    : status?.status === 1
                    ? "finish"
                    : "process"
                }
                title={
                  status?.statusCancel && status?.status === 1
                    ? "Đã huỷ"
                    : "Đang chuyển"
                }
                description={
                  status?.statusCancel && status?.status === 1
                    ? moment(status?.dateCancel).format("DD/MM/YYYY HH:mm")
                    : status?.dateSend
                    ? status?.dateSend
                    : " "
                }
              />
              <Steps.Step
                status={
                  status?.statusCancel && status?.status === 2
                    ? "error"
                    : status?.status === 2
                    ? "finish"
                    : "process"
                }
                title={
                  status?.statusCancel && status?.status === 2
                    ? "Đã huỷ"
                    : "Nhận hàng"
                }
                description={
                  status?.statusCancel && status?.status === 2
                    ? moment(status?.dateCancel).format("DD/MM/YYYY HH:mm")
                    : status?.dateReceive
                    ? status?.dateReceive
                    : " "
                }
              />
            </Steps>
          </div>
        </div>

        <div id="status-main" className="mt-5">
          <div className="grid grid-cols-6 gap-5">
            <Card
              className="col-span-4"
              title="Thông tin phiếu"
              extra={
                <a href="#" onClick={showModal} className="infor" type="Button">
                  Xem lịch sử phiếu chuyển hàng
                </a>
              }
            >
              <Modal
                title="Lịch sử thao tác phiếu chuyển hàng"
                visible={visible}
                onCancel={hideModal}
                footer={null}
                width={"50%"}
              >
                <table id="miyazaki">
                  <thead>
                    <tr>
                      <th>Người thao tác</th>
                      <th>Chức năng</th>
                      <th>Thao tác</th>
                      <th>Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {status?.status === 0 ? (
                      <>
                        <tr>
                          <td className="">{accountCreate.fullName}</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">Thêm mới phiếu chuyển hàng</td>
                          <td className="">
                            {moment(status?.createAt).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </td>
                        </tr>
                        {statusUpdate.length > 0
                          ? statusUpdate.map((e: exportStatus) => (
                              <tr>
                                <td className="">{accountCreate?.fullName}</td>
                                <td className="">Chuyển hàng</td>
                                <td className="">Cập nhật phiếu chuyển hàng</td>
                                <td className="">{e?.dateUpdate}</td>
                              </tr>
                            ))
                          : ""}
                        {status.statusCancel ? (
                          <tr>
                            <td className="">{accountCancel?.fullName}</td>
                            <td className="">Chuyển hàng</td>
                            <td className="">Huỷ phiếu chuyển hàng</td>
                            <td className="">
                              {moment(status?.dateCancel).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      " "
                    )}
                    {status?.status === 1 ? (
                      <>
                        <tr>
                          <td className="">{accountSend?.fullName}</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">Thêm mới phiếu chuyển hàng</td>
                          <td className="">
                            {moment(status?.createAt).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </td>
                        </tr>
                        {statusUpdate.length > 0
                          ? statusUpdate.map((e: exportStatus) => (
                              <tr>
                                <td className="">{accountSend?.fullName}</td>
                                <td className="">Chuyển hàng</td>
                                <td className="">Cập nhật phiếu chuyển hàng</td>
                                <td className="">{e?.dateUpdate}</td>
                              </tr>
                            ))
                          : ""}
                        <tr>
                          <td className="">{accountSend?.fullName}</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">{status?.dateSend}</td>
                        </tr>
                        {statusSend.length > 0
                          ? statusSend.map((e: exportStatus) => (
                              <tr>
                                <td className="">{accountSend?.fullName}</td>
                                <td className="">Chuyển hàng</td>
                                <td className="">Cập nhật phiếu chuyển hàng</td>
                                <td className="">{e?.dateUpdate}</td>
                              </tr>
                            ))
                          : ""}
                        {status.statusCancel ? (
                          <tr>
                            <td className="">{accountCancel?.fullName}</td>
                            <td className="">Chuyển hàng</td>
                            <td className="">Huỷ phiếu chuyển hàng</td>
                            <td className="">
                              {moment(status?.dateCancel).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      " "
                    )}
                    {status?.status === 2 ? (
                      <>
                        <tr>
                          <td className="">{accountCreate?.fullName}</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">Thêm mới phiếu chuyển hàng</td>
                          <td className="">
                            {moment(status?.createAt).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </td>
                        </tr>
                        {statusUpdate.length > 0
                          ? statusUpdate.map((e: exportStatus) => (
                              <tr>
                                <td className="">{accountSend?.fullName}</td>
                                <td className="">Chuyển hàng</td>
                                <td className="">Cập nhật phiếu chuyển hàng</td>
                                <td className="">{e?.dateUpdate}</td>
                              </tr>
                            ))
                          : ""}
                        <tr>
                          <td className="">{accountSend?.fullName}</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">{status?.dateSend}</td>
                        </tr>
                        {statusSend.length > 0
                          ? statusSend.map((e: exportStatus) => (
                              <tr>
                                <td className="">{accountSend?.fullName}</td>
                                <td className="">Chuyển hàng</td>
                                <td className="">Cập nhật phiếu chuyển hàng</td>
                                <td className="">{e?.dateUpdate}</td>
                              </tr>
                            ))
                          : ""}
                        <tr>
                          <td className="">{accountReceive?.fullName}</td>
                          <td className="">Chuyển hàng</td>
                          <td className="">Nhận hàng</td>
                          <td className="">{status?.dateReceive}</td>
                        </tr>
                      </>
                    ) : (
                      " "
                    )}
                  </tbody>
                </table>
              </Modal>

              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  <div style={style}>Chi nhánh chuyển </div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div style={style}>: {exportById?.exportInventory?.name}</div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div style={style}>Chi nhánh nhận </div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div style={style}>
                    : {exportById?.receiveInventory?.name}
                  </div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  <div style={style}>Ngày tạo phiếu </div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div style={style}>
                    : {moment(status?.createAt).format("DD/MM/YYYY HH:mm")}
                  </div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div style={style}>Người tạo </div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div style={style}>: {accountCreate?.fullName}</div>
                </Col>
              </Row>
              {status?.status === 1 ? (
                <Row gutter={16}>
                  <Col className="gutter-row" span={6}>
                    <div style={style}>Ngày chuyển hàng </div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div style={style}>
                      : {status?.dateSend}
                    </div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div style={style}>Người chuyển </div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div style={style}>: {accountSend?.fullName}</div>
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {status?.status === 2 ? (
                <>
                  <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                      <div style={style}>Ngày chuyển hàng </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div style={style}>
                        : {status?.dateSend}
                      </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div style={style}>Người chuyển </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div style={style}>: {accountSend?.fullName}</div>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                      <div style={style}>Ngày nhận hàng </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div style={style}>
                        :{" "}
                        {status?.dateReceive}
                      </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div style={style}>Người nhận </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div style={style}>: {accountReceive?.fullName}</div>
                    </Col>
                  </Row>
                </>
              ) : (
                ""
              )}
            </Card>
            <Card title="Thông tin bổ sung" className="col-span-2">
              <h4>Ghi chú</h4>
              {status?.note === undefined ? (
                <p>Chưa có ghi chú</p>
              ) : (
                <>
                  {statusSend.length > 0 ? (
                    <p>{statusSend[statusSend.length - 1]?.note}</p>
                  ) : (
                    <>
                      {statusUpdate.length > 0 ? (
                        <p>{statusUpdate[statusUpdate.length - 1]?.note}</p>
                      ) : (
                        <p>{status?.note}</p>
                      )}
                    </>
                  )}
                </>
              )}
            </Card>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab="Thông tin sản phẩm"
              key="1"
              style={{ backgroundColor: "while" }}
            >
              <Table
                rowKey="uid"
                columns={columns}
                dataSource={dataProductExport}
                loading={loading}
                pagination={false}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
        <div className="export-bottom-footer">
          <div className="footer">
            <li className="">
              <div className="">
                <span>
                  Tổng số lượng chuyển ({detailExport.length} sản phẩm) :
                </span>
              </div>
              <div className="">
                <span>{total}</span>
              </div>
            </li>
          </div>
        </div>
        <div />
      </div>
    </Spin>
  );
};
