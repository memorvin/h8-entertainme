import React, { useEffect } from 'react'
import { Button } from 'native-base'
import { ScrollView, StyleSheet, Text, Alert } from 'react-native'
import AnimatedImage from '../components/AnimatedImage'
import { useMutation } from '@apollo/react-hooks'
import { DEL_MOVIE, DEL_SHOW, GET_MOVIES, GET_SHOWS } from '../store//actionTypes'

export default function Details(props) {

  const [deleteMovie] = useMutation(DEL_MOVIE)
  const [deleteShow] = useMutation(DEL_SHOW)

  const handleDelete = () => {
    Alert.alert(
      `Delete this ${props.route.params.item.__typename}?`,
      `This will permanently remove this ${props.route.params.item.__typename} from our database`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            if (props.route.params.item.__typename === "Movie") {
              deleteMovie({ variables: { id: props.route.params.item._id }, refetchQueries: [{ query: GET_MOVIES }] })
            } else {
              deleteShow({ variables: { id: props.route.params.item._id }, refetchQueries: [{ query: GET_SHOWS }] })
            }
            props.navigation.goBack()
          }
        },
      ]
    )
  }

  const handleEdit = () => {
    props.navigation.navigate('Edit', { item: props.route.params.item, navigation: props.navigation })
  }

  const renderTags = () => {
    if (props.route.params.item) {
      return props.route.params.item.tags.join(', ')
    }
  }

  const renderScrore = () => {
    if (props.route.params.item) {
      let total = 0;
      props.route.params.item.popularity.forEach(el => {
        total += el.score
      })
      return total/props.route.params.item.popularity.length
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.view} >
      <Text style={styles.title}>{props.route.params.item.title} ({props.route.params.item.year})</Text>
      <Text style={styles.details}>{renderTags()} {renderScrore()}</Text>
      <AnimatedImage url={props.route.params.item.poster_path}/>
      <Text style={styles.explanation}>{props.route.params.item.overview}</Text>
      <Button block danger style={styles.button} onPress={() => handleDelete()} >
        <Text>Delete {props.route.params.item.__typename}</Text>
      </Button>
      <Button block success style={styles.button} onPress={() => handleEdit()} >
        <Text>Edit {props.route.params.item.__typename}</Text>
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center'      
  },
  title: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 30,
    textAlign: 'center'
  },
  explanation: {
    fontFamily: 'sans-serif-light',
    fontSize: 18,
    textAlign: 'justify',
    marginHorizontal: 15
  },
  details: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  info: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    width: '70%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 5
  }
})