export type ExampleStatus = "active" | "inactive" | "pending";

export interface Example {
  id?: number;
  name: string;
  description?: string | null;
  status: ExampleStatus;

  createdAt?: string;
  updatedAt?: string;
}
