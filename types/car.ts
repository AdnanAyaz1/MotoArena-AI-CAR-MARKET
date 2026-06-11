export type CreateCarFormData = {
  company: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  color: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  seats: string;
  description: string;
  status: string;
  featured: boolean;
  images: string[];
};

export const defaultCreateCarFormData: CreateCarFormData = {
  company: "",
  model: "",
  year: "",
  price: "",
  mileage: "",
  color: "",
  fuelType: "",
  transmission: "",
  bodyType: "",
  seats: "",
  description: "",
  status: "AVAILABLE",
  featured: false,
  images: [],
};
