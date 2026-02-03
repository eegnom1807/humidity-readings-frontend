import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Sensor, SensorRequest } from "@/types/sensor"
import type { Plant } from "@/types/plant"
import plantService from "@/services/plantService"

interface SensorFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sensor?: Sensor | null
  onSubmit?: (data: SensorRequest, edit: boolean) => void
}

export function SensorForm({ open, onOpenChange, sensor, onSubmit }: SensorFormProps) {
  const isEditing = !!sensor
  const [plants, setPlants] = useState<Plant[]>([])

  useEffect(() => {
    if (open) {
      plantService.getAll().then(setPlants)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: SensorRequest = {
      pin: formData.get("pin") as string,
      plant_id: Number(formData.get("plant_id")),
    }
    onSubmit?.(data, isEditing)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Sensor" : "Agregar Sensor"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los datos del sensor."
              : "Agrega un nuevo sensor."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="pin">Pin</Label>
              <Input
                id="pin"
                name="pin"
                placeholder="Ej: A0"
                defaultValue={sensor?.pin ?? ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="plant_id">Planta</Label>
              <select
                id="plant_id"
                name="plant_id"
                defaultValue={sensor?.plant_id ?? ""}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Seleccionar planta</option>
                {plants.map((plant) => (
                  <option key={plant.id} value={plant.id}>
                    {plant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button className="cursor-pointer" type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button className="cursor-pointer" type="submit">
              {isEditing ? "Guardar Cambios" : "Crear Sensor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
