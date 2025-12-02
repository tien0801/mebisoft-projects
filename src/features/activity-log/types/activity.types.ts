export interface Activity {
  id: string;
  action: string;
  user: string;
  target?: string;
  from?: string;
  to?: string;
  time: string;
  type:
    | "add_member"
    | "remove_member"
    | "upload_attachment"
    | "remove_attachment";
}
