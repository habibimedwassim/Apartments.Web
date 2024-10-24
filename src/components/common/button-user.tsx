import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserButtonProps {
  avatar?: string;
  firstName?: string;
  lastName?: string;
  initials?: string;
  onClick?: () => void;
  className?: string;
}

const UserButton: React.FC<UserButtonProps> = ({
  avatar,
  firstName,
  lastName,
  initials,
  onClick,
  className,
}) => {
  return (
    <Button
      variant="outline"
      className={cn("relative h-8 w-8 rounded-full", className)}
      onClick={onClick}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar ?? "#"} alt="Avatar" />
        <AvatarFallback className="bg-transparent">
          {firstName && lastName
            ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
            : initials
            ? initials
            : "TN"}
        </AvatarFallback>
      </Avatar>
    </Button>
  );
};

export default UserButton;
