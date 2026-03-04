import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Card from "./components/Card.jsx";
import Login from "./components/Login.jsx";
import "./styles/App.css";
import InputBox from "./components/InputBox.jsx";
import ForgotPasswordForm from "./components/ForgotPasswordForm.jsx";
import ButtonBlue from "./components/ButtonBlue.jsx";
import ButtonGradient from "./components/ButtonGradient.jsx";
import ButtonDanger from "./components/ButtonDanger.jsx";
import LabelH1 from "./components/LabelH1.jsx";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ForgotPasswordForm />
    </>
  );
}

