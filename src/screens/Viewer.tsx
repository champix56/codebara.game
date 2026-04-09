import { View, Text, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import CardViewer2D from '../components/CardViewer2D/CardViewer2D'
import { ICard } from '../interfaces/card'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import CardDataViewer from '../components/CardDataViewer/CardDataViewer'
import { useDispatch } from 'react-redux'
import { setCurrentCard } from '../slices/card'

type Props = {
    card:ICard
    onNameUpdate:(name:string)=>void
}
const Viewer:React.FC=()=>{
  const c=useSelector((s:RootState)=>s.card.current)
  const d=useDispatch()
  if(c!==undefined) return <UNCONNECTED_Viewer card={c} onNameUpdate={(name)=>{ToastAndroid.show(name,ToastAndroid.LONG)}}/>
  else return null
}
const UNCONNECTED_Viewer:React.FC<Props> = (props) => {
    const cards=useSelector((s:RootState)=>s.card.cards)
  return (
    <View style={{flex:1}}>
      <CardViewer2D card={props.card}/>
      <ScrollView><CardDataViewer card={props.card} onNameUpdate={props.onNameUpdate}/></ScrollView>
    </View>
  )
}

export default Viewer