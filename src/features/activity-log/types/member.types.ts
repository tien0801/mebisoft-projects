import { User, Role } from "@/features/activity-log/types";

export interface Member extends User {
  role: Role;
}
