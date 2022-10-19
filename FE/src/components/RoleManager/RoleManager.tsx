import { useMutation } from "@tanstack/react-query";
import { Form, Input, Modal, message, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { rolesApi } from "../../api/EmployeesApi";
import { IRole } from "../../interface";
import { DeletedIcon, PenIcon } from "../../UI";
import { Table, Button } from "../../UI";
import useTitle from "../../app/useTitle";

const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};
const RoleManager = () => {
  useTitle("Chức vụ","Chức vụ");
  const addRoleMutation = useMutation((roleData: IRole) => {
    return axios.post("http://localhost:8080/api/admin/roles", roleData, {
      headers,
    });
  });
  const updateRoleMutation = useMutation(
    (roleData: IRole) => {
      return axios.patch("http://localhost:8080/api/admin/roles", roleData, {
        headers,
      });
    },
    {
      onError(error, variables, context) {
        message.error("Có lỗi xảy ra. Vui lòng thử lại!");
      },
      onSuccess: () => {
        setAddRoleModal(false);
        message.success("Sửa thông tin thành công!");
      },
    }
  );
  const deleteRoleMutation = useMutation(
    (roleData: any) => {
      return axios.delete("http://localhost:8080/api/admin/roles", {
        data: roleData,
        headers,
      });
    },
    {
      onError(error, variables, context) {
        message.error("Có lỗi xảy ra. Vui lòng thử lại!");
      },
      onSuccess: () => {
        message.success("Xóa thành công!");
        setSelectedRowKeys([]);
      },
    }
  );
  const columns: ColumnsType<IRole> = [
    {
      title: <b>STT</b>,
      dataIndex: "id",
      render: (index, t) => <div>{index}</div>,
      // sorter: (a, b) => a.id - b.id,
    },
    {
      title: <b>Chức vụ</b>,
      dataIndex: "name",
      // sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: <b>Mô tả</b>,
      dataIndex: "description",
      render: (text: string) => {
        return <div>{text}</div>;
      },
    },
    {
      render: (_, record: IRole) => {
        return (
          <Space size="small">
            <PenIcon
              type="primary"
              onClick={() => {
                addRoleForm.setFieldsValue({
                  id: record.id,
                  name: record.name,
                  description: record.description,
                });
                setAddRoleModal(true);
                setMode("update");
              }}
            />
            <DeletedIcon
              onClick={() => {
                deleteRoles([record.id]);
              }}
            />
          </Space>
        );
      },
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [addRoleForm] = Form.useForm();
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [mode, setMode] = useState("new");
  const hasSelected = selectedRowKeys.length > 0;

  const deleteRoles = (id: number[]) => {
    Swal.fire({
      title: "Xóa vĩnh viễn!",
      icon: "question",
      html: `Xác nhận xóa chức vụ`,
      // <b>${selectedRowKeys.join(", ")}</b>`
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#1890ff",
    }).then((result) => {
      result.isConfirmed && deleteRoleMutation.mutate(id || selectedRowKeys);
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const addNewRole = () => {
    const { name, description, id } = addRoleForm.getFieldsValue();
    const data: IRole = {
      id: 0,
      name,
      description,
    };
    if (mode !== "new") {
      data.id = id;
      updateRoleMutation.mutate(data);
    } else {
      addRoleMutation.mutate(data);
    }
  };
  const handleCancel = () => {
    setAddRoleModal(false);
  };

  return (
    <div className="p-5">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button
            onClick={deleteRoles}
            disabled={!hasSelected}
            loading={deleteRoleMutation.isLoading}
            mode="delete"
          >
            Xóa
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} mục` : ""}
          </span>
          {/* <Button
            type="primary"
            onClick={() => {
              setAddRoleModal(true);
              setMode("new");
            }}
          >
            Thêm
          </Button> */}
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        query={rolesApi}
        columns={columns}
        rowKey="id"
      />

      <Modal
        title={mode === "new" ? "Thêm chức vụ" : "Sửa thông tin"}
        visible={addRoleModal}
        onOk={addNewRole}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            onClick={addNewRole}
            loading={updateRoleMutation.isLoading}
          >
            {mode === "new" ? "Tạo" : "Cập nhập"}
          </Button>,
          <Button key="back" onClick={handleCancel} mode="cancel">
            Hủy
          </Button>,
        ]}
      >
        <Form
          form={addRoleForm}
          name="addRoleForm"
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
        >
          <Form.Item label="Tên" name="id" style={{ display: "none" }}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true }, { message: "Tên không để trống!" }]}
          >
            <Input disabled={mode === "update"} />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true }, { message: "Mô tả không để trống!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManager;
