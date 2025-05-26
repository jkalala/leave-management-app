interface SupervisorDashboardProps {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    department: string;
  };
}

export default function SupervisorDashboard({ user }: SupervisorDashboardProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Supervisor Dashboard</h1>
      <p>Welcome, {user.firstName} {user.lastName}</p>
    </div>
  );
} 