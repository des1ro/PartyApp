export type TripDTO = {
  uuid?: string;
  title: string;
  place: string[];
  published?: boolean;
  authorTripId: string;
  attractions?: string[];
  pictures?: string[];
  startOfTrip?: Date;
  endOfTrip?: Date;
  views?: number;
  category: string[];
  isInProgress?: boolean;
};
