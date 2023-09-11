import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../styles/global';

export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={globalStyles.backArrow}>
      <Icon
        name="arrow-left"
        size={24}
        color='black'
      />
    </TouchableOpacity>
  );
};