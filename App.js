import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ListView } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      inputValue: '',
      dataSource: ds.cloneWithRows([]),
    };
    this._handleTextChange = this._handleTextChange.bind(this);
  }
  _handleTextChange = value => {
    const inputValue = value;
    this.setState(() => ({
      inputValue,
    }));
  }
  _handleButtonPress = () => {
    if (!this.state.inputValue) {
      return;
    }
    const textArray = this.state.dataSource._dataBlob.s1;
    textArray.push(this.state.inputValue);
    this.setState(() => ({
      dataSource: this.state.dataSource.cloneWithRows(textArray),
      inputValue: '',
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputForm}
          value={this.state.inputValue}
          onChangeText={this._handleTextChange}
          placeholder="Inpu text"
        />
        <Button
          title="Press me"
          onPress={this._handleButtonPress}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  inputForm: {
    width: 200,
    height: 44,
    padding: 8,
  },
});
