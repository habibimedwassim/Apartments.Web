import { COLORS } from "@/app/constants/colors";
import { CircleAlert, CircleCheck, CirclePause, CircleX } from "lucide-react";

export const reportStatuses = [
  {
    value: "Resolved",
    label: "Resolved",
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
    value: "InProgress",
    label: "InProgress",
    icon: CircleAlert,
    color: COLORS.Orange,
  },
  {
    value: "Closed",
    label: "Closed",
    icon: CircleX,
    color: COLORS.Red,
  },
];
