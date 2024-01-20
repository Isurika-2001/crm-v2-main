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
        <Route path="leads" element={<Outlet />}>
          <Route index element={<ViewLead />} />
          {/* Conditionally render AddLead component based on create permission */}
          <Route path="add" element={permissions.lead.includes('update') ? <AddLead /> : <Navigate to="/app/access-denied" replace />} />

          {/* Conditionally render AddLead component (for editing) based on update permission */}
          <Route
            path="add/:id"
            element={permissions.lead.includes('update') ? <AddLead /> : <Navigate to="/app/access-denied" replace />}
          />
        </Route>

        <Route path="courses" element={<Outlet />}>
          <Route index element={<ViewCourses />} />
          <Route path="add" element={<AddCourse />} />
          <Route path="add/:id" element={<AddCourse />} />
        </Route>

        <Route path="users" element={<Outlet />}>
          <Route index element={<ViewUsers />} />
          <Route path="add" element={<AddUser />} />
          <Route path="add/:id" element={<AddUser />} />
        </Route>
      </Route>
    </Routes>
  );
}
