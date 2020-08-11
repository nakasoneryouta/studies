import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
export default class App extends React.Component<any, State> {
  constructor(prop){
    super(prop);
    this.state = {
      nowY : 0,
      footerHeight : 60,
    }
    this.befY = 0;
    this.isRun = false;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
    <Text>{this.state.nowY}</Text>
        <View
          style={styles.content}>
          <ScrollView
          bounces={false}
          onScroll={(e)=>{
            this.setState({nowY:e.nativeEvent.contentOffset.y})
            this.onScroll(e.nativeEvent.contentOffset.y)
          }}>
            <View>
              { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25].map(n => <Text key={`${n}`} style={{ fontSize: 60 }}>{n}月</Text>) }
            </View>
          </ScrollView>
          <View style={{width:430,height:this.state.footerHeight,backgroundColor:'red',position:'absolute',bottom: 0,justifyContent: "center"}}>
            <Button title="Close" color="#FFF" onPress={() => {}} />
          </View>
        </View>
      </View>
    );
  }
  onScroll(nowY){
    if(this.befY < nowY) this.runClose();
    if(this.befY > nowY) this.runOpen();
    this.befY = nowY;
  }
  runClose(){
    if(this.isRun) return
    var n = 60;
    this.isRun = setInterval(()=>{
      if(n>0){
        n -= 5;
        this.setState({footerHeight:n});
      }
    },10)
  }
  runOpen(){
    clearInterval(this.isRun);
    this.setState({footerHeight:60},()=>{
      this.isRun = false;
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AAA',
  },
  header: {
    height: 96,
    backgroundColor: "#00FF00",
  },
  content: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: "#FF0000",
    opacity: 0.5
  },
  scrollContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 104, // フッター分を底上げ
  },
  footerOverlay: {
    flex: 1,
    height: 96,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#0000FF",
    opacity: 0.5,
    justifyContent: "center",
  }
});