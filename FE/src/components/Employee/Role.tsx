import { IRole, IRoleLable } from "../../interface";
import { ROLE_COLOR } from "../../constant";
import { Form, message, Modal, Tag, Tooltip } from "antd";
import { useState } from "react";
import RoleSelect from "./RoleSelect";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../../UI";
import { PlusCircleOutlined } from "@ant-design/icons";

type props = {
  roles: [IRole];
  empId?: any;
  refetch?: any;
};

export default function Role({ roles, empId, refetch }: props) {
  const updateRole = useMutation<Response, unknown, any>(
    (data) => {
      return axios.patch(
        `http://localhost:8080/api/admin/roles/emp/${empId}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    },
    {
      onSuccess: () => {
        setModal(false);
        refetch && refetch();
      },
      onError: () => {
        message.error("Có lỗi xảy ra. Vui lòng thử lại");
      },
    }
  );
  const [roleForm] = Form.useForm();
  const [modal, setModal] = useState(false);
  const updateRoles = () => {
    updateRole.mutate({ rolesString: roleForm.getFieldValue("roles") });
  };

  return (
    <div className="w-36 flex gap-1 flex-wrap">
      {roles?.length > 0 ? (
        roles?.map((role: IRole) => {
          return (
            <Tooltip title={role?.description} key={role?.id}>
              <Tag
                className="cursor-pointer"
                onClick={() => setModal(true)}
                color={ROLE_COLOR[role?.name as keyof IRoleLable]}
              >
                {role?.name}
              </Tag>
            </Tooltip>
          );
        })
      ) : (
        <Tooltip title="Gán chức vụ">
          <PlusCircleOutlined
            className="cursor-pointer text-blue"
            onClick={() => setModal(true)}
          />
        </Tooltip>
      )}
      <Modal
        title="Role"
        visible={modal}
        onOk={() => updateRoles()}
        onCancel={() => setModal(false)}
        destroyOnClose
        footer={[
          <Button
            loading={updateRole.isLoading}
            key="submit"
            onClick={() => updateRoles()}
          >
            Sửa
          </Button>,
          <Button key="cancel" onClick={() => setModal(false)} mode="cancel">
            Hủy
          </Button>,
        ]}
      >
        <Form form={roleForm}>
          <RoleSelect empRole={roles?.map((e) => e.name)} />
        </Form>
      </Modal>
    </div>
  );
}
