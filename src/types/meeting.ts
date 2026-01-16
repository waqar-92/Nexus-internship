export type MeetingStatus = "Pending" | "Confirmed" | "Declined";

export interface Meeting {
  id: string;
  title: string;
  date: string;
  status: MeetingStatus;
}


