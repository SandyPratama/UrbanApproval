import { StyleSheet } from 'react-native';
import Colors from 'helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  eye: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5,
    top: 150
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    marginHorizontal: 40,
    padding: 20,
  },
  
});

export default styles;
