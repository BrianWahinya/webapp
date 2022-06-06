import { useCallback, useEffect, useState } from "react";
export default function DigitalClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [hourSys, setHourSys] = useState("12hrs");

  const dateTimeGen = useCallback(() => {
    const currentDate = new Date();
    const localDate = currentDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const localTime = currentDate.toLocaleTimeString([], {
      hour12: hourSys === "12hrs",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setTime(localTime);
    if (date !== localDate) {
      setDate(localDate);
    }
  }, [date, hourSys]);

  const selectHourSys = (event) => {
    // console.log(event.target.value);
    setHourSys(event.target.value);
  };

  useEffect(() => {
    dateTimeGen();
    const timer = setInterval(() => {
      dateTimeGen();
    }, 1000);

    // Stops the old timer.
    return function stopTimer() {
      clearInterval(timer);
    };
  }, [dateTimeGen]);

  return (
    <>
      <select onChange={selectHourSys}>
        <option key="12hrs" value="12hrs">
          12 hrs
        </option>
        <option key="24hrs" value="24hrs">
          24 hrs
        </option>
      </select>
      <p>{time}</p>
      <p>{date}</p>
    </>
  );
}
