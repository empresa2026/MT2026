
export enum MembershipStatus {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: MembershipStatus;
  role: UserRole;
  progress: string[];
  badges: string[];
}

export interface Session {
  id: string;
  title: string;
  chapterId: string;
  isPremium: boolean;
  content: string;
  workbookUrl?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  isPremium: boolean;
  sessions: Session[];
}

export interface Message {
  role: 'user' | 'ai';
  text: string;
  id: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastUpdate: number;
}

export interface FrameworkData {
  chamado: string;
  estiloLideranca: string;
  povoEscolhido: string;
  terraPrometida: string;
  novaAlianca: string;
  inimigo: string;
  grandeVerdade: string;
}

export enum Page {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  MODULES = 'MODULES',
  GENERATOR = 'GENERATOR',
  LIBRARY = 'LIBRARY',
  ADMIN = 'ADMIN'
}
