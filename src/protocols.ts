export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type Ticket = {
  id: number,
  status: "RESERVED" | "PAID",
  ticketTypeId: number,
  enrollmentId: number,
  createdAt: Date,
  updatedAt: Date,
  price?: number,
}

export type cardData = {
  issuer: "VISA" | "MASTERCARD",
  number: number | string,
  name: string,
  expirationDate: Date,
  cvv: number
};
