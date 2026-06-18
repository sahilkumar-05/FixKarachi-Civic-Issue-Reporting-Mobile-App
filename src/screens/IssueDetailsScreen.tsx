import React from 'react';
import {
  View, Text, ScrollView, Image,
  StatusBar, TouchableOpacity,
} from 'react-native';
import { useIssues } from '../context/IssueContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  Pending:       { color: '#92400E', bg: '#FEF3C7' },
  'In Progress': { color: '#1E40AF', bg: '#DBEAFE' },
  Resolved:      { color: '#065F46', bg: '#D1FAE5' },
};

const PRIORITY_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  CRITICAL: { color: '#DC2626', bg: '#FEF2F2', label: '🔴 Critical' },
  HIGH:     { color: '#D97706', bg: '#FFFBEB', label: '🟠 High' },
  MEDIUM:   { color: '#2563EB', bg: '#EFF6FF', label: '🔵 Medium' },
  LOW:      { color: '#059669', bg: '#ECFDF5', label: '🟢 Low' },
};

export default function IssueDetailsScreen() {
  const { issues, upvote } = useIssues();
  const navigation = useNavigation();
  const route = useRoute<any>();

  const issueId = route.params?.issueId;
  const item = issues.find((i: any) => i.id === issueId);

  if (!item) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 44, marginBottom: 12 }}>🔍</Text>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#0A2540' }}>Issue Not Found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ color: '#1A6B52', fontWeight: '600' }}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const priority = PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG.LOW;
  const status = STATUS_CONFIG[item.status] || STATUS_CONFIG.Pending;

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F4F8' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2540" />

      {/* HEADER */}
      <View style={{ backgroundColor: '#0A2540', paddingHorizontal: 18, paddingTop: 16, paddingBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 12 }}>
          <Text style={{ color: '#64B5A0', fontWeight: '600' }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 12, color: '#64B5A0', fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' }}>
          Issue Details
        </Text>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#FFFFFF', marginTop: 2 }} numberOfLines={2}>
          {item.title}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>

        {/* Image */}
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={{ width: '100%', height: 220, borderRadius: 18, marginBottom: 16 }}
            resizeMode="cover"
          />
        ) : (
          <View style={{
            width: '100%', height: 160, borderRadius: 18, marginBottom: 16,
            backgroundColor: '#E8EFF7', justifyContent: 'center', alignItems: 'center',
          }}>
            <Text style={{ fontSize: 44 }}>🏙️</Text>
            <Text style={{ color: '#9CA3AF', marginTop: 8, fontSize: 13 }}>No photo attached</Text>
          </View>
        )}

        {/* Status & Priority */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          <View style={{ backgroundColor: status.bg, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, flex: 1, alignItems: 'center' }}>
            <Text style={{ color: status.color, fontWeight: '700', fontSize: 13 }}>● {item.status}</Text>
          </View>
          <View style={{ backgroundColor: priority.bg, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, flex: 1, alignItems: 'center' }}>
            <Text style={{ color: priority.color, fontWeight: '700', fontSize: 13 }}>{priority.label}</Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={{
          backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, marginBottom: 14,
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, elevation: 3,
        }}>
          {item.location ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
              <Text style={{ fontSize: 18, marginRight: 12 }}>📍</Text>
              <View>
                <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' }}>Location</Text>
                <Text style={{ fontSize: 15, color: '#111827', fontWeight: '600', marginTop: 2 }}>{item.location}</Text>
              </View>
            </View>
          ) : null}

          {item.category ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
              <Text style={{ fontSize: 18, marginRight: 12 }}>🏷️</Text>
              <View>
                <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' }}>Category</Text>
                <Text style={{ fontSize: 15, color: '#111827', fontWeight: '600', marginTop: 2 }}>{item.category}</Text>
              </View>
            </View>
          ) : null}

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, marginRight: 12 }}>▲</Text>
            <View>
              <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' }}>Community Votes</Text>
              <Text style={{ fontSize: 15, color: '#111827', fontWeight: '600', marginTop: 2 }}>{item.votes} people verified this issue</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        {item.description ? (
          <View style={{
            backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, marginBottom: 14,
            shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, elevation: 3,
          }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
              Description
            </Text>
            <Text style={{ fontSize: 15, color: '#374151', lineHeight: 24 }}>{item.description}</Text>
          </View>
        ) : null}

        {/* Upvote */}
        <TouchableOpacity
          onPress={() => upvote(item.id)}
          style={{ backgroundColor: '#0A2540', paddingVertical: 18, borderRadius: 18, alignItems: 'center' }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 16 }}>👍 Verify & Support This Issue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
