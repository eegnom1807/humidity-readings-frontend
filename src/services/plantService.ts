import api from "./api"
import type { Plant, PlantRequest } from "@/types/plant"

export interface WaterPlantDto {
  plantId: string
}

export interface SetAutoWaterDto {
  plantId: string
  enabled: boolean
}

export const plantService = {
  // Get all plants
  getAll: async (): Promise<Plant[]> => {
    const response = await api.get<Plant[]>("/plants");
    return response.data;
  },

  // Get plant by id
  // getById: async (id: string): Promise<Plant> => {
  //   const response = await api.get<Plant>(`/plants/${id}`)
  //   return response.data
  // },

  // Create plant
  create: async (data: PlantRequest): Promise<Plant> => {
    const response = await api.post<Plant>("/plants", data)
    return response.data
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

  // Activar/desactivar riego automatico
  setAutoWater: async (id: string, enabled: boolean): Promise<void> => {
    await api.post(`/plants/${id}/auto-water`, { enabled })
  },
}

export default plantService
