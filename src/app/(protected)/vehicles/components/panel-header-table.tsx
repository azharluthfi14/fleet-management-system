/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@heroui/react";
import { Download, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { Role } from "@/constants";
import { useResettableActionState } from "@/hooks";

import { FormModalVehicle } from "./form-modal-vehicle";

interface PanelHeaderTableProps {
  userRoles?: readonly Role[];
  action: (_prevState: unknown, formData: FormData) => Promise<any>;
}

export const PanelHeaderTable = ({ action }: PanelHeaderTableProps) => {
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [state, formAction, pending, reset] = useResettableActionState(
    action,
    undefined
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("Vehicle created");
      queueMicrotask(() => {
        setOpenModalCreate(false);
      });
    }
  }, [state]);

  useEffect(() => {
    if (state?.errors) {
      toast.error("Error create vehicles");
    }
  }, [state?.errors]);

  const handleCloseModalCreate = () => {
    setOpenModalCreate((prev) => !prev);
    reset();
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Vehicles</h1>
        <div className="flex items-center gap-x-2">
          <Button
            size="sm"
            color="default"
            className="border border-gray-200 font-medium"
            variant="solid"
            startContent={<Download className="size-4" />}
          >
            Export
          </Button>
          <Button
            size="sm"
            color="primary"
            className="border border-gray-900"
            startContent={<Plus className="size-4" />}
            onPress={() => setOpenModalCreate(!openModalCreate)}
          >
            Add Vehicle
          </Button>
        </div>
      </div>
      <FormModalVehicle
        key={openModalCreate ? "create-open" : "create-close"}
        mode="create"
        isOpen={openModalCreate}
        onOpenChange={handleCloseModalCreate}
        action={formAction}
        isPending={pending}
        errors={openModalCreate ? state?.errors : null}
      />
    </>
  );
};
