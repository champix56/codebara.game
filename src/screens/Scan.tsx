import { View, Text } from 'react-native'
import React from 'react'
import ScanCam from '../components/ScanCam/ScanCam'

type Props = {}

const Scan = (props: Props) => {
  return (
   <ScanCam onBarCodeScanned={(evt)=>{console.log(evt)}}/>
  )
}

export default Scan