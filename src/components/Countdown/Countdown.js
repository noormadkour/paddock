import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import "./Countdown.css";

export const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [nextRace, setNextRace] = useState({});
  const intervalRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://ergast.com/api/f1/current/next.json"
      );
      const data = await response.json();
      const nextRace = data.MRData.RaceTable.Races[0];
      setNextRace(nextRace);

      // Extract the date and time of the next race in UTC
      const raceDateTimeUtc = new Date(`${nextRace?.date}T${nextRace?.time}`);

      // Convert the race time to local time
      const raceDateTimeLocal = new Date(
        raceDateTimeUtc.getTime() - new Date().getTimezoneOffset() * 60 * 1000
      );

      // Calculate time remaining using local time
      const currentTime = new Date().getTime();
      const timeRemainingUntilRace = raceDateTimeLocal - currentTime;

      setTimeRemaining(timeRemainingUntilRace);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const calculateTimeParts = useMemo(() => {
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  }, [timeRemaining]);

  useEffect(() => {
    fetchData();

    // Start the interval on component mount
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1000);
    }, 1000);

    // Store the interval object in the ref
    intervalRef.current = interval;

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes, seconds } = calculateTimeParts;

  // Function to format time parts with pluralization
  const formatTime = (value, unit) => {
    if (value === 1) {
      return (
        <>
          <div className="countdown-value">{value}</div>
          <div className="countdown-unit"> {unit}</div>
        </>
      );
    } else {
      return (
        <>
          <div className="countdown-value">{value}</div>
          <div className="countdown-unit">{unit}s </div>
        </>
      ); // Add "s" for plural
    }
  };

  return (
    <div className="countdown-main-container">
      <h2 className="countdown-header">Next Race Info:</h2>
      <div className="next-race-div">
        <div>
          {nextRace.raceName} at the {nextRace.Circuit?.circuitName}
        </div>
        <div>
          {nextRace.Circuit?.Location.locality},{" "}
          {nextRace.Circuit?.Location.country}
        </div>
        <div>Round {nextRace.round}</div>
      </div>
      <h2 className="countdown-header">Lights Out in:</h2>
      <div className="countdown-container">
        <div className="countdown-timer">
          <div className="countdown-timer-days">
            {days >= 0 && formatTime(days, "day")}
          </div>
          <div className="countdown-timer-hours">
            {hours >= 0 && formatTime(hours, "hour")}
          </div>
          <div className="countdown-timer-minutes">
            {minutes >= 0 && formatTime(minutes, "minute")}
          </div>
          <div className="countdown-timer-seconds">
            {seconds >= 0 && formatTime(seconds, "second")}
          </div>
        </div>
      </div>
    </div>
  );
};
