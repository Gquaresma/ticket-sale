export interface OrderData {
  name: string;
  cpf: string;
  quantity: number;
  eventId: string;
}

export const getKeys = () => {
  const obj: OrderData = {
    name: "",
    cpf: "",
    quantity: 0,
    eventId: ""
  };
  return Object.keys(obj);
};
