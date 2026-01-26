import { useState } from "react"
import { Plus, Pencil, Trash2, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PlantForm } from "@/components/PlantForm"
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
]

export function Plants() {
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [plantToDelete, setPlantToDelete] = useState<Plant | null>(null)

  const handleCreate = () => {
    setSelectedPlant(null)
    setFormOpen(true)
  }

  const handleEdit = (plant: Plant) => {
    setSelectedPlant(plant)
    setFormOpen(true)
  }

  const handleDelete = (plant: Plant) => {
    setPlantToDelete(plant)
    setDeleteDialogOpen(true)
  }

  const handleFormSubmit = (data: Partial<Plant>) => {
    // TODO: Implementar logica de crear/editar
    console.log("Datos del formulario:", data)
    setFormOpen(false)
  }

  const handleConfirmDelete = () => {
    // TODO: Implementar logica de eliminar
    console.log("Eliminando planta:", plantToDelete?.id)
    setDeleteDialogOpen(false)
    setPlantToDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold">Gestionar Plantas</h1>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Planta
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Humedad</TableHead>
              <TableHead>Ultima Lectura</TableHead>
              <TableHead className="w-25">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPlants.map((plant) => (
              <TableRow key={plant.id}>
                <TableCell>
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{plant.name}</TableCell>
                <TableCell>{plant.humidity}%</TableCell>
                <TableCell>{plant.lastReadingDate}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(plant)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(plant)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {mockPlants.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No hay plantas registradas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PlantForm
        open={formOpen}
        onOpenChange={setFormOpen}
        plant={selectedPlant}
        onSubmit={handleFormSubmit}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Planta</DialogTitle>
            <DialogDescription>
              Estas seguro de que deseas eliminar "{plantToDelete?.name}"? Esta accion no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
