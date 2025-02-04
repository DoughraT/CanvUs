import React, { useState, useContext, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles.scss";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { UserContext } from "../context/user";
import { Toast, ToastContainer } from "react-bootstrap";

const Login = () => {
  const socket = useContext(SocketContext);
  const { user, setUser } = useContext(UserContext);

  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  function handleLogin(event) {
    event.preventDefault();
    const myUser = { username: username, password: password };
    socket.emit("log in", myUser);
  }

  useEffect(() => {
    socket.on("Successful Authentication", (username) => {
      setUser(username);
      navigate("/allcanvases");
    });

    socket.on("Failed Authentication", (username) => {
      setShow(true);
    });

    socket.on("No User", (username) => {
      setShow(true);
    });
  }, [socket]);

  return (
    <div className="login">
      <div className="text-center">
        <Image className="logo" src="/logo.png" fluid />
      </div>
      <Form onSubmit={handleLogin}>
        <Form.Group className="login-form mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <br />
          <Form.Control rows={3} autoFocus type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="login-form mb-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <br />
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button size="lg" variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <br />
      <p>
        Don’t have an account? Sign up <a href="/signup">here.</a>
      </p>
      <ToastContainer position="bottom-center">
        <Toast bg="danger" onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>Incorrect username and/or password</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Login;
