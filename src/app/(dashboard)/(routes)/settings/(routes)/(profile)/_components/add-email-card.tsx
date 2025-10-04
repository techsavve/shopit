import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const AddEmailHoverCard = ({ onSave }: { onSave: (email: string) => Promise<void> }) => {
  const [newEmail, setNewEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    await onSave(newEmail);
    setNewEmail("");
    setOpen(false);
  };

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <Button
          type="button"
          variant="link"
          className="mt-2 p-0"
          onMouseEnter={() => setOpen(true)}
        >
          + Add new email
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 space-y-2" side="top">
        <Input
          type="email"
          placeholder="new@email.com"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!newEmail}
          >
            Add
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
