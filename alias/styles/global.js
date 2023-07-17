import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  teamInput: {
    borderWidth: 4,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginBottom: 18
  },
  playerInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginBottom: 7
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  dialogButton: {
    alignSelf: 'center',
    marginTop: 20,
    width: 120,
    height: 60
  },
  dialogTitleContainer: {
    alignItems: 'center'
  },
  dialogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dialogScoreContainer: {
    paddingTop: 10,
    flexDirection: 'row'
  },
  dialogScoreText: {
    fontWeight: 'bold',
    paddingRight: 5,
    fontSize: 17
  },
  dialogAnswersContainer: {
    flex: 1,
    alignItems: 'center'
  },
  dialogAnswersText: {
    fontWeight: 'bold',
    fontSize: 17
  },
  buttonsAddResetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonAdd: {
    flex: 1,
    marginRight: 10
  },
  buttonResetDel: {
    flex: 1,
  },
  buttonSaveTeam: {
    marginTop: 15
  },
  teamName: {
    fontWeight: 'normal'
  }
});