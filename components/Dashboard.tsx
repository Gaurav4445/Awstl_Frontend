'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { Task } from './HomeMaintenanceLog';
import {
  TrendingUp,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Activity,
} from 'lucide-react';

interface DashboardProps {
  tasks: Task[];
  isDarkMode: boolean;
}

const COLORS = {
  primary: '#0f766e',
  accent: '#059669',
  secondary: '#f3f4f6',
  textDark: '#111827',
  textLight: '#6b7280',
  border: '#e5e7eb',
  background: '#ffffff',
  lightBg: '#f9fafb',
};

const Dashboard: React.FC<DashboardProps> = ({ tasks, isDarkMode }) => {
  // Apply light mode only
  const cardBg = COLORS.background;
  const textColor = COLORS.textDark;
  const secondaryText = COLORS.textLight;
  const borderColor = COLORS.border;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalSpent = tasks.reduce((sum, t) => sum + t.cost, 0);
  const averageCost = totalSpent / (tasks.length || 1);
  const completionRate = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  const costTrend = tasks
    .sort(
      (a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    .slice(0, 7)
    .map((t, idx) => ({
      name: `Task ${idx + 1}`,
      cost: t.cost,
    }));

  const costByCategory = tasks.reduce((acc: any, task) => {
    const existing = acc.find((item: any) => item.name === task.category);
    if (existing) {
      existing.value += task.cost;
    } else {
      acc.push({ name: task.category, value: task.cost });
    }
    return acc;
  }, []);

  const tasksByPriority = tasks.reduce((acc: any, task) => {
    const existing = acc.find((item: any) => item.name === task.priority);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: task.priority, count: 1 });
    }
    return acc;
  }, []);

  const tasksByRoom = tasks.reduce((acc: any, task) => {
    const existing = acc.find((item: any) => item.name === task.room);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: task.room, count: 1 });
    }
    return acc;
  }, []);

  const calculateHealthScore = () => {
    if (tasks.length === 0) return 0;
    const overdueTasks = tasks.filter((t) => {
      const today = new Date();
      const due = new Date(t.dueDate);
      return due < today && !t.completed;
    }).length;
    const overduePercentage = (overdueTasks / tasks.length) * 100;
    return Math.max(0, 100 - overduePercentage);
  };

  const healthScore = calculateHealthScore();

  const SPRING = {
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
  };

  const statCards = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: Calendar,
      trend: '+12% this month',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      trend: `${Math.round(completionRate)}% done`,
    },
    {
      label: 'Total Spent',
      value: `$${totalSpent.toFixed(0)}`,
      icon: DollarSign,
      trend: `Avg: $${averageCost.toFixed(0)}/task`,
    },
    {
      label: 'Health Score',
      value: `${Math.round(healthScore)}%`,
      icon: Activity,
      trend:
        healthScore > 70
          ? 'Excellent'
          : healthScore > 40
          ? 'Good'
          : 'Needs attention',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        width: '100%',
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
          borderRadius: '20px',
          padding: 'clamp(32px, 8vw, 64px)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'clamp(200px, 35vh, 320px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          boxShadow: '0 20px 40px rgba(15, 118, 110, 0.15)',
        }}
      >
        {/* Subtle Background Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            zIndex: 0,
          }}
        />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '500px',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 6vw, 48px)',
              fontWeight: '700',
              margin: '0 0 16px 0',
              letterSpacing: '-0.5px',
            }}
          >
            Welcome Back
          </h2>
          <p
            style={{
              fontSize: 'clamp(14px, 2vw, 18px)',
              opacity: 0.95,
              margin: 0,
              lineHeight: '1.6',
              fontWeight: '400',
            }}
          >
            You have{' '}
            <strong>{tasks.filter((t) => !t.completed).length}</strong> pending
            tasks. Stay on top of your home maintenance.
          </p>
        </motion.div>

        {/* Right Accent */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{
            position: 'absolute',
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.1,
            fontSize: '120px',
            zIndex: 0,
          }}
        >
          <TrendingUp size={120} />
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(clamp(200px, 100%, 280px), 1fr))',
          gap: 'clamp(16px, 3vw, 24px)',
          width: '100%',
        }}
      >
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02, translateY: -4 }}
              transition={SPRING}
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '16px',
                padding: 'clamp(20px, 4vw, 28px)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Subtle Hover Overlay */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: COLORS.accent,
                  opacity: 0,
                  zIndex: 0,
                }}
                whileHover={{ opacity: 0.02 }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: secondaryText,
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {stat.label}
                  </p>
                  <Icon
                    size={20}
                    style={{ color: COLORS.primary, opacity: 0.7 }}
                  />
                </div>

                <p
                  style={{
                    fontSize: 'clamp(24px, 5vw, 32px)',
                    fontWeight: '700',
                    color: COLORS.primary,
                    margin: '0 0 8px 0',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {stat.value}
                </p>

                <p
                  style={{
                    fontSize: '13px',
                    color: secondaryText,
                    margin: 0,
                    fontWeight: '500',
                  }}
                >
                  {stat.trend}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Health Score Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '20px',
          padding: 'clamp(32px, 6vw, 40px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
        }}
      >
        <h3
          style={{
            fontSize: 'clamp(18px, 4vw, 22px)',
            fontWeight: '700',
            color: textColor,
            marginBottom: '32px',
            margin: '0 0 32px 0',
            letterSpacing: '-0.5px',
          }}
        >
          Maintenance Health Score
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(150px, 40%, 200px) 1fr',
            gap: 'clamp(32px, 8vw, 48px)',
            alignItems: 'center',
          }}
        >
          {/* Circular Score */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            style={{
              width: 'clamp(150px, 40%, 200px)',
              aspectRatio: '1',
              borderRadius: '50%',
              background: `conic-gradient(${COLORS.accent} 0deg ${(healthScore / 100) * 360}deg, ${COLORS.secondary} ${(healthScore / 100) * 360}deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 30px ${COLORS.accent}20`,
            }}
          >
            <div
              style={{
                width: '85%',
                aspectRatio: '1',
                borderRadius: '50%',
                background: cardBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: 'clamp(28px, 6vw, 42px)',
                  fontWeight: '700',
                  color: COLORS.accent,
                  margin: 0,
                }}
              >
                {Math.round(healthScore)}%
              </motion.p>
              <p
                style={{
                  fontSize: '12px',
                  color: secondaryText,
                  margin: '8px 0 0 0',
                }}
              >
                Score
              </p>
            </div>
          </motion.div>

          {/* Status Info */}
          <div>
            <p
              style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                fontWeight: '600',
                color: textColor,
                marginBottom: '16px',
                margin: 0,
              }}
            >
              Status:{' '}
              <span style={{ color: COLORS.accent }}>
                {healthScore > 70
                  ? 'Excellent'
                  : healthScore > 40
                  ? 'Good'
                  : 'Needs Attention'}
              </span>
            </p>

            <div
              style={{
                background: COLORS.lightBg,
                borderRadius: '12px',
                padding: 'clamp(16px, 3vw, 20px)',
                marginBottom: '24px',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(13px, 2vw, 14px)',
                  color: secondaryText,
                  margin: 0,
                  lineHeight: '1.6',
                }}
              >
                Regular maintenance prevents costly repairs and preserves your
                home's value.
              </p>
            </div>

            {/* Progress Bar */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: textColor,
                    margin: 0,
                  }}
                >
                  Completion
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: secondaryText,
                    margin: 0,
                  }}
                >
                  {completedTasks}/{totalTasks}
                </p>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                style={{
                  width: '100%',
                  height: '8px',
                  background: COLORS.secondary,
                  borderRadius: '4px',
                  overflow: 'hidden',
                  originX: 0,
                }}
              >
                <motion.div
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 0.5 }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                    borderRadius: '4px',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(clamp(280px, 100%, 500px), 1fr))',
          gap: 'clamp(24px, 4vw, 32px)',
          width: '100%',
        }}
      >
        {costByCategory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING}
            style={{
              background: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '20px',
              padding: 'clamp(24px, 4vw, 32px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            }}
          >
            <h4
              style={{
                fontSize: 'clamp(16px, 3vw, 18px)',
                fontWeight: '700',
                color: textColor,
                marginBottom: '24px',
                margin: '0 0 24px 0',
              }}
            >
              Spending by Category
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[COLORS.primary, COLORS.accent, '#f59e0b', '#ef4444'].map(
                    (color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    )
                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    color: textColor,
                    borderRadius: '8px',
                  }}
                  formatter={(value) => `$${value}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {tasksByPriority.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING}
            style={{
              background: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '20px',
              padding: 'clamp(24px, 4vw, 32px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            }}
          >
            <h4
              style={{
                fontSize: 'clamp(16px, 3vw, 18px)',
                fontWeight: '700',
                color: textColor,
                marginBottom: '24px',
                margin: '0 0 24px 0',
              }}
            >
              Tasks by Priority
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksByPriority}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={borderColor}
                  vertical={false}
                />
                <XAxis dataKey="name" stroke={secondaryText} />
                <YAxis stroke={secondaryText} />
                <Tooltip
                  contentStyle={{
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    color: textColor,
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" fill={COLORS.accent} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {tasksByRoom.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING}
            style={{
              background: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '20px',
              padding: 'clamp(24px, 4vw, 32px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            }}
          >
            <h4
              style={{
                fontSize: 'clamp(16px, 3vw, 18px)',
                fontWeight: '700',
                color: textColor,
                marginBottom: '24px',
                margin: '0 0 24px 0',
              }}
            >
              Tasks by Room
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksByRoom} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={borderColor}
                  horizontal={false}
                />
                <XAxis type="number" stroke={secondaryText} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke={secondaryText}
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    color: textColor,
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" fill={COLORS.primary} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;