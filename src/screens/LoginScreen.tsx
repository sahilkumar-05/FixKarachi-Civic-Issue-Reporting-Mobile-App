import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      Alert.alert('Missing Fields', 'Please fill all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    const success = login(trimmedEmail, password);

    if (success) {
      navigation.replace('Main');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>🏙️</Text>
          </View>
          <Text style={styles.appName}>Fix Karachi</Text>
          <Text style={styles.tagline}>Report · Vote · Resolve</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Welcome back 👋</Text>
          <Text style={styles.subHeading}>Sign in to your account</Text>

          <View style={[styles.inputWrapper, focusedField === 'email' && styles.inputFocused]}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#B0B8C4"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View style={[styles.inputWrapper, focusedField === 'password' && styles.inputFocused]}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              placeholder="Password"
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

          <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In  →</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.secondaryButtonText}>Create a new account</Text>
          </TouchableOpacity>

          {/* Admin shortcut */}
          <TouchableOpacity
            style={styles.adminLink}
            onPress={() => navigation.navigate('Admin')}
          >
            <Text style={styles.adminLinkText}>⚙️ Admin Panel</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>Serving the citizens of Karachi 🤝</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },

  heroBanner: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: '#0A2540',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  logoIcon: { fontSize: 34 },
  appName: { fontSize: 32, fontWeight: '800', color: '#0A2540', letterSpacing: -0.5 },
  tagline: {
    fontSize: 12, color: '#1A6B52', marginTop: 6,
    letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFFFFF', borderRadius: 28, padding: 28,
    shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08, shadowRadius: 20, elevation: 8,
    borderWidth: 1, borderColor: '#EEF0F4',
  },
  heading: { fontSize: 26, fontWeight: '800', color: '#0A2540', textAlign: 'center' },
  subHeading: { fontSize: 14, color: '#8C96A4', textAlign: 'center', marginTop: 6, marginBottom: 28 },

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

  button: {
    height: 58, backgroundColor: '#0A2540', borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', marginTop: 6,
    shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.4 },

  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#EEF0F4' },
  dividerText: { marginHorizontal: 14, color: '#B0B8C4', fontSize: 13, fontWeight: '600' },

  secondaryButton: {
    height: 56, borderWidth: 1.5, borderColor: '#1A6B52',
    borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#F0FAF6',
  },
  secondaryButtonText: { color: '#1A6B52', fontSize: 15, fontWeight: '700' },

  adminLink: { alignItems: 'center', marginTop: 16, paddingVertical: 4 },
  adminLinkText: { color: '#B0B8C4', fontSize: 13, fontWeight: '600' },

  footerText: { textAlign: 'center', marginTop: 28, color: '#B0B8C4', fontSize: 13 },
});

