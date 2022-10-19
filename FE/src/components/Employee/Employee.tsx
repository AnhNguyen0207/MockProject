import { useMutation } from "@tanstack/react-query";
import { Avatar, Form, Input, message, Modal, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import Role from "./Role";
import RoleSelect from "./RoleSelect";
import { Button, DeletedIcon, Table, PenIcon } from "../../UI";
import { accountApi, deleteEmpApi } from "../../api/EmployeesApi";
import { useState } from "react";
import useTitle from "../../app/useTitle";
import Swal from "sweetalert2";
import UploadImg from "./UploadImg";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

function Employee() {
  useTitle("Danh sách nhân viên", "Nhân viên");
  const columns: ColumnsType<DataType> = [
    // {
    //   title: <b>ID</b>,
    //   dataIndex: "id",
    //   render: (text: string) => <div>{text}</div>,
    // },
    {
      title: <b>Ảnh</b>,
      dataIndex: "employee",
      render: (employees) => (
        <Avatar
          style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
          src={employees && employees[0]?.avatar}
        >
          {(employees && employees[0]?.avatar) ||
            (employees && employees[0]?.fullName)}
        </Avatar>
      ),
    },
    {
      title: <b>Tài khoản</b>,
      dataIndex: "username",
      render: (text: string) => <div className="w-20">{text || "--"}</div>,
    },
    {
      title: <b>Họ & Tên</b>,
      dataIndex: "employee",
      render: (employees) => (
        <div>{(employees && employees[0]?.fullName) || "--.--"}</div>
      ),
    },
    {
      title: <b>SĐT</b>,
      dataIndex: "employee",
      render: (employees) => (
        <div>{(employees && employees[0]?.phone) || "--.--"}</div>
      ),
    },
    {
      title: <b>Email</b>,
      dataIndex: "employee",
      render: (employees) => (
        <div>{(employees && employees[0]?.email) || "--.--"}</div>
      ),
    },
    {
      title: <b>Địa chỉ</b>,
      dataIndex: "employee",
      render: (employees) => (
        <div style={{ width: "150px", textOverflow: "ellipsis" }}>
          {(employees && employees[0]?.address) || "--.--"}
        </div>
      ),
    },
    {
      title: <b>Chức vụ</b>,
      dataIndex: "roles",
      render: (roles, emp: any) => {
        return (
          <Role
            roles={roles?.sort()}
            empId={emp?.id}
            refetch={() => setReRender(!reRender)}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: ["id"],
      render: (id: number, record: any) => (
        <Space>
          <PenIcon />
          <DeletedIcon onClick={() => deleteEmpHandle(id, record)} />
        </Space>
      ),
    },
  ];

  let currentRoles: string[] = [];
  const setRole = (e: any) => {
    currentRoles = e;
  };
  // const [imageUrl, setImageUrl] = useState<string>();
  // const onImageChange = (url: string) => {
  //   setImageUrl(url);
  // };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [employeeForm] = Form.useForm();
  const postEmployee = useMutation<Record<string, string>, unknown, any>(
    (newEmployee: any) => {
      return axios.post("http://localhost:8080/api/account", newEmployee, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },
    {
      onError: (error, variables, context) => {
        message.error("Có lỗi xảy ra. Vui lòng thử lại!");
      },
      onSuccess: () => {
        message.success("Thêm thành công");
        setIsModalVisible(false);
      },
    }
  );
  const deleteEmpMutation = useMutation(deleteEmpApi, {
    onSuccess: () => {
      Swal.fire("Thành công!", "Đã thay đổi thành công", "success");
    },
    onError: () => {
      message.error("Xảy ra lỗi. Vui lòng thử lại!");
    },
  });
  const addEmployeeHandle = () => {
    const { username, password, fullName, email, phone, address, roles } =
      employeeForm.getFieldsValue();

    postEmployee.mutate({
      username,
      password,
      fullName,
      email,
      phone,
      address,
      roleString: roles,
    });
  };
  const deleteEmpHandle = (id: number, record: any) => {
    console.log(id);

    Swal.fire({
      icon: "question",
      title: "Thay đổi trạng thái",
      html: `Xác nhận xóa tài khoản <b>${record?.username || ""}</b>`,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#1890ff",
    }).then((e: any) => {
      if (e.isConfirmed) {
        deleteEmpMutation.mutate(id);
      }
    });
  };

  return (
    <div className="m-5">
      <div>
        <Button onClick={() => setIsModalVisible(true)}>Thêm nhân viên</Button>
      </div>
      <Table
        // rowSelection={{
        //   type: "checkbox",
        // }}
        columns={columns}
        query={accountApi}
        rowKey="id"
        rowClassName="cursor-default"
        style={{ cursor: "default" }}
      />
      <Modal
        title={"Thêm nhân viên"}
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          employeeForm.resetFields();
        }}
        footer={null}
        closeIcon={<div></div>}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
          name="addEmployee"
          onFinish={addEmployeeHandle}
          onFinishFailed={() => console.log(currentRoles)}
          className=""
          form={employeeForm}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Tên tài khoản không được để trống",
                pattern: /^[A-Za-z0-9_-]/,
              },
            ]}
            label="Tài khoản"
            name="username"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message:
                  "Mật khẩu tối thiểu 6 ký tự, ít nhất 1 chữ cái và 1 số, 1 ký tự đặc biệt",
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Họ tên không được để trống",
                pattern: /[A-Za-z0-9]/,
              },
            ]}
            label="Họ tên"
            name="fullName"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Không đúng định dạng email",
                pattern: new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="phone"
            rules={[
              {
                required: true,
                message: "Không đúng định dạng số điện thoại",
                pattern:
                  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Địa chỉ không được để trống",
                pattern: /[A-Za-z0-9]/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <RoleSelect getRole={setRole} />
          <UploadImg />
          <Form.Item {...{ wrapperCol: { offset: 4, span: 16 } }}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Employee;
