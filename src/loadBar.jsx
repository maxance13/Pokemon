
import React, { useState, useEffect } from "react";

function LoadBar() {
  const [progress, setProgress] = useState(0);

  const handleAdd = () => {
    setProgress((prevProgress) => {
      if (prevProgress < 100) {
        return prevProgress + 10;
      } else {
        return prevProgress;
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress > 0) {
          return prevProgress - 5;
        } else {
          return prevProgress;
        }
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          width: `${progress}%`,
          height: "20px",
          backgroundColor: "blue",
          transition: "width 0.5s ease-in-out",
        }}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
export default LoadBar;
