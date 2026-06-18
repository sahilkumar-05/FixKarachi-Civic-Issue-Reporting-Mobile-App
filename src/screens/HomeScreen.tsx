import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StatusBar, TextInput,
} from 'react-native';

import { useIssues } from '../context//IssueContext';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const PRIORITY_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  CRITICAL: { color: '#DC2626', bg: '#FEF2F2', label: '🔴 Critical' },
  HIGH:     { color: '#D97706', bg: '#FFFBEB', label: '🟠 High' },
  MEDIUM:   { color: '#2563EB', bg: '#EFF6FF', label: '🔵 Medium' },
  LOW:      { color: '#059669', bg: '#ECFDF5', label: '🟢 Low' },
};

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  Pending:       { color: '#92400E', bg: '#FEF3C7' },
  'In Progress': { color: '#1E40AF', bg: '#DBEAFE' },
  Resolved:      { color: '#065F46', bg: '#D1FAE5' },
};

const CATEGORY_ICONS: Record<string, string> = {
  Road: '🛣️', Water: '💧', Sewage: '🚰', Electricity: '⚡', Garbage: '🗑️', Other: '📌',
};

export default function HomeScreen() {
  const { issues, upvote } = useIssues();
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Pending', 'In Progress', 'Resolved'];

  const filtered = issues.filter(issue => {
    const matchSearch = issue.title?.toLowerCase().includes(search.toLowerCase()) ||
      issue.location?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || issue.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'Pending').length,
    resolved: issues.filter(i => i.status === 'Resolved').length,
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F9FC' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2540" />

      {/* HEADER */}
      <View style={headerStyle}>
        <View>
          <Text style={{ fontSize: 11, color: '#64B5A0', fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Fix Karachi
          </Text>
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginTop: 2, letterSpacing: -0.3 }}>
            Community Issues
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Admin')}
            style={adminBtnStyle}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 12 }}>⚙️ Admin</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* STATS ROW */}
      {issues.length > 0 && (
        <View style={statsRowStyle}>
          {[
            { label: 'Total Issues', value: stats.total, color: '#0A2540', icon: '📋', bg: '#EEF0F4' },
            { label: 'Pending', value: stats.pending, color: '#D97706', icon: '⏳', bg: '#FFFBEB' },
            { label: 'Resolved', value: stats.resolved, color: '#059669', icon: '✅', bg: '#ECFDF5' },
          ].map(s => (
            <View key={s.label} style={[statCardStyle, { backgroundColor: s.bg }]}>
              <Text style={{ fontSize: 18 }}>{s.icon}</Text>
              <Text style={{ fontSize: 20, fontWeight: '800', color: s.color, marginTop: 4 }}>{s.value}</Text>
              <Text style={{ fontSize: 10, color: '#6B7280', marginTop: 2, fontWeight: '600' }}>{s.label}</Text>
            </View>
          ))}
        </View>
      )}

      {/* SEARCH */}
      <View style={searchContainerStyle}>
        <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
        <TextInput
          placeholder="Search issues or locations..."
          placeholderTextColor="#B0B8C4"
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1, fontSize: 15, color: '#0A2540', fontWeight: '500' }}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} style={{ padding: 4 }}>
            <Text style={{ color: '#B0B8C4', fontSize: 16 }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* FILTERS */}
      <FlatList
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={f => f}
        contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 6, gap: 8 }}
        renderItem={({ item }) => {
          const count = item === 'All' ? issues.length : issues.filter(i => i.status === item).length;
          return (
            <TouchableOpacity
              onPress={() => setActiveFilter(item)}
              style={[filterChipStyle, activeFilter === item && filterChipActiveStyle]}
            >
              <Text style={[filterChipTextStyle, activeFilter === item && filterChipTextActiveStyle]}>
                {item}
              </Text>
              <View style={[countBadgeStyle, activeFilter === item && countBadgeActiveStyle]}>
                <Text style={[countTextStyle, activeFilter === item && countTextActiveStyle]}>
                  {count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* ISSUE LIST */}
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 40, paddingTop: 4 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={emptyStateStyle}>
            <Text style={{ fontSize: 56, marginBottom: 16 }}>
              {issues.length === 0 ? '🏙️' : '🔍'}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#0A2540', marginBottom: 8 }}>
              {issues.length === 0 ? 'No Issues Yet' : 'No Results Found'}
            </Text>
            <Text style={{ fontSize: 14, color: '#8C96A4', textAlign: 'center', lineHeight: 22 }}>
              {issues.length === 0
                ? 'Be the first to report a civic issue in your neighbourhood.'
                : 'Try adjusting your search or filter.'}
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const priority = PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG.LOW;
          const status = STATUS_CONFIG[item.status] || STATUS_CONFIG.Pending;
          const catIcon = CATEGORY_ICONS[item.category || ''] || '';

          return (
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => navigation.navigate('IssueDetails', { issueId: item.id })}
              style={issueCardStyle}
            >
              {/* Priority stripe */}
              <View style={{ height: 3, backgroundColor: priority.color, borderRadius: 2, marginBottom: 14 }} />

              {/* Title Row */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#0A2540', flex: 1, marginRight: 10, lineHeight: 22 }}>
                  {item.title}
                </Text>
                <View style={[badgeStyle, { backgroundColor: priority.bg }]}>
                  <Text style={{ fontSize: 11, color: priority.color, fontWeight: '700' }}>{priority.label}</Text>
                </View>
              </View>

              {/* Category + Location row */}
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                {item.category ? (
                  <View style={categoryBadgeStyle}>
                    <Text style={{ fontSize: 12, color: '#7C3AED', fontWeight: '600' }}>
                      {catIcon} {item.category}
                    </Text>
                  </View>
                ) : null}
                {item.location ? (
                  <View style={locationBadgeStyle}>
                    <Text style={{ fontSize: 12, color: '#4338CA' }}>📍 {item.location}</Text>
                  </View>
                ) : null}
              </View>

              {/* Description */}
              {item.description ? (
                <Text style={{ fontSize: 13, color: '#8C96A4', marginTop: 10, lineHeight: 20 }} numberOfLines={2}>
                  {item.description}
                </Text>
              ) : null}

              {/* Image */}
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={{ width: '100%', height: 175, borderRadius: 14, marginTop: 12 }}
                  resizeMode="cover"
                />
              )}

              {/* Bottom Row */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 8 }}>
                <View style={[badgeStyle, { backgroundColor: status.bg, flex: 1 }]}>
                  <Text style={{ fontSize: 12, color: status.color, fontWeight: '700' }}>● {item.status}</Text>
                </View>
                <View style={[badgeStyle, { backgroundColor: '#F3F4F6' }]}>
                  <Text style={{ fontSize: 12, color: '#374151', fontWeight: '700' }}>▲ {item.votes} votes</Text>
                </View>
              </View>

              {/* Action row */}
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                <TouchableOpacity
                  onPress={() => upvote(item.id)}
                  style={upvoteBtnStyle}
                >
                  <Text style={{ color: '#0A2540', fontWeight: '800', fontSize: 13 }}>
                    👍 Support
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('IssueDetails', { issueId: item.id })}
                  style={detailsBtnStyle}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 13 }}>
                    View Details →
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            
          );
        }}
      />
    </View>
  );
}

// Style objects
const headerStyle: any = {
  paddingHorizontal: 18, paddingTop: 18, paddingBottom: 22,
  backgroundColor: '#0A2540',
  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
};
const adminBtnStyle: any = {
  backgroundColor: '#1A3A5C',
  paddingHorizontal: 14, paddingVertical: 8,
  borderRadius: 20, borderWidth: 1, borderColor: '#2A4A6C',
};
const statsRowStyle: any = {
  flexDirection: 'row', gap: 10,
  marginHorizontal: 14, marginTop: 16,
};
const statCardStyle: any = {
  flex: 1, alignItems: 'center', paddingVertical: 14,
  borderRadius: 16,
};
const searchContainerStyle: any = {
  flexDirection: 'row', alignItems: 'center',
  backgroundColor: '#FFFFFF', borderRadius: 16,
  marginHorizontal: 14, marginTop: 14, marginBottom: 12,
  paddingHorizontal: 16, paddingVertical: 13,
  borderWidth: 1.5, borderColor: '#EEF0F4',
  shadowColor: '#0A2540', shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
};
const filterChipStyle: any = {
  flexDirection: 'row', alignItems: 'center', gap: 6,
  paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
  backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#EEF0F4',
};
const filterChipActiveStyle: any = { backgroundColor: '#0A2540', borderColor: '#0A2540' };
const filterChipTextStyle: any = { fontSize: 13, color: '#6B7280', fontWeight: '700' };
const filterChipTextActiveStyle: any = { color: '#FFFFFF' };
const countBadgeStyle: any = {
  backgroundColor: '#EEF0F4', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 10,
};
const countBadgeActiveStyle: any = { backgroundColor: '#1A3A5C' };
const countTextStyle: any = { fontSize: 11, color: '#6B7280', fontWeight: '700' };
const countTextActiveStyle: any = { color: '#FFFFFF' };
const emptyStateStyle: any = {
  alignItems: 'center', paddingVertical: 70, paddingHorizontal: 24,
};
const issueCardStyle: any = {
  backgroundColor: '#FFFFFF', borderRadius: 20, marginBottom: 14,
  padding: 16,
  shadowColor: '#0A2540', shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
  borderWidth: 1, borderColor: '#EEF0F4',
};
const badgeStyle: any = {
  paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, alignSelf: 'flex-start',
};
const categoryBadgeStyle: any = {
  backgroundColor: '#F5F3FF', paddingHorizontal: 10, paddingVertical: 5,
  borderRadius: 999, alignSelf: 'flex-start',
};
const locationBadgeStyle: any = {
  backgroundColor: '#EEF2FF', paddingHorizontal: 10, paddingVertical: 5,
  borderRadius: 999, alignSelf: 'flex-start',
};
const upvoteBtnStyle: any = {
  flex: 1, paddingVertical: 11, borderRadius: 14,
  alignItems: 'center', backgroundColor: '#F0FAF6',
  borderWidth: 1.5, borderColor: '#1A6B52',
};
const detailsBtnStyle: any = {
  flex: 1.5, paddingVertical: 11, borderRadius: 14,
  alignItems: 'center', backgroundColor: '#0A2540',
};