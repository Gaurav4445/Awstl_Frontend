'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Task } from './HomeMaintenanceLog';

interface DashboardProps {
  tasks: Task[];
  isDarkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, isDarkMode }) => {
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalSpent = tasks.reduce((sum, t) => sum + t.cost, 0);
  const averageCost = totalSpent / (tasks.length || 1);

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
    const onTimePercentage = (completedTasks / totalTasks) * 100;
    const overdueTasks = tasks.filter(t => {
      const today = new Date();
      const due = new Date(t.dueDate);
      return due < today && !t.completed;
    }).length;
    const overduePercentage = (overdueTasks / totalTasks) * 100;
    return Math.max(0, 100 - overduePercentage);
  };

  const healthScore = calculateHealthScore();

  const SPRING = {
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
  };

  const cardBg = isDarkMode ? '#334155' : 'white';
  const cardBorder = isDarkMode ? '#475569' : '#e2e8f0';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const secondaryText = isDarkMode ? '#cbd5e1' : '#64748b';
  const textGridColor = isDarkMode ? '#94a3b8' : '#64748b';
  const axisColor = isDarkMode ? '#94a3b8' : '#6b7280';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING.smooth}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {[
          { label: 'Total Tasks', value: totalTasks, color: '#3b82f6', bg: isDarkMode ? '#1e3a5f' : '#eff6ff' },
          { label: 'Completed', value: completedTasks, color: '#10b981', bg: isDarkMode ? '#1f3a2a' : '#f0fdf4' },
          { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, color: '#f59e0b', bg: isDarkMode ? '#3a2f1a' : '#fffbeb' },
          { label: 'Avg Cost/Task', value: `$${averageCost.toFixed(2)}`, color: '#8b5cf6', bg: isDarkMode ? '#2e1f4a' : '#faf5ff' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            style={{
              background: stat.bg,
              border: `2px solid ${stat.color}`,
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer',
            }}
          >
            <p style={{ fontSize: '12px', color: secondaryText, marginBottom: '8px' }}>{stat.label}</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: stat.color }}>{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING.smooth}
        style={{
          background: cardBg,
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: `1px solid ${cardBorder}`,
        }}
      >
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: textColor,
        }}>
          Home Maintenance Health Score
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `conic-gradient(${healthScore > 70 ? '#10b981' : healthScore > 40 ? '#f59e0b' : '#ef4444'} 0deg ${(healthScore / 100) * 360}deg, ${isDarkMode ? '#475569' : '#e2e8f0'} ${(healthScore / 100) * 360}deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <div style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: isDarkMode ? '#1e293b' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
              <p style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: healthScore > 70 ? '#10b981' : healthScore > 40 ? '#f59e0b' : '#ef4444',
              }}>
                {Math.round(healthScore)}%
              </p>
              <p style={{ fontSize: '10px', color: secondaryText }}>Health</p>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '14px', color: secondaryText, marginBottom: '8px' }}>
              Your home maintenance is <strong style={{ color: healthScore > 70 ? '#10b981' : healthScore > 40 ? '#f59e0b' : '#ef4444' }}>
                {healthScore > 70 ? 'Excellent' : healthScore > 40 ? 'Good' : 'Needs Attention'}
              </strong>
            </p>
            <p style={{ fontSize: '12px', color: secondaryText }}>
              Keep up with regular maintenance to prevent costly repairs and extend the life of your home systems and appliances.
            </p>
          </div>
        </div>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
      }}>
        {costByCategory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING.smooth}
            style={{
              background: cardBg,
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: `1px solid ${cardBorder}`,
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: textColor,
            }}>
              Spending by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name} $${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} contentStyle={{background: isDarkMode ? '#334155' : 'white', border: `1px solid ${cardBorder}`, color: textColor}} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {tasksByPriority.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING.smooth}
            style={{
              background: cardBg,
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: `1px solid ${cardBorder}`,
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: textColor,
            }}>
              Tasks by Priority
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksByPriority}>
                <CartesianGrid strokeDasharray="3 3" stroke={axisColor} />
                <XAxis dataKey="name" stroke={axisColor} />
                <YAxis stroke={axisColor} />
                <Tooltip contentStyle={{background: isDarkMode ? '#334155' : 'white', border: `1px solid ${cardBorder}`, color: textColor}} />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {tasksByRoom.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING.smooth}
            style={{
              background: cardBg,
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: `1px solid ${cardBorder}`,
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: textColor,
            }}>
              Tasks by Room
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksByRoom} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={axisColor} />
                <XAxis type="number" stroke={axisColor} />
                <YAxis dataKey="name" type="category" stroke={axisColor} />
                <Tooltip contentStyle={{background: isDarkMode ? '#334155' : 'white', border: `1px solid ${cardBorder}`, color: textColor}} />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;