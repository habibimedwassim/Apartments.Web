// Define prop types
interface NotificationBadgeProps {
  className?: string;
  count: number;
}

export const NotificationBadge = ({
  className = "",
  count,
}: NotificationBadgeProps) => {
  // Do not display the badge if the count is 0
  if (count === 0) return null;

  const displayCount = count > 99 ? "+99" : count;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5 ${className}`}
    >
      {displayCount}
    </span>
  );
};
