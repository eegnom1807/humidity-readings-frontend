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
import type { Plant } from "@/types/plant"

interface PlantFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plant?: Plant | null
  onSubmit?: (plant: Partial<Plant>) => void
}

export function PlantForm({ open, onOpenChange, plant, onSubmit }: PlantFormProps) {
  const isEditing = !!plant

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      imageUrl: formData.get("imageUrl") as string,
    }
    onSubmit?.(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Planta" : "Nueva Planta"}
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
                placeholder="Ej: Monstera Deliciosa"
                defaultValue={plant?.name ?? ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">URL de imagen</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                placeholder="https://ejemplo.com/imagen.jpg"
                defaultValue={plant?.imageUrl ?? ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? "Guardar Cambios" : "Crear Planta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
