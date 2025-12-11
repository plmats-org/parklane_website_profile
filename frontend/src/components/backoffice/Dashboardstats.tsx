"use client";

import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  change?: number;
  color: string;
}

interface DashboardStatsProps {
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards: Stat[] = [
    {
      label: "Total Vendors",
      value: stats.total,
      color: "blue",
    },
    {
      label: "Pending Review",
      value: stats.pending,
      color: "amber",
    },
    {
      label: "Approved",
      value: stats.approved,
      color: "emerald",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      color: "red",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-700",
      amber: "from-amber-50 to-amber-100 border-amber-200 text-amber-700",
      emerald:
        "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700",
      red: "from-red-50 to-red-100 border-red-200 text-red-700",
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-br ${getColorClasses(
            stat.color
          )} border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}
        >
          <p className="text-sm font-medium opacity-80 mb-2">{stat.label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold">{stat.value.toLocaleString()}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
