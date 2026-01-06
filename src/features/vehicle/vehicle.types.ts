export type VehicleStatus = "active" | "maintenance" | "inactive";

export interface Vehicle {
  id: string;
  plateNumber: string;
  name: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  status: VehicleStatus;
  odometer: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateVehicleInput = {
  plateNumber: string;
  name: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  status?: VehicleStatus;
  odometer?: number | null;
};

export type UpdateVehicleInput = {
  id: string;
  name?: string;
  type?: string;
  brand?: string;
  model?: string;
  year?: number;
  status?: VehicleStatus;
  odometer?: number;
};

export interface VehicleRepository {
  list(): Promise<Vehicle[]>;
  findById(id: string): Promise<Vehicle | null>;
  create(input: CreateVehicleInput): Promise<{ id: string }>;
  update(vehicleId: string, input: UpdateVehicleInput): Promise<void>;
  delete(id: string): Promise<void>;
}

export type VehicleServiceDeps = {
  repo: VehicleRepository;
};
