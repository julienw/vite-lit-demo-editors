import { html, css, LitElement } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";

@customElement("string-editor")
export class StringEditor extends LitElement {
  @property({
    attribute: false,
    hasChanged(newValue: string, oldValue: string) {
      console.log("StringEditor value changed:", { oldValue, newValue });
      return newValue !== oldValue;
    },
  })
  value!: string;

  private onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        bubbles: true,
      }),
    );
  }

  render() {
    return html`
      <div class="editor-container">
        <label>String Editor:</label>
        <textarea
          .value=${this.value}
          @input=${this.onInput}
          placeholder="Enter string value..."
        ></textarea>
      </div>
    `;
  }

  static styles = css`
    .editor-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }

    label {
      font-weight: bold;
      color: #333;
    }

    textarea {
      width: 100%;
      min-height: 200px;
      padding: 8px;
      border: 2px solid #333;
      border-radius: 4px;
      font-family: monospace;
      resize: vertical;
    }

    textarea:focus {
      outline: none;
      border-color: #2196f3;
      box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
    }
  `;
}

@customElement("object-editor")
export class ObjectEditor extends LitElement {
  @property({
    attribute: false,
    hasChanged(newValue: object, oldValue: object) {
      console.log("ObjectEditor value changed:", { oldValue, newValue });
      return newValue !== oldValue;
    },
  })
  value!: object;

  private onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    try {
      this.value = JSON.parse(target.value);
      this.dispatchEvent(
        new CustomEvent("value-changed", {
          bubbles: true,
        }),
      );
    } catch {}
  }

  render() {
    const prettyValue = JSON.stringify(this.value, null, 2);

    return html`
      <div class="editor-container">
        <label>Object Editor (JSON):</label>
        <textarea
          .value=${prettyValue}
          @input=${this.onInput}
          placeholder="Enter valid JSON..."
        ></textarea>
      </div>
    `;
  }

  static styles = css`
    .editor-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }

    label {
      font-weight: bold;
      color: #333;
    }

    textarea {
      width: 100%;
      min-height: 250px;
      padding: 8px;
      border: 2px solid #333;
      border-radius: 4px;
      font-family: monospace;
      resize: vertical;
    }

    textarea:focus {
      outline: none;
      border-color: #2196f3;
      box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
    }

    textarea:invalid {
      border-color: #f44336;
      box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
    }
  `;
}

@customElement("demo-editors")
export class DemoEditors extends LitElement {
  private initialStringValue: string = "Hello, World!";

  private initialObjectValue: object = {};

  @state()
  private stringModified: boolean = false;

  @state()
  private objectModified: boolean = false;

  @query("string-editor")
  private stringEditor!: StringEditor;

  @query("object-editor")
  private objectEditor!: ObjectEditor;

  private onStringChanged() {
    this.stringModified = this.stringEditor.value !== this.initialStringValue;
  }

  private onObjectChanged() {
    this.objectModified =
      JSON.stringify(this.objectEditor.value) !==
      JSON.stringify(this.initialObjectValue);
  }

  render() {
    return html`
      <div class="demo-container">
        <h2>Demo Editors</h2>

        <div class="editor-with-badge">
          <string-editor
            .value=${this.initialStringValue}
            @value-changed=${this.onStringChanged}
          ></string-editor>
          ${this.stringModified
            ? html`<span class="modified-badge">modified</span>`
            : ""}
        </div>

        <div class="editor-with-badge">
          <object-editor
            .value=${this.initialObjectValue}
            @value-changed=${this.onObjectChanged}
          ></object-editor>
          ${this.objectModified
            ? html`<span class="modified-badge">modified</span>`
            : ""}
        </div>
      </div>
    `;
  }

  static styles = css`
    .demo-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: system-ui, sans-serif;
    }

    h2 {
      color: #333;
      margin-bottom: 24px;
    }

    .editor-with-badge {
      position: relative;
      margin-bottom: 20px;
    }

    .modified-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      background: #ff9800;
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      z-index: 10;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "string-editor": StringEditor;
    "object-editor": ObjectEditor;
    "demo-editors": DemoEditors;
  }
}
