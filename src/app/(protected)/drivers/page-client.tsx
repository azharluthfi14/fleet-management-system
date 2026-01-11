"use client";

import { Button, useDisclosure } from "@heroui/react";
import { Download, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { AuthUser } from "@/features/auth";
import type { DriverWithAssignment } from "@/features/driver";
import type { Driver } from "@/features/driver";
import {
  createDriverAction,
  deleteDriverAction,
  editDriverAction,
  getDriverDetailAction,
} from "@/features/driver/driver.action";
import { useResettableActionState } from "@/hooks";

import {
  ConfirmDeleteDriver,
  DetailDriver,
  DriverTable,
  FormModalDriver,
} from "./components";

interface DriverPageClientProps {
  drivers: Driver[];
  user: AuthUser;
}

type ModeForm = "create" | "edit";
type SelectedDriver = {
  id: string | null;
  data: DriverWithAssignment | null;
};

export function DriverPageClient({ drivers, user }: DriverPageClientProps) {
  const hasAccessEdit =
    user.roles.includes("admin") || user.roles.includes("manager");
  const hasAccessDelete = user.roles.includes("admin");

  const [
    stateCreateDriver,
    formActionCreateDriver,
    pendingActionCreateDriver,
    resetStateActionCreateDriver,
  ] = useResettableActionState(createDriverAction, undefined);

  const [
    stateEditDriver,
    formActionEditDriver,
    pendingActionEditDriver,
    resetStateActionEditDriver,
  ] = useResettableActionState(editDriverAction, undefined);

  const [stateDeleteDriver, formActionDeleteDriver, pendingActionDeleteDriver] =
    useResettableActionState(deleteDriverAction, undefined);

  const {
    isOpen: isOpenDetailDriver,
    onOpen: onOpenDetailDriver,
    onOpenChange: onOpenChangeDetailDriver,
  } = useDisclosure();

  const [selectedDriver, setSelectedDriver] = useState<SelectedDriver>({
    id: null,
    data: null,
  });

  const [modeForm, setModeForm] = useState<ModeForm>("create");
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const handleClickDetailDriver = (driverId: string) => {
    setSelectedDriver({
      id: driverId,
      data: null,
    });
    onOpenDetailDriver();
  };

  const handleOpenChangeCreateDriverModal = () => {
    setModeForm("create");
    setOpenModalCreate((prev) => !prev);
    resetStateActionCreateDriver();
  };

  const handleOpenModalEditDriver = () => {
    setModeForm("edit");
    setOpenModalEdit((prev) => !prev);
    resetStateActionEditDriver();
  };

  const handleOpenDeleteModal = () => {
    setOpenConfirmDelete((prev) => !prev);
  };

  useEffect(() => {
    if (!selectedDriver.id) return;
    let cancelled = false;

    getDriverDetailAction(selectedDriver.id)
      .then((data) => {
        if (!cancelled) {
          setSelectedDriver((prev) => ({
            ...prev,
            data: data,
          }));
        }
      })
      .catch(() => toast.error("Failed to fetch driver details"));

    return () => {
      cancelled = true;
    };
  }, [selectedDriver.id]);

  useEffect(() => {
    if (stateCreateDriver?.success) {
      toast.success("Driver created");
      queueMicrotask(() => {
        setOpenModalCreate(false);
      });
    }
  }, [stateCreateDriver]);

  useEffect(() => {
    if (stateDeleteDriver?.success) {
      toast.success("Driver deleted");
      queueMicrotask(() => {
        setOpenConfirmDelete(false);
      });
    }
  }, [stateDeleteDriver]);

  useEffect(() => {
    if (stateDeleteDriver?.errors) {
      toast.error(stateDeleteDriver.errors.driverId);
    }
  }, [stateDeleteDriver?.errors]);

  useEffect(() => {
    if (stateEditDriver?.success) {
      toast.success("Success edit driver");
      queueMicrotask(() => {
        setOpenModalEdit(false);
      });
    }
  }, [stateEditDriver]);

  return (
    <>
      <div className="flex justify-between">
        <div className="space-y-1">
          <h1 className="font-semibold text-xl">Driver Managements</h1>
          <p className="text-gray-500">
            Manage driver profiles and assignments
          </p>
        </div>
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
            onPress={handleOpenChangeCreateDriverModal}
          >
            Add Driver
          </Button>
        </div>
      </div>
      <DriverTable
        drivers={drivers}
        handleClickDetail={handleClickDetailDriver}
      />
      <DetailDriver
        driver={selectedDriver.data}
        isOpen={isOpenDetailDriver}
        onOpenChange={onOpenChangeDetailDriver}
        canEdit={hasAccessEdit}
        canDelete={hasAccessDelete}
        handleEdit={handleOpenModalEditDriver}
        handleDelete={handleOpenDeleteModal}
      />
      <FormModalDriver
        mode={modeForm}
        initialData={modeForm === "edit" ? selectedDriver.data : null}
        isOpen={modeForm === "create" ? openModalCreate : openModalEdit}
        onOpenChange={
          modeForm === "create"
            ? handleOpenChangeCreateDriverModal
            : handleOpenModalEditDriver
        }
        action={
          modeForm === "create" ? formActionCreateDriver : formActionEditDriver
        }
        isPending={
          modeForm === "create"
            ? pendingActionCreateDriver
            : pendingActionEditDriver
        }
        errors={
          modeForm === "create"
            ? stateCreateDriver?.errors
            : stateEditDriver?.errors
        }
      />

      <ConfirmDeleteDriver
        openConfirmDelete={openConfirmDelete}
        setOpenConfirmDelete={handleOpenDeleteModal}
        formActionDeleteDriver={formActionDeleteDriver}
        selectedDriverId={selectedDriver.id}
        isPending={pendingActionDeleteDriver}
      />
    </>
  );
}
