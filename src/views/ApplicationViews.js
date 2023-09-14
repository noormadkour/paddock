import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { RacesList } from "../components/Races/RacesList";
import { ConstructorList } from "../components/Constructors/ConstructorsList";
import { DriversList } from "../components/Drivers/DriversList";
import { NavBar } from "../components/Nav/NavBar";
import { UserProfile } from "../components/User/UserProfile";
import { Welcome } from "../components/Welcome/Welcome";
import { ConstructorDetail } from "../components/Constructors/Constructor";
import { Race } from "../components/Races/Race";
import { CommentForm, LongEditForm } from "../components/Forms/Forms";
import { DriverView } from "../components/Drivers/DriverView";

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
        <Route index element={<Welcome currentUser={currentUser} />} />
        <Route path="drivers">
          <Route index element={<DriversList />} />
          <Route
            path=":driverId"
            element={
              <>
                <DriverView currentUser={currentUser} />
                <CommentForm />
              </>
            }
          />
        </Route>
        <Route path="/constructors">
          <Route index element={<ConstructorList />} />
          <Route path=":constructorId" element={<ConstructorDetail />} />
        </Route>
        <Route path="/races">
          <Route index element={<RacesList />} />
          <Route path=":raceId" element={<Race />} />
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
