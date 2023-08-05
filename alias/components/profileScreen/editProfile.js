import React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import { Text, Icon } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';
import { globalStyles } from '../../styles/global';

export default function EditProfile({ isEditing, value, onChangeText, onSave, onEdit, label, errorText }) {
  return (
    <View>
      <View style={globalStyles.profileRow}>
        <Icon name="account-circle" type="material-community" size={24} />
        {isEditing ? (
          <>
            <TextInput
              style={styles.editInput}
              value={value}
              onChangeText={onChangeText}
            />
            <TouchableHighlight onPress={onSave} underlayColor="transparent">
              <Icon
                name="check-circle"
                type="material-community"
                size={28}
                color={'#6e88a1'}
              />
            </TouchableHighlight>
          </>
        ) : (
          <>
            <Text style={globalStyles.profileInfo}>{label}</Text>
            <TouchableHighlight onPress={onEdit} underlayColor="transparent">
              <Icon
                name="pencil"
                type="material-community"
                size={24}
                color={'#6e88a1'}
              />
            </TouchableHighlight>
          </>
        )}
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  editInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    marginTop: 3,
    fontSize: 12,
    marginLeft: 35
  }
});