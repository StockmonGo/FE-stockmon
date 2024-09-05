export interface IStockmonLocation {
  id: number;
  stockmon_id: number;
  latitude: number;
  longitude: number;
}

export interface IStockTowerLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IWorldRes {
  stockmons: Array<IStockmonLocation>;
  stockTowers: Array<IStockTowerLocation>;
}

export interface IStockTowerInfoRes {
  id: number;
  name: string;
  spinnedAt: string;
  currentTime: string;
  limit: number;
}

export interface IStockTowerBallRes {
  increasedStockBall: number;
}

export interface IStockBallRes {
  stockballs: number;
}
