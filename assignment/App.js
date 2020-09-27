import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Constants from 'expo-constants'

const CHOICES = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
  },
  {
    name: 'paper',
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
  },
  {
    name: 'scissors',
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
  }
];

const Button = props => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => props.onPress(props.name)}
  >
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);

const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={{ uri }} resizeMode="contain" style={styles.choiceImage} />
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
};

var stats = {totaltouch: 0, wins: 0, loses: 0, ties: 0, winsRatio: '0.00', losesRatio: '0.00', tiesRatio: '0.00'}

export default function App() {
  const [gamePrompt, setGamePrompt] = useState('Choose your weapon!');
  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});
  const onPress = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);
    stats.totaltouch++;
    if(gamePrompt === 'Victory!')
      stats.wins++;
    else if(gamePrompt === 'Defeat!')
      stats.loses++;
    else if(gamePrompt === 'Tie game!')
      stats.ties++;
    
    if(stats.totaltouch===0){
      stats.winsRatio = 0;
      stats.losesRatio = 0;
      stats.tiesRatio = 0;
    }
    else{
      stats.winsRatio = (stats.wins*100/stats.totaltouch).toFixed(2);
      stats.losesRatio = (stats.loses*100/stats.totaltouch).toFixed(2);
      stats.tiesRatio = (stats.ties*100/stats.totaltouch).toFixed(2);
    }
    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);

    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComputerChoice(newComputerChoice); 
  };

  const getRoundOutcome = userChoice => {
    const computerChoice = randomComputerChoice().name;
    let result;
  
    if (userChoice === 'rock') {
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'paper') {
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'scissors') {
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    }
  
    if (userChoice === computerChoice) result = 'Tie game!';
    return [result, computerChoice];
  };

  const randomComputerChoice = () => CHOICES[Math.floor(Math.random() * CHOICES.length)];

  const getResultColor = () => {
    if (gamePrompt === 'Victory!') return 'green';
    if (gamePrompt === 'Defeat!') return 'red';
    if (gamePrompt === 'Tie game!') return '#250902';
    if (gamePrompt === 'Choose your weapon!') return 'black';
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsbar}>
        <View style={styles.statsbarelements}>
          <Text style={{color: 'black', fontWeight: "bold", fontSize: 22}}>Total</Text>
          <Text style={{fontSize: 20}}>{stats.totaltouch}</Text>
        </View>
        <View style={styles.statsbarelements}>
          <Text style={{color: 'black', fontWeight: "bold", fontSize: 22}}>Wins</Text>
          <Text style={{fontSize: 20}}>{stats.winsRatio} %</Text>
        </View>
        <View style={styles.statsbarelements}>
          <Text style={{color: 'black', fontWeight: "bold", fontSize: 22}}>Loses</Text>
          <Text style={{fontSize: 20}}>{stats.losesRatio} %</Text>
        </View>
        <View style={styles.statsbarelements}>
          <Text style={{color: 'black', fontWeight: "bold", fontSize: 22}}>Ties</Text>
          <Text style={{fontSize: 20}}>{stats.tiesRatio} %</Text>
        </View>
      </View>
      <Text style={{ fontSize: 35, color: getResultColor() }}>{gamePrompt}</Text>
      <View style={styles.choicesContainer}>
        <ChoiceCard player="Player" choice={userChoice} />
      <Text style={{ color: '#250902' }}>vs</Text>
      <ChoiceCard player="Computer" choice={computerChoice} />
      </View>

      {CHOICES.map(choice => {
        return (
        <Button 
          key={choice.name} 
          name={choice.name} 
          onPress={onPress} 
        />
        )
      })}
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee',
    marginTop: Constants.statusBarHeight,
  },
  statsbar:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  statsbarelements:{
    alignItems: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 20,
    shadowRadius: 5,
    paddingBottom: 20,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});