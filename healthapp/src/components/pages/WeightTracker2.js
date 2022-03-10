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
        weightHistory: []
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

      const x = await db.collection('users').doc(currentUser.uid).get()
      const currHistory = x.data().weightHistory
      //console.log(x.data().weightHistory)
      currHistory.push(weightRef.current.value)
      //console.log(currHistory)
      db.collection('users').doc(currentUser.uid).update({
        weightHistory: currHistory
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
    x.onSnapshot(doc => {
      const html = `
        <div>${doc.data().weightHistory}</div>
        `
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
      var dataArr = doc.data().weightHistory//[ 6, 8, 10, 12, 11, 7, 5, 8 ];  
      var arrayLen = dataArr.length;  
   
      var largest = 0;  
      for( var i = 0; i < arrayLen; i++ ){  
        var temp = parseInt(dataArr[i]) //convert string to int
        if( temp > largest ){  
          largest = temp;  
        }  
      }
      console.log(largest)
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
      context.fillText( "Day of the week", GRAPH_RIGHT - 900, GRAPH_BOTTOM + 50);  
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
        context.fillText( ( i + 1 ), 150+GRAPH_RIGHT / arrayLen * i, GRAPH_BOTTOM + 25);  
      }  
      context.stroke();  
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