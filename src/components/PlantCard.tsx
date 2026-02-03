import { Droplets, CalendarDays } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Plant } from "@/types/plant"

interface PlantCardProps {
  plant: Plant
  onWater?: (plantId: string) => void
}

export function PlantCard({ plant, onWater }: PlantCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{plant.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Droplets className="h-4 w-4 text-blue-500" />
          <span>Humedad: {plant.humidity}%</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>Última lectura: {plant.lastReadingDate}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onWater?.(plant.id)}
        >
          <Droplets className="mr-2 h-4 w-4" />
          Regar Planta
        </Button>
      </CardFooter>
    </Card>
  )
}
