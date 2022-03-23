import { Game, GameStatus } from '../models/game.js';

//--------------------------------- Project State Management --------------------------------------\\

type Listener<T> = (items: T[]) => void; 

class State<T> { 
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}


  //------------------ Update the State ---------------------\\

export class GameState extends State<Game> {
  private Games: Game[] = [];
  private static instance: GameState;

  private constructor() {
    super();
  }

  static getInstance() { 
    if (this.instance) { 
      return this.instance;
    }
    this.instance = new GameState(); 
    return this.instance;
  }

  addGame(title: string, description: string, num_rate: number) {
    const newGame = new Game(
      Math.random().toString(),
      title,
      description,
      num_rate,
      GameStatus.Active
    );
    this.Games.push(newGame); 
    this.updateListeners();


  }

  moveGame(GameId: string, newStatus: GameStatus) { 
    const Game = this.Games.find(Vgame => Vgame.id === GameId);
    if (Game && Game.status !== newStatus) { 
      Game.status = newStatus; 
      this.updateListeners();
    }
  }
  private updateListeners() { // something change so Update
    for (const listenerFn of this.listeners) { // upon change execute function
      listenerFn(this.Games.slice()); // return a copy?
    }
  }
}

export const gameState = GameState.getInstance(); //work with the right object
