interface HRDashboardProps {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    department: string;
  };
}

export default function HRDashboard({ user }: HRDashboardProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">HR Dashboard</h1>
      <p>Welcome, {user.firstName} {user.lastName}</p>
    </div>
  );
} 