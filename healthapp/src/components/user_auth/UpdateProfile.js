import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./context"
import { Link, useHistory } from "react-router-dom"
import { db } from "../../firebase"

export default function UpdateProfile() {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const goalsRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value) {
      try {
        updateEmail(emailRef.current.value)
        history.push("/account")
      } catch {
        console.log("Failed to update account")
      }
    }
    if (usernameRef.current.value) {
      db.collection('users').doc(currentUser.uid).update({
        username: usernameRef.current.value
      })
    }
    if (passwordRef.current.value) {
      try {
        updatePassword(passwordRef.current.value)
        history.push("/account")
      } catch {
        console.log("Failed to update account")
      }
    }
    if (goalsRef.current.value) {
      db.collection('users').doc(currentUser.uid).update({
        goals: goalsRef.current.value
      })
    }
    setLoading(false)

    Promise.all(promises)
      .then(() => {
        history.push("/account")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile (Leave entries blank to keep the same)</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label className="username_label2">Username </Form.Label>
              <Form.Control className="form_box1"  type="username" ref={usernameRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label className="email_label2">Email </Form.Label>
              <Form.Control className="form_box1"  type="email" ref={emailRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="password_label">Password </Form.Label>
              <Form.Control className="form_box1"  type="password" ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label className="confirm_label2">Password Confirmation </Form.Label>
              <Form.Control className="form_box1" type="password" ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label className="goal_label2">Goals </Form.Label>
              <Form.Control className="form_box1"as="textarea" rows={3} ref={goalsRef}
                type="goals"
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <center>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
            </center>
          </Form>
        </Card.Body>
      </Card>
      <div style={{textAlign: 'center'}}>
        <Link to="/account">Cancel</Link>
      </div>
    </>
  )
}