
import './App.css';
import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import { useState } from 'react';
import { ThemeProvider } from "styled-components";

import styled from 'styled-components';
// Global Style COmponent Function

import { createGlobalStyle } from "styled-components";
import { FormToContact } from './Components/Form';

const apiUrl = process.env.API_KEY_AWS;
const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;



const GlobalStyles = createGlobalStyle`
/*
=============== 
Variables
===============
*/
:root {
  --primary-light: #b0edfd;
  /* Primary Color */
  --primary: #61DBFB;
  --primary-dark: #316e7e;
  --border: 1px solid #61DBFB;
  --transition: all 0.3s linear;
  --nav-height: 61px;
  --min-footer-height: 11vh;
  --card-height: 30rem;
}

/*
=============== 
Global Styles
===============
*/
body {
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
}

a:hover {
  cursor: pointer;
}

.navbar {
  border-bottom: var(--border);
}

.link-icons {
  line-height: 0;
  font-size: 2.25rem;
  transition: var(--transition);
  color: ${({ theme }) => theme.color};

  &:hover {
        color: var(--primary);
      }
}

.section {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: var(--nav-height) 0;
}

.title {
    font-family: "Permanent Marker";
}

.card {
  height: var(--card-height);
  border: var(--border);
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }

  .card-img-top {
    height: 50%;
    object-fit: contain;
  }
}

.page-item.active .page-link {
    background-color: var(--primary);
    border-color: var(--primary);
}

@media screen and (min-width: 800px) {
  .link-icons {
    font-size: 3rem;
  }
  .form-group {
      max-width: 750px;
    }
}

 @media screen and (min-width: 1367px) {
  .link-icons:hover {
    color: var(--primary);
  }
  }
`;


// Title File Component

const Title = styled.div`
  justify-content: center;
  text-align: center;
  font-size: 18px;

  display: inline-block;
  margin: 0 auto;
  font-family: "Permanent Marker";
  .underline {
    height: 0.25rem;
    width: 75%;
    min-width: 3rem;
    border-radius: 0.25rem;
    background: var(--clr-primary-5);
    margin: 0 auto 1.5rem auto;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(to left, var(--primary-light), var(--primary-dark))"
        : "linear-gradient(to right, var(--primary-dark), var(--primary-light))"};
  }
`





const themes ={
  light:{
    name: "light",
    color: "#45413C",
    background: "#F5F2E8",
  },
  dark:{
    name: "dark",
    color: "#FBFDFF",
    background: "#27272A",
  }
}

function App() {



  const [ theme, setTheme ] = useState("light");
  useEffect(()=>{
    darkMode ? setTheme("dark"): setTheme("light");
  }, [theme]);


  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) =>
      e.matches ? setTheme("dark") : setTheme("light")
    );

  return (
    <div className="App">
      <ThemeProvider theme={themes[theme]}>
      <GlobalStyles />
      <main className="d-flex flex-column vh-100 align-items-center justify-content-center">
        <Container className="d-flex">
          <Title>
            <h2>Contact Me</h2>
            <div className="underline"></div>
          </Title>
        </Container>
        <Container>
          <FormToContact apiUrl={apiUrl} theme={themes[theme]} />
        </Container>
      </main>
    </ThemeProvider>
    </div>
  );
}

export default App;
