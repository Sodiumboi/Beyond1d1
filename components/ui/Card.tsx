// components/ui/Card.tsx
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export function Card({ hoverable = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`
        bg-bg-surface border border-border-default rounded-xl
        ${hoverable ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-card cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}