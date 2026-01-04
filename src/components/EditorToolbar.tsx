import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ToolbarButtonProps {
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  title: string;
}

function ToolbarButton({ icon, isActive, onClick, title }: ToolbarButtonProps) {
  return (
    <Button
      variant={isActive ? "toolbarActive" : "toolbar"}
      onClick={onClick}
      title={title}
      className="transition-all duration-150"
    >
      {icon}
    </Button>
  );
}

interface EditorToolbarProps {
  activeFormats?: string[];
  onFormatChange?: (format: string) => void;
}

export function EditorToolbar({ activeFormats = [], onFormatChange }: EditorToolbarProps) {
  const isActive = (format: string) => activeFormats.includes(format);
  const handleFormat = (format: string) => onFormatChange?.(format);

  return (
    <div className="flex items-center gap-1 p-2 bg-toolbar border-b border-toolbar-border rounded-t-lg">
      <div className="flex items-center gap-0.5">
        <ToolbarButton 
          icon={<Undo className="w-4 h-4" />} 
          onClick={() => handleFormat('undo')}
          title="Undo"
        />
        <ToolbarButton 
          icon={<Redo className="w-4 h-4" />} 
          onClick={() => handleFormat('redo')}
          title="Redo"
        />
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <div className="flex items-center gap-0.5">
        <ToolbarButton 
          icon={<Heading1 className="w-4 h-4" />} 
          isActive={isActive('h1')}
          onClick={() => handleFormat('h1')}
          title="Heading 1"
        />
        <ToolbarButton 
          icon={<Heading2 className="w-4 h-4" />} 
          isActive={isActive('h2')}
          onClick={() => handleFormat('h2')}
          title="Heading 2"
        />
        <ToolbarButton 
          icon={<Heading3 className="w-4 h-4" />} 
          isActive={isActive('h3')}
          onClick={() => handleFormat('h3')}
          title="Heading 3"
        />
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <div className="flex items-center gap-0.5">
        <ToolbarButton 
          icon={<Bold className="w-4 h-4" />} 
          isActive={isActive('bold')}
          onClick={() => handleFormat('bold')}
          title="Bold"
        />
        <ToolbarButton 
          icon={<Italic className="w-4 h-4" />} 
          isActive={isActive('italic')}
          onClick={() => handleFormat('italic')}
          title="Italic"
        />
        <ToolbarButton 
          icon={<Underline className="w-4 h-4" />} 
          isActive={isActive('underline')}
          onClick={() => handleFormat('underline')}
          title="Underline"
        />
        <ToolbarButton 
          icon={<Strikethrough className="w-4 h-4" />} 
          isActive={isActive('strikethrough')}
          onClick={() => handleFormat('strikethrough')}
          title="Strikethrough"
        />
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <div className="flex items-center gap-0.5">
        <ToolbarButton 
          icon={<AlignLeft className="w-4 h-4" />} 
          isActive={isActive('alignLeft')}
          onClick={() => handleFormat('alignLeft')}
          title="Align Left"
        />
        <ToolbarButton 
          icon={<AlignCenter className="w-4 h-4" />} 
          isActive={isActive('alignCenter')}
          onClick={() => handleFormat('alignCenter')}
          title="Align Center"
        />
        <ToolbarButton 
          icon={<AlignRight className="w-4 h-4" />} 
          isActive={isActive('alignRight')}
          onClick={() => handleFormat('alignRight')}
          title="Align Right"
        />
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <div className="flex items-center gap-0.5">
        <ToolbarButton 
          icon={<List className="w-4 h-4" />} 
          isActive={isActive('bulletList')}
          onClick={() => handleFormat('bulletList')}
          title="Bullet List"
        />
        <ToolbarButton 
          icon={<ListOrdered className="w-4 h-4" />} 
          isActive={isActive('orderedList')}
          onClick={() => handleFormat('orderedList')}
          title="Numbered List"
        />
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <div className="flex items-center gap-0.5">
        <ToolbarButton 
          icon={<Link className="w-4 h-4" />} 
          onClick={() => handleFormat('link')}
          title="Insert Link"
        />
        <ToolbarButton 
          icon={<Image className="w-4 h-4" />} 
          onClick={() => handleFormat('image')}
          title="Insert Image"
        />
        <ToolbarButton 
          icon={<Code className="w-4 h-4" />} 
          isActive={isActive('code')}
          onClick={() => handleFormat('code')}
          title="Code"
        />
        <ToolbarButton 
          icon={<Quote className="w-4 h-4" />} 
          isActive={isActive('quote')}
          onClick={() => handleFormat('quote')}
          title="Quote"
        />
      </div>

      <div className="flex-1" />

      <ToolbarButton 
        icon={<MoreHorizontal className="w-4 h-4" />}
        title="More options"
      />
    </div>
  );
}
