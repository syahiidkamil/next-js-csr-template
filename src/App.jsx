import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import ToastProvider from "./components/ToastProvider";

// Import layouts
import MainLayout from "./components/layouts/MainLayout";
import AdminLayout from "./components/layouts/AdminLayout";

// Import routes
import Home from "./pages/client/Home";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import Products from "./pages/client/Products";
import ProductDetail from "./pages/client/ProductDetail";
import AdminDashboard from "./pages/client/admin/Dashboard";
import AdminProducts from "./pages/client/admin/Products";
import AdminNewProduct from "./pages/client/admin/NewProduct";
import AdminEditProduct from "./pages/client/admin/EditProduct";
import NotFound from "./pages/client/NotFound";

// Import route guards
import ProtectedRoute from "./utils/routeGuards/ProtectedRoute";
import PublicRoute from "./utils/routeGuards/PublicRoute";
import AdminRoute from "./utils/routeGuards/AdminRoute";

/**
 * Main App component - The entry point for client-side routing
 */
const App = () => {
  // We need to check if we're in a browser environment before creating the router
  if (typeof window === "undefined") {
    return null;
  }

  // Define routes configuration
  const routes = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/:id",
          element: <ProductDetail />,
        },
        {
          path: "login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        {
          path: "register",
          element: (
            <PublicRoute>
              <Register />
            </PublicRoute>
          ),
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          ),
        },
        {
          path: "products",
          element: (
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          ),
        },
        {
          path: "products/new",
          element: (
            <AdminRoute>
              <AdminNewProduct />
            </AdminRoute>
          ),
        },
        {
          path: "products/:id",
          element: (
            <AdminRoute>
              <AdminEditProduct />
            </AdminRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  // Create the browser router
  const router = createBrowserRouter(routes);

  return (
    <AuthProvider>
      <ToastProvider />
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
