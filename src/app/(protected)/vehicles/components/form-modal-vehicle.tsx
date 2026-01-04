"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

import type { Vehicle } from "@/features/vehicle";

type Mode = "edit" | "create";

interface FormModalVehicleProps {
  mode: Mode;
  isOpen: boolean;
  onOpenChange: () => void;
  initialData?: Partial<Vehicle> | null;
  action: string | ((formData: FormData) => void | Promise<void>) | undefined;
  isPending: boolean;
  errors?: Record<string, string[]> | null;
}

const defaultValues = {
  plateNumber: "",
  name: "",
  type: "",
  brand: "",
  model: "",
  year: "",
  odometer: "",
};

export const FormModalVehicle = ({
  action,
  isOpen,
  mode,
  isPending,
  initialData,
  onOpenChange,
  errors,
}: FormModalVehicleProps) => {
  const values = { ...defaultValues, ...initialData };

  const isCreate = mode === "create";

  const handleClose = () => {
    onOpenChange();
  };

  return (
    <>
      <Modal
        size="3xl"
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <form action={action} noValidate>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              {isCreate ? " Add New Vehicle" : "Edit Vehicle"}
            </ModalHeader>
            <ModalBody className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-sm">
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {!isCreate && (
                    <Input value={values.id} name="id" type="hidden" />
                  )}
                  <Input
                    name="plateNumber"
                    label="Plate Number"
                    placeholder="B 1234 XYZ"
                    defaultValue={values.plateNumber}
                    isReadOnly={!isCreate}
                    isInvalid={!!errors?.plateNumber}
                    errorMessage={errors?.plateNumber?.[0]}
                  />
                  <Input
                    name="name"
                    label="Name"
                    placeholder="Truck A"
                    defaultValue={values.name}
                    isInvalid={!!errors?.name}
                    errorMessage={errors?.name?.[0]}
                  />
                  <Input
                    name="type"
                    label="Type"
                    placeholder="Type"
                    defaultValue={values.type}
                    isInvalid={!!errors?.type}
                    errorMessage={errors?.type?.[0]}
                  />
                  <Input
                    name="brand"
                    label="Brand"
                    placeholder="Brand"
                    defaultValue={values.brand}
                    isInvalid={!!errors?.brand}
                    errorMessage={errors?.brand?.[0]}
                  />
                  <Input
                    name="model"
                    label="Model"
                    placeholder="Model"
                    defaultValue={values.model}
                    isInvalid={!!errors?.model}
                    errorMessage={errors?.model?.[0]}
                  />
                  <Input
                    name="year"
                    type="text"
                    label="Year"
                    placeholder="Year"
                    defaultValue={values.year ? String(values.year) : ""}
                    isInvalid={!!errors?.year}
                    errorMessage={errors?.year?.[0]}
                  />
                  <Input
                    name="odometer"
                    type="text"
                    label="Odometer"
                    placeholder="Odometer"
                    defaultValue={
                      values.odometer ? String(values.odometer) : ""
                    }
                    isInvalid={!!errors?.odometer}
                    errorMessage={errors?.odometer?.[0]}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={handleClose}
                variant="bordered"
                radius="sm"
                color="danger"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                radius="sm"
                isLoading={isPending}
              >
                {isCreate ? "Add Vehicle" : "Edit Vehicle"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

{
  /* <div>
                <h3 className="font-semibold mb-3 text-sm">
                  Operational Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="currentLocation"
                    label="Current Location"
                    placeholder="Warehouse A"
                  />
                  <Input
                    name="assignedDriver"
                    label="Assigned Driver"
                    placeholder="Unassigned"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm">
                  Maintenance Schedule
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="lastServiceDate"
                    label="Last Service Date"
                    placeholder="Januari"
                  />
                  <Input
                    name="nextServiceDate"
                    label="Next Service Date"
                    placeholder="March"
                  />
                </div>
              </div> */
}
