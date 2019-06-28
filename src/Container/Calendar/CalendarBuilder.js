import React, { Component } from "react";
import classes from "./CalendarBuilder.css";
import Spinner from "../../Components/Spinner/Spinner";
import Day from "./../../Components/Day/Day";
import DaysOfWeek from "../../Components/DaysOfWeek/DaysOfWeek";
import Modal from "../../Components/Modal/Modal"

class CalendarBuilder extends Component {
  state = {
    date: {},
    notes: {
      "13 52019": "todo sms",
      "11 12019": "make sms"
    },
    modal:{
      title: null,
      inputValue:null,
      modalIsShow: false,
      noteKey: null
    }

  };

  componentDidMount() {
    let today = new Date();
    let currentDate = today.getDate();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let displayYear = currentYear;
    let displayMonth = currentMonth;
    let dayInDisplayMonth = new Date(displayYear, displayMonth, 0).getDate();
    let firsWeekDayinDisplayMonth = new Date(
      displayYear,
      displayMonth,
      0
    ).getDay();
    const newDay = {
      today,
      currentDate,
      currentMonth,
      currentYear,
      displayMonth,
      displayYear,
      dayInDisplayMonth,
      firsWeekDayinDisplayMonth
    };
    this.setState({ date: newDay });
  }

  dayOnClickHandler = noteKey => {
    let prevState = this.state.modal;
    prevState.modalIsShow = true;
    prevState.noteKey = noteKey;
    prevState.inputValue = this.state.notes[noteKey];
    prevState.title = prevState.inputValue
    this.setState({
      modal: prevState
    })
  };

  backButtonHandler = () =>{
    const prevState = this.state.date
    if(prevState.displayMonth - 1 < 0){
      prevState.displayMonth = 11
      prevState.displayYear = prevState.displayYear - 1
    }
    else{
      prevState.displayMonth = prevState.displayMonth-1
    }
    prevState.firsWeekDayinDisplayMonth = new Date(
      prevState.displayYear,
      prevState.displayMonth,
      0
    ).getDay()
    this.setState({date: prevState})
  }

  todayButtonHandler = () =>{
    const prevState = this.state.date
    prevState.displayYear = prevState.currentYear
    prevState.displayMonth = prevState.currentMonth

    prevState.firsWeekDayinDisplayMonth = new Date(
      prevState.displayYear,
      prevState.displayMonth,
      0
    ).getDay()
    this.setState({date: prevState})
  }

  forwardButtonHandler = () =>{
    const prevState = this.state.date
    if(prevState.displayMonth + 1 > 11){
      prevState.displayMonth = 0
      prevState.displayYear = prevState.displayYear + 1
    }
    else{
      prevState.displayMonth = prevState.displayMonth+1
    }
    prevState.firsWeekDayinDisplayMonth = new Date(
      prevState.displayYear,
      prevState.displayMonth,
      0
    ).getDay()
    this.setState({date: prevState})
  }
  onCancelHandler = () =>{
    let prevState = this.state.modal
    prevState.modalIsShow = false
    prevState.noteKey = null
    prevState.inputValue = null
    prevState.title = null
    this.setState({
      modal: prevState
    })

  }

  onInputChangeHandler = (event) =>{
    let prevState = this.state.modal
    prevState.inputValue = event.target.value
    this.setState({
      modal: prevState
    })

  }
  onSaveHandler = () =>{
    let prevState = this.state
    prevState.notes[prevState.modal.noteKey] = prevState.modal.inputValue
    this.setState({notes: prevState.notes})
    this.onCancelHandler()
  }
  render() {
    let calendar = <Spinner />;

 if (this.state.date.currentDate) {
      calendar = [];
      let firsWeekDayinDisplayMonth = this.state.date.firsWeekDayinDisplayMonth ===6? 0 :  this.state.date.firsWeekDayinDisplayMonth
      

      for (let i = 0; i < firsWeekDayinDisplayMonth +  this.state.date.dayInDisplayMonth; i++) {
        let noteKey =
          i -
          firsWeekDayinDisplayMonth +
          " " +
          this.state.date.displayMonth +
          this.state.date.displayYear;
        const className = [classes.Day];
        if (this.state.notes[noteKey]) {
          className.push(classes.HasNotes);
        }
        if (i - firsWeekDayinDisplayMonth <= 0) {
          className.push(classes.Hide);
        }
        if (
          i - firsWeekDayinDisplayMonth ===
            this.state.date.currentDate &&
          this.state.date.currentMonth === this.state.date.displayMonth &&
          this.state.date.currentYear === this.state.date.displayYear
        ) {
          className.push(classes.CurDay);
        }

        calendar[i] = (
          <Day
            noteKey={noteKey}
            key={i}
            date={i - firsWeekDayinDisplayMonth}
            dayOnClick={this.dayOnClickHandler}
            className={className.join(" ")}
          />
        );
      }
    } 
    let modal
    if(this.state.modal.modalIsShow){            
      modal = 
      <Modal 
        title = {this.state.modal.title}
        value = {this.state.modal.inputValue}
        cancel = {this.onCancelHandler}
        save = {this.onSaveHandler}
        inputChange = {this.onInputChangeHandler}
      />
    }

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return (
      <div className={classes.Wrapper}>
        <div className = {classes.Content}>
          <div className={classes.Header}>{monthNames[this.state.date.displayMonth] + "    " + this.state.date.displayYear }</div>
          <div className = {classes.Buttons}>
            <button onClick = {this.backButtonHandler}>Назад</button>
            <button onClick = {this.todayButtonHandler}>Сегодня</button>
            <button onClick = {this.forwardButtonHandler}>Вперед</button>
          </div>
          <DaysOfWeek />
          <div className={classes.Calendar}>
            {calendar}
          </div>
        </div>
       
        {modal}

      </div>
    );
  }
}

export default CalendarBuilder;
