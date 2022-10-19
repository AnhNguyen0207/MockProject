import React, { useState } from "react";
import { Modal, Form, Input, Space } from "antd";
import ToastCustom from "../../features/toast/Toast";
import { Category } from "../../type/allType";
import { updateCategory } from "../../api/apiCategory";
import Button from "../../UI/Button";
import { PenIcon } from "../../UI";

type props = {
  status: () => void;
  categoryProp: any;
};

export default function CategoryUpdate({ status, categoryProp }: props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formUpdate] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    formUpdate.resetFields();
    setIsModalVisible(false);
  };

  formUpdate.setFieldsValue({
    id: categoryProp.id,
    name: categoryProp.name,
    description: categoryProp.description,
  });

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 13, span: 16 },
    labelCol: { span: 100 },
  };

  const handleUpdate = (category: Category) => {
    updateCategory(category, categoryProp.id)
      .then(() => {
        ToastCustom.fire({
          icon: "success",
          title: "Sửa thành công!",
        });
        formUpdate.resetFields();
        status();
        setIsModalVisible(false);
      })
      .catch(() => {
        ToastCustom.fire({
          icon: "error",
          title: "Sửa không thành công!",
        });
      });
  };
  return (
    <>
      <PenIcon className="text-blue-600" onClick={showModal} />

      <Modal
        title="Sửa Danh Mục"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={handleUpdate}
          form={formUpdate}
        >
          <Form.Item
            name="name"
            label="Nhập tên"
            rules={[
              {
                required: true,
                message: "Tên không được để trống!",
                pattern: /[A-Za-z0-9]/,
              },
            ]}
          >
            <Input placeholder="Tên" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Nhập mô tả"
            rules={[
              {
                required: true,
                message: "Mô tả không được để trống!",
                pattern: /[A-Za-z0-9]/,
              },
            ]}
          >
            <Input placeholder="Mô tả" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button htmlType="submit">Xác nhận</Button>
              <Button htmlType="button" mode="cancel" onClick={handleCancel}>
                Thoát
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
