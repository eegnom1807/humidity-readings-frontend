import { useCallback, useEffect, useState } from "react"
import { Leaf } from "lucide-react"
import { PlantCard } from "@/components/PlantCard"
import type { DashboardPlant } from "@/types/plant"
import plantService from "@/services/plantService"

export function Dashboard() {
  const [plants, setPlants] = useState<DashboardPlant[]>([])
  const [loading, setLoading] = useState(true)

  const loadDashboard = useCallback(async () => {
    try {
      const data = await plantService.getDashboard()
      setPlants(data)
    } catch (error) {
      console.error("Error al cargar el dashboard:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  useEffect(() => {
    if (plants.length === 0) return

    const interval = setInterval(() => {
      loadDashboard()
    }, 10000)

    return () => clearInterval(interval)
  }, [plants.length, loadDashboard])

  const handleWater = (pin: string) => {
    console.log("make http request to arduino! ", pin);
    // try {
    //   await plantService.water(String(plantId))
    //   loadDashboard()
    // } catch (error) {
    //   console.error("Error al regar planta:", error)
    // }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-muted-foreground">Cargando...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Leaf className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-bold">Estado de Plantas</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {plants.map((plant) => (
          <div key={plant.id} className="w-70">
            <PlantCard
              plant={plant}
              onWater={handleWater}
            />
          </div>
        ))}
      </div>

      {plants.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Leaf className="h-16 w-16 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No hay plantas</h3>
          <p className="text-muted-foreground">
            Agrega tu primera planta para comenzar a monitorear su humedad.
          </p>
        </div>
      )}
    </div>
  )
}
