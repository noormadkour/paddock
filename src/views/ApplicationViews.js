import { Routes, Route, Outlet } from "react-router-dom";
import { Welcome } from "../components/Welcome/Welcome";
import { NavBar } from "../components/Nav/NavBar";
import { useEffect, useState } from "react";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localPaddockUser = localStorage.getItem("paddock_user");
    const paddockUserObject = JSON.parse(localPaddockUser);

    setCurrentUser(paddockUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome currentUser={currentUser}/>} />
        {/* <Route
          path="tickets"
          element={<TicketList currentUser={currentUser} />}
        />
        <Route path="employees">
          <Route index element={<EmployeeList />} />
          <Route path=":employeeId" element={<EmployeeDetails />} />
        </Route>
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route> */}
      </Route>
    </Routes>
  );
};
