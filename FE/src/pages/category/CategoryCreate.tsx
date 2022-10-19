import React, { useState } from "react";
import { Modal, Form, Input, Space } from "antd";
import ToastCustom from "../../features/toast/Toast";
import { Category } from "../../type/allType";
import { createCategory } from "../../api/apiCategory";
import Button from "../../UI/Button";
import { PlusOutlined } from "@ant-design/icons";

type props = {
  status: () => void;
};
export default function CategoryCreate({ status }: props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formAdd] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    formAdd.resetFields();
    setIsModalVisible(false);
  };

  /*Layout form*/
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 13, span: 16 },
    labelCol: { span: 100 },
  };

  const handleCreate = async (category: Category) => {
    await createCategory(category)
      .then(() => {
        ToastCustom.fire({
          icon: "success",
          title: "Thêm thành công!",
        });
        formAdd.resetFields();
        status();
        setIsModalVisible(false);
      })
      .catch(() => {
        ToastCustom.fire({
          icon: "error",
          title: "Thêm không thành công!",
        });
      });
  };
  return (
    <>
      <div>
        <Button style={{height: "37px"}} onClick={showModal}><PlusOutlined />Thêm mới</Button>
      </div>
      <Modal
        title="Thêm mới Danh Mục"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={handleCreate}
          form={formAdd}
        >
          <Form.Item name="name" label="Tên" rules={[{ required: true, message:"Tên không được để trống!", pattern:/[A-Za-z0-9]/  }]}>
            <Input placeholder="Nhập Tên" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message:"Mô tả không được để trống!", pattern:/[A-Za-z0-9]/ }]}
          >
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button htmlType="submit">Xác nhận</Button>
              <Button mode="cancel" onClick={handleCancel}>
                Thoát
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}