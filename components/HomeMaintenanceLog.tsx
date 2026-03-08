'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, RotateCcw, AlertCircle } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';

import Sidebar from './Sidebar';
import SettingsPanel from './SettingsPanel';
import NotificationCenter from './NotificationCenter';
import Dashboard from './Dashboard';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskDetails from './TaskDetails';
import HomeInventory from './HomeInventory';
import SearchFilter from './SearchFilter';
import CalendarView from './CalendarView';
import MultiHome from './MultiHome';
import TeamCollaboration from './TeamCollaboration';

const SPRING = {
  snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
};

export interface Task {
  id: number;
  name: string;
  category: string;
  room: string;
  lastCompleted: string;
  dueDate: string;
  frequency: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  completed: boolean;
  cost: number;
  notes: string;
  photos: string[];
  contractor?: {
    name: string;
    phone: string;
    email: string;
    rating: number;
  };
  warranty?: {
    hasWarranty: boolean;
    expiryDate: string;
    provider: string;
  };
}

export interface Appliance {
  id: number;
  name: string;
  room: string;
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyExpiry: string;
  notes: string;
}

interface DeletedItem {
  type: 'task' | 'appliance' | 'home';
  data: Task | Appliance | any;
  timestamp: number;
}

const HomeMaintenanceLog: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showUndoNotif, setShowUndoNotif] = useState(false);
  const [lastDeleted, setLastDeleted] = useState<DeletedItem | null>(null);

  // Use localStorage for persistence
  const [tasks, setTasks, tasksLoaded] = useLocalStorage<Task[]>('hm_tasks', [
    {
      id: 1,
      name: 'Change AC Filter',
      category: 'HVAC',
      room: 'Master Bedroom',
      lastCompleted: '2025-02-15',
      dueDate: '2025-05-15',
      frequency: '90 days',
      priority: 'high',
      completed: false,
      cost: 25,
      notes: 'Replace with MERV 13 filter',
      photos: [],
      contractor: { name: 'John HVAC', phone: '555-1234', email: 'john@hvac.com', rating: 4.5 },
      warranty: { hasWarranty: true, expiryDate: '2026-02-15', provider: 'AC Corp' },
    },
  ]);

  const [appliances, setAppliances, appliancesLoaded] = useLocalStorage<Appliance[]>('hm_appliances', [
    {
      id: 1,
      name: 'Central AC Unit',
      room: 'Attic',
      brand: 'Carrier',
      model: 'AC-2000X',
      serialNumber: 'SN12345',
      purchaseDate: '2022-06-01',
      warrantyExpiry: '2027-06-01',
      notes: 'Needs annual maintenance',
    },
  ]);

  const [homes, setHomes, homesLoaded] = useLocalStorage<any[]>('hm_homes', [
    {
      id: 1,
      name: 'Main Residence',
      address: '123 Oak Street, Springfield, IL',
      type: 'House',
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2015,
      squareFeet: 3500,
      estimatedValue: 450000,
      members: 3,
    },
  ]);

  const [teamMembers, setTeamMembers, teamLoaded] = useLocalStorage<any[]>('hm_team', [
    {
      id: 1,
      name: 'You',
      email: 'you@example.com',
      role: 'Admin',
      avatar: '👤',
      joinedDate: '2026-01-15',
      status: 'active',
      taskCount: 12,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRoom, setFilterRoom] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard');

  const categories = ['HVAC', 'Safety', 'Exterior', 'Plumbing', 'Interior', 'Maintenance', 'Electrical'];
  const rooms = ['Master Bedroom', 'Kitchen', 'Bathroom', 'Living Room', 'Basement', 'Attic', 'Garage', 'Laundry Room'];

  const isLoaded = tasksLoaded && appliancesLoaded && homesLoaded && teamLoaded;

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
      const matchesRoom = filterRoom === 'all' || task.room === filterRoom;
      return matchesSearch && matchesCategory && matchesRoom;
    });
  }, [tasks, searchTerm, filterCategory, filterRoom]);

  const handleAddTask = (formData: any) => {
    const newTask: Task = {
      id: editingId || Date.now(),
      ...formData,
      dueDate: new Date(new Date().setDate(new Date().getDate() + parseInt(formData.frequency))).toISOString().split('T')[0],
      completed: false,
    };

    if (editingId) {
      setTasks(tasks.map(t => t.id === editingId ? newTask : t));
      setEditingId(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setShowForm(false);
  };

  const handleDeleteTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setLastDeleted({ type: 'task', data: task, timestamp: Date.now() });
      setShowUndoNotif(true);
      setTasks(tasks.filter(t => t.id !== id));
      setSelectedTask(null);

      // Auto-hide undo after 5 seconds
      setTimeout(() => setShowUndoNotif(false), 5000);
    }
  };

  const handleUndoDelete = () => {
    if (lastDeleted && lastDeleted.type === 'task') {
      setTasks([...tasks, lastDeleted.data as Task]);
      setShowUndoNotif(false);
      setLastDeleted(null);
    }
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setSelectedTask(updatedTask);
  };

  const handleAddAppliance = (appliance: Appliance) => {
    setAppliances([...appliances, { ...appliance, id: Date.now() }]);
  };

  const handleDeleteAppliance = (id: number) => {
    const appliance = appliances.find(a => a.id === id);
    if (appliance) {
      setLastDeleted({ type: 'appliance', data: appliance, timestamp: Date.now() });
      setShowUndoNotif(true);
      setAppliances(appliances.filter(a => a.id !== id));

      setTimeout(() => setShowUndoNotif(false), 5000);
    }
  };

  const handleAddHome = (home: any) => {
    setHomes([...homes, { ...home, id: Date.now() }]);
  };

  const handleDeleteHome = (id: number) => {
    const home = homes.find(h => h.id === id);
    if (home) {
      setLastDeleted({ type: 'home', data: home, timestamp: Date.now() });
      setShowUndoNotif(true);
      setHomes(homes.filter(h => h.id !== id));

      setTimeout(() => setShowUndoNotif(false), 5000);
    }
  };

  const bgGradient = isDarkMode
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';

  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const headerBg = isDarkMode ? '#1e293b' : 'white';
  const headerBorder = isDarkMode ? '#334155' : '#e2e8f0';

  if (!isLoaded) {
    return (
      <div style={{
        minHeight: '100vh',
        background: bgGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Inter", sans-serif',
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '4px solid #10b981',
            borderTopColor: 'transparent',
          }}
        />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: bgGradient,
      fontFamily: '"Inter", sans-serif',
      color: textColor,
      display: 'flex',
    }}>
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        onSettingsClick={() => setSettingsOpen(true)}
      />

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: '280px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left 0.3s ease',
      }}>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING.smooth}
          style={{
            background: headerBg,
            borderBottom: `1px solid ${headerBorder}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '16px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                fontFamily: '"Playfair Display", serif',
                color: textColor,
                margin: 0,
              }}>
                {activeTab === 'dashboard' && '📊 Dashboard'}
                {activeTab === 'tasks' && '✓ Tasks'}
                {activeTab === 'calendar' && '📅 Calendar'}
                {activeTab === 'homes' && '🏠 My Homes'}
                {activeTab === 'team' && '👥 Team'}
                {activeTab === 'inventory' && '📦 Inventory'}
              </h1>
            </div>

            <div style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
            }}>
              <NotificationCenter isDarkMode={isDarkMode} />

              {activeTab === 'tasks' && (
                <motion.button
                  onClick={() => setShowForm(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 10px 15px rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <Plus size={20} />
                  Add Task
                </motion.button>
              )}

              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: isDarkMode ? '#334155' : '#e2e8f0',
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '18px',
                }}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Undo Notification */}
        <AnimatePresence>
          {showUndoNotif && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                color: 'white',
                padding: '16px 24px',
                margin: '16px 32px 0 32px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AlertCircle size={20} />
                <span>Item deleted. </span>
              </div>
              <motion.button
                onClick={handleUndoDelete}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <RotateCcw size={14} />
                Undo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <div style={{
          flex: 1,
          padding: '32px',
          overflowY: 'auto',
        }}>
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING.smooth}
            >
              <Dashboard tasks={tasks} isDarkMode={isDarkMode} />
            </motion.div>
          )}

          {activeTab === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING.smooth}
            >
              <SearchFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                filterRoom={filterRoom}
                setFilterRoom={setFilterRoom}
                categories={categories}
                rooms={rooms}
                isDarkMode={isDarkMode}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
                <div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    fontFamily: '"Playfair Display", serif',
                    color: textColor,
                  }}>
                    Tasks ({filteredTasks.length})
                  </h2>
                  <TaskList
                    tasks={filteredTasks}
                    selectedTask={selectedTask}
                    onSelectTask={setSelectedTask}
                    onDeleteTask={handleDeleteTask}
                    isDarkMode={isDarkMode}
                  />
                </div>

                <div>
                  <AnimatePresence mode="wait">
                    {showForm ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={SPRING.smooth}
                      >
                        <TaskForm
                          onSubmit={handleAddTask}
                          onCancel={() => setShowForm(false)}
                          categories={categories}
                          rooms={rooms}
                          isDarkMode={isDarkMode}
                        />
                      </motion.div>
                    ) : selectedTask ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={SPRING.smooth}
                      >
                        <TaskDetails
                          task={selectedTask}
                          onUpdate={handleUpdateTask}
                          onClose={() => setSelectedTask(null)}
                          categories={categories}
                          rooms={rooms}
                          isDarkMode={isDarkMode}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          background: isDarkMode ? '#334155' : 'white',
                          borderRadius: '12px',
                          padding: '48px 24px',
                          textAlign: 'center',
                          border: `2px dashed ${isDarkMode ? '#475569' : '#cbd5e1'}`,
                        }}
                      >
                        <p style={{ fontSize: '32px', margin: '0 0 16px 0' }}>✨</p>
                        <p style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', fontSize: '18px', margin: 0 }}>
                          Select a task to view details or create a new one
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING.smooth}
            >
              <HomeInventory
                appliances={appliances}
                onAddAppliance={handleAddAppliance}
                onDeleteAppliance={handleDeleteAppliance}
                rooms={rooms}
                isDarkMode={isDarkMode}
              />
            </motion.div>
          )}

          {activeTab === 'calendar' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING.smooth}
            >
              <CalendarView tasks={tasks} isDarkMode={isDarkMode} />
            </motion.div>
          )}

          {activeTab === 'homes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING.smooth}
            >
              <MultiHome isDarkMode={isDarkMode} />
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING.smooth}
            >
              <TeamCollaboration isDarkMode={isDarkMode} />
            </motion.div>
          )}
        </div>
      </div>

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
      />
    </div>
  );
};

export default HomeMaintenanceLog;