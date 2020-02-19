import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Item = t.struct({
  title: t.String,
  overview: t.String,
  poster_path: t.String,
  year: t.String,
  tags: t.String
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    title: {
      error: 'Title is required!'
    },
    overview: {
      error: 'Overview is required!'
    },
    year: {
      error: 'Year is required!'
    },
    poster_path: {
      error: 'Poster path is required!'
    },
    tags: {
      error: 'Tags is required!'
    }
  },
  stylesheet: formStyles,
};

export default class AddForm extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const value = this._form.getValue();
    let arr = [value, this.props.type]
    this.props.submitForm(arr)
  }
  
  render() {
    return (
      this.props.isOpen
      ? <View style={styles.container}>
          <Form 
            ref={c => this._form = c}
            type={Item} 
            options={options}
          />
          <Button
            title="Submit"
            onPress={this.handleSubmit}
          />
        </View>
      : <View></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
});