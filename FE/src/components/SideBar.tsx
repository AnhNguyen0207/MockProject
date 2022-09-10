import {
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
  BarChartOutlined,
  ImportOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import LogoutIcon from "@mui/icons-material/Logout";
import "../styles/SideBar.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../features/user/userSlice";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const MENUS: MenuItem[] = [
  getItem("Quản lý sản phẩm", "warehouse", <AppstoreOutlined />, [
    getItem("Thêm sản phẩm", "warehouse/products/add"),
    getItem("Danh sách sản phẩm", "warehouse/products"),
    getItem("Danh mục sản phẩm", "warehouse/categories"),
  ]),
  getItem("Hàng hoá", "coordinator", <AppstoreOutlined />, [
    getItem("Nhập hàng", "coordinator/purchase_orders", <ImportOutlined />),
    getItem("Chuyển hàng", "coordinator/storage", <ExportOutlined />),
  ]),
  getItem("Nhà cung cấp", "stocker/supplier", <ShopOutlined />),
  getItem("Kho hàng", "/stocker/inventories", <WarehouseIcon />),
  getItem("Admin", "admin", <TeamOutlined />, [
    getItem("Danh sách", "/admin/employees"),
    getItem("Chức vụ", "/admin/roles/"),
  ]),
  getItem("Thống kê", "/statistics", <BarChartOutlined />),
  getItem("Đăng xuất", "/login", <LogoutIcon />),
];

const SideBar: React.FC = () => {
  const userRoles = useSelector((state: RootState) => state?.user?.authorities);
  const dispatch = useDispatch();
  const items = MENUS.filter((m: MenuItem) => {
    return userRoles.includes(m?.key?.toString() || "") && m;
  });
  items.push(getItem("Đăng xuất", "/login", <LogoutIcon />));

  const navigate = useNavigate();
  return (
    <>
      <div className="side-bar__brand-logo">
        <a href="/home">
          <img
            className="img-fill"
            src="https://bizweb.dktcdn.net/assets/admin/images/icon-svg/sub_logosapo-02.svg"
            alt="logo"
          />
        </a>
      </div>

      <div className="side-bar_menu">
        <Menu
          mode="inline"
          theme="dark"
          items={userRoles.includes("admin") ? MENUS : items}
          onClick={(e) => {
            navigate(`${e.key}`, { replace: true });
            if (e.key.includes("login")) {
              dispatch(logout)
            }
            return <Navigate to={`/${e.key}`} />;
          }}
        />
      </div>
    </>
  );
};

export default SideBar;
