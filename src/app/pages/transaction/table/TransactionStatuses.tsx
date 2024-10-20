import { COLORS } from "@/app/constants/colors";
import { TRANSACTION_STATUS } from "@/app/constants/transaction";
import {
  CircleAlert,
  CircleCheck,
  CirclePause,
  CircleUserRound,
  CircleX,
} from "lucide-react";

export const transactionStatuses = [
  {
    value: TRANSACTION_STATUS.Paid,
    label: TRANSACTION_STATUS.Paid,
    icon: CircleCheck,
    color: COLORS.Green,
  },
  {
    value: TRANSACTION_STATUS.Pending,
    label: TRANSACTION_STATUS.Pending,
    icon: CirclePause,
    color: COLORS.Yellow,
  },
  {
    value: TRANSACTION_STATUS.Late,
    label: TRANSACTION_STATUS.Late,
    icon: CircleAlert,
    color: COLORS.Orange,
  },
  {
    value: TRANSACTION_STATUS.Cancelled,
    label: TRANSACTION_STATUS.Cancelled,
    icon: CircleX,
    color: COLORS.Red,
  },
  {
    value: TRANSACTION_STATUS.Terminated,
    label: TRANSACTION_STATUS.Terminated,
    icon: CircleX,
    color: COLORS.Red,
  },
  {
    value: TRANSACTION_STATUS.Departed,
    label: TRANSACTION_STATUS.Departed,
    icon: CircleUserRound,
    color: COLORS.Red,
  },
];
