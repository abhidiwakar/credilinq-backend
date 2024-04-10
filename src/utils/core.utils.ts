export const safeParseInt = (
  value: string | number,
  fallback?: number,
): number | null => {
  const parsed = parseInt(value as string);
  return isNaN(parsed) ? fallback || null : parsed;
};
