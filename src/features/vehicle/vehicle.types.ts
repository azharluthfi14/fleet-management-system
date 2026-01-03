export interface Vehicle {
  id: string;
  plateNumber: string;
  name: string;
  type: string;
  capacity?: string | null;
  isActive: boolean;
  createdAt: Date;
}

export type CreateVehicleInput = {
  plateNumber: string;
  name: string;
  type: string;
  capacity?: string;
};

export type UpdateVehicleInput = Partial<CreateVehicleInput> & {
  id: string;
};

export interface VehicleRepository {
  list(): Promise<Vehicle[]>;
  findById(id: string): Promise<Vehicle | null>;
  create(input: CreateVehicleInput): Promise<{ id: string }>;
  update(input: UpdateVehicleInput): Promise<void>;
  delete(id: string): Promise<void>;
}

export type VehicleServiceDeps = {
  repo: VehicleRepository;
};
