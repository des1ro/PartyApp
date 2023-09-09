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
