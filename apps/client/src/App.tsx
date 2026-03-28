import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// استيراد المكون الحامي
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AllBranches from "./pages/Bransches/AllBranches";
import AllEmployees from "./pages/Employess/AllEmployees";
import Allproducts from "./pages/Products/AllProducts";
import AddProduct from "./pages/Products/AddProduct";
import SalesBoost from "./pages/salesBoost/SalesBoost";
import AddEmployee from "./pages/Employess/AddEmployee";
import ViewEmployeeProfile from "./pages/Employess/ViewEmployee";
import AddBranch from "./pages/Bransches/Add-branche";
import Attendance from "./pages/Attendance/index";
import EditBranche from "./pages/Bransches/EditBranches";
import EditEmployee from "./pages/Employess/EditEmployee";
import RoleBasedRoute from "./components/auth/RoleBasedRoute";
import Unauthorized from "./components/auth/Unauthorized";
import EmployeeProfile from "./pages/Employess/EmployeeProfile";
import EmployeeDashboard from "./pages/Employess/EmployeeDashboard";
import PublicRoute from "./components/auth/PublicRoute";
import ErrorBoundary from "./components/error/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ErrorBoundary>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* --- المسارات العامة (Public Routes) --- */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* --- المسارات المحمية (Protected Routes) --- */}
            <Route element={<ProtectedRoute children={undefined} />}>
              {/* يمكنك تغليف المسارات بشكل فردي أو باستخدام Layout محمي */}
            </Route>

            {/* الطريقة الأسهل والأكثر وضوحاً: تغليف كل مسار محمي */}

            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              path="/"
              element={
                <RoleBasedRoute allowedRoles={["ADMIN"]}>
                  <Index />
                </RoleBasedRoute>
              }
            />

            {/* الفروع */}
            <Route
              path="/branches"
              element={
                <ProtectedRoute>
                  <AllBranches />
                </ProtectedRoute>
              }
            />
            <Route
              path="/branches/add"
              element={
                <ProtectedRoute>
                  <AddBranch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/branches/edit/:id"
              element={
                <ProtectedRoute>
                  <EditBranche />
                </ProtectedRoute>
              }
            />

            {/* الموظفين */}
            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <AllEmployees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee-dashboard"
              element={
                <ProtectedRoute>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <EmployeeProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/add"
              element={
                <ProtectedRoute>
                  <AddEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/view"
              element={
                <ProtectedRoute>
                  <ViewEmployeeProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/edit/:id"
              element={
                <ProtectedRoute>
                  <EditEmployee />
                </ProtectedRoute>
              }
            />

            {/* المنتجات والمبيعات */}
            <Route
              path="/products/add"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Allproducts"
              element={
                <ProtectedRoute>
                  <Allproducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales-boost"
              element={
                <ProtectedRoute>
                  <SalesBoost />
                </ProtectedRoute>
              }
            />

            {/* مسار الصفحة غير الموجودة */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
