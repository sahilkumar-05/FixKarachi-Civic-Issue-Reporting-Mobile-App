import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: { label: string; onPress: () => void };
  backAction?: () => void;
}

export default function Header({ title, subtitle, rightAction, backAction }: HeaderProps) {
  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2540" />
      <View style={styles.row}>
        <View style={styles.left}>
          {backAction && (
            <TouchableOpacity onPress={backAction} style={styles.backBtn}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
          )}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          <Text style={styles.title}>{title}</Text>
        </View>
        {rightAction && (
          <TouchableOpacity onPress={rightAction.onPress} style={styles.rightBtn}>
            <Text style={styles.rightBtnText}>{rightAction.label}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0A2540',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 20,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  left: { flex: 1 },
  backBtn: { marginBottom: 8 },
  backText: { color: '#64B5A0', fontWeight: '600', fontSize: 14 },
  subtitle: {
    fontSize: 12, color: '#64B5A0', fontWeight: '600',
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4,
  },
  title: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  rightBtn: {
    backgroundColor: '#64B5A0', paddingHorizontal: 14,
    paddingVertical: 8, borderRadius: 20,
  },
  rightBtnText: { color: '#0A2540', fontWeight: '800', fontSize: 13 },
});
