import React, { useState } from 'react'
import { View, Animated } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

const AnimatedImage = ({ url }) => {

  const [scale, setScale] = useState(new Animated.Value(1))

  const onZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: scale }
      }
    ],
    {
      useNativeDriver: true
    }
  )

  const onZoomStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true
      }).start()
    }
  }

  return (
    <View >
      <PinchGestureHandler
        onGestureEvent={onZoomEvent}
        onHandlerStateChange={onZoomStateChange}>
        <Animated.Image
          source={{ uri: url }}
          style={{
            transform: [{ scale: scale }],
            zIndex: 10,
            width: '90%',
            aspectRatio: 4/6,
            marginVertical: 10,
          }}
        />
      </PinchGestureHandler>
    </View>
  )
}

export default AnimatedImage