import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { LoginForm, SignupForm } from "../features/auth";
import { logIn } from "../features/auth/authSlice";
import Header from "../features/header/Header";
import CreateListingForm from "../features/listings/CreateListingForm";
import UserPage from "../features/userPage/userPage";
import CreateBidForm from "../features/bids/CreateBidForm";
import Bid from "../features/bids/Bid";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    if (userId) {
      dispatch(logIn(userId));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="create-listing" element={<CreateListingForm />} />
          <Route path="create-bid" element={<CreateBidForm />} />
          <Route path="users" element={<Outlet />}>
            <Route path=":addBarUserId" element={<UserPage />} />
          </Route>
          <Route path="bids" element={<Outlet />}>
            <Route path=":addBarBidId" element={<Bid />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
