export const STOCKMON_MAX = 60;
export const COLLECTION_MAX = 20;

export interface IStockmonsRes {
  stockmons: IStockmonRes[];
}

export interface IStockmonRes {
  id: number;
  name: string;
  imgUrl: string;
  catchCount: number;
  stockCode: number;
  stockAveragePrice: number;
}

export interface IStockmonDetailRes {
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
  stockTotalPrice: number;
  stockMarket: string;
  chart: {
    date: string;
    price: number;
  }[];
}
