import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    // TODO: Validate username and password
    return true;
  }

  function handleLogin(event) {
    // TODO: Login user
    navigate('/allcanvases');
  }

  return (
    <div className="login">
      <div className="text-center">
        <Image className="logo" src="/logo.png" fluid />
      </div>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <br />
          <Form.Control rows={3} autoFocus type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <br />
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button size="lg" variant="primary" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      <br />
      <p>
        Don’t have an account? Sign up <a href="/signup">here.</a>
      </p>
    </div>
  );
};

export default Login;
