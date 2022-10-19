import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import BarChartReprot from "./BarChartReport";
import LineChartReport from "./LineChartReport";
import PieChartReport from "./PieChartReport";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import {useEffect} from "react";

export default function HomePage() {
  useEffect(() =>{
    document.title= "Trang chủ"
  },[])
  return (
    <div className="bg-[#DFF6FF] p-5">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={6}>
              <Card className="rounded-3xl border-none shadow-md">
                <Meta
                  avatar={<Avatar className="bg-red" src="https://joeschmoe.io/api/v1/random" />}
                  style={{ alignSelf: "center" }}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card className="rounded-3xl border-none shadow-md">
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  style={{ alignSelf: "center" }}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card className="rounded-3xl border-none shadow-md">
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  style={{ alignSelf: "center" }}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card className="rounded-3xl border-none shadow-md">
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  style={{ alignSelf: "center" }}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row gutter={16}>
            <Col span={18}>
              <Row
                gutter={[16, 0]}
                className="p-5 rounded-3xl bg-white mt-2 mb-2 w-full h-full"
              >
                <Col span={6}>Bảng 1</Col>
                <Col span={6}>Tin 1</Col>
                <Col span={6}>Tin 2</Col>
                <Col span={6}>
                  <ArrowDownOutlined /> 12% So với tuần trước
                </Col>
                <Col span={24} style={{ height: "250px" }}>
                  <LineChartReport  />
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <div className="p-5 rounded-3xl bg-white mt-2 mb-2 w-full h-full">
                <Row>
                  <Col span={24}>Bảng 1</Col>
                  <Col span={24}>
                    <PieChartReport />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row gutter={16}>
            <Col span={12}>
              <div className="p-5 rounded-3xl bg-white mt-2 mb-2 w-full h-full">
                <div>Bảng 1</div>
                <BarChartReprot />
              </div>
            </Col>
            <Col span={12}>
              <div className="p-5 rounded-3xl bg-white mt-2 mb-2 w-full h-full">
                f
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
