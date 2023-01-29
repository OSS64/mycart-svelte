export type Product = {
  category?: string;
  currencyCode?: string;
  description?: string;
  imageUrl?: string;
  productName?: string;
  shortDescription?: string;
  videoUrl?: string;
  _id?: string;
  price?: string | number;
  quantity?: number;
  features?: {
    brand?: string;
    colour?: string;
    cpuModel?: string;
    graphicsCard?: string;
    modelName?: string;
    operatingSystem?: string;
    ramMemory?: string;
    screenSize?: string;
    specialFeature?: string;
    hardDisk?: string;
  };
};

export type User = {
  _id?: string;
  email?: string;
  password?: string;
  username?: string;
  token?: string;
};

export type ApiError = {
  status?: string;
  statusCode?: number;
  message?: string;
  error?: string;
};
