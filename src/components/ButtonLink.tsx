import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface ButtonLinkProps {
  to: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'text'
  className?: string
}

export function ButtonLink({ to, children, variant = 'primary', className = '' }: ButtonLinkProps) {
  return (
    <Link className={`button button-${variant} ${className}`} to={to}>
      <span>{children}</span>
      <ArrowUpRight size={17} strokeWidth={2} />
    </Link>
  )
}
