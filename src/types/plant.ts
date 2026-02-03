export interface Plant {
  id: string;
  name: string;
  image_url: string;
  active: boolean;
  updated_at: string;
}

export interface PlantRequest {
  id?: string;
  name: string;
  image_url: string;
}

export interface PlantRequestUpdate {
  name: string;
  image_url: string;
}

export interface PlantsResponse {
  data: Plant[];
}

export interface PlantResponse {
  data: Plant;
}