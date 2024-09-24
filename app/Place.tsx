

import { View, Text, SafeAreaView, Platform, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS, dummyData, FONTS, icons, SIZES } from '@/constants';
import HeaderBar from '@/components/HeaderBar';
import TextIconButton from '@/components/TextIconButton';

const Place = () => {

  const router = useRouter()

  const { countryId, placeId } = useLocalSearchParams()
  const [country, setCountry] = useState(dummyData.countries[Number(countryId)])
  const [place, setPlace] = useState(country.places[Number(placeId)])

  const goBack = () => {
    router.back()
  }

  return (
    <SafeAreaView className='flex-1'>
      {Platform.OS === 'ios' ? null : <View className=''><StatusBar hidden style='light' /></View>}
      <ImageBackground
        className='flex-1 h-full w-full'
        source={place.image}>
        <HeaderBar
          title=''
          leftOnPressed={goBack}
          containerStyle={{
            marginTop: SIZES.padding * 1.4
          }}
        />

        <View style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          justifyContent: 'flex-end',
          marginBottom: 100
        }}>

          {/* Name & rattings */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Text style={{
              color: COLORS.white,
              ...FONTS.largeTitle
            }}>{place.name}</Text>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Text style={{
                marginRight: 5,
                color: COLORS.white,
                ...FONTS.h3
              }}>{place.rate}</Text>
              <Image
                source={icons.star}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20
                }}
              />
            </View>
          </View>

          {/* Description */}
          <Text style={{
            marginTop: SIZES.base,
            color: COLORS.white,
            ...FONTS.body3
          }}>{place.description}</Text>

          {/* Text Icon button */}
          <TextIconButton
            label='Book a flight'
            icon={icons.aeroplane}
            onPress={() => console.log("Book a flight")}
          />

        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Place