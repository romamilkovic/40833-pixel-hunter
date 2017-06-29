import AbstractView from '../abstractView.js';
import header from '../../blocks/header.js';
import levelStats from '../../blocks/levelStats.js';
import {changeAspectRatioOnLoad} from '../../utils/utils.js';
import {stats} from '../../data/data.js';

export default class ChooseTypeForEach extends AbstractView {
  constructor(state, question) {
    super();
    this.question = question;

    this.state = state;
  }
  get template() {
    return `
      ${header(this.state)}
      <div class="game">
        <p class="game__task">${this.question.question}</p>
        <form class="game__content">
          ${this.question.answers.map((answer, i) =>
      `<div class="game__option">
            <img src="${answer.image}" alt="Option ${i + 1}">
            <label class="game__answer game__answer--photo">
              <input name="question${i}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input name="question${i}" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
            </div>`).join(``)
      }
        </form>
        <div class="stats">
          ${levelStats(this.state.stats)}
        </div>
      </div>
      `.trim();
  }

  bind() {
    this.timerNode = this.element.querySelector(`.game__timer`);

    this.form = this.element.querySelector(`.game__content`);
    this.form.addEventListener(`change`, () => {
      const checkedAnswers = this.form.querySelectorAll(`input[type=radio]:checked`);
      if (checkedAnswers.length === 2) {
        this.onAnswer(false);
      }
    });

    const backButton = this.element.querySelector(`.header__back`);
    backButton.addEventListener(`click`, () => {
      this.onBackButtonClick(false);
    });

    const images = this.element.querySelectorAll(`.game__option > img`);
    changeAspectRatioOnLoad(images);
  }

  updateTimer(time) {
    this.timerNode.innerHTML = time;
  }

  onBackButtonClick() {
    throw new Error(`Not implemented`);
  }

  onAnswer() {
    throw new Error(`Not implemented`);
  }
}
