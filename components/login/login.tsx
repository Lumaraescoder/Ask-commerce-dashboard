import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import React from "react";
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Container,
} from "@nextui-org/react";

const CardTextStyle = {
  textAlign: "center",
  marginBottom: "20px",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundImage: "linear-gradient(45deg, #0099ff, #0066cc)", // Cores azuis
};

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      // Chamada à API
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const { token, isAdmin } = data;

        const decodedToken = jwt_decode(token) as { id: string };
        const userId = decodedToken.id;
        localStorage.setItem("userId", userId);

        if (isAdmin) {
          await router.push("/dashboard");
        } else {
          const userId = localStorage.getItem("userId");
          window.location.href = `http://localhost:8000/?userId=${userId}`;
        }
      } else if (res.status === 404) {
        alert("Utilizador não encontrado!");
      } else {
        alert("Credenciais inválidas!");
      }
    } catch (error) {
      console.error("Erro na chamada à API:", error);
      alert("Foi encontrado um problema com o servidor!");
    }
  };

  return (
    <div>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{ minHeight: "100vh" }}
      >
        <Card css={{ mw: "420px", p: "20px" }}>
          <Text size={24} weight="bold" css={CardTextStyle}>
            Ask Commerce Login
          </Text>
          <form onSubmit={handleSubmit}>
            <Input
              name="username"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Spacer y={1} />
            <Input
              name="password"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Spacer y={2} />
            <Row justify="center">
              <Button type="submit">Login</Button>
            </Row>
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
