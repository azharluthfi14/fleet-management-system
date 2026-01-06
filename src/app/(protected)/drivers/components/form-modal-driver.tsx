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

import type { Driver } from "@/features/driver";

type Mode = "edit" | "create";

interface FormModalDriverProps {
  mode: Mode;
  isOpen: boolean;
  onOpenChange: () => void;
  initialData?: Partial<Driver> | null;
  action: string | ((formData: FormData) => void | Promise<void>) | undefined;
  isPending: boolean;
  errors?: Record<string, string[]> | null;
}

const defaultValues = {
  fullName: "",
  phone: "",
  licenseNumber: "",
  licenseExpiry: "",
  status: "",
};

export const FormModalDriver = ({
  action,
  isOpen,
  mode,
  isPending,
  initialData,
  onOpenChange,
  errors,
}: FormModalDriverProps) => {
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
                    <Input value={values.id} name="driverId" type="hidden" />
                  )}
                  <Input
                    name="fullName"
                    label="Fullname"
                    placeholder="John doe"
                    defaultValue={values.fullName}
                    isInvalid={!!errors?.fullName}
                    errorMessage={errors?.fullName?.[0]}
                  />
                  <Input
                    name="phone"
                    label="Phone number"
                    placeholder="085XXXXXXXXXXX"
                    defaultValue={values.phone ? values.phone : ""}
                    isInvalid={!!errors?.phone}
                    errorMessage={errors?.phone?.[0]}
                  />
                  <Input
                    name="licenseNumber"
                    label="License Number"
                    placeholder="XXX-XXX"
                    defaultValue={values.licenseNumber}
                    isInvalid={!!errors?.licenseNumber}
                    errorMessage={errors?.licenseNumber?.[0]}
                  />
                  <Input
                    name="licenseExpiry"
                    label="License Expiry"
                    placeholder="Brand"
                    defaultValue={
                      values.licenseExpiry ? values.licenseExpiry : ""
                    }
                    isInvalid={!!errors?.licenseExpiry}
                    errorMessage={errors?.licenseExpiry?.[0]}
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
