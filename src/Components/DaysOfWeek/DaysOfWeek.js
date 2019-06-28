import React, { Component } from "react";
import DayOfWeek from "./DayOfWeek/DayOfWeek";
import classes from "./DaysOfWeek.css";

class DaysOfWeek extends Component {
  state = {
    dayOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  };
  render() {
    const dayOfWeek = this.state.dayOfWeek.map((item, index) => (
      <DayOfWeek 
        key={index} 
        dayOfWeek={item} 
        className={classes.Day} />
    ));

    return <div className={classes.DaysOfWeek}>{dayOfWeek}</div>;
  }
}
export default DaysOfWeek;
