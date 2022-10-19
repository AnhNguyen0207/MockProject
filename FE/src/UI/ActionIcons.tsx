import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { LockOutlined, UnlockOutlined, EditOutlined } from "@ant-design/icons";
const EditIcon = (props: any) => {
  return (
    <EditOutlined
      {...props}
      className="cursor-pointer rounded-md"
      style={{ padding: "5px", background: "#1890ff", color: "#fff" }}
    />
  );
};

const PenIcon = (props: any) => {
  return (
    <ModeEditIcon
      {...props}
      className="cursor-pointer rounded-md"
      style={{ padding: "5px", background: "#1890ff", color: "#fff" }}
    />
  );
};

const DeletedIcon = (props: any) => {
  return (
    <DeleteIcon
      {...props}
      className="cursor-pointer rounded-md"
      style={{ padding: "5px", background: "#F64C72", color: "#fff" }}
    />
  );
};

const Lock = (props: any) => {
  return (
    <LockOutlined
      {...props}
      style={{ padding: "5px", color: "white" }}
      className="cursor-pointer bg-pink rounded-md"
    />
  );
};

const UnLock = (props: any) => {
  return (
    <UnlockOutlined
      {...props}
      style={{ padding: "5px", color: "#389e0d", border: "#389e0d 1px solid" }}
      className="cursor-pointer bg-[#f6ffed] rounded-md"
    />
  );
};

export { EditIcon, DeletedIcon, Lock, UnLock, PenIcon };
