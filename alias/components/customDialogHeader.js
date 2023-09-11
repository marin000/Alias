import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Icon } from '@rneui/base';
import { globalStyles } from '../styles/global';

export default function CustomDialogHeader({ onClose }) {
  return (
    <View style={globalStyles.dialogHeader}>
      <TouchableHighlight onPress={onClose} underlayColor="transparent">
        <Icon name="close" type="material-community" size={24} color="silver" />
      </TouchableHighlight>
    </View>
  );
}