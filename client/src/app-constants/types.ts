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
  };
};

export type User = {
  email?: string;
  password?: string;
  token?: string;
};