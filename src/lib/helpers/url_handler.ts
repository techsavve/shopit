export function objectToQueryString(obj: Record<string, any>): string {
    const query = Object.entries(obj)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join("&");
  
    return query ? `?${query}` : "";
  }