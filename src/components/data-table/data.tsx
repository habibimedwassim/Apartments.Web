import { COLORS } from "@/app/constants/colors";
import { CircleCheck, CircleMinus, CircleUserRound } from "lucide-react";

export const statuses = [
  {
    value: "available",
    label: "Available",
    icon: CircleCheck,
    color: COLORS.Green,
  },
  {
    value: "occupied",
    label: "Occupied",
    icon: CircleUserRound,
    color: COLORS.Blue,
  },
  {
    value: "archived",
    label: "Archived",
    icon: CircleMinus,
    color: COLORS.Red,
  },
];
