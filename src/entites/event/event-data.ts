export interface EventData {
  name: string;
  type: string;
  local: string;
  ticketPrice: number;
  ticketQuantity: number;
  date: string;
}

export const getKeys = () => {
  const obj: EventData = {
    name: "",
    type: "",
    local: "",
    ticketPrice: 0,
    ticketQuantity: 0,
    date: ""
  }
  return Object.keys(obj);
}
