export type StockmonType = {
  id: number;
  name: string;
  imgUrl: string;
  count: number;
  stockCode: number;
  stockAveragePrice: number;
};

export type StockmonDetailType = {
  stockmonId: number;
  stockmonName: string;
  description: string;
  imageUrl: string;
  type: number;
  stockName: string;
  stockCode: string;
  catchCount: number;
  currentStockPrice: number;
  stockTotalPrice: number;
  stockMarket: string;
  chart: {
    date: string;
    price: number;
  }[];
};
