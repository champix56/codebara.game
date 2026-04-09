import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CardViewer2D from '../components/CardViewer2D/CardViewer2D'
import { ICard } from '../interfaces/card'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import CardDataViewer from '../components/CardDataViewer/CardDataViewer'

type Props = {
    card:ICard
}

const Viewer:React.FC<Props> = (props) => {
    const cards=useSelector((s:RootState)=>s.card.cards)
  return (
    <View style={{flex:1}}>
      <CardViewer2D card={props.card}/>
      <ScrollView><CardDataViewer card={props.card}/></ScrollView>
    </View>
  )
}

export default Viewer