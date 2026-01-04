import { Collaborator } from "@/types/document";
import { PresenceAvatar } from "./PresenceAvatar";

interface PresenceAvatarGroupProps {
  collaborators: Collaborator[];
  maxVisible?: number;
}

export function PresenceAvatarGroup({ collaborators, maxVisible = 4 }: PresenceAvatarGroupProps) {
  const visibleCollaborators = collaborators.slice(0, maxVisible);
  const remainingCount = collaborators.length - maxVisible;

  return (
    <div className="flex items-center -space-x-2">
      {visibleCollaborators.map((collaborator) => (
        <PresenceAvatar key={collaborator.id} collaborator={collaborator} size="sm" />
      ))}
      {remainingCount > 0 && (
        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground text-[10px] font-medium ring-2 ring-background">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
