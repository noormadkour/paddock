import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

export const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const intervalRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://ergast.com/api/f1/current/next.json");
      const data = await response.json();
      const nextRace = data.MRData.RaceTable.Races[0];
  
      // Extract the date and time of the next race in UTC
      const raceDateTimeUtc = new Date(`${nextRace?.date}T${nextRace?.time}`);
  
      // Convert the race time to local time
      const raceDateTimeLocal = new Date(
        raceDateTimeUtc.getTime() -
          new Date().getTimezoneOffset() * 60 * 1000
      );
  
      // Calculate time remaining using local time
      const currentTime = new Date().getTime();
      const timeRemainingUntilRace = raceDateTimeLocal - currentTime;
  
      setTimeRemaining(timeRemainingUntilRace);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      return `${value} ${unit}`;
    } else {
      return `${value} ${unit}s`; // Add "s" for plural
    }
  };

  return (
    <div>
      <h2>Next Race Countdown:</h2>
      <p>
        {days > 0 && formatTime(days, "day")}{" "}
        {hours > 0 && formatTime(hours, "hour")}{" "}
        {minutes > 0 && formatTime(minutes, "minute")}{" "}
        {seconds > 0 && formatTime(seconds, "second")}
      </p>
    </div>
  );
}
