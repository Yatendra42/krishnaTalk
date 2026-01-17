import { redirect } from 'next/navigation';

/**
 * Home page - redirects to first chapter
 * In the future, this could be a landing page with overview
 */
export default function HomePage() {
  redirect('/chapter/1');
}
