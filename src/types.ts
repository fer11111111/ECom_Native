// src/types.ts
export interface Product {
    sys: {
      id: string;
    };
    fields: {
      name: string;
      price: number;
      media: string;
    };
  }
  export interface ContentfulResponse {
    items: Product[];
  }