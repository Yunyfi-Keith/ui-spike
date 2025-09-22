// Ensure TypeScript recognizes the Lit element tag and its custom events
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    onincrement?: (event: CustomEvent<{ by: number }>) => void;
    ondecrement?: (event: CustomEvent<{ by: number }>) => void;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'counter-element': HTMLElement;
  }
}

export {};
