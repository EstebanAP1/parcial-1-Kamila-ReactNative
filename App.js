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
      <View style={gradesStyles.container}>
        <Text style={gradesStyles.text}>Celcius to Fahrenheit converter!</Text>

        <Text style={(gradesStyles.text, { fontSize: 13, marginTop: 5 })}>
          Enter the temperature in Celsius:
        </Text>
        <TextInput
          style={gradesStyles.textInput}
          value={celsius}
          onChangeText={setCelsius}
          keyboardType='numeric'
          contextMenuHidden={true}
        />

        <Pressable style={gradesStyles.pressable} onPress={handlePress}>
          <Text style={gradesStyles.pressableText}>Convert</Text>
        </Pressable>

        <Text style={gradesStyles.text}>
          Grades: <Text style={{ color: '#007AFF' }}>{fahrenheit}</Text>{' '}
          Fahrenheit
        </Text>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    </DismissKeyboard>
  )
}

const gradesStyles = StyleSheet.create({
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

function SizeScreen() {
  const [milimeters, setMiliterms] = useState('')
  const [centimeters, setCentimeters] = useState('')
  const [meters, setMeters] = useState('')
  const [kilometers, setKilometers] = useState('')

  const handleMilimetersPress = () => {
    if (!milimeters) {
      setCentimeters('')
      setMeters('')
      setKilometers('')
      return
    }
    setCentimeters((milimeters * 0.1).toString())
    setMeters((milimeters * 0.001).toString())
    setKilometers((milimeters / 1000000).toString())
  }

  const handleCentimetersPress = () => {
    if (!centimeters) {
      setMiliterms('')
      setMeters('')
      setKilometers('')
      return
    }
    setKilometers((centimeters / 100000).toString())
    setMeters((centimeters * 0.01).toString())
    setMiliterms((centimeters * 10).toString())
  }

  const handleMetersPress = () => {
    if (!meters) {
      setMiliterms('')
      setCentimeters('')
      setKilometers('')
      return
    }
    setKilometers((meters * 0.001).toString())
    setCentimeters((meters * 100).toString())
    setMiliterms((meters * 1000).toString())
  }

  const handleKilometersPress = () => {
    if (!kilometers) {
      setMiliterms('')
      setCentimeters('')
      setMeters('')
      return
    }

    setMeters((kilometers * 1000).toString())
    setCentimeters((kilometers * 100000).toString())
    setMiliterms((kilometers * 1000000).toString())
  }

  return (
    <DismissKeyboard>
      <View style={sizeStyles.container}>
        <Text style={sizeStyles.text}>
          Write and press enter to convert your value to every others!
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%'
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Text style={sizeStyles.text}>Milimeters:</Text>
            <TextInput
              style={sizeStyles.textInput}
              value={milimeters}
              onChangeText={setMiliterms}
              keyboardType='numeric'
              contextMenuHidden={true}
            />
            <Pressable
              style={gradesStyles.pressable}
              onPress={handleMilimetersPress}>
              <Text style={gradesStyles.pressableText}>Convert</Text>
            </Pressable>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Text style={sizeStyles.text}>Centimeters:</Text>
            <TextInput
              style={sizeStyles.textInput}
              value={centimeters}
              onChangeText={setCentimeters}
              keyboardType='numeric'
              contextMenuHidden={true}
            />
            <Pressable
              style={gradesStyles.pressable}
              onPress={handleCentimetersPress}>
              <Text style={gradesStyles.pressableText}>Convert</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%'
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Text style={sizeStyles.text}>Meters:</Text>
            <TextInput
              style={sizeStyles.textInput}
              value={meters}
              onChangeText={setMeters}
              keyboardType='numeric'
              contextMenuHidden={true}
            />
            <Pressable
              style={gradesStyles.pressable}
              onPress={handleMetersPress}>
              <Text style={gradesStyles.pressableText}>Convert</Text>
            </Pressable>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Text style={sizeStyles.text}>Kilometers:</Text>
            <TextInput
              style={sizeStyles.textInput}
              value={kilometers}
              onChangeText={setKilometers}
              keyboardType='numeric'
              contextMenuHidden={true}
            />
            <Pressable
              style={gradesStyles.pressable}
              onPress={handleKilometersPress}>
              <Text style={gradesStyles.pressableText}>Convert</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </DismissKeyboard>
  )
}

const sizeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Ddd',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontSize: 13
  },
  textInput: {
    width: 150,
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
