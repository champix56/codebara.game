import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { useSelector } from 'react-redux'
import ListCards from '../components/ListCards/ListCards'

type Props = {}

const List :React.FC= () => {
    const d=useDispatch<AppDispatch>()
    const cards=useSelector((s:RootState)=>s.card)
  return (
    <ListCards data={cards.cards} baseLoc={cards.baseLoc}/>
  )
}

export default List

