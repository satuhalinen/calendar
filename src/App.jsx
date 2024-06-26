import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LandingPage from "./routes/landingPage/LandingPage";
import About from "./routes/about/About";
import AccountSettings from "./routes/accountSettings/AccountSettings";
import AdminCalendars from "./routes/adminCalendars/AdminCalendars";
import AdminPanel from "./routes/adminpanel/Adminpanel";
import Calendar from "./routes/calendar/Calendar";
import Calendars from "./routes/calendars/Calendars";
import Contact from "./routes/contact/Contact";
import CreateCalendar from "./routes/createCalendar/CreateCalendar";
import CustomerMessages from "./routes/customerMessages/CustomerMessages";
import EditCalendar from "./routes/editCalendar/EditCalendar";
import ModifyOldCalendar from "./routes/modifyOldCalendar/ModifyOldCalendar";
import MyCalendars from "./routes/myCalendars/MyCalendars";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import Profile from "./routes/profile/Profile";
import UserManagement from "./routes/userManagement/UserManagement";
import Root from "./routes/Root";
import TermsAndConditions from "./routes/termsAndConditions/TermsAndConditions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./auth/ProtectedRoute";
import ErrorPage from "./routes/errorPage/errorPage";
import { ScrollToTop } from "react-router-scroll-to-top";
import ModifyOldCalendarStyling from "./routes/modifyOldCalendar/ModifyOldCalendarStyling";

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route
                path="/profile"
                element={<ProtectedRoute userOnly component={Profile} />}
              />
              <Route
                path="/account-settings"
                element={<ProtectedRoute component={AccountSettings} />}
              />
              <Route
                path="/calendar/:id"
                element={<ProtectedRoute component={Calendar} />}
              />
              <Route
                path="/calendars"
                element={<ProtectedRoute userOnly component={Calendars} />}
              />
              <Route
                path="/my-calendars"
                element={<ProtectedRoute userOnly component={MyCalendars} />}
              />
              <Route
                path="/admin-calendars"
                element={
                  <ProtectedRoute adminOnly component={AdminCalendars} />
                }
              />
              <Route
                path="/adminpanel"
                element={<ProtectedRoute adminOnly component={AdminPanel} />}
              />
              <Route
                path="/user-management"
                element={
                  <ProtectedRoute adminOnly component={UserManagement} />
                }
              />
              <Route
                path="/customer-messages"
                element={
                  <ProtectedRoute adminOnly component={CustomerMessages} />
                }
              />
              <Route
                path="/create-calendar"
                element={
                  <ProtectedRoute adminOnly component={CreateCalendar} />
                }
              />
              <Route
                path="/edit-calendar"
                element={<ProtectedRoute adminOnly component={EditCalendar} />}
              />
            </Route>
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/modify-old-calendar/:id"
              element={
                <ProtectedRoute adminOnly component={ModifyOldCalendar} />
              }
            />
            <Route
              path="/modify-old-calendar-styling/:id"
              element={
                <ProtectedRoute
                  adminOnly
                  component={ModifyOldCalendarStyling}
                />
              }
            />
          </Routes>
        </Router>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
