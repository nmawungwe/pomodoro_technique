import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, Alert, Vibration} from 'react-native';

const Title = (props) => {
  return(
          <View>
                <Text style={styles.gen_font}>{props.title}</Text>
          </View>
  )
}



class Counter extends React.Component {
  constructor(){
    super()
    this.state = {
      count: 1500,
      display_timer: {},
      timer_count: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.dinc, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
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

     // // https://stackoverflow.com/questions/51695887/countdown-timer-in-react-native
  componentDidUpdate(){
  if(this.state.timer_count === 0 && this.state.count === 0){
    Vibration.vibrate()
    this.setState(prevState => ({
      count: prevState.count + 300,
      timer_count: prevState.timer_count + 1 
    }))
  } else if (this.state.timer_count === 1 && this.state.count === 0) {
    Vibration.vibrate()
    clearInterval(this.interval)
  }
}

  render(){
            return (
              <View>
                <Text style={styles.gen_font}>{this.state.display_timer.m}:{this.state.display_timer.s}</Text>
              </View>
              )
          }
        }



export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
       startCounter: true
    }
  }

  toggleCounter = () => this.setState(prevState => ({
    startCounter: !prevState.startCounter
  }))

  // pause = () => {
  //   Alert.alert('This is going to be a pause button')
  // }

  // stop = () => {
  //     Alert.alert('This is going to be a stop button')
  // }

render(){
          if(this.state.startCounter){
              return (
                      <View style={styles.container}>
                        <Title title={"Pomodoro Timer"}/>
                        <Counter />
                          <View style={styles.buttonContainer}>
                            <Button 
                              title="Stop"
                              onPress={this.toggleCounter}
                            />
                        </View>
                      </View>
                    )
          } else {
                    return (
                        <View style={styles.container}>
                          <Title title={"Pomodoro Timer"}/>
                          <View style={styles.buttonContainer}>
                              <Button 
                                title="Start"
                                onPress={this.toggleCounter}
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
  },
  gen_font: {
    fontSize: 48,
  }
});
