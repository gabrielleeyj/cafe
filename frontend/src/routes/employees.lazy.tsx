import { createLazyFileRoute } from '@tanstack/react-router'
import EmployeesPage from '../pages/EmployeesPage'

export const Route = createLazyFileRoute('/employees')({
  validateSearch: (params: Record<string, unknown>) => {
    return {
      cafe: params.cafe,
    };
  },
  component: EmployeesPage,
})
