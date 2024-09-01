import { createLazyFileRoute } from '@tanstack/react-router'
import EmployeesPage from '../pages/EmployeesPage'

export const Route = createLazyFileRoute('/employees')({
  component: EmployeesPage, 
})
