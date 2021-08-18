import React from "react";

const todaysDate = () => {
  let today = new Date();
  const currentDate = today.toISOString().split("T")[0];
  return currentDate;
};

export default todaysDate;
