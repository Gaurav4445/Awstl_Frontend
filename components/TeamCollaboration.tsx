'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Mail, UserCheck, Clock, X, Users } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Member';
  avatar: string;
  joinedDate: string;
  status: 'active' | 'invited' | 'inactive';
  taskCount: number;
}

interface TeamCollaborationProps {
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

const TeamCollaboration: React.FC<TeamCollaborationProps> = ({ isDarkMode }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Member' as const,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('hm_team');
      if (stored) {
        setMembers(JSON.parse(stored));
      } else {
        // Set default members only if nothing in localStorage
        const defaultMembers: TeamMember[] = [
          {
            id: 1,
            name: 'You',
            email: 'you@example.com',
            role: 'Admin',
            avatar: 'A',
            joinedDate: '2026-01-15',
            status: 'active',
            taskCount: 12,
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            role: 'Manager',
            avatar: 'S',
            joinedDate: '2026-02-01',
            status: 'active',
            taskCount: 8,
          },
        ];
        setMembers(defaultMembers);
        window.localStorage.setItem('hm_team', JSON.stringify(defaultMembers));
      }
    } catch (error) {
      console.error('Error loading team data:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever members change
  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem('hm_team', JSON.stringify(members));
      } catch (error) {
        console.error('Error saving team data:', error);
      }
    }
  }, [members, isLoaded]);

  const handleInviteMember = () => {
    if (formData.name && formData.email) {
      const newMember: TeamMember = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        avatar: formData.name.charAt(0).toUpperCase(),
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'invited',
        taskCount: 0,
      };
      setMembers([...members, newMember]);
      setFormData({ name: '', email: '', role: 'Member' });
      setShowForm(false);
    }
  };

  const handleRemoveMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleChangeRole = (id: number, newRole: 'Admin' | 'Manager' | 'Member') => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      { bg: `${COLORS.primary}20`, text: COLORS.primary },
      { bg: `${COLORS.accent}20`, text: COLORS.accent },
      { bg: '#f59e0b20', text: '#f59e0b' },
      { bg: '#3b82f620', text: '#3b82f6' },
    ];
    return colors[index % colors.length];
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: '#d1fae5', text: COLORS.accent, icon: UserCheck };
      case 'invited':
        return { bg: '#fef3c7', text: '#f59e0b', icon: Mail };
      case 'inactive':
        return { bg: '#f3f4f6', text: COLORS.textLight, icon: Clock };
      default:
        return { bg: COLORS.lightBg, text: COLORS.textLight, icon: Clock };
    }
  };

  const SPRING = {
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
  };

  if (!isLoaded) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid #0f766e',
            borderTopColor: 'transparent',
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '20px',
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: '700',
              color: COLORS.textDark,
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            Team Members
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: COLORS.textLight,
              margin: '4px 0 0 0',
            }}
          >
            Manage team and assign roles
          </p>
        </div>

        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600',
            fontSize: '14px',
            boxShadow: `0 4px 12px ${COLORS.primary}20`,
          }}
        >
          <Plus size={18} />
          Invite Member
        </motion.button>
      </motion.div>

      {/* Members Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(250px, 100%, 350px), 1fr))',
          gap: 'clamp(16px, 3vw, 24px)',
        }}
      >
        <AnimatePresence mode="popLayout">
          {members.map((member, idx) => {
            const statusConfig = getStatusBadgeColor(member.status);
            const StatusIcon = statusConfig.icon;
            const avatarConfig = getAvatarColor(idx);

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                style={{
                  background: COLORS.background,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '20px',
                  padding: 'clamp(20px, 4vw, 28px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background Accent */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                    opacity: 0.05,
                    borderRadius: '50%',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Avatar & Name */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '12px',
                        background: avatarConfig.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: '700',
                        color: avatarConfig.text,
                      }}
                    >
                      {member.avatar}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: '15px',
                          fontWeight: '700',
                          color: COLORS.textDark,
                          margin: 0,
                        }}
                      >
                        {member.name}
                      </h3>
                      <p
                        style={{
                          fontSize: '12px',
                          color: COLORS.textLight,
                          margin: '4px 0 0 0',
                        }}
                      >
                        {member.email}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    style={{
                      background: statusConfig.bg,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '16px',
                      width: 'fit-content',
                    }}
                  >
                    <StatusIcon size={14} style={{ color: statusConfig.text }} />
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: statusConfig.text,
                        textTransform: 'capitalize',
                      }}
                    >
                      {member.status}
                    </span>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      height: '1px',
                      background: COLORS.border,
                      margin: '16px 0',
                    }}
                  />

                  {/* Details */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: COLORS.textLight,
                          margin: '0 0 4px 0',
                          textTransform: 'uppercase',
                          letterSpacing: '0.3px',
                        }}
                      >
                        Joined
                      </p>
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: COLORS.textDark,
                          margin: 0,
                        }}
                      >
                        {new Date(member.joinedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: COLORS.textLight,
                          margin: '0 0 4px 0',
                          textTransform: 'uppercase',
                          letterSpacing: '0.3px',
                        }}
                      >
                        Tasks
                      </p>
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: COLORS.primary,
                          margin: 0,
                        }}
                      >
                        {member.taskCount}
                      </p>
                    </div>
                  </div>

                  {/* Role Selector */}
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: COLORS.textLight,
                        margin: '0 0 6px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                      }}
                    >
                      Role
                    </label>
                    <select
                      value={member.role}
                      onChange={(e) =>
                        handleChangeRole(member.id, e.target.value as any)
                      }
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        background: COLORS.background,
                        color: COLORS.textDark,
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                      }}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>

                  {/* Remove Button */}
                  {member.id !== 1 && (
                    <motion.button
                      onClick={() => handleRemoveMember(member.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%',
                        background: '#fee2e2',
                        color: '#991b1b',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontWeight: '600',
                        fontSize: '13px',
                      }}
                    >
                      <Trash2 size={14} />
                      Remove
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Invite Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px',
            }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: COLORS.background,
                borderRadius: '20px',
                padding: 'clamp(28px, 5vw, 40px)',
                maxWidth: '420px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '28px',
                  paddingBottom: '20px',
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <h3
                  style={{
                    fontSize: 'clamp(18px, 4vw, 24px)',
                    fontWeight: '700',
                    color: COLORS.textDark,
                    margin: 0,
                  }}
                >
                  Invite Team Member
                </h3>
                <motion.button
                  onClick={() => setShowForm(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: COLORS.lightBg,
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    padding: '6px',
                    color: COLORS.textDark,
                  }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleInviteMember();
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                {/* Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: COLORS.textDark,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: '12px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      background: COLORS.background,
                      color: COLORS.textDark,
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${COLORS.primary}20`;
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: COLORS.textDark,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: '12px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      background: COLORS.background,
                      color: COLORS.textDark,
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${COLORS.primary}20`;
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: COLORS.textDark,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as any })
                    }
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: '12px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      background: COLORS.background,
                      color: COLORS.textDark,
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${COLORS.primary}20`;
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    <option value="Member">Member</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {/* Buttons */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginTop: '12px',
                  }}
                >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                      color: 'white',
                      padding: '12px',
                      borderRadius: '12px',
                      border: 'none',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '14px',
                      boxShadow: `0 4px 12px ${COLORS.primary}20`,
                    }}
                  >
                    Send Invite
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: COLORS.lightBg,
                      color: COLORS.textDark,
                      padding: '12px',
                      borderRadius: '12px',
                      border: `1px solid ${COLORS.border}`,
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamCollaboration;