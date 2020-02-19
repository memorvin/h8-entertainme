import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ListCard from './ListCard'

export default function DataList(props) {

  renderList = () => {
    if (props.list.movies) {
      return props.list.movies.map(item => {
        return <ListCard item={item} key={item._id} navigation={props.navigation} />
      })
    } else {
      return props.list.shows.map(item => {
        return <ListCard item={item} key={item._id} navigation={props.navigation} />
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.view} style={styles.margin}>
      {renderList()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  margin: {
    marginBottom: 105
  }
})