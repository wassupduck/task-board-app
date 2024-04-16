export function emptyPatch(patch: Record<string, any>): boolean {
  return !Object.values(patch).some(
    (value) =>
      value !== undefined && (!(value instanceof Array) || value.length > 0),
  );
}
