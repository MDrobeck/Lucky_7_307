// Followed this tutorial then made it fit our project : https://www.youtube.com/watch?v=1kVZEhg3Q_c

import React, { useState, useEffect, useRef } from "react";

const HorizontalCalendar = ({ onDateSelect }) => {
	const [dates, setDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const containerRef = useRef(null);

	const generateInitialDates = () => {
		const today = new Date();
		const initialDates = [];

		for (let i = -7; i <= 7; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);
			initialDates.push(date);
		}

		setDates(initialDates);
		setSelectedDate(today);
	};

	const infiniteScroll = () => {
		const container = containerRef.current;
		if (container) {
			const { scrollLeft, scrollWidth, clientWidth } =
				container;
			const threshold = 10;

			// Load more dates when scrolling near the ends
			if (scrollLeft + clientWidth >= scrollWidth - threshold) {
				const lastDate = new Date(dates[dates.length - 1]);
				const newDates = [];

				// Add 7 more days to the right
				for (let i = 1; i <= 7; i++) {
					const date = new Date(lastDate);
					date.setDate(lastDate.getDate() + i);
					newDates.push(date);
				}

				setDates((prev) => [...prev, ...newDates]);
			}

			if (scrollLeft == 0) {
				const firstDate = new Date(dates[0]);
				const newDates = [];

				// Add 7 more days to the left
				for (let i = 1; i <= 7; i++) {
					const date = new Date(firstDate);
					date.setDate(firstDate.getDate() - i);
					newDates.push(date);
				}

				setDates((prev) => [...newDates, ...prev]);
			}
		}
	};

	useEffect(() => {
		generateInitialDates();
	}, []);

	return (
		<div
			className="container"
			ref={containerRef}
			onScroll={infiniteScroll}
			style={{
				width: "100vw",
				overflowX: "auto",
				padding: "10px 0"
			}}
		>
			<div
				className="contentBox"
				style={{
					display: "flex",
					gap: "12px",
					padding: "0 20px"
				}}
			>
				{dates.map((date, index) => (
					<div
						// this is the entire calendar itself
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
									: "#e0e0e0"
						}}
						onClick={() => {
							setSelectedDate(date);
							onDateSelect(date);
						}}
						// below is the style of each individual date
					>
						<p style={{ margin: 0, fontSize: "14px" }}>
							{date.toLocaleDateString("en-US", {
								weekday: "short"
							})}
							<br />
							{date.toLocaleDateString("en-US", {
								day: "numeric"
							})}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default HorizontalCalendar;
