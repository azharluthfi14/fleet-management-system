/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Card, CardBody, Chip, cn, useDisclosure } from "@heroui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { statusColor } from "@/app/(protected)/vehicles/components/color";
import { DataTable } from "@/components/ui";
import type { Role } from "@/constants";
import type { Driver } from "@/features/driver";
import type { Vehicle } from "@/features/vehicle";
import { useResettableActionState } from "@/hooks";

import { DetailDriver } from "./detail-driver";
import { FormModalDriver } from "./form-modal-driver";

interface DriverTableProps {
  drivers: Driver[];
  availabelVehicles: Vehicle[];
  userRoles: readonly Role[];
  actionEdit: (_prevStat: unknown, formData: FormData) => Promise<any>;
  actionDelete: (_prevStat: unknown, formData: FormData) => Promise<any>;
  actionAssign: (_prevStat: unknown, formData: FormData) => Promise<any>;
}

export const DriverTable = ({
  userRoles,
  drivers,
  availabelVehicles,
  actionEdit,
  actionDelete,
  actionAssign,
}: DriverTableProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const canEdit = userRoles.includes("admin") || userRoles.includes("manager");
  const canDelete = userRoles.includes("admin");
  const [driver, setDriver] = useState<Driver | null>(null);

  const handleOpenDetailDriver = (driver: Driver) => {
    setDriver(driver);
    onOpen?.();
  };

  const columnHelper = createColumnHelper<Driver>();
  const vehicleColumn = [
    columnHelper.accessor("fullName", {
      header: "Fullname",
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor("licenseNumber", {
      header: "License Number",
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor("licenseExpiry", {
      header: "License Expiry",
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
              onPress={() => handleOpenDetailDriver(row.original)}
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

  const [state, formActionEdit, pending, reset] = useResettableActionState(
    actionEdit,
    undefined
  );

  const [stateAssignAction, formActionAssign] = useResettableActionState(
    actionAssign,
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
      toast.success("Driver edited");
      queueMicrotask(() => {
        setOpenModalEdit(false);
      });
    }
  }, [state]);

  useEffect(() => {
    if (state?.errors) {
      toast.error("Error edit driver");
    }
  }, [state?.errors]);

  const handleCloseModalEdit = () => {
    setOpenModalEdit((prev) => !prev);
    reset();
  };

  useEffect(() => {
    if (stateActionDelete?.success) {
      toast.success("Driver deleted");
    }
  }, [stateActionDelete]);

  return (
    <>
      <Card shadow="none" className="border border-gray-200" radius="sm">
        <CardBody className="p-0">
          <DataTable columns={vehicleColumn} data={drivers} />
        </CardBody>
      </Card>
      <DetailDriver
        deleteAction={formActionDelete}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        driver={driver}
        canDelete={canDelete}
        canEdit={canEdit}
        availableVehicles={availabelVehicles}
        handleEdit={() => setOpenModalEdit(!openModalEdit)}
        assignAction={formActionAssign}
      />

      <FormModalDriver
        key={openModalEdit ? "edit-open" : "edit-close"}
        initialData={driver}
        mode={"edit"}
        isOpen={openModalEdit}
        onOpenChange={handleCloseModalEdit}
        action={formActionEdit}
        isPending={pending}
        errors={openModalEdit ? state?.errors : null}
      />
    </>
  );
};
