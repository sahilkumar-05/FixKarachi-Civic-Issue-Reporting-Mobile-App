import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

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

interface IssueCardProps {
  item: any;
  onUpvote: (id: string) => void;
  onPress?: (id: string) => void;
}

export default function IssueCard({ item, onUpvote, onPress }: IssueCardProps) {
  const priority = PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG.LOW;
  const status = STATUS_CONFIG[item.status] || STATUS_CONFIG.Pending;

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={() => onPress?.(item.id)}
      style={{
        backgroundColor: '#FFFFFF', borderRadius: 18, marginBottom: 14,
        padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07, shadowRadius: 10, elevation: 4,
      }}
    >
      {/* Priority stripe */}
      <View style={{ height: 4, backgroundColor: priority.color, borderRadius: 2, marginBottom: 12 }} />

      {/* Title Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: 16, fontWeight: '800', color: '#0A2540', flex: 1, marginRight: 8 }}>
          {item.title}
        </Text>
        <View style={{ backgroundColor: priority.bg, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 }}>
          <Text style={{ fontSize: 11, color: priority.color, fontWeight: '700' }}>{priority.label}</Text>
        </View>
      </View>

      {/* Location */}
      {item.location ? (
        <View style={{ backgroundColor: '#EEF2FF', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, alignSelf: 'flex-start', marginTop: 8 }}>
          <Text style={{ fontSize: 12, color: '#4338CA' }}>📍 {item.location}</Text>
        </View>
      ) : null}

      {/* Image */}
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: 180, borderRadius: 12, marginTop: 10 }}
          resizeMode="cover"
        />
      )}

      {/* Status Row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 8 }}>
        <View style={{ backgroundColor: status.bg, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, flex: 1 }}>
          <Text style={{ fontSize: 12, color: status.color, fontWeight: '600' }}>● {item.status}</Text>
        </View>
        <View style={{ backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 }}>
          <Text style={{ fontSize: 12, color: '#374151', fontWeight: '600' }}>▲ {item.votes}</Text>
        </View>
      </View>

      {/* Upvote */}
      <TouchableOpacity
        onPress={() => onUpvote(item.id)}
        style={{ marginTop: 12, backgroundColor: '#0A2540', paddingVertical: 13, borderRadius: 14, alignItems: 'center' }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 14 }}>👍 Verify & Support</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
