import { useAuthContext } from '../context/useAuthContext';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Loadable from '../ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';

// routes
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const ViewDashboard = Loadable(lazy(() => import('views/dashboard/Default/index')));
const AddLead = Loadable(lazy(() => import('views/pages/leads/leadForm')));
const ViewLead = Loadable(lazy(() => import('views/pages/leads/viewLeads')));
const AddCourse = Loadable(lazy(() => import('views/pages/courses/courseForm')));
const ViewCourses = Loadable(lazy(() => import('views/pages/courses/viewCourses')));
const AddUser = Loadable(lazy(() => import('views/pages/users/userForm')));
const ViewUsers = Loadable(lazy(() => import('views/pages/users/viewUsers')));
const AccessDeniedPage = Loadable(lazy(() => import('views/pages/access-denied-page/access-denied')));

export default function ThemeRoutes() {
  const { user } = useAuthContext();
  const { permissions } = user || {};

  return (
    <Routes>
      <Route path="/" element={!user ? <AuthLogin /> : <Navigate to="/app/dashboard" />} />

      <Route path="app" element={user ? <MainLayout /> : <Navigate to="/" />}>
        <Route path="access-denied" element={<AccessDeniedPage />} />
        <Route path="dashboard" element={<ViewDashboard />} />

        {/* Leads Section */}
        <Route path="leads" element={<Outlet />}>
          <Route index element={permissions?.lead?.includes('read') ? <ViewLead /> : <Navigate to="/app/access-denied" replace />} />
          <Route path="add" element={permissions?.lead?.includes('create') ? <AddLead /> : <Navigate to="/app/access-denied" replace />} />
          <Route
            path="add/:id"
            element={permissions?.lead?.includes('create') ? <AddLead /> : <Navigate to="/app/access-denied" replace />}
          />
        </Route>

        {/* Courses Section */}
        <Route path="courses" element={<Outlet />}>
          <Route index element={permissions?.course?.includes('read') ? <ViewCourses /> : <Navigate to="/app/access-denied" replace />} />
          <Route
            path="add"
            element={permissions?.course?.includes('create') ? <AddCourse /> : <Navigate to="/app/access-denied" replace />}
          />
          <Route
            path="add/:id"
            element={permissions?.course?.includes('create') ? <AddCourse /> : <Navigate to="/app/access-denied" replace />}
          />
        </Route>

        {/* Users Section */}
        <Route path="users" element={<Outlet />}>
          <Route index element={permissions?.user?.includes('read') ? <ViewUsers /> : <Navigate to="/app/access-denied" replace />} />
          <Route path="add" element={permissions?.user?.includes('create') ? <AddUser /> : <Navigate to="/app/access-denied" replace />} />
          <Route
            path="add/:id"
            element={permissions?.user?.includes('create') ? <AddUser /> : <Navigate to="/app/access-denied" replace />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
