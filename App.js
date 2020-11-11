import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';



export default class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        timer: 100
      }
    }


   start = () => {
                  this.interval = setInterval(() => {
                    this.setState({timer: this.state.timer -1})
                  }, 1000)
                  // Alert.alert('This is going to be start button')
  }

  // https://stackoverflow.com/questions/51695887/countdown-timer-in-react-native
  componentDidUpdate(){
    if(this.state.timer === 0){
      clearInterval(this.interval)
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }


  pause = () => {
                  Alert.alert('This is going to be a pause button')
  }

  stop = () => {
                  Alert.alert('This is going to be a stop button')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.timer}</Text>
        <View style={styles.buttonContainer}>
          <Button 
            title="Start"
            onPress={this.start}
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
