import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LandingPage from "./routes/landingPage/LandingPage";
import About from "./routes/about/About";
import AccountSettings from "./routes/accountSettings/AccountSettings";
import AdminCalendars from "./routes/AdminCalendars";
import AdminPanel from "./routes/adminpanel/Adminpanel";
import Calendar from "./routes/Calendar";
import Calendars from "./routes/Calendars";
import CreateCalendar from "./routes/createCalendar/CreateCalendar";
import EditCalendar from "./routes/EditCalendar";
import Favorites from "./routes/favorites/Favorites";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import Profile from "./routes/profile/Profile";
import Root from "./routes/Root";
import TermsAndConditions from "./routes/termsAndConditions/TermsAndConditions";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/admin-calendars" element={<AdminCalendars />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendars" element={<Calendars />} />
            <Route path="/create-calendar" element={<CreateCalendar />} />
            <Route path="/edit-calendar" element={<EditCalendar />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
          </Route>
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
