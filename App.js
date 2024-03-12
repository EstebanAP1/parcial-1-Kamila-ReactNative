import { StatusBar } from 'expo-status-bar'
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Pressable,
  TextInput
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useState } from 'react'

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name='Grades Converter' component={GradesScreen} />
        <Tab.Screen name='Size Converter' component={SizeScreen} />
      </Tab.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Ddd',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  text: {
    fontSize: 20,
    color: 'black'
  },
  textInput: {
    width: 190,
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 35,
    backgroundColor: '#09f',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
  },
  pressableText: {
    color: '#fff'
  }
})

function GradesScreen() {
  const [celsius, setCelsius] = useState()
  const [error, setError] = useState('')

  const [fahrenheit, setFahrenheit] = useState(0)

  const handlePress = () => {
    if (!celsius) {
      setError('Please enter a number')
      setFahrenheit(0)
      return
    }
    setError(false)
    const result = (celsius * 9) / 5 + 32
    setFahrenheit(result)
  }
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.text}>Celcius to Fahrenheit converter!</Text>

        <Text style={(styles.text, { fontSize: 13, marginTop: 5 })}>
          Enter the temperature in Celsius:
        </Text>
        <TextInput
          style={styles.textInput}
          value={celsius}
          onChangeText={setCelsius}
          keyboardType='numeric'
          contextMenuHidden={true}
        />

        <Pressable style={styles.pressable} onPress={handlePress}>
          <Text style={styles.pressableText}>Convert</Text>
        </Pressable>

        <Text style={styles.text}>
          Grades: <Text style={{ color: '#007AFF' }}>{fahrenheit}</Text>{' '}
          Fahrenheit
        </Text>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    </DismissKeyboard>
  )
}

function SizeScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
    </View>
  )
}
