import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="fatal">
          <div>
            <h1>Não foi possível abrir a 4SCALE.</h1>
            <p>Atualize a página. Se continuar, escreva para o e-mail de contato.</p>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
