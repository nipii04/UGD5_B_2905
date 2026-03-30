import { redirect } from 'next/navigation';

export default function RootPage() {
  // Langsung redirect ke halaman login setiap kali web dibuka di localhost:3000
  redirect('/auth/login');
}