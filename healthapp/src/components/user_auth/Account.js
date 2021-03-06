import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./context"
import { Link, useHistory } from "react-router-dom"
import { db } from "../../firebase"


export default function Account() {
  const { logout } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [goals, setGoals] = useState("")
  const { currentUser } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await logout();
      history.push("/")
    } catch {
      setError("Failed to sign out")
    }

    setLoading(false)
  }
  async function updateProfile(e){
    e.preventDefault()
    try {
      history.push("/update_profile")
    } catch {
      setError("Failed to update profile")
    }
  }

  useEffect(() => {
        displayInfo()
  }, []);

  async function displayInfo() {
    var x = db.collection('users').doc(currentUser.uid)
    // const doc = await x.get()
    x.get().then(doc => {
      const html1 = `
        <div textAlign=center>Welcome, ${doc.data().username}!</div>
        
      `;
      const html2 = `
        <div>${doc.data().goals}</div>
        `
      document.getElementById("h1").innerHTML = html1;
      document.getElementById("goals").innerHTML = html2;
    });
  }
  
  

  return (
    <>
    <h1 id="h1" style={{textAlign: "center", color: 'green'}}></h1>
    <h2 style={{color: 'green', marginLeft: '1vw'}}>Your Goals:</h2>
    <h3 style={{marginLeft: '1vw'}}id="goals"></h3>
    <center>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={updateProfile}>
            <Button disabled={loading} className="w-100" type="submit">
                Update Profile
            </Button>
          </Form>
          <Form onSubmit={handleSubmit}>
            <Button disabled={loading} className="w-100" type="submit">
                Sign Out
            </Button>
          </Form>
          
        </Card.Body>
      </Card>
      </center>
    </>
  )
}