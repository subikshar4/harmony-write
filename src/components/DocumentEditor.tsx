import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Share2, Star, Clock, Users } from "lucide-react";
import { Document, Collaborator } from "@/types/document";
import { EditorToolbar } from "./EditorToolbar";
import { PresenceAvatarGroup } from "./PresenceAvatarGroup";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface DocumentEditorProps {
  document: Document;
  onBack: () => void;
  onContentChange?: (content: string) => void;
  onTitleChange?: (title: string) => void;
}

export function DocumentEditor({ 
  document, 
  onBack, 
  onContentChange,
  onTitleChange 
}: DocumentEditorProps) {
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content);
  const [activeFormats, setActiveFormats] = useState<string[]>(['bold']);
  const editorRef = useRef<HTMLDivElement>(null);
  const onlineCollaborators = document.collaborators.filter(c => c.isOnline);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitleChange?.(e.target.value);
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onContentChange?.(newContent);
    }
  };

  const handleFormatChange = (format: string) => {
    if (typeof window !== 'undefined') {
      window.document.execCommand(format, false);
    }
    editorRef.current?.focus();
    
    // Toggle active state for formatting buttons
    if (['bold', 'italic', 'underline', 'strikethrough'].includes(format)) {
      setActiveFormats(prev => 
        prev.includes(format) 
          ? prev.filter(f => f !== format)
          : [...prev, format]
      );
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = document.content;
    }
  }, [document.id]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Editor Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="text-lg font-semibold bg-transparent border-none outline-none focus:ring-0 w-full"
                placeholder="Untitled Document"
              />
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Edited {formatDistanceToNow(document.updatedAt, { addSuffix: true })}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {onlineCollaborators.length} collaborator{onlineCollaborators.length !== 1 ? 's' : ''} online
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onlineCollaborators.length > 0 && (
              <PresenceAvatarGroup collaborators={onlineCollaborators} maxVisible={5} />
            )}
            <Button variant="ghost" size="icon">
              <Star className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Editor Content */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-editor rounded-xl shadow-card border border-border overflow-hidden slide-up">
          <EditorToolbar 
            activeFormats={activeFormats}
            onFormatChange={handleFormatChange}
          />
          
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[600px] p-8 outline-none prose prose-slate max-w-none focus:ring-0"
            onInput={handleContentChange}
            suppressContentEditableWarning
          />
        </div>
      </div>

      {/* Collaborative Cursors - Visual indicator */}
      {onlineCollaborators.slice(0, 2).map((collaborator, index) => (
        <CollaboratorCursor 
          key={collaborator.id} 
          collaborator={collaborator}
          position={{ x: 200 + index * 300, y: 300 + index * 100 }}
        />
      ))}
    </div>
  );
}

interface CollaboratorCursorProps {
  collaborator: Collaborator;
  position: { x: number; y: number };
}

function CollaboratorCursor({ collaborator, position }: CollaboratorCursorProps) {
  const colorClasses: Record<string, string> = {
    green: 'border-presence-green',
    blue: 'border-presence-blue',
    purple: 'border-presence-purple',
    orange: 'border-presence-orange',
    pink: 'border-presence-pink',
  };

  const bgClasses: Record<string, string> = {
    green: 'bg-presence-green',
    blue: 'bg-presence-blue',
    purple: 'bg-presence-purple',
    orange: 'bg-presence-orange',
    pink: 'bg-presence-pink',
  };

  return (
    <div 
      className="fixed pointer-events-none z-40 transition-all duration-75"
      style={{ left: position.x, top: position.y }}
    >
      <svg width="16" height="20" viewBox="0 0 16 20" className="drop-shadow-md">
        <path 
          d="M0 0L16 12L6 12L0 20V0Z" 
          className={`fill-current ${bgClasses[collaborator.color] || 'text-presence-blue'}`}
        />
      </svg>
      <div 
        className={`absolute top-5 left-3 px-2 py-0.5 rounded text-xs font-medium text-white whitespace-nowrap ${bgClasses[collaborator.color] || 'bg-presence-blue'}`}
      >
        {collaborator.name.split(' ')[0]}
      </div>
    </div>
  );
}
