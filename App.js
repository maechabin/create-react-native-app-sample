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
    this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);
  }
  _handleTextChange = (value) => {
    const inputValue = value;
    this.setState(() => ({
      inputValue,
    }));
  }
  _handleSendButtonPress = () => {
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
  _handleDeleteButtonPress = (id) => {
    this.setState((a) => {
      const newItem = a.dataSource._dataBlob.s1.filter((item, i) => (parseInt(id) !== i));
      return {
        dataSource: this.state.dataSource.cloneWithRows(newItem),
      }
    });
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
          onPress={this._handleSendButtonPress}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => {
            const handleDelete = () => {
              return this._handleDeleteButtonPress(rowID);
            }
            return (
              <View>
                <Text>{rowID}: {rowData}</Text>
                <Button
                  title="Delete"
                  onPress={handleDelete}
                />
              </View>
              );
            }
          }
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
