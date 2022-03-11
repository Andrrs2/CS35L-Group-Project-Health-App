// import React, { useRef, useState } from 'react';
// import { Form, } from "react-bootstrap";
// import { CheckBox, Text, StyleSheet, View} from "react-native";
// import Paper from '@mui/material/Paper';
// import {ArgumentAxis, ValueAxis, Chart, LineSeries, SplineSeries} from '@devexpress/dx-react-chart-material-ui';
// export default class weightTracker extends React.Component{
//   constructor(props){
//     super(props)
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.state = {
//       weight: 0,
//       track: localStorage.getItem('track') === null ? 1 : JSON.parse(localStorage.getItem('track')),
//       DataArray: localStorage.getItem('DataArray') === null ? [{argument: 0, value: 0}] : JSON.parse(localStorage.getItem('DataArray')),
//     }
//   }
//   handleSubmit(event) {
//     this.setState({track: this.state.track + 1})
//     let DataArray = [...this.state.DataArray];
//     DataArray[0] = {argument: 0, value: 0}
//     DataArray[this.state.track] = {argument: this.state.track, value: this.state.weight};
//     this.setState({ DataArray });
//     localStorage.setItem('DataArray',  JSON.stringify(DataArray));
//     localStorage.setItem('track', JSON.stringify(this.state.track));
//     alert('A weight was submitted: ' + this.state.weight);
//     event.preventDefault();
//   }

//   render()
//   {
//     return (
//       <View style = {styles.container}>
//       <h3>Weight Tracker:</h3>
//       <View style = {styles.checkboxContainer}>
//         <View style={styles.container}>
//         <Form onSubmit= {this.handleSubmit}>
//           <Form.Group id="weight">
//             <Form.Label>Weight (lb)</Form.Label>
//             <Form.Control type="weight" value={this.state.weight}  onChange={e => this.setState({weight: e.target.value})} required />
//             <input type="submit" value="Submit" />
//           </Form.Group>
//         <View style = {styles.checkbox}>
//         <form onSubmit={localStorage.clear()}>
//          <input type="submit" value="Clear Storage" />
//           </form>  
//           </View>
//         </Form>
//         </View>
//         </View>
//         <View style={styles.picker}>
//         <Paper>
//           <Chart
//              data = {this.state.DataArray}
//           >
//             <ArgumentAxis />
//             <ValueAxis />
//             <LineSeries valueField="value" argumentField="argument" color='BLUE' />
//             <SplineSeries
//             valueField="splineValue"
//             argumentField="argument"
//           />
//           </Chart>
//         </Paper>
//         </View>
//         </View>
//       )
//     }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-evenly",
//     marginBottom: 20,
//     marginTop: 10,
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//     marginHorizontal: 20,
//     marginTop: 20,
//   },
//   checkbox: {
//     alignSelf: "center",
//     marginHorizontal: 20,
//   },
//   picker: {
//     alignSelf: "center",
//     height: 150,
//     width: 500,
//   },
// });





import React, { useRef, useState, useEffect} from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap"
import "../../App.css";
import { CheckBox, Text, StyleSheet, View} from "react-native";
import Paper from '@mui/material/Paper';
import {ArgumentAxis, ValueAxis, Chart, LineSeries, SplineSeries} from '@devexpress/dx-react-chart-material-ui';
import { ScatterSeries, ValueScale} from '@devexpress/dx-react-chart';
import { db } from "../../firebase"
import { useAuth } from "../user_auth/context"
import { Link, useHistory } from "react-router-dom"

export default function WeightTracker() {
  const { logout } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { currentUser } = useAuth()
  const weightRef = useRef()

  async function clearHistory(e){
    e.preventDefault()

    try {
      db.collection('users').doc(currentUser.uid).update({
        weightHistory: [],
        dateHistory: []
      })
    }
    catch {
      setError("Failed to clear history")
    }
  }
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      var currWeight
      var currHist


      // var x = db.collection('users').doc(currentUser.uid)
      // x.onSnapshot(doc => {
        //console.log(doc.data().weightHistory)
        //currWeight = doc.data().weightHistory
        //newHist = currWeight.concat(weightRef.current.value)
        // console.log(currWeight)
        //currWeight.push(weightRef.current.value)
        // console.log(currWeight)

        // const y = db.collection('users').doc(currentUser.uid).get().then(curr => {
        //   currHist = curr.data().weightHistory
        //   console.log(currHist)
        //   currHist.push(weightRef.current.value)
        //   //console.log(currHist)
        //   //console.log()
        //   db.collection('users').doc(currentUser.uid).update({
        //     weightHistory: currWeight
        //   })
        //   console.log(currHist)
        // })
        //console.log(y.data().weightHistory)
        // doc.update({
        //   weightHistory: currWeight
        // })
      // })

      let currentDate = new Date();
      let cDay = currentDate.getDate();
      let cMonth = currentDate.getMonth() + 1;
      let cYear = currentDate.getFullYear();
      const date = cDay + "/" + cMonth + "/" + cYear
      const x = await db.collection('users').doc(currentUser.uid).get()
      const currHistory = x.data().weightHistory
      const currDateHist = x.data().dateHistory
      //console.log(x.data().weightHistory)
      currHistory.push(weightRef.current.value)
      currDateHist.push(date)
      //console.log(currHistory)
      db.collection('users').doc(currentUser.uid).update({
        weightHistory: currHistory,
        dateHistory: currDateHist
      })
      // history.push("/")
    } catch {
      setError("Failed to update weight")
    }

    setLoading(false)
  }

  useEffect(() => {
        displayInfo()
  }, []);

  function displayInfo() {
    var x = db.collection('users').doc(currentUser.uid)
    // const doc = await x.get()
    // x.get().then(doc => {
    //FIX WEIGHT HISTORY TO ALSO DISPLAY DATES
    x.onSnapshot(doc => {
      var dataArr = doc.data().weightHistory
      var arrayLen = dataArr.length
      var dateArr = doc.data().dateHistory
      var html = ""
      for ( var i = 0; i < arrayLen; i++)
        html += `<div>${dataArr[i]} (${dateArr[i]})</div>`
      document.getElementById("h3").innerHTML = html;

      var canvas = document.getElementById( "testCanvas" );  
      var context = canvas.getContext( "2d" );  

      // declare graph start and end  
      var GRAPH_TOP = 25;  
      var GRAPH_BOTTOM = 375;  
      var GRAPH_LEFT = 150;  
      var GRAPH_RIGHT = 1850;   

      var GRAPH_HEIGHT = 350;   
      var GRAPH_WIDTH = 450;  

      // clear canvas (if another graph was previously drawn)  
      context.clearRect( 0, 0, 4000, 1000 );   

      // draw X and Y axis  
      context.beginPath();  
      context.moveTo( GRAPH_LEFT, GRAPH_TOP );  
      context.lineTo( GRAPH_LEFT, GRAPH_BOTTOM );  
      context.lineTo( GRAPH_RIGHT+1000, GRAPH_BOTTOM );  
      context.stroke();   
      // var dataArr = doc.data().weightHistory//[ 6, 8, 10, 12, 11, 7, 5, 8 ];  
      // var arrayLen = dataArr.length
      // var dateArr = doc.data().dateHistory

      var largest = 0;  
      for( var i = 0; i < arrayLen; i++ ){  
        var temp = parseInt(dataArr[i]) //convert string to int
        if( temp > largest ){  
          largest = temp;  
        }  
      }
      //console.log(largest)
      // set font for fillText()  
      context.font = "16px Arial";  

      // draw reference line  
      context.beginPath();  
      context.strokeStyle = "#BBB";  
      context.moveTo( GRAPH_LEFT, GRAPH_TOP );  
      context.lineTo( GRAPH_RIGHT + 1000, GRAPH_TOP );  
      // draw reference value for hours  
      context.fillText( largest, GRAPH_LEFT - 35, GRAPH_TOP);  
      context.stroke();  

      // draw reference line  
      context.beginPath();  
      context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT ) / 4 * 3 + GRAPH_TOP );  
      context.lineTo( GRAPH_RIGHT + 1000, ( GRAPH_HEIGHT ) / 4 * 3 + GRAPH_TOP );  
      // draw reference value for hours  
      context.fillText( largest / 4, GRAPH_LEFT - 35, ( GRAPH_HEIGHT ) / 4 * 3 + GRAPH_TOP);  
      context.stroke();  

      // draw reference line  
      context.beginPath();  
      context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT ) / 2 + GRAPH_TOP );  
      context.lineTo( GRAPH_RIGHT + 1000, ( GRAPH_HEIGHT ) / 2 + GRAPH_TOP );  
      // draw reference value for hours  
      context.fillText( largest / 2, GRAPH_LEFT - 35, ( GRAPH_HEIGHT ) / 2 + GRAPH_TOP);  
      context.stroke();  

      // draw reference line  
      context.beginPath();  
      context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT ) / 4 + GRAPH_TOP );  
      context.lineTo( GRAPH_RIGHT + 1000, ( GRAPH_HEIGHT ) / 4 + GRAPH_TOP );  
      // draw reference value for hours  
      context.fillText( largest / 4 * 3, GRAPH_LEFT - 35, ( GRAPH_HEIGHT ) / 4 + GRAPH_TOP);  
      context.stroke();  

      // draw titles  
      context.fillText( "Entry Date", GRAPH_RIGHT - 900, GRAPH_BOTTOM + 50);  
      context.fillText( "Weight (lbs)", GRAPH_LEFT - 110, GRAPH_HEIGHT / 2);  

      context.beginPath();  
      context.lineJoin = "round";  
      context.strokeStyle = "black";  

      context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT - dataArr[ 0 ] / largest * GRAPH_HEIGHT ) + GRAPH_TOP);  
      // draw reference value for day of the week  
      //context.fillText( "1", 200, GRAPH_BOTTOM + 25);  
      for( var i = 0; i < arrayLen; i++ ){  
        context.lineTo( GRAPH_RIGHT / arrayLen * i + GRAPH_LEFT, ( GRAPH_HEIGHT - dataArr[ i ] / largest * GRAPH_HEIGHT ) + GRAPH_TOP );  
        // draw reference value for day of the week  
        context.fillText( dateArr[i], 150+GRAPH_RIGHT / arrayLen * i, GRAPH_BOTTOM + 25);  
      }  
      context.stroke();  

      // let currentDate = new Date();
      // let cDay = currentDate.getDate();
      // let cMonth = currentDate.getMonth() + 1;
      // let cYear = currentDate.getFullYear();
      // console.log("<b>" + cDay + "/" + cMonth + "/" + cYear + "</b>");
      });
  }



  return (
    <>
    <center>
      <canvas id="testCanvas" width="1900" height="450"></canvas>
    </center>

    <h2 style={{color: 'green', marginLeft: '1vw'}}>Your Weight History:</h2>
    <h3 style={{marginLeft: '1vw'}}id="h3"></h3>
    <center>
      <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
              <Form.Label>Weight </Form.Label>
              <Form.Control type="weight" ref={weightRef} required />
            </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">
              Update Weight
          </Button>
      </Form>
      <Form onSubmit={clearHistory}>
        <Button disabled={loading} className="w-100" type="submit">
          Clear Weight History
        </Button>
      </Form>
      </center>
    </>
  )
}
