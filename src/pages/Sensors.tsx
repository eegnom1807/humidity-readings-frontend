import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Cpu } from "lucide-react"
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
import { SensorForm } from "@/components/SensorForm"
import type { Sensor, SensorRequest } from "@/types/sensor"
import type { Plant } from "@/types/plant"
import sensorService from "@/services/sensorService"
import plantService from "@/services/plantService";
import { AxiosError } from "axios";
import { toastMessage } from "@/lib/utils"

export function Sensors() {
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null)
  const [sensors, setSensors] = useState<Sensor[]>([])
  const [plants, setPlants] = useState<Plant[]>([])

  useEffect(() => {
    getAllSensors();
    getAllPlants();
  }, [])

  const getAllSensors = async () => {
    const response = await sensorService.getAll()
    setSensors(response)
  }

  const getAllPlants = async () => {
    const response = await plantService.getAll();
    setPlants(response);
  };

  const getPlantName = (plantId: number): string => {
    const plant = plants.find((p) => Number(p.id) === plantId)
    return plant?.name ?? String(plantId)
  }

  const handleCreate = () => {
    setSelectedSensor(null)
    setFormOpen(true)
  }

  const handleEdit = (sensor: Sensor) => {
    setSelectedSensor(sensor)
    setFormOpen(true)
  }

  const handleDelete = (sensor: Sensor) => {
    setSelectedSensor(sensor)
    setDeleteDialogOpen(true)
  }

  const handleFormSubmit = async (data: SensorRequest, edit: boolean) => {
    try {
      if (!edit) {
        await sensorService.create(data)
        toastMessage("Sensor created", "success");
      } else if (selectedSensor) {
        await sensorService.update(selectedSensor.id, data)
        toastMessage("Sensor updated", "success");
      }

      setFormOpen(false)
      getAllSensors()
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message ?? {};
        if (typeof errorMessage == 'string')
          toastMessage(errorMessage || "Error al crear el sensor", "error");

        const { pin: [pinError] = [], plant_id: [plantIdError] = [] } = errorMessage;
        const errors = [pinError, plantIdError].filter(e => typeof e === "string");
        if (errors.length > 0)
          toastMessage(errors.join(" · "), "error");
      }
    }
  }

  const handleConfirmDelete = async () => {
    if (selectedSensor)
      await sensorService.delete(selectedSensor.id)

    toastMessage("Sensor deleted", "success");
    setDeleteDialogOpen(false)
    setSelectedSensor(null)
    getAllSensors()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold">Sensores</h1>
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
              <TableHead>Pin</TableHead>
              <TableHead>Planta</TableHead>
              <TableHead>Fecha de modificación</TableHead>
              <TableHead className="w-25">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sensors.map((sensor) => (
              <TableRow key={sensor.id}>
                <TableCell className="font-medium">{sensor.pin}</TableCell>
                <TableCell className="font-medium">{getPlantName(sensor.plant_id)}</TableCell>
                <TableCell className="font-medium">{sensor.updated_at}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      className="cursor-pointer"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(sensor)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      className="cursor-pointer"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(sensor)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {sensors.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No hay sensores registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <SensorForm
        open={formOpen}
        onOpenChange={setFormOpen}
        sensor={selectedSensor}
        onSubmit={handleFormSubmit}
        plants={plants}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Sensor</DialogTitle>
            <DialogDescription>
              Estas seguro de que deseas eliminar el sensor "{selectedSensor?.pin}"?
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
