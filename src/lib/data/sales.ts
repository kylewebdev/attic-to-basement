export interface Sale {
  id: string;
  title: string;
  dates: string;
  area: string;
  categories: string[];
  externalUrl?: string;
  imageAlt?: string;
}

export const sales: Sale[] = [];
