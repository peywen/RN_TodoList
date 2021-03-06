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

import Swipeout from 'react-native-swipeout';

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
      activeRow: null,
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
    this.setState({
      text: ''
    });
  }

  _handleTextChanged(text) {
    console.debug('_handleTextChanged' + text);
    var inputItem = text;
    this.setState({
      text: inputItem
    })
  }

  _handleLongPress({
    item
  }) {
    Alert.alert('long press:' + item.index)
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

  onSwipeOpen(item, rowId, direction) {
    this.setState({
      activeRow: item.noteId
    });
  }

  onSwipeClose(item, rowId, direction) {
    if (item.noteId === this.state.activeRow && typeof direction !== 'undefined') {
      this.setState({
        activeRow: null
      });
    }
  }

  _renderItem = ({
    item,
    activeRow
  }) => {
    // console.debug(item.count)
    // onPress={()=> {console.debug(index)}}
    const swipeSettings = {
      autoClose: true,
      close: item.noteId !== this.state.activeRow,
      onClose: (secId, rowId, direction) => this.onSwipeClose(item, rowId, direction),
      onOpen: (secId, rowId, direction) => this.onSwipeOpen(item, rowId, direction),
      right: [{
        onPress: () => this._removeItem({
          item
        }),
        text: 'Delete',
        type: 'delete'
      }],
      rowId: item.index,
      sectionId: 1
    };

    return (
      <Swipeout {...swipeSettings}>
          <TouchableHighlight
              onPress = {() => {
                  console.debug(item.key)
                }
              }
              style = {styles.item} >
          <Text>{item.key}</Text>
          </TouchableHighlight>
      </Swipeout>
    )
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}> <Text> My TODO List</Text> </View>
          <FlatList style={styles.list}
            data={(this.state.data)}
            extraData={(this.state.activeRow)}
          renderItem={this._renderItem}
        onRefresh={this._onRefresh}
          />
        <TextInput style={styles.inputField}
            onChangeText={ (text) => this._handleTextChanged(text)} 
            value={this.state.text}
            placeholder='Input here'
          />
      <Button
        buttonStyle={styles.button}
        onPress = {() => {
          // console.debug('Pressed!!!!');
          console.log('data=' + this.state.data)
          console.log(this.state.data);
          this._handlePress()
        }
        }
        title = "Add a event"
        accessibilityLabel = "Learn more about this purple button" /
        >
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    marginBottom: 20,
  },
  header: {
    // flex: 2,
    marginTop: 20,
    paddingTop: 10,
    height: 40,
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    justifyContent: 'center',
    padding: 0,
    // fontSize: 40,
    alignContent: 'center',
    backgroundColor: 'rgba(255,200,200,1.0)',
    height: 44,
  },
  list: {
    // flex: 2,
    marginBottom: 20,
    // paddingTop: 40,
    marginTop: 20,
    // height: 205,
    // paddingBottom: 10,
    backgroundColor: 'white',
  },
  inputField: {
    // flex: 2,
    // marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    // marginBottom: 100,
    // paddingBottom: 40,
    height: 40,
    backgroundColor: 'rgba(220,220,220,1.0)',
  },
  button: {
    // flex: 2,
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
  }
})