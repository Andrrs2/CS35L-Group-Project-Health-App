import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./context"
import { Link, useHistory } from "react-router-dom"

export default function Signin() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/account")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
    <div className="sign_in_cont">
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="sign-in_label">Email </Form.Label>
              <Form.Control className="form_box1" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="sign-in_label">Password </Form.Label>
              <Form.Control className="form_box1" type="password" ref={passwordRef} required placeholder="6 is the minimum"/>
            </Form.Group>
            <div className="buttonContainer_kcal">
            <center>
            <Button disabled={loading} className="w-100" type="submit">
              <p className="text_100">Sign In</p>
            </Button>
            </center>
            </div>
          </Form>
          <div >
            <center>
            <p className="forgot_pass"><Link to="/forgot-password"> Forgot Password?</Link></p>
            </center>
          </div>
        </Card.Body>
      </Card>
      <div >
        <center>
      <p className="forgot_pass">Need an account? <Link to="/signup">Sign Up</Link> </p>
      </center>
      </div>
      </div>
    </>
  )
}