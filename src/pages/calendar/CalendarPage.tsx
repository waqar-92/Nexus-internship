import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Meeting } from "../../types/meeting";
import { initialMeetings } from "../../data/meetings";
import { saveMeetings, loadMeetings } from "../../utils/storage";

export const CalendarPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  // Load meetings on first render
  useEffect(() => {
    const storedMeetings = loadMeetings();
    if (storedMeetings.length > 0) {
      setMeetings(storedMeetings);
    } else {
      setMeetings(initialMeetings);
    }
  }, []);

  // Save meetings on every change
  useEffect(() => {
    if (meetings.length > 0) {
      saveMeetings(meetings);
    }
  }, [meetings]);

  // Add meeting
  const handleDateClick = (info: any) => {
    const title = prompt("Enter meeting title");
    if (!title) return;

    const newMeeting: Meeting = {
      id: Date.now().toString(),
      title,
      date: info.dateStr,
      status: "Pending",
    };

    setMeetings(prev => [...prev, newMeeting]);
  };

  // Select meeting
  const handleEventClick = (info: any) => {
    const meeting = meetings.find(
      m => m.title === info.event.title && m.date === info.event.startStr
    );

    if (meeting) {
      setSelectedMeeting(meeting);
    }
  };

  // Accept / Decline meeting
  const updateMeetingStatus = (status: "Confirmed" | "Declined") => {
    if (!selectedMeeting) return;

    const updatedMeetings = meetings.map(m =>
      m.id === selectedMeeting.id ? { ...m, status } : m
    );

    setMeetings(updatedMeetings);
    setSelectedMeeting(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Meeting Scheduler</h2>
      <p>Click on a date to schedule a meeting</p>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        events={meetings.map(m => ({
          title: m.title,
          date: m.date,
          backgroundColor:
            m.status === "Confirmed"
              ? "#22c55e"
              : m.status === "Declined"
              ? "#ef4444"
              : "#f59e0b",
        }))}
      />

      {selectedMeeting && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "#ffffff",
            borderRadius: "12px",
          }}
        >
          <h3>{selectedMeeting.title}</h3>
          <p>Date: {selectedMeeting.date}</p>
          <p>Status: {selectedMeeting.status}</p>

          <button
            onClick={() => updateMeetingStatus("Confirmed")}
            style={{
              marginRight: "10px",
              background: "#22c55e",
              color: "#ffffff",
            }}
          >
            Accept
          </button>

          <button
            onClick={() => updateMeetingStatus("Declined")}
            style={{
              background: "#ef4444",
              color: "#ffffff",
            }}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};
