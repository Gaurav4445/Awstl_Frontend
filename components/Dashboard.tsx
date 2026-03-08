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
  Zap,
  Shield,
  Wrench,
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
      bgGradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      icon2: Wrench,
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      trend: `${Math.round(completionRate)}% done`,
      bgGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      icon2: Shield,
    },
    {
      label: 'Total Spent',
      value: `$${totalSpent.toFixed(0)}`,
      icon: DollarSign,
      trend: `Avg: $${averageCost.toFixed(0)}/task`,
      bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      icon2: Zap,
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
      bgGradient:
        healthScore > 70
          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
          : healthScore > 40
          ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
          : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      icon2: Activity,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
      {/* HERO SECTION WITH SOUL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          minHeight: '350px',
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'clamp(32px, 8vw, 64px)',
          boxShadow: '0 20px 60px rgba(15, 118, 110, 0.25)',
        }}
      >
        {/* Animated Background Shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />

        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-5%',
            width: '250px',
            height: '250px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />

        {/* Illustration Grid - Creates visual interest */}
        <motion.div
          style={{
            position: 'absolute',
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            opacity: 0.3,
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              y: [0, -10, 10, 0],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              fontSize: '120px',
              lineHeight: '1',
            }}
          >
            🔧
          </motion.div>
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            right: '20%',
            bottom: '10%',
            zIndex: 1,
            opacity: 0.25,
          }}
        >
          <motion.div
            animate={{
              rotate: [-5, 5, -5, 0],
              y: [0, 15, -10, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            style={{
              fontSize: '100px',
              lineHeight: '1',
            }}
          >
            🏠
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '600px',
          }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '8px 16px',
              borderRadius: '20px',
              marginBottom: '16px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '12px',
              fontWeight: '700',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            Keep Your Home Perfect
          </motion.div>

          <h2
            style={{
              fontSize: 'clamp(32px, 8vw, 56px)',
              fontWeight: '700',
              margin: '0 0 16px 0',
              color: 'white',
              letterSpacing: '-1px',
            }}
          >
            Welcome Back
          </h2>

          <p
            style={{
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'rgba(255, 255, 255, 0.95)',
              margin: 0,
              lineHeight: '1.6',
              fontWeight: '400',
            }}
          >
            You have{' '}
            <strong style={{ fontSize: '24px' }}>
              {tasks.filter((t) => !t.completed).length}
            </strong>{' '}
            pending maintenance tasks. Stay on top of your home!
          </p>

          {/* Quick Stats under text */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: '28px',
              flexWrap: 'wrap',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <p style={{ fontSize: '12px', opacity: 0.8, margin: 0 }}>
                Completion Rate
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: '4px 0 0 0',
                }}
              >
                {Math.round(completionRate)}%
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <p style={{ fontSize: '12px', opacity: 0.8, margin: 0 }}>
                This Month
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: '4px 0 0 0',
                }}
              >
                ${totalSpent.toFixed(0)}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* STAT CARDS WITH SOUL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(clamp(240px, 100%, 300px), 1fr))',
          gap: 'clamp(20px, 4vw, 28px)',
          width: '100%',
        }}
      >
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          const Icon2 = stat.icon2;
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, translateY: -8 }}
              transition={SPRING}
              style={{
                background: COLORS.background,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '20px',
                padding: 'clamp(24px, 5vw, 32px)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: stat.bgGradient,
                  opacity: 0,
                  zIndex: 0,
                }}
                whileHover={{ opacity: 0.05 }}
              />

              {/* Background icon - subtle */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, delay: idx * 0.5 }}
                style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '120px',
                  height: '120px',
                  background: stat.bgGradient,
                  opacity: 0.08,
                  borderRadius: '50%',
                  zIndex: 0,
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '20px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: COLORS.textLight,
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    {stat.label}
                  </p>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 15, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.3 }}
                    style={{
                      background: stat.bgGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    <Icon size={24} />
                  </motion.div>
                </div>

                <p
                  style={{
                    fontSize: 'clamp(24px, 6vw, 36px)',
                    fontWeight: '800',
                    background: stat.bgGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    margin: '0 0 12px 0',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {stat.value}
                </p>

                <p
                  style={{
                    fontSize: '13px',
                    color: COLORS.textLight,
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

      {/* HEALTH SCORE SECTION WITH SOUL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        style={{
          background: COLORS.background,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '24px',
          padding: 'clamp(32px, 6vw, 48px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '80px',
            zIndex: 0,
          }}
        >
          ✨
        </motion.div>

        <h3
          style={{
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: '800',
            color: COLORS.textDark,
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
            gridTemplateColumns: 'clamp(150px, 40%, 220px) 1fr',
            gap: 'clamp(32px, 8vw, 56px)',
            alignItems: 'center',
          }}
        >
          {/* Circular Score */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            style={{
              width: 'clamp(150px, 40%, 220px)',
              aspectRatio: '1',
              borderRadius: '50%',
              background: `conic-gradient(${COLORS.accent} 0deg ${(healthScore / 100) * 360}deg, ${COLORS.secondary} ${(healthScore / 100) * 360}deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 40px ${COLORS.accent}30`,
              position: 'relative',
            }}
          >
            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: `3px solid ${COLORS.accent}`,
                opacity: 0.3,
              }}
            />

            <div
              style={{
                width: '85%',
                aspectRatio: '1',
                borderRadius: '50%',
                background: COLORS.background,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: 'clamp(32px, 8vw, 48px)',
                  fontWeight: '800',
                  color: COLORS.accent,
                  margin: 0,
                }}
              >
                {Math.round(healthScore)}%
              </motion.p>
              <p
                style={{
                  fontSize: '12px',
                  color: COLORS.textLight,
                  margin: '8px 0 0 0',
                  fontWeight: '600',
                }}
              >
                Score
              </p>
            </div>
          </motion.div>

          {/* Status Info */}
          <div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                marginBottom: '24px',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(14px, 2.5vw, 18px)',
                  fontWeight: '700',
                  color: COLORS.textDark,
                  marginBottom: '8px',
                  margin: '0 0 8px 0',
                }}
              >
                Status:{' '}
                <span style={{ color: COLORS.accent }}>
                  {healthScore > 70
                    ? '🟢 Excellent'
                    : healthScore > 40
                    ? '🟡 Good'
                    : '🔴 Needs Attention'}
                </span>
              </p>
            </motion.div>

            <div
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}10 0%, ${COLORS.accent}10 100%)`,
                borderRadius: '16px',
                padding: 'clamp(16px, 3vw, 24px)',
                marginBottom: '24px',
                border: `2px dashed ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(13px, 2vw, 14px)',
                  color: COLORS.textLight,
                  margin: 0,
                  lineHeight: '1.7',
                  fontWeight: '500',
                }}
              >
                Your home is in{' '}
                <strong style={{ color: COLORS.accent }}>
                  {healthScore > 70
                    ? 'excellent'
                    : healthScore > 40
                    ? 'good'
                    : 'critical'}
                </strong>{' '}
                condition. Regular maintenance prevents costly repairs and preserves value.
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
                    fontWeight: '700',
                    color: COLORS.textDark,
                    margin: 0,
                  }}
                >
                  Completion Progress
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: COLORS.textLight,
                    margin: 0,
                  }}
                >
                  {completedTasks}/{totalTasks} tasks
                </p>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                style={{
                  width: '100%',
                  height: '12px',
                  background: COLORS.secondary,
                  borderRadius: '6px',
                  overflow: 'hidden',
                  originX: 0,
                }}
              >
                <motion.div
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                    borderRadius: '6px',
                    boxShadow: `0 0 20px ${COLORS.accent}40`,
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CHARTS SECTION */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(clamp(300px, 100%, 550px), 1fr))',
          gap: 'clamp(28px, 5vw, 36px)',
          width: '100%',
        }}
      >
        {costByCategory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING}
            style={{
              background: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '24px',
              padding: 'clamp(28px, 5vw, 36px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}
          >
            <h4
              style={{
                fontSize: 'clamp(18px, 3vw, 22px)',
                fontWeight: '800',
                color: COLORS.textDark,
                marginBottom: '24px',
                margin: '0 0 24px 0',
              }}
            >
              💰 Spending by Category
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
                  {['#0f766e', '#059669', '#f59e0b', '#ef4444'].map(
                    (color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    )
                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: COLORS.background,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.textDark,
                    borderRadius: '12px',
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
              background: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '24px',
              padding: 'clamp(28px, 5vw, 36px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}
          >
            <h4
              style={{
                fontSize: 'clamp(18px, 3vw, 22px)',
                fontWeight: '800',
                color: COLORS.textDark,
                marginBottom: '24px',
                margin: '0 0 24px 0',
              }}
            >
              ⚡ Tasks by Priority
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksByPriority}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={COLORS.border}
                  vertical={false}
                />
                <XAxis dataKey="name" stroke={COLORS.textLight} />
                <YAxis stroke={COLORS.textLight} />
                <Tooltip
                  contentStyle={{
                    background: COLORS.background,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.textDark,
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="count" fill={COLORS.accent} radius={[12, 12, 0, 0]} />
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
              background: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '24px',
              padding: 'clamp(28px, 5vw, 36px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}
          >
            <h4
              style={{
                fontSize: 'clamp(18px, 3vw, 22px)',
                fontWeight: '800',
                color: COLORS.textDark,
                marginBottom: '24px',
                margin: '0 0 24px 0',
              }}
            >
              🏠 Tasks by Room
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksByRoom} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={COLORS.border}
                  horizontal={false}
                />
                <XAxis type="number" stroke={COLORS.textLight} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke={COLORS.textLight}
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: COLORS.background,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.textDark,
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="count" fill={COLORS.primary} radius={[0, 12, 12, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {costTrend.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING}
            style={{
              background: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '24px',
              padding: 'clamp(28px, 5vw, 36px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}
          >
            <h4
              style={{
                fontSize: 'clamp(18px, 3vw, 22px)',
                fontWeight: '800',
                color: COLORS.textDark,
                marginBottom: '24px',
                margin: '0 0 24px 0',
              }}
            >
              📈 Recent Costs
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={COLORS.border}
                  vertical={false}
                />
                <XAxis dataKey="name" stroke={COLORS.textLight} />
                <YAxis stroke={COLORS.textLight} />
                <Tooltip
                  contentStyle={{
                    background: COLORS.background,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.textDark,
                    borderRadius: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke={COLORS.accent}
                  strokeWidth={4}
                  dot={{ fill: COLORS.accent, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;