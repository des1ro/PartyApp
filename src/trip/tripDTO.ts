export type Trip = {
  uuid: string;
  title: string;
  Place: string[];
  authorTripId: string;
  category: string;
  published?: boolean;
  attractions?: string[];
  pictures?: string[];
  DateofTrip: string | null;
  views?: number;
  likes?: number;
};
