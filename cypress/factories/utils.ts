import faker from "faker";

export const generateExchangeId = () =>
  `TheBull${faker.random.alphaNumeric(10)}_${faker.random.alphaNumeric(13)}`;
