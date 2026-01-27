import React from 'react';

export type AttentionState = 'Action Required' | 'Waiting' | 'Recent Change';

export type ObjectType = 'Company' | 'Person' | 'Opportunity' | 'Task' | 'Note';

export interface CrmObject {
  id: string;
  name: string;
  type: ObjectType;
  avatarUrl?: string; // Optional image for people/companies
}

export interface InboxItem {
  id: string;
  signal: string; // The main message
  isUnread: boolean;
  objects: CrmObject[];
  attentionState: AttentionState;
  lastActivityTime: string;
  lastActivityDescription: string;
  messagePreview?: string;
  aiInsight?: string;
}

export interface NavigationItem {
  label: string;
  icon: React.ComponentType<any>;
  count?: number;
  isActive?: boolean;
  subItems?: NavigationItem[];
  id: string;
}