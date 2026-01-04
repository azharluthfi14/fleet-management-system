export const getFieldError = (
  errors: Record<string, string[]> | null | undefined,
  fieldName: string
) => {
  return errors?.[fieldName]?.[0];
};

export const hasFieldError = (
  errors: Record<string, string[]> | null | undefined,
  fieldName: string
) => {
  return !!errors?.[fieldName];
};
