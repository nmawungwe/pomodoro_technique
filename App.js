import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';


class Counter extends React.Component {
  constructor(){
    super()
    this.state = {
      count: 120,
      display_timer: {},
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.dinc, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

    // // https://stackoverflow.com/questions/51695887/countdown-timer-in-react-native
  componentDidUpdate(){
    if(this.state.count === 0){
      clearInterval(this.interval)
    }
  }

  secondsToTime(secs){

    let hours = Math.floor(secs / (60 * 60))

    let divisor_for_mins = secs % (60 * 60)
    let mins = Math.floor(divisor_for_mins / 60)

    let divisor_for_seconds = divisor_for_mins % 60
    let seconds = Math.ceil(divisor_for_seconds)

    let obj = {
      'h': hours,
      'm': mins,
      's': seconds 
    };

    return obj
  }

  dinc = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
      display_timer: this.secondsToTime(prevState.count - 1)
    }))
  }



  render(){ 
          return (
              <View>
                <Text>{this.state.display_timer.m}:{this.state.display_timer.s}</Text>
              </View>
              )
        }
}


export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
       showCounter: true
    }
  }

  toggleCounter = () => this.setState(prevState => ({
    showCounter: !prevState.showCounter
  }))


  pause = () => {
    Alert.alert('This is going to be a pause button')
  }

  stop = () => {
      Alert.alert('This is going to be a stop button')
  }


  render(){
            if(this.state.showCounter){
                return (
                        <View style={styles.container}>
                          <Counter />
                            <View style={styles.buttonContainer}>
                              <Button 
                                title="Start"
                                onPress={this.toggleCounter}
                              />
                              <Button  
                                title="Pause"
                                onPress={this.pause}
                              />
                              <Button 
                                title="Stop"
                                onPress={this.stop}
                              />
                          </View>
                        </View>
                      )
            } else {
                      return (
                          <View style={styles.container}>
                            <View style={styles.buttonContainer}>
                              <Button 
                                title="Start"
                                onPress={this.toggleCounter}
                              />
                              <Button  
                                title="Pause"
                                onPress={this.pause}
                              />
                              <Button 
                                title="Stop"
                                onPress={this.stop}
                              />
                            </View>
                          </View>
                            )
            }
          }
        }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
