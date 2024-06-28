import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {insertActivity, initDatabase} from '../utils/database'; // Adjust the path
import {useNavigation} from '@react-navigation/native';

const bikeImage = require('../assets/bike.png');
const clockImage = require('../assets/clock.png');

export default function AddActivityScreen() {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [iconPath, setIconPath] = useState(bikeImage); // Initial icon path

  const navigation = useNavigation();

  // Initialize the database when component mounts
  useEffect(() => {
    initDatabase();
  }, []);

  const handleSaveActivity = async () => {
    if (!title || !startTime || !endTime || !iconPath) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    await insertActivity(title, startTime, endTime, iconPath);
    navigation.navigate('Home');
  };

  const showTimePicker = setTime => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          const hours = selectedDate.getHours().toString().padStart(2, '0');
          const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
          const formattedTime = `${hours}:${minutes}`;
          setTime(formattedTime);
        }
      },
      mode: 'time',
      is24Hour: true,
    });
  };

  return (
    <LinearGradient
      colors={['#041822', '#07262f']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Header />

      <View style={styles.inputContainer}>
        <ImageBackground
          source={require('../assets/edit_tect_background.png')}
          style={styles.inputBackground}>
          <TextInput
            style={styles.inputTitle}
            placeholder="Title"
            placeholderTextColor="#ccc"
            value={title}
            onChangeText={setTitle}
          />
        </ImageBackground>
        <ImageBackground
          source={require('../assets/edit_tect_background.png')}
          style={styles.inputBackground}>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="Start Time"
              placeholderTextColor="#ccc"
              value={startTime}
              editable={false}
            />
            <TouchableOpacity onPress={() => showTimePicker(setStartTime)}>
              <Image source={clockImage} style={styles.clockIcon} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <ImageBackground
          source={require('../assets/edit_tect_background.png')}
          style={styles.inputBackground}>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="End Time"
              placeholderTextColor="#ccc"
              value={endTime}
              editable={false}
            />
            <TouchableOpacity onPress={() => showTimePicker(setEndTime)}>
              <Image source={clockImage} style={styles.clockIcon} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>Set Icon</Text>
        <Image source={iconPath} style={styles.icon} />
      </View>

      <ImageBackground
        source={require('../assets/larg_edit_text_bg.png')}
        style={styles.largeInputBackground}>
        <TextInput
          style={styles.inputDescription}
          placeholder="Description"
          placeholderTextColor="#ccc"
          multiline={true}
        />
      </ImageBackground>

      <BottomNavigation
        screenName={'AddActivity'}
        onSave={handleSaveActivity}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 10,
    marginStart: 20,
    marginEnd: 20,
  },
  inputBackground: {
    borderRadius: 5,
    height: 90,
    width: 350,
    resizeMode: 'contain',
    paddingTop: 20,
    marginBottom: -25,
  },
  largeInputBackground: {
    borderRadius: 5,
    height: 350,
    width: 350,
    resizeMode: 'contain',
    paddingTop: 20,
    marginTop: 20,
    marginBottom: -25,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  input: {
    flex: 0.9,
    height: 50,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 18,
    marginStart: 50,
  },
  inputTitle: {
    flex: 1,
    height: 50,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 18,
    marginStart: 50,
    marginTop: -20,
    marginEnd: 50,
  },
  inputDescription: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 50,
    marginTop: 20,
    textAlignVertical: 'top',
  },
  clockIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginEnd: 40,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    marginTop: 20,
  },
  iconText: {
    fontSize: 18,
    color: '#fa617b',
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginEnd: 10,
  },
});
