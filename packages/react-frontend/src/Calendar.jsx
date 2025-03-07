import React, { useState, useEffect } from "react";

const HorizontalCalendar = ({ onDateSelect }) => {
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const getStartOfWeek = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay()); // Adjust to Sunday
        return startOfWeek;
    };

    const generateWeekDates = (startDate) => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const generateInitialDates = () => {
        const today = new Date();
        const startOfWeek = getStartOfWeek(today);
        const initialDates = generateWeekDates(startOfWeek);

        setDates(initialDates);
        setSelectedDate(today);
    };

    useEffect(() => {
        generateInitialDates();
    }, []);

    const handleNextWeek = () => {
        const lastDate = new Date(dates[dates.length - 1]);
        const newStartDate = new Date(lastDate.setDate(lastDate.getDate() + 1));
        const newDates = generateWeekDates(newStartDate);

        setDates(newDates);
    };

    const handlePreviousWeek = () => {
        const firstDate = new Date(dates[0]);
        const newStartDate = new Date(firstDate.setDate(firstDate.getDate() - 7));
        const newDates = generateWeekDates(newStartDate);

        setDates(newDates);
    };

    return (
        <div
            className="container"
            style={{
                width: "100vw",
                padding: "10px 0",
            }}
        >
            <div className="buttonContainer" style={{ display: "flex", justifyContent: "space-between", padding: "0 20px", marginBottom: "10px" }}>
                <button onClick={handlePreviousWeek}>Previous Week</button>
                <button onClick={handleNextWeek}>Next Week</button>
            </div>
            <div
                className="contentBox"
                style={{
                    display: "flex",
                    gap: "12px",
                    padding: "0 20px",
                    overflowX: "hidden",
                }}
            >
                {dates.map((date, index) => (
                    <div
                        key={index}
                        style={{
                            flexShrink: 0,
                            width: "80px",
                            padding: "12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            textAlign: "center",
                            backgroundColor:
                                date.toDateString() ===
                                selectedDate?.toDateString()
                                    ? "#b232f6"
                                    : "#e0e0e0",
                        }}
                        onClick={() => {
                            setSelectedDate(date);
                            onDateSelect(date);
                        }}
                    >
                        <p style={{ margin: 0, fontSize: "14px" }}>
                            {date.toLocaleDateString("en-US", {
                                weekday: "short",
                            })}
                            <br />
                            {date.toLocaleDateString("en-US", {
                                day: "numeric",
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
	);
};

export default HorizontalCalendar;