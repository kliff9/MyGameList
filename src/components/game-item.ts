import { Draggable } from '../models/drag-drop.js';
import { Game } from '../models/game.js';
import Component from './base-component.js';
import { autobind } from '../decorators/autobind.js';

//---------------------------------  Game Item Section  --------------------------------------\\


export class GameItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
  private Game: Game; 

  get rate() { 
    if (this.Game.rate === 1) {
      return '1 ';
    } else {
      return `${this.Game.rate}`;
    }
  }

  constructor(hostId: string, Game: Game) {
    super('single-Game', hostId, false, Game.id); 
    this.Game = Game;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.Game.id); 
    event.dataTransfer!.effectAllowed = 'move';  }

  dragEndHandler(_: DragEvent) {
    console.log('DragEnd');
  }

  configure() { 
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.Game.title;
    this.element.querySelector('h3')!.textContent = 'Rating: ' + this.rate + '/10';
    this.element.querySelector('p')!.textContent = this.Game.description;
  }
}
