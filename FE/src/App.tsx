import { useRoutes } from "react-router-dom";

import React from "react";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/category/Categories";
import Storage from "./components/Storage";
import AddProduct from "./pages/product/AddProduct";
import Login from "./components/Login";
import SupplierList from "./pages/supplier/SupplierList";
import SupplierDetails from "./pages/supplier/SupplierDetails";
import ListProduct from "./pages/product/ListProduct";
import TransportCompanies from "./pages/transport_company/TransportCompanies";
import HomePage from "./components/Home/HomePage";
import EmployeeDetails from "./components/Employee/Details";
import Employee from "./components/Employee/Employee";
import RoleManager from "./components/RoleManager/RoleManager";
import CreateImport from "./pages/ImportInvoice/CreateImport";
import InventoryList from "./components/inventory/InventoryList";
import ListImportInvoice from "./pages/ImportInvoice/ListImportInvoice";
import DetailImportInvoice from "./pages/ImportInvoice/DetailImportInvoice";
import ProductDetails from "./pages/product/ProductDetails";
import { Status } from "./components/stock_transfers/status";
import Create from "./components/stock_transfers/create";
import InventoryManager from "./components/inventory/InventoryManager";

const App: React.FC = () => {
  const router = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Dashboard />,

      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/stocker/inventories/:id",
          element: <InventoryManager/>,
        },
        {
          path: "stocker/inventories",
          element: <InventoryList />,
        },
        {
          path: "/storage",
          children: [
            { path: "", element: <Storage /> },
            { path: "stock_transfers/:id", element: <Status /> },
            { path: "stock_transfers/create", element: <Create /> },
          ],
        },
        {
          path: "/supplier",
          children: [
            // {path: "add", element: <CategoryAdd/>},
            { path: "", element: <SupplierList /> },
            { path: "details/:id", element: <SupplierDetails /> },
          ],
        },
        {
          path: "/purchase_orders",
          children: [
            // {path: "add", element: <CategoryAdd/>},
            { path: "", element: <ListImportInvoice/> },
            { path: "create", element: <CreateImport /> },
            { path: "details/:code", element: <DetailImportInvoice /> },

          ],
        },
        {
          path: "/productsAdd",
          element: <AddProduct />,
        },
        {
          path: "/products",

          children: [
            { index: true, element: <ListProduct /> },
            { path: "/products/:id", element: <ProductDetails /> },

          ],
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/transport-companies",
          element: <TransportCompanies />,
        },
        {
          path: "/employees/:id",
          element: <EmployeeDetails />,
        },
        {
          path: "/api/admin/employees",
          element: <Employee />,
        },
        {
          path: "/api/admin/roles",
          element: <RoleManager />,
        },
      ],
    },
  ]);

  return router;
};

export default App;
