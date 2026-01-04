import { cn } from "@/lib/utils";
import { Collaborator, PresenceColor } from "@/types/document";

interface PresenceAvatarProps {
  collaborator: Collaborator;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}

const colorClasses: Record<PresenceColor, string> = {
  green: 'bg-presence-green',
  blue: 'bg-presence-blue',
  purple: 'bg-presence-purple',
  orange: 'bg-presence-orange',
  pink: 'bg-presence-pink',
};

const sizeClasses = {
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
};

export function PresenceAvatar({ collaborator, size = 'md', showStatus = true }: PresenceAvatarProps) {
  const initials = collaborator.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative">
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium text-white ring-2 ring-background transition-transform hover:scale-105",
          colorClasses[collaborator.color as PresenceColor] || colorClasses.blue,
          sizeClasses[size]
        )}
        title={collaborator.name}
      >
        {collaborator.avatar ? (
          <img
            src={collaborator.avatar}
            alt={collaborator.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      {showStatus && collaborator.isOnline && (
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-presence-green rounded-full ring-2 ring-background pulse-soft" />
      )}
    </div>
  );
}
