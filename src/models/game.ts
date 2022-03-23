


//---------------------------------  Game Class --------------------------------------\\


export enum GameStatus {
  Active,
  Finished
}

export class Game {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public rate: number,
    public status: GameStatus
  ) {}
}