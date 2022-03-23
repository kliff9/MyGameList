import Component from './base-component.js';
import * as Validation from '../util/validation.js';
import { autobind as Autobind } from '../decorators/autobind.js';
import { gameState } from '../state/game-state.js';


//---------------------------------  Input Section  --------------------------------------\\


export class GameInput extends Component<HTMLDivElement, HTMLFormElement> {

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  rateInputElement: HTMLInputElement;

  constructor() { //want to render a form that belongs to this instan
    super('Game-input', 'app', true, 'user-input');
// Adding Classes?
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.rateInputElement = this.element.querySelector(
      '#rate'
    ) as HTMLInputElement;

    this.configure()
  }



  renderContent() {}
  //User must fill everything before simbiting
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredrate = this.rateInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const rateValidatable: Validation.Validatable = {
      value: +enteredrate,
      required: true,
      min: 1,
      max: 10
    };

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(rateValidatable)
    ) {
      alert('Invalid input, please try again!');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredrate];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.rateInputElement.value = '';
  }
  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault(); 
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, rate] = userInput;
      gameState.addGame(title, desc, rate);

      console.log(title, desc, rate);
      this.clearInputs();
    }  
  }
   configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }


}