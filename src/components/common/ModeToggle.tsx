import { Monitor, Moon, Sun } from "lucide-react";

import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/common/ThemeProvider";

interface ModeToggleProps {
  useDropdown?: boolean;
}

export function ModeToggle({ useDropdown = true }: ModeToggleProps) {
  const { setTheme } = useTheme();

  if (useDropdown) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="h-4 w-4 mr-2" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="h-4 w-4 mr-2" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Monitor className="h-4 w-4 mr-2" />
            System
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }

  return (
    <>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <Sun className="h-4 w-4 mr-2" />
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <Moon className="h-4 w-4 mr-2" />
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>
        <Monitor className="h-4 w-4 mr-2" />
        System
      </DropdownMenuItem>
    </>
  );
}
