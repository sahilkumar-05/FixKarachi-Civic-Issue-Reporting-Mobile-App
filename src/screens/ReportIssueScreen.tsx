import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Image, Alert, ScrollView, StatusBar,
} from 'react-native';

import { useIssues } from '../context/IssueContext';
import { openCamera } from '../services/imagePicker';

const CATEGORIES = ['Road', 'Water', 'Sewage', 'Electricity', 'Garbage', 'Other'];

export default function ReportIssueScreen() {
  const { addIssue } = useIssues();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const takePhoto = () => {
    openCamera(setImage);
  };

  const submit = () => {
    if (!title) {
      Alert.alert('Missing Title', 'Please enter a title for the issue.');
      return;
    }

    addIssue({
      title,
      description,
      location,
      image,
      category: selectedCategory,
    });

    Alert.alert('Issue Reported! 🚀', 'Your report has been submitted to the community.', [
      { text: 'Great!', style: 'default' },
    ]);

    setTitle('');
    setDescription('');
    setLocation('');
    setImage(null);
    setSelectedCategory('');
  };

  const isFormReady = title.length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F4F8' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2540" />

      {/* HEADER */}
      <View style={{
        backgroundColor: '#0A2540', paddingHorizontal: 18,
        paddingTop: 16, paddingBottom: 20,
      }}>
        <Text style={{ fontSize: 12, color: '#64B5A0', fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' }}>
          Civic Report
        </Text>
        <Text style={{ fontSize: 24, fontWeight: '800', color: '#FFFFFF', marginTop: 2 }}>
          Report an Issue
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* CATEGORY SELECTOR */}
        <Text style={sectionLabel}>Issue Category</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
              style={[
                categoryChip,
                selectedCategory === cat && categoryChipActive,
              ]}
            >
              <Text style={[categoryChipText, selectedCategory === cat && categoryChipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TITLE */}
        <Text style={sectionLabel}>Issue Title *</Text>
        <View style={[inputWrapper, focusedField === 'title' && inputFocused]}>
          <TextInput
            placeholder="e.g. Broken Road at Gulshan Block 7"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#9CA3AF"
            style={inputStyle}
            onFocus={() => setFocusedField('title')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        {/* DESCRIPTION */}
        <Text style={sectionLabel}>Description</Text>
        <View style={[inputWrapper, { minHeight: 110 }, focusedField === 'desc' && inputFocused]}>
          <TextInput
            placeholder="Describe the issue in detail — how long it's been there, how it affects people..."
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#9CA3AF"
            style={[inputStyle, { paddingTop: 4 }]}
            onFocus={() => setFocusedField('desc')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        {/* LOCATION */}
        <Text style={sectionLabel}>Location</Text>
        <View style={[inputWrapper, focusedField === 'loc' && inputFocused]}>
          <Text style={{ fontSize: 16, marginRight: 8 }}>📍</Text>
          <TextInput
            placeholder="e.g. Clifton Block 5, near the petrol pump"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#9CA3AF"
            style={[inputStyle, { flex: 1 }]}
            onFocus={() => setFocusedField('loc')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        {/* PHOTO SECTION */}
        <Text style={sectionLabel}>Photo Evidence</Text>

        {image ? (
          <View style={{ marginBottom: 18 }}>
            <Image
              source={{ uri: image }}
              style={{ width: '100%', height: 220, borderRadius: 16 }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => setImage(null)}
              style={removePhotoBtn}
            >
              <Text style={{ color: '#DC2626', fontWeight: '700', fontSize: 13 }}>✕ Remove Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={takePhoto} style={photoPickerStyle}>
            <Text style={{ fontSize: 36, marginBottom: 10 }}>📷</Text>
            <Text style={{ color: '#0A2540', fontWeight: '700', fontSize: 15 }}>Capture Photo</Text>
            <Text style={{ color: '#9CA3AF', fontSize: 13, marginTop: 4 }}>Tap to open camera</Text>
          </TouchableOpacity>
        )}

        {/* SUBMIT */}
        <TouchableOpacity
          onPress={submit}
          style={[submitBtn, !isFormReady && submitBtnDisabled]}
          activeOpacity={isFormReady ? 0.85 : 1}
        >
          <Text style={{ color: '#fff', fontSize: 17, fontWeight: '800' }}>
            Submit Report →
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 12, marginTop: 12 }}>
          Your report will be visible to the community
        </Text>
      </ScrollView>
    </View>
  );
}

const sectionLabel: any = {
  fontSize: 13, fontWeight: '700', color: '#374151',
  textTransform: 'uppercase', letterSpacing: 0.8,
  marginBottom: 8,
};
const inputWrapper: any = {
  backgroundColor: '#FFFFFF', borderRadius: 14,
  borderWidth: 1.5, borderColor: '#E5E7EB',
  paddingHorizontal: 14, paddingVertical: 14,
  marginBottom: 18, flexDirection: 'row', alignItems: 'flex-start',
};
const inputFocused: any = { borderColor: '#1A6B52', backgroundColor: '#F0FAF6' };
const inputStyle: any = { fontSize: 15, color: '#111827', flex: 1 };
const categoryChip: any = {
  paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
  backgroundColor: '#E5E7EB', borderWidth: 1.5, borderColor: '#E5E7EB',
};
const categoryChipActive: any = { backgroundColor: '#E8F5F0', borderColor: '#1A6B52' };
const categoryChipText: any = { fontSize: 13, color: '#374151', fontWeight: '600' };
const categoryChipTextActive: any = { color: '#1A6B52' };
const photoPickerStyle: any = {
  backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 2,
  borderColor: '#E5E7EB', borderStyle: 'dashed',
  paddingVertical: 32, alignItems: 'center', marginBottom: 18,
};
const removePhotoBtn: any = {
  position: 'absolute', top: 10, right: 10,
  backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
  shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, elevation: 2,
};
const submitBtn: any = {
  backgroundColor: '#0A2540', paddingVertical: 18,
  borderRadius: 18, alignItems: 'center',
};
const submitBtnDisabled: any = { backgroundColor: '#9CA3AF' };
