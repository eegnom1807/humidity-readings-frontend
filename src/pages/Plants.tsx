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
import type { Plant, PlantRequest, PlantRequestUpdate } from "@/types/plant"
import plantService from "@/services/plantService";
import { AxiosError } from "axios";
import { toastMessage } from "@/lib/utils"

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

  const handleFormSubmit = async (data: PlantRequest, edit: boolean, image?: File) => {
    try {
      let plantId = data.id;

      if (!edit) {
        const plant = await plantService.create(data);
        plantId = plant.id;
        toastMessage("Plant created", "success");
      } else if (data.id) {
        const new_data: PlantRequestUpdate = {
          name: data.name,
          image_url: data.image_url
        }
        await plantService.update(data.id, new_data);
        toastMessage("Plant updated", "success");
      }

      if (image && plantId) {
        const formData = new FormData()
        formData.append("image_url", image);
        await plantService.uploadImage(String(plantId), formData);
      }

      setFormOpen(false);
      getAllPlants();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message ?? {};
        if (typeof errorMessage == 'string')
          toastMessage(errorMessage || "Error al crear la planta", "error");

        const { name: [nameError] = [] } = errorMessage;
        const errors = [nameError].filter(e => typeof e === "string");
        if (errors.length > 0)
          toastMessage(errors.join(" · "), "error");
      }
    }
  }

  const handleConfirmDelete = async () => {
    if (selectedPlant?.id)
      await plantService.delete(selectedPlant?.id);

    toastMessage("Plant deleted", "success");
    setDeleteDialogOpen(false)
    setSelectedPlant(null)
    getAllPlants();
  }

  const isActive = (active: boolean): string => {
    return (active) ? "Si" : "No";
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
          Agregar
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Activa</TableHead>
              <TableHead>Fecha de modificación</TableHead>
              <TableHead className="w-25">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plants.map((plant) => (
              <TableRow key={plant.id}>
                <TableCell>
                  <img
                    src={plantService.getImage(plant.image_url)}
                    alt={plant.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{plant.name}</TableCell>
                <TableCell className="font-medium">{isActive(plant.active)}</TableCell>
                <TableCell className="font-medium">{plant.updated_at}</TableCell>
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
