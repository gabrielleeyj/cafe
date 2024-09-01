import { createLazyFileRoute } from '@tanstack/react-router';
import CafesPage from '../pages/CafesPage.jsx';

export const Route = createLazyFileRoute('/cafes')({
  component: CafesPage, 
})
