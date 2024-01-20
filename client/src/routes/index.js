import { useAuthContext } from '../context/useAuthContext';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Loadable from "../ui-component/Loadable";
import MainLayout from 'layout/MainLayout';
import {lazy} from "react";

// routes
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const ViewDashboard = Loadable(lazy(() => import('views/dashboard/Default/index')));
const AddLead = Loadable(lazy(() => import('views/pages/leads/leadForm')));
const ViewLead = Loadable(lazy(() => import('views/pages/leads/viewLeads')));
const AddCourse = Loadable(lazy(() => import('views/pages/courses/courseForm')));
const ViewCourses = Loadable(lazy(() => import('views/pages/courses/viewCourses')));
const AddUser = Loadable(lazy(() => import('views/pages/users/userForm')));
const ViewUsers = Loadable(lazy(() => import('views/pages/users/viewUsers')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const { user } = useAuthContext();

  // console log user
  console.log(user);

  return (
    <Routes>
      {/*<Route*/}
      {/*    path="/"*/}
      {/*    element={user ? <Navigate to="/dashboard/default" /> : <Navigate to="/login" />}*/}
      {/*>*/}
      {/*</Route>*/}

      <Route path="/" element={!user ? <AuthLogin /> : <Navigate to="/app/dashboard" />}></Route>

      <Route path="app" element={user ? <MainLayout /> : <Navigate to="/" />}>
        <Route path="dashboard" element={<ViewDashboard />} />
        <Route path="leads" element={<Outlet></Outlet>}>
          <Route index element={<ViewLead />} />
          <Route path="add" element={<AddLead />} />
          <Route path="add/:id" element={<AddLead />} />
        </Route>
        <Route path="courses" element={<Outlet></Outlet>}>
          <Route index element={<ViewCourses />} />
          <Route path="add" element={<AddCourse />} />
          <Route path="add/:id" element={<AddCourse />} />
        </Route>
        <Route path="users" element={<Outlet></Outlet>}>
          <Route index element={<ViewUsers />} />
          <Route path="add" element={<AddUser />} />
          <Route path="add/:id" element={<AddUser />} />
        </Route>
      </Route>

      {/*<Route*/}
      {/*    path="/login"*/}
      {/*    element={!user ? <AuthLogin /> : <Navigate to="/" />}*/}
      {/*/>*/}
     
    </Routes>
  );
}
