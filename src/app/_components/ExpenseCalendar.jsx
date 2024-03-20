"use client"
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ExpenseCalendar = ({ upcomingBills }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Add your logic for handling selected date, e.g., setting expenses or upcoming bills
  };
 const calendarStyle = {
   width: "50px", // Customize the width
   height: "50px", // Customize the height
 };
  const renderTileContent = ({ date, view }) => {
    if (view === "month" && hasUpcomingBill(date)) {
      return <div className="bg-red-500 rounded-full"></div>;
    }
    return null;
  };
  // Function to check if a date has an upcoming bill
  const hasUpcomingBill = (date) => {
   // return upcomingBills.some((bill) => bill.date.getTime() === date.getTime());
  };

  return (
    <div className=" text-black  ">
      <h2 className="text-2xl font-semibold mb-4">Expense Calendar</h2>
      <Calendar
        options={calendarStyle}
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date, view }) =>
          view === "month" && hasUpcomingBill(date) ? "highlighted-day" : null
        }
        style={calendarStyle}
        tileContent={renderTileContent}
      />
    </div>
  );
};

export default ExpenseCalendar;
