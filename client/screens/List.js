import React, { useState } from 'react'
import { Container, Text, Button } from 'native-base';
import { StyleSheet } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import DataList from '../components/DataList'
import AddForm from '../components/AddForm'
import { GET_MOVIES, GET_SHOWS, ADD_MOVIE, ADD_SHOW } from '../store/actionTypes'


export default function List(props) {

  const { loading, error, data } = useQuery(props.route.name === "Movies" ? GET_MOVIES : GET_SHOWS)
  const [addMovie] = useMutation(ADD_MOVIE)
  const [addShow] = useMutation(ADD_SHOW)
  const [isOpen, setIsOpen] = useState(false)

  const renderData = () => {
    if (loading) {
      return <Text>Loading...</Text>
    } else if (error) {
      return <Text>Error!</Text>
    } else {
      return <DataList list={data} navigation={props.navigation} />
    }
  }

  const handleSubmit = (arr) => {
    const tags = arr[0].tags.split(', ')
    if (arr[1] === "Movies") {
        addMovie({
          variables: {
            title: arr[0].title,
            poster_path: arr[0].poster_path,
            overview: arr[0].overview,
            year: arr[0].year,
            tags
          },
        update: (cache, { data }) => {
          const cacheData = cache.readQuery({ query: GET_MOVIES })
          cache.writeQuery({
            query: GET_MOVIES,
            data: { movies: cacheData.movies.concat([data.addMovie]) }
          })
        }
      })
      .then(() => {
        toggleModal()
      })
    } else {
      addShow({
        variables: {
          title: arr[0].title,
          poster_path: arr[0].poster_path,
          overview: arr[0].overview,
          year: arr[0].year,
          tags
        },
        update: (cache, { data }) => {
          const cacheData = cache.readQuery({ query: GET_SHOWS })
          cache.writeQuery({
            query: GET_SHOWS,
            data: { shows: cacheData.shows.concat([data.addShow]) }
          })
        }
      })
      .then(() => {
        toggleModal()
      })
    } 
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Container>
      <Button block danger style={styles.button} onPress={() => toggleModal()} >
        <Text>Add {props.route.name.slice(0,-1)}</Text>
      </Button>
      <AddForm
      submitForm={handleSubmit}
      type={props.route.name}
      isOpen={isOpen} />
      {renderData()}
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '70%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10
  }
})