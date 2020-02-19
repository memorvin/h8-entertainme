import React from 'react'
import { Container, Text } from 'native-base'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function ListCard(props) {

  const handlePress = () => {
    props.navigation.navigate('Detail', { item: props.item })
  }

  const renderScore = () => {
    if (props.item) {
      let total = 0;
      props.item.popularity.forEach(el => {
        total += el.score
      })
      return total/props.item.popularity.length
    }
  }

  return (
    <TouchableOpacity
      style={styles.view}
      onPress={handlePress}
      activeOpacity={0.6}
    >
      <Image
        source={{uri: props.item.poster_path}}
        style={styles.image}
      />
      <Container style={styles.button}>
        <Text style={styles.btnText} >
          {props.item.title}
        </Text>
        <Text>
          {renderScore()}
        </Text>
      </Container>
    </TouchableOpacity> 
  )
}


const styles = StyleSheet.create({
  view: {
    width: '45%',
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 2.22,
    elevation: 5,
  },
  button: {
    height: 'auto',
    alignItems: 'center',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  btnText: {
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
  },
  image: {
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})