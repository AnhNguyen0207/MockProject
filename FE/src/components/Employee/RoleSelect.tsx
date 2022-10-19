import { useQuery } from "@tanstack/react-query";
import { Form, Select, Tag } from "antd";
import axios from "axios";
import { ROLE_COLOR } from "../../constant";
import { IRole, IRoleLable } from "../../interface";

let roleChildren: any = [];
export default function RoleSelect(props: any) {
  useQuery(["roleid"], async () => {
    const { data } = await axios.get("http://localhost:8080/api/admin/roles", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    roleChildren = [...data];
  });

  const tagRender = (props: any) => {
    const { label } = props;

    return (
      <Tag
        color={ROLE_COLOR[label as keyof IRoleLable]}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Form.Item
      name="roles"
      label="Role"
      rules={[{ required: true, message: "quyền không được để trống" }]}
      initialValue={props?.empRole || []}
    >
      <Select
        mode="multiple"
        allowClear
        placeholder="Chọn quyền muốn thêm"
        tagRender={tagRender}
        dropdownMatchSelectWidth={false}
        getPopupContainer={(trigger) => trigger}
        virtual={false}
      >
        {roleChildren.map((child: IRole) => {
          return <Select.Option key={child.name}>{child.name}</Select.Option>;
        })}
      </Select>
    </Form.Item>
  );
}
