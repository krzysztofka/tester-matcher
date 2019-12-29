export interface SearchCriteria {
  forEach(fn: (paramName: string, paramValue: string[]) => void);
}
