// export interface Plant {
//   id: string
//   name: string
//   imageUrl: string
//   humidity: number
//   lastReadingDate: string
// }

export interface Plant {
  id: string;
  name: string;
  species: string;
  created_at: string;
  updated_at: string;
}

export interface PlantRequest {
  id?: string;
  name: string;
  species: string;
}
