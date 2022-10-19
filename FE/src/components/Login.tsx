import { useMutation } from "@tanstack/react-query";
import { Form, Image, Input, message, notification } from "antd";
import axios from "axios";
import { ILoginData } from "../interface";
import Button from "../UI/Button";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { setUserStore } from "../features/user/userSlice";
import useTitle from "../app/useTitle";
import { RootState } from "../app/store";
import { Navigate, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  useTitle("", "Đăng nhập");
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user);

  const loginSubmit = useMutation(
      async (loginData: ILoginData) => {
        return (await axios.post("http://localhost:8080/api/login", loginData))
            .data;
      },
      {
        onError: () => {
          message.error("Tài khoản hoặc mật khẩu không đúng", 2);
        },
        onSuccess(data, variables, context) {
          dispatch(
              setUserStore({
                token: data.accessToken,
              })
          );
          openNotification();
          navigate("/home", { replace: true });
        },
      }
  );

  const onFinish = async (values: any) => {
    const { username, password } = loginForm.getFieldsValue();
    loginSubmit.mutate({ username, password });
  };

  const openNotification = () => {
    notification.success({
      message: `Đăng nhập thành công`,
      placement: "topRight",
      duration: 2.5,
    });
  };

  return (
      <>
        <video
            className="videoTag fixed top-0 left-0 w-screen h-screen object-fill"
            autoPlay
            loop
            muted
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div
            className=" flex justify-center items-center h-screen w-screen gap-5 shadow-black"
            style={{ background: "#f0f8ff" }}
        >
          <Form
              className="flex gap-5 relative h-max w-max self-center bg-white rounded-3xl  shadow-md"
              form={loginForm}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 30 }}
              onFinish={onFinish}
              autoComplete="off"
              style={{ padding: "15px 35px" }}
          >
            <div className="self-center">
              <Image
                  className="shadow-md rounded-xl"
                  style={{ height: 265, width: 452, objectFit: "revert" }}
                  preview={false}
                  src="/bgi1.png"
              />
            </div>
            <div className="self-center">
              <Form.Item className="text-center">
                <Image
                    className="w-60 h-14 object-contain"
                    src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo-birth.svg?v=202208310857"
                    preview={false}
                />
              </Form.Item>

              <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Hãy nhập tài khoản!" }]}
                  initialValue="admin"
              >
                <Input
                    className="pl-3"
                    prefix={
                      <PersonIcon
                          style={{ color: "#1890ff", transform: "scale(0.75" }}
                      />
                    }
                    placeholder="Tài khoản"
                    title="Nhập user name"
                    style={{ borderRadius: "20px" }}
                    size="large"
                />
              </Form.Item>

              <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
                  initialValue="minh"
              >
                <Input.Password
                    className="pl-3"
                    size="large"
                    prefix={
                      <VpnKeyIcon
                          style={{ color: "#1890ff", transform: "scale(0.75" }}
                      />
                    }
                    placeholder="Mật khẩu"
                    title="Nhập password"
                    style={{ borderRadius: "20px" }}
                    visibilityToggle={false}
                />
              </Form.Item>

              <Form.Item>
                <Button
                    loading={loginSubmit?.isLoading}
                    type="primary"
                    htmlType="submit"
                    className="w-full m-0"
                    style={{ borderRadius: "20px", margin: 0 }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </>
  );
};

export default Login;
