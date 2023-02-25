import { LitElement, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @state()
  private myTitle = 'Another boring todo list';

  render() {
    return html`
        <h1>${this.myTitle}</h1>
    `;
  }
}