import short from 'short-uuid';

export const safeParseInt = (
  value: string | number,
  fallback?: number,
): number | null => {
  const parsed = parseInt(value as string);
  return isNaN(parsed) ? fallback || null : parsed;
};

export const shortUUID = () => {
  return short.generate();
};
