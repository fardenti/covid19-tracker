import React from "react";

const TodaysDate = () => {
  let Today = new Date();
  const CurrentDate = Today.toISOString().split("T")[0];
  return CurrentDate;
};

export default TodaysDate;
