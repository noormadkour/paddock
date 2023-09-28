import { CountdownTimer } from "../Countdown/Countdown";
import "./Welcome.css";

export const Welcome = ({ currentUser }) => {
  return (
    <div className="welcome-container">
      <h1>
        <span>Welcome to The Paddock, </span>
        <span>{currentUser.fullName}</span>
      </h1>
      <br/>
      <br/>
      <br/>
      <br/>
      
      <CountdownTimer />
    </div>
  );
};
