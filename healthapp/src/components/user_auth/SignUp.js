import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./context"
import { Link, useHistory } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const usernameRef = useRef()
  const goalsRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(usernameRef.current.value, emailRef.current.value, passwordRef.current.value, goalsRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
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
            <Form.Group id="username">
              <Form.Label className="sign-up_label">Username </Form.Label>
              <Form.Control className="form_box1" type="username" ref={usernameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label className="sign-up_label">Email </Form.Label>
              <Form.Control className="form_box1" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="sign-up_label">Password </Form.Label>
              <Form.Control className="form_box1"  type="password" ref={passwordRef} required placeholder="At least 6 characters"/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label className="sign-up_label">Password Confirmation </Form.Label>
              <Form.Control className="form_box1" type="password" ref={passwordConfirmRef} required placeholder="At least 6 characters"/>
            </Form.Group>
            <Form.Group id="goals">
              <Form.Label className="sign-up_label">Write down your goals! </Form.Label>
              <Form.Control className="form_box1"as="textarea" rows={3} ref={goalsRef} required />
            </Form.Group>
            <div className="buttonContainer_kcal">
              <center>
            <Button disabled={loading} className="w-100" type="submit">
            <p className="text_100">Sign Up</p>
            </Button>
            </center>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div>
        <center>
      <p className="forgot_pass">Already have an account? <Link to="/signin">Sign In</Link></p>
      </center>
      </div>
      </div>
    </>
  )
}
