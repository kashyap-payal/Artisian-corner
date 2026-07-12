import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://artisian-corner-production.up.railway.app",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-blue-500 text-white p-6 rounded-xl">
          <h2>Users</h2>
          <h1 className="text-4xl">{stats.totalUsers}</h1>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl">
          <h2>Products</h2>
          <h1 className="text-4xl">{stats.totalProducts}</h1>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-xl">
          <h2>Orders</h2>
          <h1 className="text-4xl">{stats.totalOrders}</h1>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-xl">
          <h2>Total Sales</h2>
          <h1 className="text-4xl">
            ₹{stats.totalSales}
          </h1>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;