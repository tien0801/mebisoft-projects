import { Member, Role } from "@/features/activity-log/types";
import { USERS } from "@/features/activity-log/data";

const ROLES: Role[] = ["Project Manager", "Developer", "QA", "Designer"];

export const PROJECT_MEMBERS: Member[] = USERS.slice(0, 4).map((u, index) => ({
  ...u,
  role: ROLES[index],
}));
