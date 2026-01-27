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
import type { Plant, PlantRequest } from "@/types/plant"

interface PlantFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plant?: Plant | null
  onSubmit?: (data: PlantRequest, edit: boolean) => void
}

export function PlantForm({ open, onOpenChange, plant, onSubmit }: PlantFormProps) {
  const isEditing = !!plant

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: PlantRequest = {
      name: formData.get("name") as string,
      species: formData.get("species") as string,
    }
    if (isEditing && plant) {
      data.id = plant.id
    }
    onSubmit?.(data, isEditing)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Planta" : "Agregar Planta"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los datos de tu planta."
              : "Agrega una nueva planta a tu coleccion."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej: Planta de tomate"
                defaultValue={plant?.name ?? ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="species">Especie</Label>
              <Input
                id="species"
                name="species"
                placeholder="Tomate"
                defaultValue={plant?.species ?? ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="cursor-pointer" type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button className="cursor-pointer" type="submit">
              {isEditing ? "Guardar Cambios" : "Crear Planta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
