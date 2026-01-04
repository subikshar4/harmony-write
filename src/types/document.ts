export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  collaborators: Collaborator[];
}

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  color: string;
  isOnline: boolean;
  cursorPosition?: CursorPosition;
}

export interface CursorPosition {
  x: number;
  y: number;
  selection?: {
    start: number;
    end: number;
  };
}

export type PresenceColor = 'green' | 'blue' | 'purple' | 'orange' | 'pink';
