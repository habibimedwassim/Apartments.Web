import { COLORS } from "@/app/constants/colors";
import { CircleAlert, CircleCheck, CirclePause, CircleX } from "lucide-react";

export const requestStatuses = [
  {
    value: "Approved",
    label: "Approved",
    icon: CircleCheck,
    color: COLORS.Green,
  },
  {
    value: "Pending",
    label: "Pending",
    icon: CirclePause,
    color: COLORS.Yellow,
  },
  {
    value: "MeetingScheduled",
    label: "Scheduled",
    icon: CircleAlert,
    color: COLORS.Orange,
  },
  {
    value: "Rejected",
    label: "Rejected",
    icon: CircleX,
    color: COLORS.Red,
  },
];

export const requestTypes = [
  {
    value: "rent",
    label: "Rental",
    icon: CircleCheck,
    color: COLORS.Green,
  },
  {
    value: "leave",
    label: "Leave",
    icon: CirclePause,
    color: COLORS.Yellow,
  },
  {
    value: "dismiss",
    label: "Dismiss",
    icon: CircleAlert,
    color: COLORS.Orange,
  },
];
