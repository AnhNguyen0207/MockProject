import styled from "@emotion/styled";
import { Button } from "antd";
let red = "#d72503";
let blue = "#1890ff";
red = "#e74c3c";
type Mode = {
  cancel: string;
  delete: string;
};
const color = {
  cancel: red,
  delete: "rgb(246,76,114)",
};
const hover = {
  cancel: "#ff7875",
  delete: "rgb(246,76,114)",
};
const B = (props: any) => <Button {...props} />;

const Buttonn = styled(B)(
  {
    color: "#fff",
    borderColor: "#1890ff",
    background: blue,
    ":hover": {
      background: "#40a9ff",
      borderColor: "#40a9ff",
      color: "#fff",
    },
    ":active, :focus": {
      color: "#fff",
      borderColor: "#1890ff",
      background: "#1890ff",
    },
  },
  (props) => ({
    background: props?.mode && color[props?.mode as keyof Mode],
    borderColor: props?.mode && color[props?.mode as keyof Mode],
    ":hover": {
      background: props?.mode && hover[props?.mode as keyof Mode],
      borderColor: props?.mode && hover[props?.mode as keyof Mode],
      color: "#fff",
    },
    ":focus, :active": {
      background: props?.mode && color[props?.mode as keyof Mode],
      borderColor: props?.mode && color[props?.mode as keyof Mode],
      color: "#fff",
    },
  })
);

export default Buttonn;
