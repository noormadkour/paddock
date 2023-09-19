import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { RacesList } from "../components/Races/RacesList";
import { ConstructorList } from "../components/Constructors/ConstructorsList";
import { DriversList } from "../components/Drivers/DriversList";
import { NavBar } from "../components/Nav/NavBar";
import { UserProfile } from "../components/User/UserProfile";
import { Welcome } from "../components/Welcome/Welcome";
import { Race } from "../components/Races/Race";
import { LongEditForm } from "../components/Forms/EditForm";
import { DriverView } from "../components/Drivers/DriverView";
import { ConstructorView } from "../components/Constructors/ConstructorView";

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
        <Route index element={<Welcome currentUser={currentUser} /> } />
        <Route path="drivers">
          <Route index element={<DriversList />} />
          <Route
            path=":driverId"
            element={
              <>
                <DriverView currentUser={currentUser} />
              </>
            }
          />
        </Route>
        <Route path="/constructors">
          <Route index element={<ConstructorList />} />
          <Route path=":constructorId" element={<ConstructorView />} />
        </Route>
        <Route path="/races">
          <Route index element={<RacesList />} />
          <Route path=":round" element={<Race />} />
        </Route>
        <Route
          path="/profile"
          element={<UserProfile currentUser={currentUser} />}
        />
        <Route
          path="/editcomment/:commentId"
          element={<LongEditForm currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
