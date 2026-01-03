"use client";
import { Activity, MapPin, Truck, Users } from "lucide-react";

import { StatCard } from "./stat-card";

export const ListStat = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        title="Active Vehicles"
        icon={Truck}
        change={8.2}
        color="text-blue-600"
        value={""}
      />
      <StatCard
        title="Active Drivers"
        icon={Users}
        change={7.2}
        color="text-emerald-600"
        value={""}
      />
      <StatCard
        title="Active Trips"
        icon={MapPin}
        change={2.2}
        color="text-purple-600"
        value={""}
      />
      <StatCard
        title="Alerts"
        icon={Activity}
        change={-10.2}
        color="text-orange-600"
        value={""}
      />
    </div>
  );
};
