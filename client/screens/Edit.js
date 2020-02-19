import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { EDIT_MOVIE, EDIT_SHOW, GET_MOVIES, GET_SHOWS } from '../store//actionTypes'

export default function Edit(props) {

  const [editMovie] = useMutation(EDIT_MOVIE)
  const [editShow] = useMutation(EDIT_SHOW)
  const [title, setTitle] = useState(props.route.params.item.title)
  const [year, setYear] = useState(props.route.params.item.year)
  const [overview, setOverview] = useState(props.route.params.item.overview)
  const [poster, setPoster] = useState(props.route.params.item.poster_path)
  const [tags, setTags] = useState(props.route.params.item.tags.join(', '))

  const handleSubmit = () => {
    let arr = tags.split(', ')
    if (props.route.params.item.__typename === "Movie") {
      editMovie({
        variables: {
          id: props.route.params.item._id,
          title,
          poster_path: poster,
          overview,
          year,
          tags: arr
        },
        refetchQueries: [{ query: GET_MOVIES }]
      })
      .then(() => {
        resetForm()
        props.navigation.navigate('Movies')
      })
    } else {
      editShow({
        variables: {
          id: props.route.params.item._id,
          title: title,
          poster_path: poster_path,
          overview: overview,
          year: year,
          tags: arr
        },
        refetchQueries: [{ query: GET_SHOWS }]
      })
      .then(() => {
        resetForm()
        props.navigation.navigate('Shows')
      })
    }
  }

  const resetForm = () => {
    setTitle('')
    setYear('')
    setOverview('')
    setPoster('')
    setTags('')
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.inputBox}
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <TextInput style={styles.inputBox}
        placeholder="Overview"
        onChangeText={(text) => setOverview(text)}
        value={overview}
      />
      <TextInput style={styles.inputBox}
        placeholder="Poster"
        onChangeText={(text) => setPoster(text)}
        value={poster}
      />
      <TextInput style={styles.inputBox}
        placeholder="Year"
        onChangeText={(text) => setYear(text)}
        value={year}
      />
      <TextInput style={styles.inputBox}
        placeholder="Tags"
        onChangeText={(text) => setTags(text)}
        value={tags}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleSubmit}>Update</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
    // backgroundColor: ''
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#1c313a',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
})  