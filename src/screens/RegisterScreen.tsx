import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert,
  StyleSheet, SafeAreaView, KeyboardAvoidingView,
  Platform, StatusBar, ScrollView,
} from 'react-native';

import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const registerUser = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !password) {
      Alert.alert('Missing Fields', 'Please fill all fields.');
      return;
    }

    if (trimmedName.length < 3) {
      Alert.alert('Invalid Name', 'Name must be at least 3 characters long.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    register(trimmedName, trimmedEmail, password);

    Alert.alert('Success 🎉', 'Account created successfully!', [
      { text: 'Sign In Now', onPress: () => navigation.goBack() },
    ]);
  };

  const fields = [
    { key: 'name', placeholder: 'Full Name', icon: '👤', value: name, setter: setName, options: { autoCapitalize: 'words' as const } },
    { key: 'email', placeholder: 'Email Address', icon: '✉️', value: email, setter: setEmail, options: { keyboardType: 'email-address' as const, autoCapitalize: 'none' as const, autoCorrect: false } },
  ];

  const getStrengthColor = () => {
    if (password.length < 4) return '#EF4444';
    if (password.length < 8) return '#F59E0B';
    return '#10B981';
  };

  const getStrengthLabel = () => {
    if (password.length === 0) return '';
    if (password.length < 4) return 'Weak';
    if (password.length < 8) return 'Fair';
    return 'Strong';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* Back Nav */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          {/* Hero */}
          <View style={styles.heroBanner}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoIcon}>🏙️</Text>
            </View>
            <Text style={styles.appName}>Fix Karachi</Text>
            <Text style={styles.tagline}>Join the community</Text>
          </View>

          <View style={styles.card}>
            {/* Progress Steps */}
            <View style={styles.progressRow}>
              {['Info', 'Security', 'Done'].map((step, idx) => (
                <View key={step} style={styles.progressStep}>
                  <View style={[styles.progressDot, idx === 0 && styles.progressDotActive]}>
                    <Text style={[styles.progressDotText, idx === 0 && styles.progressDotTextActive]}>
                      {idx + 1}
                    </Text>
                  </View>
                  {idx < 2 && <View style={styles.progressLine} />}
                </View>
              ))}
            </View>

            <Text style={styles.heading}>Create Account</Text>
            <Text style={styles.subHeading}>Start reporting civic issues today</Text>

            {fields.map(field => (
              <View
                key={field.key}
                style={[styles.inputWrapper, focusedField === field.key && styles.inputFocused]}
              >
                <Text style={styles.inputIcon}>{field.icon}</Text>
                <TextInput
                  placeholder={field.placeholder}
                  placeholderTextColor="#B0B8C4"
                  value={field.value}
                  onChangeText={field.setter}
                  style={styles.input}
                  onFocus={() => setFocusedField(field.key)}
                  onBlur={() => setFocusedField(null)}
                  {...field.options}
                />
              </View>
            ))}

            {/* Password field */}
            <View style={[styles.inputWrapper, focusedField === 'password' && styles.inputFocused]}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                placeholder="Password (min. 6 chars)"
                placeholderTextColor="#B0B8C4"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
              <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn}>
                <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>

            {/* Password strength */}
            {password.length > 0 && (
              <View style={styles.strengthRow}>
                {[1, 2, 3, 4].map(i => (
                  <View
                    key={i}
                    style={[
                      styles.strengthBar,
                      password.length >= i * 2 && { backgroundColor: getStrengthColor() },
                    ]}
                  />
                ))}
                <Text style={[styles.strengthLabel, { color: getStrengthColor() }]}>
                  {getStrengthLabel()}
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={registerUser}>
              <Text style={styles.buttonText}>Create Account →</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkBtn}>
              <Text style={styles.link}>Already have an account? Sign in</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
  container: { flex: 1 },
  scroll: { paddingHorizontal: 22, paddingVertical: 20, paddingBottom: 40 },

  backBtn: { marginBottom: 16 },
  backText: { color: '#1A6B52', fontSize: 15, fontWeight: '700' },

  heroBanner: { alignItems: 'center', marginBottom: 28 },
  logoCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#0A2540',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 8,
  },
  logoIcon: { fontSize: 28 },
  appName: { fontSize: 28, fontWeight: '800', color: '#0A2540', letterSpacing: -0.5 },
  tagline: { fontSize: 13, color: '#1A6B52', marginTop: 4, fontWeight: '600' },

  card: {
    backgroundColor: '#FFFFFF', borderRadius: 28, padding: 28,
    shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08, shadowRadius: 20, elevation: 8,
    borderWidth: 1, borderColor: '#EEF0F4',
  },

  progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  progressStep: { flexDirection: 'row', alignItems: 'center' },
  progressDot: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E5E7EB',
  },
  progressDotActive: { backgroundColor: '#0A2540', borderColor: '#0A2540' },
  progressDotText: { fontSize: 12, fontWeight: '700', color: '#B0B8C4' },
  progressDotTextActive: { color: '#FFFFFF' },
  progressLine: { width: 30, height: 2, backgroundColor: '#E5E7EB', marginHorizontal: 6 },

  heading: { fontSize: 26, fontWeight: '800', color: '#0A2540', textAlign: 'center' },
  subHeading: { fontSize: 14, color: '#8C96A4', textAlign: 'center', marginTop: 6, marginBottom: 24 },

  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', height: 58,
    backgroundColor: '#F7F9FC', borderWidth: 1.5, borderColor: '#EEF0F4',
    borderRadius: 16, paddingHorizontal: 16, marginBottom: 14,
  },
  inputFocused: { borderColor: '#1A6B52', backgroundColor: '#F0FAF6' },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#0A2540', fontWeight: '500' },
  eyeBtn: { padding: 4 },
  eyeIcon: { fontSize: 16 },

  strengthRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 18, marginTop: -4 },
  strengthBar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#EEF0F4' },
  strengthLabel: { fontSize: 11, fontWeight: '700', minWidth: 40, textAlign: 'right' },

  button: {
    height: 58, backgroundColor: '#0A2540', borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', marginTop: 6,
    shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.4 },

  linkBtn: { marginTop: 20, alignItems: 'center' },
  link: { color: '#1A6B52', fontWeight: '700', fontSize: 14 },
});