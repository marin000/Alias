import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TextInput, Alert } from 'react-native';
import { Button, Dialog, Text } from '@rneui/themed';
import { Rating } from 'react-native-ratings';
import { playGame } from '../../constants/playGameScreen';
import { globalStyles } from '../../styles/global';
import CustomDialogHeader from '../customDialogHeader';
import apiRating from '../../api/ratings';

export default function RatingDialog({ isVisible, onClose, language }) {
  const { rateGame, sendButton, commentTxt, ratingFeedbackTxt } = playGame;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(2.5);

  const handleSaveRating = () => {
    const data = {
      stars: rating,
      comment
    };
    apiRating.addNewRating(data)
      .then(() => {
        Alert.alert(
          ratingFeedbackTxt[language], '', [{
            text: 'OK',
            onPress: () => {
              onClose();
            }
          }]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Dialog overlayStyle={globalStyles.dialogContainer} isVisible={isVisible}>
      <CustomDialogHeader onClose={onClose} />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={globalStyles.dialogTitleContainer}>
          <Text style={globalStyles.dialogTitle}>{rateGame[language]}</Text>
        </View>
        <Rating
          imageSize={30}
          defaultRating={1}
          rating={rating}
          onFinishRating={(value) => setRating(value)}
        />
        <TextInput
          style={styles.comment}
          multiline
          numberOfLines={7}
          onChangeText={text => setComment(text)}
          value={comment}
          placeholder={commentTxt[language]}
          textAlignVertical='top'
          paddingLeft={15}
          paddingTop={5}
        />
        <Button
          containerStyle={styles.dialogButton}
          title={sendButton[language]}
          onPress={handleSaveRating}
          buttonStyle={globalStyles.roundButton}
        />
      </ScrollView>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialogButton: {
    ...globalStyles.dialogButton,
    width: 200
  },
  comment: {
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    borderColor: '#2089dc'
  }
});