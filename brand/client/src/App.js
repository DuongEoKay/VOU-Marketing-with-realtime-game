import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Auth from "./views/Auth";
import HomePage from 'pages/HomePage';
import ProtectedRoute from 'components/routing/ProtectedRoute';
import DashboardLayout from 'module/dashboard/DashboardLayout';
import DashboardPage from "pages/DashboardPage";
import BrandProfile from "module/brand/BrandProfile"
import EventManage from "module/event/EventManage";
import EventAddNew from "module/event/EventAddNew";
import VoucherAddNew from "module/voucher/VoucherAddNew";
import VoucherManage from "module/voucher/VoucherManage"
import ContactPage from "pages/ContactPage";
import DetailPage from 'pages/DetailPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-in" element={<Auth authRoute="sign-in" />} />
        <Route path="/sign-up" element={<Auth authRoute="sign-up" />} />
        <Route path="/event/:slug" element={<DetailPage></DetailPage>}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        <Route element={<ProtectedRoute Component={DashboardLayout} />}>
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>
          <Route
            path="/manage/events"
            element={<EventManage></EventManage>}
          ></Route>
          <Route
            path="/manage/add-event"
            element={<EventAddNew></EventAddNew>}
          ></Route>
          <Route
            path="/manage/vouchers"
            element={<VoucherManage></VoucherManage>}
          ></Route>
          <Route
            path="/manage/add-voucher"
            element={<VoucherAddNew></VoucherAddNew>}
          ></Route>
          <Route
            path="/manage/update-user"
            element={<BrandProfile></BrandProfile>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;