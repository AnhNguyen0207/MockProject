/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Button, Modal, Form, Input, Space, Row, Col, Select } from 'antd';

export default function TransoprtCompanyCreate() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formAdd] = Form.useForm();
    const {Option} = Select;


    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        formAdd.resetFields();
        setIsModalVisible(false)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validateMessages = {
        required: 'Không được để trống!',
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


    return (
        <>
            <div>
                <Button onClick={showModal} style={{ width: "121px" }} type="primary">
                    <Space>
                        Thêm mới
                    </Space>
                </Button>
            </div>
            <Modal
                title="Thêm mới nhà cung cấp"
                // visible={visible}
                // confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={700}
                footer={[]}
            >
                <div style={{ background: "white", padding: 24 }}>
                    <Form
                        form={formAdd}
                        // onFinish={onFormSubmit}
                        name="nest-messages"
                        layout="vertical"
                    >
                        <Form.Item label="Tên nhà cung cấp" name="name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Mã nhà cung cấp " name="code">
                                    <Input placeholder="Nhập tên nhà cung cấp" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Phone" name="phone"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            pattern: (/((09|03|07|08|05)+([0-9]{8})\b)/g),
                                            message: "SĐT không hợp lệ!"
                                        }
                                    ]}>
                                    <Input placeholder="Nhập SĐT" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                                    <Input placeholder="Nhập email" />
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{ height: '100%' }}>
                                <Form.Item label="Nhân viên phụ trách" name="account">
                                    <Select
                                        showSearch
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        // onChange={onChange}
                                        // onSearch={onSearch}
                                        listItemHeight={10} listHeight={250}
                                        filterOption={(input, option) =>
                                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                        }
                                        dropdownStyle={{ height: 100, width: 100 }}

                                    >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true }]}>
                            <Input placeholder="nhập địa chỉ nhà cung cấp" />
                        </Form.Item>
                        <Row>
                            <Col span={4}>
                                <Form.Item>
                                    <Button onClick={handleCancel}>Cancel</Button>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item>
                                    <Button htmlType="submit" type="primary">Submit</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </>
    )
}