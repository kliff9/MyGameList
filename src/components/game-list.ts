import { DragTarget } from '../models/drag-drop.js';
import { Game, GameStatus } from '../models/game.js';
import Component from './base-component.js';
import { autobind } from '../decorators/autobind.js';
import { gameState } from '../state/game-state.js';
import { GameItem } from './game-item.js';



//---------------------------------  GameList Section  --------------------------------------\\

export class GameList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedGames: Game[];

  constructor(private type: 'active' | 'finished') { 
    super('Game-list', 'container', false, `${type}-Games`);

    this.assignedGames = [];

    
    this.configure();
    this.renderContent();
  }
  @autobind
  dragOverHandler(event: DragEvent) { 
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') { 
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    const VgameId = event.dataTransfer!.getData('text/plain');
    gameState.moveGame(
      VgameId,
      this.type === 'active' ? GameStatus.Active : GameStatus.Finished
    );
  }
  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }


  configure() {

    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    gameState.addListener((Games: Game[]) => {
      const relevantGames = Games.filter(Vgame => {
        // Update Status
        if (this.type === 'active') {
          return Vgame.status === GameStatus.Active;
        }
        return Vgame.status === GameStatus.Finished;
      });
      this.assignedGames = relevantGames;
      this.renderGames();
    });
  }
  private renderGames() {
    const listEl = document.getElementById(
      `${this.type}-Games-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const VgameItem of this.assignedGames) {
      new GameItem(this.element.querySelector('ul')!.id, VgameItem);

    }
  }

  renderContent() { 
    const listId = `${this.type}-Games-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' GAMES';
    
  }

}