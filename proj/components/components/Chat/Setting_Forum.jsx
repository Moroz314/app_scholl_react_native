import React, { Component, useState } from 'react'
import { Text, View ,Button,ScrollView,StyleSheet} from 'react-native'
import { fetchPosts, selectIsPosts } from '../../../slices/post'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export function Setting_Forum () {
  const [isChecked, setChecked] = useState(true);

  const [mathematics, setMath] = useState('математика')
  const [russian, setRuss] = useState('русский язык')
  const [physics, setPhys] = useState('физика')
  const [obg, setObg] = useState('ОБЖ')
  const [literature, setLiter] = useState('литература')
  const [informatics, setInfor] = useState('информатика')
  const [history, setHist] = useState('история')
  const [geography, setGeogr] = useState('география')
  const [chemistry, setСhemi] = useState('химия')
  const [biology, setBiol] = useState('биология')
  const [physical_culture, setPhys_Cult] = useState('физкультура')
  const [english, setEngl] = useState('английский язык')
  const [history_SPB, setHist_SPB] = useState('история СПБ')
  const [music, setMusic] = useState('музыка')
  const [izo, setIzo] = useState('ИЗО')
  const [technology, setTechn] = useState('технология(черчение)')


  const dispath = useDispatch()
  const navigatioin = useNavigation()
  
  const pressAll = () => {
    setMath(prevText => prevText === "математика" ? "" : "математика")
    setRuss(prevText => prevText === "русский язык" ? "" : "русский язык")
    setPhys(prevText => prevText === "физика" ? "" : "физика")
    setObg(prevText => prevText === "ОБЖ" ? "" : "ОБЖ")
    setLiter(prevText => prevText === "литература" ? "" : "литература")
    setInfor(prevText => prevText === "информатика" ? "" : "информатика")
    setHist(prevText => prevText === "история" ? "" : "история")
    setGeogr(prevText => prevText === "география" ? "" : "география")
    setСhemi(prevText => prevText === "химия" ? "" : "химия")
    setBiol(prevText => prevText === "биология" ? "" : "биология")
    setPhys_Cult(prevText => prevText === "физкультура" ? "" : "физкультура")
    setEngl(prevText => prevText === "английский язык" ? "" : "английский язык")
    setHist_SPB(prevText => prevText === "история СПБ" ? "" : "история СПБ")
    setMusic(prevText => prevText === "музыка" ? "" : "музыка")
    setIzo(prevText => prevText === "ИЗО" ? "" : "ИЗО")
    setTechn(prevText => prevText === "технология(черчение)" ? "" : "технология(черчение)")
  }
  async function getPosts() {
    const less = await AsyncStorage.getItem('less')
    const jsonLess = await JSON.parse(less);
    const data =  await dispath(fetchPosts(jsonLess));
  }




  const GoHome = async ()  => {
    const less = {
      technology: technology,
      izo: izo,
       music: music,
       history_SPB: history_SPB,
      english: english,
      physical_culture: physical_culture,
     biology: biology,
      chemistry: chemistry,
      geography: geography,
       history: history,
       informatics: informatics,
       literature: literature,
       obg: obg,
       physics: physics,
       russian: russian,
       mathematics: mathematics

    }
    const jsonLess = JSON.stringify(less);
    await AsyncStorage.setItem('less', jsonLess)
      navigatioin.navigate("Форум")
      getPosts()
    }
  

  return (
 
      <View>
           <ScrollView>
        <Button onPress={GoHome}
  title="НАСТРОИТЬ" />
  <Button onPress={pressAll}
  title="нажать все" />
         <BouncyCheckbox
         style={styles.checkbox}
        text="Математика"
        isChecked={mathematics}
        onPress={() => setMath(prevText => prevText === "математика" ? "" : "математика")}
      />
       <BouncyCheckbox
           style={styles.checkbox}
        text="Русский язык"
        isChecked={russian}
        onPress={() => setRuss(prevText => prevText === "русский язык" ? "" : "русский язык")}
      />
       <BouncyCheckbox
           style={styles.checkbox}
        text="Физика"
        isChecked={physics}
        onPress={() => setPhys(prevText => prevText === "физика" ? "" : "физика")}
      />
       <BouncyCheckbox
           style={styles.checkbox}
        text="ОБЖ"
        isChecked={obg}
        onPress={() => setObg(prevText => prevText === "ОБЖ" ? "" : "ОБЖ")}
      />
       <BouncyCheckbox
           style={styles.checkbox}
        text="Литература"
        isChecked={literature}
        onPress={() => setLiter(prevText => prevText === "литература" ? "" : "литература")}
      />
       <BouncyCheckbox
           style={styles.checkbox}
        text="Информатика"
        isChecked={informatics}
        onPress={() => setInfor(prevText => prevText === "информатика" ? "" : "информатика")}
      />
       <BouncyCheckbox
           style={styles.checkbox}
        text="История"
        isChecked={history}
        onPress={() => setHist(prevText => prevText === "история" ? "" : "история")}
      />
       <BouncyCheckbox
           style={styles.checkbox}
        text="География"
        isChecked={geography}
        onPress={() => setGeogr(prevText => prevText === "география" ? "" : "география")}
      />
      <BouncyCheckbox
          style={styles.checkbox}
        text="Химия"
        isChecked={chemistry}
        onPress={() => setСhemi(prevText => prevText === "химия" ? "" : "химия")}
      />
      <BouncyCheckbox
          style={styles.checkbox}
      text="Биология"
        isChecked={biology}
        onPress={() => setBiol(prevText => prevText === "биология" ? "" : "биология")}
      />
      <BouncyCheckbox
          style={styles.checkbox}
        text="Физкультура"
        isChecked={physical_culture}
        onPress={() => setPhys_Cult(prevText => prevText === "физкультура" ? "" : "физкультура")}
      />
       <BouncyCheckbox
        style={styles.checkbox}
        text="Английский язык"
        isChecked={english}
        onPress={() => setEngl(prevText => prevText === "английский язык" ? "" : "английский язык")}
      />
       <BouncyCheckbox
        style={styles.checkbox}
        text="История СПБ"
        isChecked={history_SPB}
        onPress={() => setHist_SPB(prevText => prevText === "история СПБ" ? "" : "история СПБ")}
      />
       <BouncyCheckbox
        style={styles.checkbox}
        text="Музыка"
        isChecked={music}
        onPress={() => setMusic(prevText => prevText === "музыка" ? "" : "музыка")}
      /> 
      <BouncyCheckbox
       style={styles.checkbox}
      text="ИЗО"
      isChecked={izo}
      onPress={() => setIzo(prevText => prevText === "ИЗО" ? "" : "ИЗО")}
    />
     <BouncyCheckbox
      style={styles.checkbox}
        text="Технология"
        isChecked={technology}
        onPress={() => setTechn(prevText => prevText === "технология(черчение)" ? "" : "технология(черчение)")}
      /></ScrollView>
      </View>
    )
}
const styles = StyleSheet.create({
  checkbox: {
    width: 300,
    height: 50
  }
})
export default Setting_Forum
