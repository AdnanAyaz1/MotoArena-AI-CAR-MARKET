import { Dashboard } from "@/components/DashBoard/Dashboard";
import { getDashboardData } from "@/actions/getDashboardData";
import AdminPageHeader from "@/components/AdminPageHeader";

const AdminDashboard = async () => {
  const { data: dashboardData, success } = await getDashboardData();

  return (
    <div className="px-6 md:px-10 max-w-[1400px]">
      <AdminPageHeader label="Admin Panel" title="Dashboard" />
      <Dashboard initialData={dashboardData!} success={success} />
    </div>
  );
};

export default AdminDashboard;
