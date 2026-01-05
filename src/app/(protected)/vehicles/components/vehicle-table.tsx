/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Card, CardBody, Chip, cn, useDisclosure } from "@heroui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/ui";
import type { Role } from "@/constants";
import type { Vehicle } from "@/features/vehicle";
import { useResettableActionState } from "@/hooks";

import { statusColor } from "./color";
import { DetailVehicle } from "./detail-vehicle";
import { FormModalVehicle } from "./form-modal-vehicle";

interface VehicleTableProps {
  vehicles: Vehicle[];
  userRoles: readonly Role[];
  action: (_prevStat: unknown, formData: FormData) => Promise<any>;
  actionDelete: (_prevStat: unknown, formData: FormData) => Promise<any>;
}

export const VehicleTable = ({
  userRoles,
  vehicles,
  action,
  actionDelete,
}: VehicleTableProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const canEdit = userRoles.includes("admin") || userRoles.includes("manager");
  const canDelete = userRoles.includes("admin");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const handleOpenDetailVehicle = (vehicle: Vehicle) => {
    setVehicle(vehicle);
    onOpen?.();
  };

  const columnHelper = createColumnHelper<Vehicle>();
  const vehicleColumn = [
    columnHelper.accessor("plateNumber", {
      header: "Plate",
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor("brand", {
      header: "Brand",
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor("model", {
      header: "Model",
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor("year", {
      header: "Year",
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor((row) => row.status ?? "-", {
      id: "status",
      header: "Status",
      cell: (info) => (
        <Chip
          variant="flat"
          size="sm"
          className="px-3 capitalize"
          classNames={{
            content: cn("font-semibold"),
          }}
          color={statusColor[info.getValue()] || "default"}
        >
          {info.getValue()}
        </Chip>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <Button
              onPress={() => handleOpenDetailVehicle(row.original)}
              isIconOnly
              size="sm"
              color="default"
              className="border border-gray-200 font-medium"
              variant="solid"
            >
              <Eye className="size-4" />
            </Button>
          </div>
        );
      },
    }),
  ];

  const [state, formAction, pending, reset] = useResettableActionState(
    action,
    undefined
  );

  const [
    stateActionDelete,
    formActionDelete,
    pendingActionDelete,
    resetActionDelete,
  ] = useResettableActionState(actionDelete, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success("Vehicle edited");
      queueMicrotask(() => {
        setOpenModalEdit(false);
      });
    }
  }, [state]);

  useEffect(() => {
    if (state?.errors) {
      toast.error("Error edit vehicles");
    }
  }, [state?.errors]);

  const handleCloseModalEdit = () => {
    setOpenModalEdit((prev) => !prev);
    reset();
  };

  useEffect(() => {
    if (stateActionDelete?.success) {
      toast.success("Vehicle deleted");
    }
  }, [stateActionDelete]);

  return (
    <>
      <Card shadow="none" className="border border-gray-200" radius="sm">
        <CardBody className="p-0">
          <DataTable columns={vehicleColumn} data={vehicles} />
        </CardBody>
      </Card>
      <DetailVehicle
        deleteAction={formActionDelete}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        vehicle={vehicle}
        canDelete={canDelete}
        canEdit={canEdit}
        handleEdit={() => setOpenModalEdit(!openModalEdit)}
      />
      <FormModalVehicle
        key={openModalEdit ? "edit-open" : "edit-close"}
        initialData={vehicle}
        mode={"edit"}
        isOpen={openModalEdit}
        onOpenChange={handleCloseModalEdit}
        action={formAction}
        isPending={pending}
        errors={openModalEdit ? state?.errors : null}
      />
    </>
  );
};
