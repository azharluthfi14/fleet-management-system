"use client";

import { Button, Card, CardBody, Chip, cn } from "@heroui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { statusColor } from "@/app/(protected)/vehicles/components/color";
import { DataTable } from "@/components/ui";
import type { Role } from "@/constants";
import type { Driver, DriverWithAssignment } from "@/features/driver";
import type { Vehicle } from "@/features/vehicle";

interface DriverTableProps {
  drivers: Driver[];
  availabelVehicles?: Vehicle[];
  driverVehicle?: DriverWithAssignment;
  userRoles?: readonly Role[];
  handleClickDetail: (driverId: string) => void;
}

export const DriverTable = ({
  drivers,
  handleClickDetail,
}: DriverTableProps) => {
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
              onPress={() => handleClickDetail(row.original.id)}
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

  return (
    <>
      <Card shadow="none" className="border border-gray-200" radius="sm">
        <CardBody className="p-0">
          <DataTable columns={vehicleColumn} data={drivers} />
        </CardBody>
      </Card>
    </>
  );
};
