/* @flow
 */

import React, {
  Component
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  TouchableHighlight,
  Alert
} from 'react-native';

export default class FlatListBasics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key: 'apple'
      }, {
        key: 'banana'
      }, {
        key: 'cat'
      }],
      text: '',
      count: 4,
    }
  }

  _handlePress() {
    var count = this.state.count + 1;
    console.debug('count =' + count);
    console.debug('The text input is:' + this.state.text);
    const item = {
      key: this.state.text
    }
    const data = this.state.data.concat(item);
    // this.state.data.push(item);
    this.setState({
      // data: [...this.state.data, item]
      data
    })
    this.setState({
      count
    });
  }
  _handleTextChanged(text) {
    console.debug('_handleTextChanged');
  }

  _removeItem = ({
    item
  }) => {
    var data = this.state.data;
    const wannaRemove = item;
    console.debug('wannaRemove:' + wannaRemove.key);
    // console.debug('data:' + data[0].key);
    var result = data.filter(element => {
      return element.key !== item.key
    })
    console.debug('result:' + result.key);
    this.setState({
      data: result
    })
  }

  _renderItem = ({
    item,
    index
  }) => {
    // console.debug(item.count)
    // onPress={()=> {console.debug(index)}}
    return (
      <TouchableHighlight
      onPress={()=> {
        console.debug(index)
        this._removeItem({item})
      }
      }
      underlayColor='black'
    >
      <Text>{item.key}</Text>
    </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}> <Text> My TODO List</Text> </View>
          <FlatList style={styles.list}
            data={(this.state.data)}
        extraData = {this.state}
            // renderItem={this._renderItem}
          renderItem={this._renderItem}
        onRefresh={this._onRefresh}
          />
        <TextInput style={styles.inputField}
            // onChangeText={ (text) => this._handleTextChanged(text)} 
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Button
            style={styles.button}
        onPress={() => {
        // console.debug('Pressed!!!!');
        console.log('data='+ this.state.data)
        // this.state.data.push('kanewnew')
        console.log(this.state.data);
        this._handlePress()
        }}
        title="Add a event"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  header: {
    // flex: 1,
    paddingTop: 22,
    height: 50,
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  list: {
    marginBottom: 20,
    height: 200,
    // paddingBottom: 10,
    backgroundColor: 'rgba(255,200,200,1.0)',
  },
  inputField: {
    flex: 2,
    marginLeft: 20,
    marginRight: 20,
    // marginBottom: 60,
    // paddingBottom: 40,
    height: 40,
    backgroundColor: 'rgba(0,200,200,1.0)',
  },
  button: {
    flex: 3,
    marginBottom: 30,
    height: 40,
  }
})