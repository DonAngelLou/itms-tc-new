'use client';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  return (
    <button onClick={handleLogout} className="p-2 bg-red-600 text-white rounded">
      Logout
    </button>
  );
}
