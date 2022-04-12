import { useCallback, useEffect, useMemo, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");
  const [twelveSys, setTwelveSys] = useState(true);

  const dateTimeGen = () => {
    const currentDate = new Date();
    const localTime = currentDate.toLocaleTimeString([], {
      hour12: twelveSys,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setTime(localTime);
  };

  useEffect(() => {
    setInterval(() => {
      dateTimeGen();
    }, 1000);
  }, []);

  return (
    <>
      <h5>Clock App</h5>
      <p>
        <span>{time}</span>
      </p>
    </>
  );
}
