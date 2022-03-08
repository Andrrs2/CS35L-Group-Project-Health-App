import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./context"
import { Link, useHistory } from "react-router-dom"


export default function Signout() {
  const { logout } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

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

  return (
    <>
    <center>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Out</h2>
          {error && <Alert variant="danger">{error}</Alert>}
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