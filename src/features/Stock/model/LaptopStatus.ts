type LaptopStatus = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Disponível" | "Em uso" | "Manutenção" | "A preparar";
};
