// Interface cho Activity Log
export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  action: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'complete' | 'add';
}


