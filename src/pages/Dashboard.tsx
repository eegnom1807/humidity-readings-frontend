import { Leaf } from "lucide-react"
import { PlantCard } from "@/components/PlantCard"
import type { Plant } from "@/types/plant"

// Datos de ejemplo - reemplazar con datos reales
const mockPlants: Plant[] = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop",
    humidity: 65,
    lastReadingDate: "2024-01-15 14:30",
  },
  {
    id: "2",
    name: "Ficus Lyrata",
    imageUrl: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
    humidity: 45,
    lastReadingDate: "2024-01-15 14:25",
  },
  {
    id: "3",
    name: "Pothos Dorado",
    imageUrl: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=400&fit=crop",
    humidity: 72,
    lastReadingDate: "2024-01-15 14:20",
  },
  {
    id: "4",
    name: "Suculenta",
    imageUrl: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop",
    humidity: 30,
    lastReadingDate: "2024-01-15 14:15",
  },
]

export function Dashboard() {
  const handleWater = (plantId: string) => {
    // TODO: Implementar logica de riego
    console.log("Regando planta:", plantId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Leaf className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-bold">Estado de Plantas</h1>
      </div>

      <div className="mx-auto flex max-w-298 flex-wrap justify-center gap-6">
        {mockPlants.map((plant) => (
          <div key={plant.id} className="w-70">
            <PlantCard
              plant={plant}
              onWater={handleWater}
            />
          </div>
        ))}
      </div>

      {mockPlants.length === 0 && (
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
