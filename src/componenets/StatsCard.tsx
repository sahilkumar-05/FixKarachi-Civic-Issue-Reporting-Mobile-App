import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsCardProps {
  icon: string;
  value: number | string;
  label: string;
  color?: string;
  bg?: string;
}

export default function StatsCard({ icon, value, label, color = '#0A2540', bg = '#FFFFFF' }: StatsCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, borderRadius: 16, padding: 14,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  icon: { fontSize: 24, marginBottom: 6 },
  value: { fontSize: 26, fontWeight: '800' },
  label: { fontSize: 11, color: '#6B7280', marginTop: 4, textAlign: 'center' },
});
