export function objectToQueryString(obj: Record<string, any>): string {
  const params: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      // For arrays, join with commas (e.g., ["BSC", "Ton"] -> "BSC,Ton")
      if (value.length > 0) {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`);
      }
    } else if (value instanceof Date) {
      // Handle Date objects by converting to ISO string
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toISOString())}`);
    } else {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }

  return params.length > 0 ? `?${params.join("&")}` : "";
}