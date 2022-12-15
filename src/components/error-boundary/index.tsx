import * as React from "react";

type PropsT = {
  children: React.ReactNode;
};

type StateT = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<PropsT, StateT> {
  constructor(props: PropsT) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // TODO: implement 3rd party tool like Sentry
    console.error({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops, something went wrong.</h1>;
    }

    return this.props.children;
  }
}
