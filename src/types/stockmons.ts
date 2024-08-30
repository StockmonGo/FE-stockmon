export type StockmonType = {
  id: number;
  name: string;
  imgUrl: string;
  catchCount: number;
  stockCode: number;
  stockAveragePrice: number;
};

export type StockmonDetailType = {
  stockmonId: number;
  stockmonName: string;
  description: string;
  imageUrl: string;
  stockType: number;
  stockTypeName: string;
  stockName: string;
  stockCode: string;
  catchCount: number;
  stockmonAveragePrice: number;
  currentStockPrice: number;
  stockTotalPrice: number;
  stockMarket: string;
  chart: {
    date: string;
    price: number;
  }[];
};
