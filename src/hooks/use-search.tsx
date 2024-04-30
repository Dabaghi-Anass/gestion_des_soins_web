import { useMemo } from 'react';
function valueInObject(object: any, searchQuery: string) {
  return Object.values(object).some((value: any) => {
    if (typeof value === "string") {
      return equals(value, searchQuery);
    }
    return false;
  });
}
export function useSearch<T>(data: T[] = [], searchQuery: string) {
  const filteredData = useMemo(() => {
    if (searchQuery === "") return data || [];
    return deepSearch(data, searchQuery);
  }, [data, searchQuery]);
  return filteredData;
}

function equals(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase());
}
function deepSearch(data: any[], searchQuery: string): any[] {
  return data?.filter((item: any) => {
    return Object.values(item).some((value: any) => {
      if (typeof value === "string") {
        return equals(value, searchQuery);
      } else if (typeof value === "object" && value !== null) {
        return valueInObject(value, searchQuery);
      }
      return false;
    });
  }) || []
}
