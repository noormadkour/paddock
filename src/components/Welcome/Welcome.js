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
      <div>Your one-stop shop for all things F1 - but not really this has a very specific task</div>
    </div>
  );
};
