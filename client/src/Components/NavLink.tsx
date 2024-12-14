import { ReactNode } from "react"
import { NavLink } from "react-router-dom"

interface NavLinkProps {
    to: string,
    className: string,
    children: ReactNode
}

const LinkTo = ({to, className, children}: NavLinkProps) => {
  return (
    <NavLink to={to} className={({ isActive })=> `${isActive ? 'Active activeNav': ''} ${className}`}>{children}</NavLink>
  )
}

export default LinkTo