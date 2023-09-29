import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#e1e8ee'
  },
  teamInput: {
    borderWidth: 4,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginBottom: 18
  },
  playerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
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
  dialogContainer: {
    borderRadius: 15,
    elevation: 5
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
    flex: 1
  },
  buttonSaveTeam: {
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden'
  },
  teamName: {
    fontWeight: 'normal'
  },
  screenTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    marginBottom: 15
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 7,
    textAlign: 'center'
  },
  backArrow: {
    position: 'absolute',
    marginTop: 10,
    left: 10,
    color: 'white',
    zIndex: 1,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5
  },
  profileInfo: {
    marginLeft: 10,
    marginRight: 6
  },
  profileDivider: {
    backgroundColor: 'gray',
    marginVertical: 5,
  },
  eyeIcon: {
    marginRight: 0
  },
  entryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
  entryInput: {
    flex: 1,
    fontSize: 16,
  },
  form: {
    paddingTop: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '100%'
  },
  roundButton: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  smallRoundButton: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  addPlayerIcon: {
    marginRight: 10
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  cardContainer: {
    borderRadius: 15,
    elevation: 5
  }
});