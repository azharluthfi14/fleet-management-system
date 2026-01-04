type ChipColor =
  | "primary"
  | "success"
  | "warning"
  | "secondary"
  | "default"
  | "danger";

export const statusColor: Record<string, ChipColor> = {
  active: "success",
  maintenance: "secondary",
  inactive: "danger",
};
