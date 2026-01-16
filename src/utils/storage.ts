import { Meeting } from "../types/meeting";

const STORAGE_KEY = "nexus_meetings";

export const saveMeetings = (meetings: Meeting[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
};

export const loadMeetings = (): Meeting[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
