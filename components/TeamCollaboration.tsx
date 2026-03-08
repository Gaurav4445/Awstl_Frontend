'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Trash2, Mail, Shield, Clock, CheckCircle, MessageSquare } from 'lucide-react';

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

const TeamCollaboration: React.FC<TeamCollaborationProps> = ({ isDarkMode }) => {
  const [members, setMembers] = useState<TeamMember[]>([
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
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'Manager',
      avatar: '👩',
      joinedDate: '2026-02-01',
      status: 'active',
      taskCount: 8,
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'Member',
      avatar: '👨',
      joinedDate: '2026-02-15',
      status: 'active',
      taskCount: 5,
    },
  ]);

  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');

  const bgColor = isDarkMode ? '#334155' : 'white';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const secondaryText = isDarkMode ? '#cbd5e1' : '#64748b';
  const borderColor = isDarkMode ? '#475569' : '#e2e8f0';
  const inputBg = isDarkMode ? '#1e293b' : '#f8fafc';

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: Date.now(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole as any,
      avatar: '👤',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'invited',
      taskCount: 0,
    };

    setMembers([...members, newMember]);
    setInviteEmail('');
    setShowInvite(false);
  };

  const handleRemoveMember = (id: number) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, { bg: string; text: string; color: string }> = {
      Admin: { bg: '#fecaca', text: '#991b1b', color: '#ef4444' },
      Manager: { bg: '#fed7aa', text: '#92400e', color: '#f59e0b' },
      Member: { bg: '#bfdbfe', text: '#1e40af', color: '#3b82f6' },
    };
    return colors[role] || colors.Member;
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, { icon: any; color: string }> = {
      active: { icon: CheckCircle, color: '#10b981' },
      invited: { icon: Mail, color: '#f59e0b' },
      inactive: { icon: Clock, color: '#64748b' },
    };
    return icons[status] || icons.inactive;
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '24px',
    }}>
      {/* Header with Invite Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: `linear-gradient(135deg, #10b981 0%, #14b8a6 100%)`,
          borderRadius: '16px',
          padding: '32px',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '8px',
            fontFamily: '"Playfair Display", serif',
          }}>
            Team Management
          </h2>
          <p style={{
            fontSize: '14px',
            opacity: 0.9,
            margin: 0,
          }}>
            Manage family members and collaborate on home maintenance
          </p>
        </div>

        <motion.button
          onClick={() => setShowInvite(!showInvite)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '2px solid white',
            borderRadius: '12px',
            padding: '12px 24px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Plus size={20} />
          Invite Member
        </motion.button>
      </motion.div>

      {/* Invite Form */}
      <AnimatePresence>
        {showInvite && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              background: `linear-gradient(135deg, ${bgColor} 0%, ${isDarkMode ? '#1e293b' : '#f8fafc'} 100%)`,
              borderRadius: '16px',
              border: `2px solid #10b981`,
              padding: '32px',
            }}
          >
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: textColor,
              marginBottom: '20px',
              margin: 0,
            }}>
              Invite New Member
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 200px auto',
              gap: '12px',
              marginTop: '16px',
            }}>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email address"
                style={{
                  padding: '12px 16px',
                  border: `2px solid ${borderColor}`,
                  borderRadius: '8px',
                  background: inputBg,
                  color: textColor,
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />

              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: `2px solid ${borderColor}`,
                  borderRadius: '8px',
                  background: inputBg,
                  color: textColor,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                <option>Admin</option>
                <option>Manager</option>
                <option>Member</option>
              </select>

              <motion.button
                onClick={handleInvite}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                }}
              >
                Send Invite
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Members Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        {members.map((member) => {
          const roleInfo = getRoleColor(member.role);
          const statusInfo = getStatusIcon(member.status);
          const StatusIcon = statusInfo.icon;

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              layout
              whileHover={{ scale: 1.05 }}
              style={{
                background: `linear-gradient(135deg, ${bgColor} 0%, ${isDarkMode ? '#1e293b' : '#f8fafc'} 100%)`,
                borderRadius: '16px',
                border: `2px solid ${borderColor}`,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Top Section */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <div style={{
                    fontSize: '40px',
                    background: isDarkMode ? '#475569' : '#e2e8f0',
                    borderRadius: '12px',
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {member.avatar}
                  </div>
                  <div>
                    <p style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: textColor,
                      margin: 0,
                      marginBottom: '4px',
                    }}>
                      {member.name}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: secondaryText,
                      margin: 0,
                    }}>
                      {member.email}
                    </p>
                  </div>
                </div>

                {member.id !== 1 && (
                  <motion.button
                    onClick={() => handleRemoveMember(member.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: '#fee2e2',
                      color: '#991b1b',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                )}
              </div>

              {/* Status & Role */}
              <div style={{
                display: 'flex',
                gap: '8px',
              }}>
                <span style={{
                  background: roleInfo.bg,
                  color: roleInfo.text,
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <Shield size={14} />
                  {member.role}
                </span>
                <span style={{
                  background: `${statusInfo.color}20`,
                  color: statusInfo.color,
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  textTransform: 'capitalize',
                }}>
                  <StatusIcon size={14} />
                  {member.status}
                </span>
              </div>

              {/* Stats */}
              <div style={{
                background: isDarkMode ? '#1e293b' : '#f8fafc',
                borderRadius: '12px',
                padding: '12px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: secondaryText,
                    margin: 0,
                    marginBottom: '4px',
                  }}>
                    Tasks Completed
                  </p>
                  <p style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: textColor,
                    margin: 0,
                  }}>
                    {member.taskCount}
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: secondaryText,
                    margin: 0,
                    marginBottom: '4px',
                  }}>
                    Joined
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: textColor,
                    margin: 0,
                    fontWeight: '500',
                  }}>
                    {new Date(member.joinedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Message Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <MessageSquare size={14} />
                Send Message
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamCollaboration;