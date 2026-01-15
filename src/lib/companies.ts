export const companies = {
  Bluestar: {
    name: "Bluestar",
    logo: "bluestar.png",
    primaryColor: "#0033A0",
  },
  Carrier: {
    name: "Carrier",
    logo: "carrier.png",
    primaryColor: "#0033A0",
  },
  Daikin: {
    name: "Daikin",
    logo: "daikin.jpg",
    primaryColor: "#004B87",
  },
  Godrej: {
    name: "Godrej",
    logo: "godrej.png",
    primaryColor: "#006837",
  },
  Haier: {
    name: "Haier",
    logo: "haier.png",
    primaryColor: "#0033A0",
  },
  Hitachi: {
    name: "Hitachi",
    logo: "hitachi.png",
    primaryColor: "#E60012",
  },
  Intex: {
    name: "Intex",
    logo: "intex.jpg",
    primaryColor: "#ff0000",
  },
  LG: {
    name: "LG",
    logo: "lg.png",
    primaryColor: "#A50034",
  },
  Lloyd: {
    name: "Lloyd",
    logo: "lloyd_blue.png",
    primaryColor: "#0033A0",
  },
  Micromax: {
    name: "Micromax",
    logo: "micromax.png",
    primaryColor: "#FFA500",
  },
  Mitsubishi: {
    name: "Mitsubishi",
    logo: "mitsubishi_electric.png",
    primaryColor: "#E60012",
  },
  Ogeneral: {
    name: "Ogeneral",
    logo: "ogeneral.png",
    primaryColor: "#0033A0",
  },
  Panasonic: {
    name: "Panasonic",
    logo: "panasonic_blue.png",
    primaryColor: "#0033A0",
  },
  Samsung: {
    name: "Samsung",
    logo: "samsung_blue.png",
    primaryColor: "#1428A0",
  },
  Voltas: {
    name: "Voltas",
    logo: "voltas.jpg",
    primaryColor: "#0033A0",
  },
  Whirlpool: {
    name: "Whirlpool",
    logo: "whirlpool.png",
    primaryColor: "#0033A0",
  },
} as const;

export type CompanyName = keyof typeof companies;
export type Company = (typeof companies)[CompanyName];
export const companyList: Company[] = Object.values(companies);
