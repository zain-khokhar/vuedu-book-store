import { DataLoader } from '../components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DataLoader text="Loading VUEDU BOOK BANK..." />
    </div>
  );
}