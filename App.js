import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';



export default class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        time: {}, seconds: 100
      }
      this.timer = 0
    }

    // converting seconds into hrs mins and secs 
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60))

      let divisor_for_minutes = secs % (60 * 60)
      let minutes = Math.floor(divisor_for_minutes / 60)

      let divisor_for_seconds = divisor_for_minutes % 60
      let seconds = Math.ceil(divisor_for_seconds)

      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }

      componentDidMount(){
        let timeLeftVar = this.secondsToTime(this.state.seconds)
        this.setState({time: timeLeftVar})
      }

      startTimer = () => {
        if(this.timer == 0 && this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000)
        }
      }

      countDown = () => {
        // Removing a second, and set a state so rerendering occurs.
        let seconds = this.state.seconds - 1
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds
        })

        if (seconds == 0) {
          clearInterval(this.timer)
        }
      }

  //  start = () => {
  //                 this.interval = setInterval(() => {
  //                   this.setState({timer: this.state.timer -1})
  //                 }, 1000)
  //                 // Alert.alert('This is going to be start button')
  // }

  // // https://stackoverflow.com/questions/51695887/countdown-timer-in-react-native
  // componentDidUpdate(){
  //   if(this.state.timer === 0){
  //     clearInterval(this.interval)
  //   }
  // }

  // componentWillUnmount(){
  //   clearInterval(this.interval)
  // }


  pause = () => {
                  Alert.alert('This is going to be a pause button')
  }

  stop = () => {
                  Alert.alert('This is going to be a stop button')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.time.m} mins {this.state.time.s} secs</Text>
        <View style={styles.buttonContainer}>
          <Button 
            title="Start"
            onPress={this.startTimer}
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
    );
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
