import { useEffect, useState } from "react"
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
import type { Plant, PlantRequest } from "@/types/plant"
import plantService from "@/services/plantService"

export function Plants() {
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    getAllPlants();
  }, [])

  const getAllPlants = async () => {
    const response = await plantService.getAll();
    setPlants(response)
  }

  const handleCreate = () => {
    setSelectedPlant(null)
    setFormOpen(true)
  }

  const handleEdit = (plant: Plant) => {
    setSelectedPlant(plant)
    setFormOpen(true)
  }

  const handleDelete = (plant: Plant) => {
    setSelectedPlant(plant)
    setDeleteDialogOpen(true)
  }

  const handleFormSubmit = async (data: PlantRequest, edit: boolean) => {
    if (!edit) {
      await plantService.create(data);
    } else if (data.id) {
      await plantService.update(data.id, data);
    }

    setFormOpen(false);
    getAllPlants();
  }

  const handleConfirmDelete = async () => {
    if (selectedPlant?.id)
      await plantService.delete(selectedPlant?.id)

    setDeleteDialogOpen(false)
    setSelectedPlant(null)
    getAllPlants();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold">Plantas</h1>
        </div>
        <Button className="cursor-pointer" onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Planta
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Especie</TableHead>
              <TableHead>Fecha de modificación</TableHead>
              <TableHead className="w-25">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plants.map((plant) => (
              <TableRow key={plant.id}>
                <TableCell>
                  <img
                    src="https://placehold.co/400"
                    alt={plant.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{plant.name}</TableCell>
                <TableCell className="font-medium">{plant.species}</TableCell>
                <TableCell>{plant.updated_at}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      className="cursor-pointer"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(plant)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      className="cursor-pointer"
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
            {plants.length === 0 && (
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
              Estas seguro de que deseas eliminar "{selectedPlant?.name}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="cursor-pointer" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="cursor-pointer" onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
