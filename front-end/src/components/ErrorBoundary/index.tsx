import React, { ErrorInfo, ReactNode } from 'react';

import { Typography } from '@mui/material';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error.message, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
       <Typography variant='h1'>404 Сторінка не знайдена</Typography>
      );
    }
    return this.props.children;
  }
}
