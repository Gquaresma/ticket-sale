export interface OrderData {
  name: string;
  cpf: string;
  quantity: number;
}

export const getKeys = () => {
  const obj: OrderData = {
    name: "",
    cpf: "",
    quantity: 0,
  }
  return Object.keys(obj);
}
