"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useRef } from "react";

interface ConfirmDeleteDriverProps {
  openConfirmDelete: boolean;
  isPending?: boolean;
  setOpenConfirmDelete: (open: boolean) => void;
  formActionDeleteDriver: (formData: FormData) => void | Promise<void>;
  selectedDriverId: string | null;
}

export const ConfirmDeleteDriver = ({
  openConfirmDelete,
  formActionDeleteDriver,
  selectedDriverId,
  setOpenConfirmDelete,
  isPending,
}: ConfirmDeleteDriverProps) => {
  const deleteFormRef = useRef<HTMLFormElement>(null);

  if (!selectedDriverId) return null;

  return (
    <Modal isOpen={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
      <ModalContent>
        {(onClose) => (
          <>
            <form ref={deleteFormRef} action={formActionDeleteDriver}>
              <input type="hidden" name="driverId" value={selectedDriverId} />
            </form>
            <ModalHeader>Delete Driver</ModalHeader>
            <ModalBody>Are you sure? This action cannot be undone.</ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                isLoading={isPending}
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
  );
};
