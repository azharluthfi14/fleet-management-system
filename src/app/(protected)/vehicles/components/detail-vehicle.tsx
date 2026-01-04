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
} from "@heroui/react";

import type { Vehicle } from "@/features/vehicle";

import { statusColor } from "./color";

interface DetailVehicleProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onOpenChange: () => void;
  canEdit: boolean;
  canDelete: boolean;
  handleEdit: () => void;
}

export const DetailVehicle = ({
  vehicle,
  isOpen,
  canDelete,
  canEdit,
  handleEdit,
  onOpenChange,
}: DetailVehicleProps) => {
  if (!vehicle) return null;
  return (
    <>
      <Drawer radius="sm" size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex border-b border-gray-200 flex-col">
                Vehicle Details
              </DrawerHeader>
              <DrawerBody>
                <div className="space-y-4">
                  <div className="pt-2">
                    <h3 className="mb-3 text-base text-gray-900 font-semibold">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 font-medium">
                          License Plate
                        </label>
                        <p className="text-gray-900 font-semibold">
                          {vehicle?.plateNumber}
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
                            statusColor[vehicle?.status ?? "inactive"] ||
                            "default"
                          }
                        >
                          {vehicle?.status}
                        </Chip>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Model
                        </label>
                        <p className="text-gray-900 font-semibold">
                          {vehicle?.model}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Year
                        </label>
                        <p className="text-gray-900 font-semibold">
                          {vehicle?.year}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 ">
                          Type
                        </label>
                        <p className="text-gray-900 capitalize font-semibold">
                          {vehicle?.type}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Fuel Type
                        </label>
                        <p className="text-gray-900 capitalize font-semibold">
                          Diesel
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-gray-900 mb-3 text-base font-semibold">
                      Operational Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 font-medium">
                          Current Mileage
                        </label>
                        <p className="text-gray-900 font-semibold">100 miles</p>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 font-medium">
                          Location
                        </label>
                        <p className="text-gray-900 font-semibold">Jakarta</p>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 font-medium">
                          Assigned Driver
                        </label>
                        <p className="text-gray-900 font-semibold">
                          Unassigned
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-gray-900 mb-3 text-base font-semibold">
                      Maintenance Schedule
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 font-medium">
                          Last Service
                        </label>
                        <p className="text-gray-900 font-semibold">Januari</p>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 font-medium">
                          Next Service
                        </label>
                        <p className="text-gray-900 font-semibold">Februari</p>
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
                    Edit Vehicle
                  </Button>
                )}
                {canDelete && (
                  <Button
                    fullWidth
                    radius="sm"
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Delete
                  </Button>
                )}
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
