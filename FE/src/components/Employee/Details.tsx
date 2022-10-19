import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Form, Input, Skeleton } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { employeeDetailsApi, updateEmployeeApi } from "../../api/EmployeesApi";
import { IRole } from "../../interface";
import RoleSelect from "./RoleSelect";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [infomationEmployeeForm] = Form.useForm();
  const [employeePasswordForm] = Form.useForm();
  const [employeeAvatarForm] = Form.useForm();
  const setRole = () => {};
  const { data, isLoading, error } = useQuery(["empDetails"], () =>
    employeeDetailsApi(id)

  );

  const updateEmployee = useMutation((employeeDetail: any) =>
    axios.post(`http://localhost:8080/api/roles/emp/${id || 0}`, employeeDetail)
  );

  const updateEmployeeHandle = () => {
    const { username, fullName, email, phone, address, roles } =
      infomationEmployeeForm.getFieldsValue();
    // console.log(username, fullName, email, phone, address, roles);
    updateEmployee.mutate({
      username,
      fullName,
      email,
      phone,
      address,
      roles,
    });

    console.log(updateEmployee);
  };

  if (isLoading) {
    return <Skeleton />;
  }
  if (error) {
    return <div>err</div>;
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="../">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="../employees">
          <UserOutlined />
          <span>Employees</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{data?.employee[0]?.fullName}</Breadcrumb.Item>
      </Breadcrumb>
      {data && (
        <div className="flex grid-cols-2 w-full mt-10">
          <div className="w-2/5">
            <div>
              <Form
                name="employeePassword"
                form={employeePasswordForm}
                {...{ labelCol: { span: 8 }, wrapperCol: { span: 12 } }}
              >
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="rePassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your confirm password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item {...{ wrapperCol: { offset: 8, span: 12 } }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="w-3/5">
            <Form
              {...{ labelCol: { span: 4 }, wrapperCol: { span: 16 } }}
              name="updateInfomationEmployee"
              onFinish={updateEmployeeHandle}
              //   onFinishFailed={() => console.log(currentRoles)}
              form={infomationEmployeeForm}
            >
              <Form.Item
                label="User name"
                name="username"
                initialValue={data?.username}
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Please input your name!" }]}
                label="Full name"
                name="fullName"
                initialValue={data?.employee[0]?.fullName}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    pattern: new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/),
                  },
                ]}
                initialValue={data?.employee[0]?.email}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                initialValue={data?.employee[0]?.phone}
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                initialValue={data?.employee[0]?.address}
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input />
              </Form.Item>
              <RoleSelect
                getRole={setRole}
                empRole={data?.roles?.map((r: IRole) => r.name)}
              />
              <Form.Item {...{ wrapperCol: { offset: 4, span: 16 } }}>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}