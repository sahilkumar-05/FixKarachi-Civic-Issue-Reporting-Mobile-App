import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  StatusBar, TouchableOpacity, Alert, ScrollView,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useIssues } from '../context/IssueContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { issues } = useIssues();

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || 'U';

  const totalVotes = issues.reduce((sum: number, i: any) => sum + (i.votes || 0), 0);
  const resolvedCount = issues.filter((i: any) => i.status === 'Resolved').length;

  const AVATAR_COLORS = ['#1A6B52', '#0A2540', '#7C3AED', '#DC2626', '#D97706'];
  const colorIndex = (user?.name?.charCodeAt(0) || 0) % AVATAR_COLORS.length;
  const avatarColor = AVATAR_COLORS[colorIndex];

  // ✅ Logout handler
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2540" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>My Profile</Text>
        <Text style={styles.headerSub}>Fix Karachi Citizen</Text>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* AVATAR CARD */}
        <View style={styles.avatarCard}>
          <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Citizen'}</Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>🏙️ Karachi Resident</Text>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Your Impact</Text>

          <View style={styles.statsRow}>
            {[
              { icon: '📋', value: issues.length, label: 'Community Issues' },
              { icon: '✅', value: resolvedCount, label: 'Resolved' },
              { icon: '▲', value: totalVotes, label: 'Total Votes' },
            ].map(s => (
              <View key={s.label} style={styles.statItem}>
                <Text style={styles.statIcon}>{s.icon}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* INFO */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Account Details</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <Text style={styles.infoIcon}>👤</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{user?.name || '—'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <Text style={styles.infoIcon}>✉️</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{user?.email || '—'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <Text style={styles.infoIcon}>📍</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>City</Text>
              <Text style={styles.infoValue}>Karachi, Pakistan</Text>
            </View>
          </View>
        </View>

       

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },

  header: {
    backgroundColor: '#0A2540',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerLabel: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  headerSub: { fontSize: 13, color: '#64B5A0', marginTop: 4, fontWeight: '600' },

  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  avatarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 14,
    elevation: 4,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 4,
    borderColor: '#E5E7EB',
  },
  avatarText: { color: '#FFF', fontSize: 36, fontWeight: '800' },
  userName: { fontSize: 22, fontWeight: '800', color: '#0A2540' },
  userEmail: { fontSize: 14, color: '#6B7280', marginTop: 4 },

  badge: {
    backgroundColor: '#E8F5F0',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  badgeText: { fontSize: 13, color: '#1A6B52', fontWeight: '700' },

  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    textTransform: 'uppercase',
    marginBottom: 14,
  },

  statsRow: { flexDirection: 'row' },
  statItem: { flex: 1, alignItems: 'center' },
  statIcon: { fontSize: 22 },
  statValue: { fontSize: 24, fontWeight: '800', color: '#0A2540' },
  statLabel: { fontSize: 11, color: '#6B7280', textAlign: 'center' },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoIcon: { fontSize: 18 },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: '#9CA3AF' },
  infoValue: { fontSize: 16, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 12 },

  aboutCard: {
    backgroundColor: '#0A2540',
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },
  aboutTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  aboutText: { fontSize: 14, color: '#94A3B8', marginTop: 10 },

  logoutBtn: {
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});