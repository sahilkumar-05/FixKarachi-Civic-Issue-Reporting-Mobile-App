import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
}: CustomButtonProps) {
  const btnStyle = [
    styles.base,
    fullWidth && styles.fullWidth,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'danger' && styles.danger,
    variant === 'ghost' && styles.ghost,
    (disabled || loading) && styles.disabled,
  ];

  const textStyle = [
    styles.text,
    variant === 'secondary' && styles.textSecondary,
    variant === 'ghost' && styles.textGhost,
    variant === 'danger' && styles.textDanger,
  ];

  return (
    <TouchableOpacity
      style={btnStyle}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#0A2540'} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 20,
  },
  fullWidth: { width: '100%' },
  primary: { backgroundColor: '#0A2540' },
  secondary: { backgroundColor: '#E8F5F0', borderWidth: 1.5, borderColor: '#1A6B52' },
  danger: { backgroundColor: '#FEE2E2', borderWidth: 1.5, borderColor: '#DC2626' },
  ghost: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#E5E7EB' },
  disabled: { opacity: 0.5 },
  text: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  textSecondary: { color: '#1A6B52' },
  textGhost: { color: '#374151' },
  textDanger: { color: '#DC2626' },
});
