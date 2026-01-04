/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@heroui/react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  className?: string;
};

export function DataTable<T>({ data, columns, className }: TableProps<T>) {
  const memoizedColumn = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumn,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={`overflow-x-auto scrollbar-hide ${className || ""}`}>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    "px-6 py-4 text-xs uppercase font-semibold text-gray-500 last:text-right"
                  )}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-2 px-6 text-xs text-gray-800 font-medium"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
