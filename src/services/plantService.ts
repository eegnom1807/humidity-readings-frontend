import api from "./api"
import type { Plant, PlantRequest, PlantResponse, PlantsResponse, DashboardPlant, DashboardPlantsResponse } from "@/types/plant"

export interface WaterPlantDto {
  plantId: string
}

export interface SetAutoWaterDto {
  plantId: string
  enabled: boolean
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost";
const API_PORT = import.meta.env.VITE_API_PORT || "3000";

export const plantService = {
  // Get dashboard data
  getDashboard: async (): Promise<DashboardPlant[]> => {
    const response = await api.get<DashboardPlantsResponse>("/plants/dashboard");
    return response.data.data;
  },

  // Get all plants
  getAll: async (): Promise<Plant[]> => {
    const response = await api.get<PlantsResponse>("/plants");
    return response.data.data;
  },

  // Create plant
  create: async (data: PlantRequest): Promise<Plant> => {
    const response = await api.post<PlantResponse>("/plants", data)
    return response.data.data
  },

  // Update plant
  update: async (id: string, data: PlantRequest): Promise<Plant> => {
    const response = await api.put<Plant>(`/plants/${id}`, data)
    return response.data
  },

  // Delete plant
  delete: async (id: string): Promise<void> => {
    await api.delete(`/plants/${id}`)
  },

  // Regar una planta
  water: async (id: string): Promise<void> => {
    await api.post(`/plants/${id}/water`)
  },

  // Subir imagen de planta
  uploadImage: async (id: string, file: File): Promise<void> => {
    const formData = new FormData()
    formData.append("image_url", file)
    await api.post(`/plants/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },

  getImage: (image_url: string): string => {
    return (image_url !== "") ? API_URL + ":" + API_PORT + image_url : "https://placehold.co/400";
  } 
}

export default plantService
