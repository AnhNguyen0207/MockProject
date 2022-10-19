import { Col, Form, Row, Select } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";

const FilterBox = (props: any) => {
  console.log("filter");

  const onSearch = () => {
    const { filterName, filterValue } = filterForm.getFieldsValue();
    console.log(filterForm.getFieldsValue());
    console.log(filterName, filterValue);

    props?.search({
      filterName,
      filterValue,
    });
  };
  const [filterForm] = Form.useForm();

  return (
    <div>
      <Form form={filterForm}>
        <Row>
          <Col span={10}>
            <Form.Item name="filterName" initialValue="name" className="m-0">
              <Select defaultValue="code" className="w-max">
                <Select.Option value="code">Tìm theo code</Select.Option>
                <Select.Option value="name">Tìm theo tên</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item name="filterValue" className="m-0">
              <Search placeholder="Nhập để tìm kiếm" onSearch={onSearch} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default React.memo(FilterBox);
