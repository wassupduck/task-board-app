import { UniqueViolationError } from 'db-errors';

export function getDuplicateKeyValues(
  error: UniqueViolationError,
): null | Record<string, string | undefined> {
  if (
    'detail' in error.nativeError &&
    typeof error.nativeError.detail === 'string'
  ) {
    const re = /Key \((.*)\)=\((.*)\) already exists./;
    const match = error.nativeError.detail.match(re);
    if (match) {
      const keys = match[1].split(',').map((s) => s.trim());
      const values = match[2].split(',').map((s) => s.trim());
      const zip = <A, B>(a: A[], b: B[]) => a.map((k, i) => [k, b[i]]);
      return Object.fromEntries(zip(keys, values));
    }
  }
  return null;
}
