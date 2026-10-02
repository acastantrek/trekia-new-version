import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

// Evita que un error en una página desmonte toda la app y deje la web en blanco
export class ErrorBoundary extends Component<ErrorBoundaryProps, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error('[App] Error al pintar la página:', error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
