export type LocationType = 'city' | 'university';

export interface LocationState {
  id: number;
  name: string;
  type: LocationType;
}
