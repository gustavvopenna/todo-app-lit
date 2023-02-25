import { LitElement, html, css } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import './components/app-header';

interface Todo {
  text: string;
  done: boolean;
}

@customElement('app-todo')
export class AppTodo extends LitElement {
  @property({ type: String }) header = 'My app';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--app-todo-background-color);
    }

    main {
      flex-grow: 1;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    ul {
      list-style: none;
    }

    .todo {
      display: flex;
    }

    .todo li {
      margin-left: 10px;
    }

    .done {
      text-decoration: line-through;
    }
  `;

  @query('input[type="text"]')
  input!: HTMLInputElement;

  @state()
  _todos: Todo[] = [
    { text: 'Learn Lit', done: false },
    { text: 'Build something awesome', done: false }
  ]

  addTodo(todo: Todo) {
    this._todos = [...this._todos, todo]
  }

  markAsDone(index: number) {
    const todo = this._todos[index];
    todo.done = !todo.done;
    this._todos = [...this._todos];
  }

  handleSubmit (e: Event) {
    e.preventDefault();
    console.log(e)
    this.addTodo({ text: this.input.value, done: false });
    this.input.value = '';
  }

  render() {
    return html /* html */`
      <main>
        <app-header></app-header>
        <div>
          <div>
            <form @submit=${this.handleSubmit}>
              <input type="text" placeholder="Do the shopping...">
              <input type="submit" value="Add">
            </form>
          </div>
          <ul>
            ${this._todos.map((todo, i) => html /* html */`
              <div class="todo">
                <input type="checkbox" @click=${() => this.markAsDone(i)}>
                <li class=${todo.done ? 'done' : ''}>${todo.text}</li>
              </div>
            `)}
          </ul>
        </div>
      </main>
    `;
  }
}
