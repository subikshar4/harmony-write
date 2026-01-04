import { FileText, MoreHorizontal, Clock } from "lucide-react";
import { Document } from "@/types/document";
import { PresenceAvatarGroup } from "./PresenceAvatarGroup";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface DocumentCardProps {
  document: Document;
  onClick?: () => void;
}

export function DocumentCard({ document, onClick }: DocumentCardProps) {
  const onlineCollaborators = document.collaborators.filter(c => c.isOnline);

  return (
    <div 
      className="document-card group fade-in"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <FileText className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
              {document.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
              <Clock className="w-3 h-3" />
              <span>Edited {formatDistanceToNow(document.updatedAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {document.content.slice(0, 120)}...
      </p>

      <div className="flex items-center justify-between">
        {onlineCollaborators.length > 0 ? (
          <div className="flex items-center gap-2">
            <PresenceAvatarGroup collaborators={onlineCollaborators} />
            <span className="text-xs text-muted-foreground">
              {onlineCollaborators.length} editing
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">No one editing</span>
        )}
      </div>
    </div>
  );
}
