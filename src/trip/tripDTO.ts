import { CategoryDTO } from "../category/categoryDTO";
import { Group } from "../group/group.type";
import { UserDTO } from "../user/user.type";

export type Trip = {
  title: string;
  Place: string[];
  authorTripId: string;
  categoryId: string;
  published?: boolean;
  attractions?: string[];
  pictures?: string[];
  DateofTrip: string | null;
  views?: number;
  likes?: number;
};
