import React, { useEffect, useState } from "react"
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import {useAuthenticate} from '../oAuth/useAuthenticate'

function Login({ onLoginSuccessful }: any) {
  const [accessId, setAccessId] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)

  const [logonClick, setLogonClick] = useState(false) 

  const onAccessIdChange = (event: any) => setAccessId(event.target.value)
  const onPasswordChange = (event: any) => setPassword(event.target.value)

  const [forgeRockSession, loading, isLoggedIn, error] 
    = useAuthenticate(logonClick, accessId, password)

  useEffect(() => {
    isLoggedIn && onLoginSuccessful() 
      
    error && setHasError(error)
  }, [loading, forgeRockSession])

  const onSubmit = (event: any) => {
    event.preventDefault()
    setHasError(false)
    setLogonClick(true)
  }

  return (
    <Container>
      <Card className="mt-5">
        <Card.Header as="h1">Login</Card.Header>
        <Card.Body>
          <Form className="w-100" onSubmit={onSubmit}>
            <Form.Group controlId="formAccessId">
              <Form.Label>Access Id</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter access id"
                onChange={onAccessIdChange}
                value={accessId}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={onPasswordChange}
                value={password}
              />
            </Form.Group>
            {hasError && (
              <Alert variant={"danger"}>
                The access id and password you entered don't match any
                account. Please try again.
              </Alert>
            )}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login