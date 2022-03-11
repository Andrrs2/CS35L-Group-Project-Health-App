import React, { useRef, useState, useEffect} from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap"
import "../../App.css";
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

      let currentDate = new Date();
      let cDay = currentDate.getDate();
      let cMonth = currentDate.getMonth() + 1;
      let cYear = currentDate.getFullYear();
      const date = cMonth + "/" + cDay + "/" + cYear

      const x = await db.collection('users').doc(currentUser.uid).get()
      const currHistory = x.data().weightHistory
      const currDateHist = x.data().dateHistory

      currHistory.push(weightRef.current.value)
      currDateHist.push(date)

      db.collection('users').doc(currentUser.uid).update({
        weightHistory: currHistory,
        dateHistory: currDateHist
      })
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
      var GRAPH_BOTTOM = 525;  
      var GRAPH_LEFT = 150;  
      var GRAPH_RIGHT = 1850;   
   
      var GRAPH_HEIGHT = 500;   
      var GRAPH_WIDTH = 450;  
   
      // clear canvas (if another graph was previously drawn)  
      context.clearRect( 0, 0, 4000, 1000 );   
   
      // draw X and Y axis  
      context.beginPath();  
      context.moveTo( GRAPH_LEFT, GRAPH_TOP );  
      context.lineTo( GRAPH_LEFT, GRAPH_BOTTOM );  
      context.lineTo( GRAPH_RIGHT+1000, GRAPH_BOTTOM );  
      context.stroke();
   
      var largest = 0;  
      for( var i = 0; i < arrayLen; i++ ){  
        var temp = parseInt(dataArr[i]) //convert string to int
        if( temp > largest ){  
          largest = temp;  
        }  
      }
      // set font for fillText()  
      context.font = "16px Arial";  
      
      // draw reference line  
      context.beginPath();  
      context.strokeStyle = "#BBB";  
      context.moveTo( GRAPH_LEFT, GRAPH_TOP );  
      context.lineTo( GRAPH_RIGHT + 1000, GRAPH_TOP );  
      // draw reference value for hours  
      context.fillText( largest, GRAPH_LEFT - 55, GRAPH_TOP);  
      context.stroke();  
   
      // draw reference line  
      context.beginPath();  
      context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT ) / 4 * 3 + GRAPH_TOP );  
      context.lineTo( GRAPH_RIGHT + 1000, ( GRAPH_HEIGHT ) / 4 * 3 + GRAPH_TOP );  
      // draw reference value for hours  
      context.fillText( largest / 4, GRAPH_LEFT - 55, ( GRAPH_HEIGHT ) / 4 * 3 + GRAPH_TOP);  
      context.stroke();  
   
      // draw reference line  
      context.beginPath();  
      context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT ) / 2 + GRAPH_TOP );  
      context.lineTo( GRAPH_RIGHT + 1000, ( GRAPH_HEIGHT ) / 2 + GRAPH_TOP );  
      // draw reference value for hours  
      context.fillText( largest / 2, GRAPH_LEFT - 55, ( GRAPH_HEIGHT ) / 2 + GRAPH_TOP);  
      context.stroke();  
   
      // draw reference line  
      context.beginPath();  
      context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT ) / 4 + GRAPH_TOP );  
      context.lineTo( GRAPH_RIGHT + 1000, ( GRAPH_HEIGHT ) / 4 + GRAPH_TOP );  
      // draw reference value for hours  
      context.fillText( largest / 4 * 3, GRAPH_LEFT - 55, ( GRAPH_HEIGHT ) / 4 + GRAPH_TOP);  
      context.stroke();  
  
      // draw titles  
      context.fillText( "Entry Date", GRAPH_RIGHT - 900, GRAPH_BOTTOM + 50);  
      context.fillText( "Weight (lbs)", GRAPH_LEFT - 150, GRAPH_HEIGHT / 2);  
  
      context.beginPath();  
      context.lineJoin = "round";  
      context.strokeStyle = "black";  
  
      context.moveTo( GRAPH_LEFT, ( GRAPH_HEIGHT - dataArr[ 0 ] / largest * GRAPH_HEIGHT ) + GRAPH_TOP);  
      // draw reference value for day of the week  
      for( var i = 0; i < arrayLen; i++ ){  
        context.lineTo( GRAPH_RIGHT / arrayLen * i + GRAPH_LEFT, ( GRAPH_HEIGHT - dataArr[ i ] / largest * GRAPH_HEIGHT ) + GRAPH_TOP );  
        // draw reference value for day of the week  
        context.fillText( dateArr[i], 150+GRAPH_RIGHT / arrayLen * i, GRAPH_BOTTOM + 25);  
      }  
      context.stroke();
      });
  }
  
  

  return (
    <>
    <center>
      <canvas id="testCanvas" width="1900" height="600"></canvas>
    </center>
    
    
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
    <h2 style={{color: 'green', marginLeft: '1vw'}}>Your Weight History:</h2>
    <h3 style={{marginLeft: '1vw'}}id="h3"></h3>
    </>
  )
}
