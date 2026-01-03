"use client";

import type { LucideIcon } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color?: string;
}

export const StatCard = ({
  title,
  icon: Icon,
  value,
  change,
  color,
}: StatCardProps) => {
  return (
    <div className="border border-gray-200 bg-white rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="mt-2 text-3xl">{value}</p>
          {change !== undefined && (
            <div
              className={`mt-2 flex items-center gap-1 text-sm ${change >= 0 ? "text-emerald-600" : "text-red-600"}`}
            >
              <span>{change >= 0 ? "↑" : "↓"}</span>
              <span>{Math.abs(change)}%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="size-6" />
        </div>
      </div>
    </div>
  );
};
