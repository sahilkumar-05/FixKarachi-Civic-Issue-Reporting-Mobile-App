import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, Alert, StatusBar, ScrollView,
} from 'react-native';
import { useIssues } from '../context/IssueContext';
import { useNavigation } from '@react-navigation/native';

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  Pending:       { color: '#92400E', bg: '#FEF3C7' },
  'In Progress': { color: '#1E40AF', bg: '#DBEAFE' },
  Resolved:      { color: '#065F46', bg: '#D1FAE5' },
};

const PRIORITY_COLORS: Record<string, string> = {
  CRITICAL: '#DC2626',
  HIGH: '#D97706',
  MEDIUM: '#2563EB',
  LOW: '#059669',
};

export default function AdminScreen() {
  const { issues, updateStatus, deleteIssue, ADMIN_ID } = useIssues();
  const navigation = useNavigation();

  const [inputId, setInputId] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Pending', 'In Progress', 'Resolved'];

  const filteredIssues = activeTab === 'All'
    ? issues
    : issues.filter(i => i.status === activeTab);

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'Pending').length,
    inProgress: issues.filter(i => i.status === 'In Progress').length,
    resolved: issues.filter(i => i.status === 'Resolved').length,
  };

  // ── ADMIN LOGIN ──────────────────────────────────────────
  if (!isAuth) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0A2540', justifyContent: 'center', padding: 24 }}>
        <StatusBar barStyle="light-content" backgroundColor="#0A2540" />

        <View style={{ alignItems: 'center', marginBottom: 36 }}>
          <View style={{
            width: 80, height: 80, borderRadius: 40,
            backgroundColor: '#1A3A5C', justifyContent: 'center',
            alignItems: 'center', marginBottom: 16,
            borderWidth: 2, borderColor: '#25A37A',
          }}>
            <Text style={{ fontSize: 36 }}>⚙️</Text>
          </View>
          <Text style={{ fontSize: 28, fontWeight: '800', color: '#FFFFFF' }}>Admin Portal</Text>
          <Text style={{ fontSize: 14, color: '#64B5A0', marginTop: 6 }}>Fix Karachi Control Panel</Text>
        </View>

        <View style={{
          backgroundColor: '#FFFFFF', borderRadius: 24, padding: 26,
          shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3, shadowRadius: 20, elevation: 12,
        }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Admin ID
          </Text>
          <TextInput
            placeholder="Enter Admin ID"
            value={inputId}
            onChangeText={setInputId}
            style={{
              backgroundColor: '#F9FAFB', borderWidth: 1.5, borderColor: '#E5E7EB',
              padding: 16, borderRadius: 14, marginBottom: 16, fontSize: 16, color: '#111827',
            }}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => {
              if (inputId === ADMIN_ID) {
                setIsAuth(true);
              } else {
                Alert.alert('Access Denied ❌', 'The Admin ID you entered is incorrect.');
              }
            }}
            style={{
              backgroundColor: '#0A2540', padding: 16,
              borderRadius: 14, alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>Access Panel</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ color: '#64B5A0', fontWeight: '600' }}>← Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── ADMIN PANEL ──────────────────────────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: '#F0F4F8' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2540" />

      {/* HEADER */}
      <View style={{
        backgroundColor: '#0A2540', paddingHorizontal: 18,
        paddingTop: 16, paddingBottom: 20,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 12, color: '#64B5A0', fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' }}>
              Admin Panel
            </Text>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginTop: 2 }}>
              Issue Management
            </Text>
          </View>
          <View style={{
            backgroundColor: '#1A3A5C', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12,
          }}>
            <Text style={{ color: '#64B5A0', fontSize: 12, fontWeight: '700' }}>⚙️ ADMIN</Text>
          </View>
        </View>

        {/* Mini Stats */}
        <View style={{ flexDirection: 'row', marginTop: 16, gap: 8 }}>
          {[
            { label: 'Total', value: stats.total, color: '#FFFFFF' },
            { label: 'Pending', value: stats.pending, color: '#FBBF24' },
            { label: 'Active', value: stats.inProgress, color: '#60A5FA' },
            { label: 'Done', value: stats.resolved, color: '#34D399' },
          ].map(s => (
            <View key={s.label} style={{
              flex: 1, backgroundColor: '#1A3A5C', borderRadius: 12,
              padding: 10, alignItems: 'center',
            }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: s.color }}>{s.value}</Text>
              <Text style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* TAB FILTERS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 12, gap: 8 }}
      >
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: '#E5E7EB' },
              activeTab === tab && { backgroundColor: '#0A2540' },
            ]}
          >
            <Text style={[
              { fontSize: 13, color: '#374151', fontWeight: '600' },
              activeTab === tab && { color: '#FFFFFF' },
            ]}>
              {tab} {tab !== 'All' ? `(${issues.filter(i => i.status === tab).length})` : `(${issues.length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ISSUE LIST */}
      <FlatList
        data={filteredIssues}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingVertical: 60 }}>
            <Text style={{ fontSize: 44, marginBottom: 12 }}>✅</Text>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#0A2540' }}>All clear!</Text>
            <Text style={{ color: '#6B7280', marginTop: 6 }}>No issues in this category</Text>
          </View>
        }
        renderItem={({ item }) => {
          const status = STATUS_CONFIG[item.status] || STATUS_CONFIG.Pending;
          const priorityColor = PRIORITY_COLORS[item.priority] || PRIORITY_COLORS.LOW;

          return (
            <View style={{
              backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, marginBottom: 12,
              shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
              borderLeftWidth: 4, borderLeftColor: priorityColor,
            }}>
              {/* Top Row */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#0A2540', flex: 1, marginRight: 8 }}>
                  {item.title}
                </Text>
                <View style={{ backgroundColor: status.bg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
                  <Text style={{ fontSize: 11, color: status.color, fontWeight: '700' }}>{item.status}</Text>
                </View>
              </View>

              {/* Meta Row */}
              <View style={{ flexDirection: 'row', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                {item.location ? (
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>📍 {item.location}</Text>
                ) : null}
                {item.category ? (
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>🏷️ {item.category}</Text>
                ) : null}
                <Text style={{ fontSize: 12, color: '#6B7280' }}>▲ {item.votes} votes</Text>
              </View>

              {item.description ? (
                <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 8, lineHeight: 19 }} numberOfLines={2}>
                  {item.description}
                </Text>
              ) : null}

              {/* Action Buttons */}
              <View style={{ flexDirection: 'row', marginTop: 14, gap: 8 }}>
                <TouchableOpacity
                  onPress={() => updateStatus(item.id, 'In Progress')}
                  style={{
                    flex: 1, backgroundColor: '#DBEAFE', paddingVertical: 10,
                    borderRadius: 12, alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#1E40AF', fontWeight: '700', fontSize: 13 }}>⏳ In Progress</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => updateStatus(item.id, 'Resolved')}
                  style={{
                    flex: 1, backgroundColor: '#D1FAE5', paddingVertical: 10,
                    borderRadius: 12, alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#065F46', fontWeight: '700', fontSize: 13 }}>✅ Resolve</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert('Delete Issue?', 'This action cannot be undone.', [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', style: 'destructive', onPress: () => deleteIssue(item.id) },
                    ])
                  }
                  style={{
                    backgroundColor: '#FEE2E2', paddingVertical: 10,
                    paddingHorizontal: 14, borderRadius: 12, alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#DC2626', fontWeight: '700', fontSize: 13 }}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* BACK BUTTON */}
      <View style={{ position: 'absolute', bottom: 20, left: 16, right: 16 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: '#0A2540', padding: 16,
            borderRadius: 18, alignItems: 'center',
            flexDirection: 'row', justifyContent: 'center', gap: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>← Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
