interface NotificationBadgeProps {
  className?: string;
  count: number;
}

export const NotificationBadge = ({
  className = "",
  count,
}: NotificationBadgeProps) => {
  if (count === 0) return null;

  const displayCount = count > 99 ? "+99" : count;

  return (
    <span className="ml-4 top-0 right-0 block h-3 w-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center" />
  );
};
