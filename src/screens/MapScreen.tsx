import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useIssues } from '../context/IssueContext';
import { View, Text, StatusBar } from 'react-native';

const PRIORITY_COLORS: Record<string, string> = {
  CRITICAL: '#DC2626',
  HIGH: '#D97706',
  MEDIUM: '#2563EB',
  LOW: '#059669',
};

export default function MapScreen() {
  const { issues } = useIssues();

  const issuesWithCoords = issues.filter(
    (i: any) => i.latitude && i.longitude,
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F4F8' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2540" />

      {/* HEADER */}
      <View style={{
        backgroundColor: '#0A2540', paddingHorizontal: 18,
        paddingTop: 16, paddingBottom: 20,
      }}>
        <Text style={{ fontSize: 12, color: '#64B5A0', fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' }}>
          Issue Map
        </Text>
        <Text style={{ fontSize: 24, fontWeight: '800', color: '#FFFFFF', marginTop: 2 }}>
          Karachi
        </Text>
      </View>

      {/* MAP PLACEHOLDER — swap with real MapView when coords are available */}
      <View style={{ flex: 1, backgroundColor: '#E8EFF7', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 60, marginBottom: 16 }}>🗺️</Text>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#0A2540', marginBottom: 8 }}>
          Map View
        </Text>
        <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', paddingHorizontal: 40 }}>
          Issue pins will appear here once location data is available.
        </Text>

        {/* Stats pill */}
        <View style={{
          flexDirection: 'row', gap: 16, marginTop: 24,
          backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1, elevation: 4,
        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#0A2540' }}>{issues.length}</Text>
            <Text style={{ fontSize: 11, color: '#6B7280' }}>Total</Text>
          </View>
          <View style={{ width: 1, backgroundColor: '#E5E7EB' }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#D97706' }}>
              {issues.filter((i: any) => i.status === 'Pending').length}
            </Text>
            <Text style={{ fontSize: 11, color: '#6B7280' }}>Pending</Text>
          </View>
          <View style={{ width: 1, backgroundColor: '#E5E7EB' }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#059669' }}>
              {issues.filter((i: any) => i.status === 'Resolved').length}
            </Text>
            <Text style={{ fontSize: 11, color: '#6B7280' }}>Resolved</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
