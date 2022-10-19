import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const PageResult = (props: any) => {
  const navigate = useNavigate();

  if (props?.type === "err") {
    return (
      <Result
        {...props}
        status="404"
        title="404"
        subTitle="Có lỗi xảy ra"
        extra={
          <Button
            onClick={() => navigate("/", { replace: true })}
            type="primary"
          >
            Trang chủ
          </Button>
        }
      />
    );
  }

  return (
    <Result
      {...props}
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không đủ quyền truy cập trang này."
      extra={
        <Button onClick={() => navigate("/", { replace: true })} type="primary">
          Trang chủ
        </Button>
      }
    />
  );
};

export default PageResult;
