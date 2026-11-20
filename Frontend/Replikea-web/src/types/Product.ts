export interface Product{
    id: number;
    productNumber: string;
    name: string;
    category: string;
    status: "Active" | "Draft" | "Inactive";
    updatedAt: string;
}