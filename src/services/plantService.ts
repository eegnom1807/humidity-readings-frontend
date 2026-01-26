import api from "./api"
import type { Plant } from "@/types/plant"

export interface CreatePlantDto {
  name: string
  imageUrl: string
}

export interface UpdatePlantDto {
  name?: string
  imageUrl?: string
}

export interface WaterPlantDto {
  plantId: string
}

export interface SetAutoWaterDto {
  plantId: string
  enabled: boolean
}

export const plantService = {
  // Obtener todas las plantas
  getAll: async (): Promise<Plant[]> => {
    const response = await api.get<Plant[]>("/plants")
    return response.data
  },

  // Obtener una planta por ID
  getById: async (id: string): Promise<Plant> => {
    const response = await api.get<Plant>(`/plants/${id}`)
    return response.data
  },

  // Crear una nueva planta
  create: async (data: CreatePlantDto): Promise<Plant> => {
    const response = await api.post<Plant>("/plants", data)
    return response.data
  },

  // Actualizar una planta
  update: async (id: string, data: UpdatePlantDto): Promise<Plant> => {
    const response = await api.put<Plant>(`/plants/${id}`, data)
    return response.data
  },

  // Eliminar una planta
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
