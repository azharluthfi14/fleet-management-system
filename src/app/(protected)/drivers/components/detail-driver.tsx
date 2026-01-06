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
} from "@heroui/react";
import { useRef, useState } from "react";

import type { Driver } from "@/features/driver";

import { statusColor } from "../../vehicles/components/color";

interface DetailDriverProps {
  driver: Driver | null;
  isOpen: boolean;
  onOpenChange: () => void;
  canEdit: boolean;
  canDelete: boolean;
  handleEdit: () => void;
  deleteAction: (formData: FormData) => void | Promise<void>;
}

export const DetailDriver = ({
  driver,
  isOpen,
  canDelete,
  canEdit,
  handleEdit,
  onOpenChange,
  deleteAction,
}: DetailDriverProps) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const deleteFormRef = useRef<HTMLFormElement>(null);
  if (!driver) return null;
  return (
    <>
      <form ref={deleteFormRef} action={deleteAction}>
        <input type="hidden" name="driverId" value={driver.id} />
      </form>
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
                    Edit Driver
                  </Button>
                )}
                {canDelete && (
                  <Button
                    onPress={() => {
                      setOpenConfirm(true);
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

      <Modal isOpen={openConfirm} onOpenChange={setOpenConfirm}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Delete Driver</ModalHeader>
              <ModalBody>Are you sure? This action cannot be undone.</ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    deleteFormRef.current?.requestSubmit();
                    onClose();
                  }}
                >
                  Yes, Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
