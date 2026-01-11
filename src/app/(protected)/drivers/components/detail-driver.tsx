"use client";

import {
  Button,
  Chip,
  cn,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect, useRef, useState } from "react";

import type { Driver, DriverWithAssignment } from "@/features/driver";
import { getDriverDetailAction } from "@/features/driver/driver.action";
import type { Vehicle } from "@/features/vehicle";

import { statusColor } from "../../vehicles/components/color";

interface DetailDriverProps {
  driver: DriverWithAssignment | null;
  isOpen: boolean;
  onOpenChange: () => void;
  canEdit: boolean;
  canDelete: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
  deleteAction?: (formData: FormData) => void | Promise<void>;
  assignAction?: (formData: FormData) => void | Promise<void>;
  driverVehicle?: DriverWithAssignment;
  availableVehicles?: Vehicle[];
}

export const DetailDriver = ({
  driver,
  isOpen,
  canDelete,
  canEdit,
  availableVehicles,
  handleEdit,
  onOpenChange,
  handleDelete,
  assignAction,
  deleteAction,
}: DetailDriverProps) => {
  const [openAssign, setOpenAssign] = useState(false);

  if (!driver) return null;

  return (
    <>
      <Drawer radius="sm" size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex border-b border-gray-200 flex-col">
                Driver Detail
              </DrawerHeader>
              <DrawerBody>
                <div className="space-y-4">
                  <form action={deleteAction}>
                    <input type="hidden" name="id" value={driver.id} />
                  </form>
                  <div className="pt-2">
                    <h3 className="mb-3 text-base text-gray-900 font-semibold">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 font-medium">
                          Fullname
                        </label>
                        <p className="text-gray-900 font-semibold">
                          {driver?.fullName}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Status
                        </label>
                        <Chip
                          size="sm"
                          className="px-5 capitalize"
                          classNames={{
                            content: cn("font-bold"),
                          }}
                          variant="flat"
                          color={
                            statusColor[driver?.status ?? "inactive"] ||
                            "default"
                          }
                        >
                          {driver?.status}
                        </Chip>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          License Number
                        </label>
                        <p className="text-gray-900 font-semibold">
                          {driver?.licenseNumber}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          License Expiry
                        </label>
                        <p className="text-gray-900 font-semibold">
                          {driver?.licenseExpiry}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 ">
                          Phone
                        </label>
                        <p className="text-gray-900 capitalize font-semibold">
                          {driver?.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-gray-900 mb-3 text-base font-semibold">
                      Current Assignment
                    </h3>
                    <div>
                      <div>
                        <label className="block text-sm text-gray-600 font-medium">
                          Assigned Vehicle
                        </label>
                        {driver.assignment ? (
                          <p>{driver.assignment.vehicle.name}</p>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-gray-500">
                              No vehicle currently assigned
                            </p>
                            <Button
                              fullWidth
                              color="primary"
                              variant="bordered"
                              onPress={() => setOpenAssign(true)}
                            >
                              Assign Vehicle
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter className="flex justify-between">
                {canEdit && (
                  <Button
                    fullWidth
                    color="primary"
                    radius="sm"
                    onPress={() => {
                      onClose?.();
                      handleEdit();
                    }}
                  >
                    Edit Driver
                  </Button>
                )}
                {canDelete && (
                  <Button
                    onPress={() => {
                      handleDelete();
                      onOpenChange?.();
                    }}
                    fullWidth
                    radius="sm"
                    color="danger"
                    variant="flat"
                  >
                    Delete
                  </Button>
                )}
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <Modal isOpen={openAssign} onOpenChange={setOpenAssign}>
        <ModalContent>
          {(onClose) => (
            <form action={assignAction}>
              <ModalHeader>Assign Vehicle</ModalHeader>

              <ModalBody className="space-y-4">
                {availableVehicles === undefined ||
                availableVehicles.length <= 0 ? (
                  <p className="text-gray-500">
                    No available vehicles to assign.
                  </p>
                ) : (
                  <>
                    <input type="hidden" name="driverId" value={driver?.id} />
                    <Select
                      name="vehicleId"
                      label="Select Vehicle"
                      placeholder="Choose available vehicle"
                      isRequired
                    >
                      {availableVehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id}>
                          {vehicle.plateNumber} — {vehicle.model}
                        </SelectItem>
                      ))}
                    </Select>
                  </>
                )}
              </ModalBody>

              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Assign
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
