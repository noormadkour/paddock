import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircuitList } from "../components/Circuits/CircuitsList";
import { ConstructorList } from "../components/Constructors/ConstructorsList";
import { DriversList } from "../components/Drivers/DriversList";
import { NavBar } from "../components/Nav/NavBar";
import { UserProfile } from "../components/User/UserProfile";
import { Welcome } from "../components/Welcome/Welcome";
import { DriverDetail } from "../components/Drivers/Driver";
import { ConstructorDetail } from "../components/Constructors/Constructor";
import { CircuitDetail } from "../components/Circuits/Circuit";

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
        <Route path="drivers">
          <Route index element={<DriversList />} />
          <Route path=":driverId" element={<DriverDetail currentUser={currentUser}/>} />
        </Route>
        <Route path="/constructors">
          <Route index element={<ConstructorList />} />
          <Route path=":constructorId" element={<ConstructorDetail />} />
        </Route> 
        <Route path="/circuits">
          <Route index element={<CircuitList />} />
          <Route path=":circuitId" element={<CircuitDetail />} />
        </Route> 
        <Route path="/profile" element={<UserProfile currentUser={currentUser}/>} />
      </Route>
    </Routes>
  );
};
