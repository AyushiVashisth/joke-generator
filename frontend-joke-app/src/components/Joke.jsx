import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  CSSReset,
  keyframes,
  useToast,
} from "@chakra-ui/react";

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideInAnimation = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
`;

const scaleAnimation = keyframes`
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

const typewriterAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

function Joke() {
  const [query, setQuery] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const jokeContainerRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (joke !== "") {
      setShowTypewriter(true);
      animateJokeDisplay();
    }
  }, [joke]);

  const generateJoke = async () => {
    setLoading(true);
    setShowTypewriter(false);
    setJoke("");
    try {
      const response = await axios.get(
        `https://joke-generator-api.onrender.com/jokes?type=${query}`
      );
      setJoke(response.data.joke);
    } catch (error) {
      console.error("Error:", error.response.data);
      toast({
        title: "Error",
        description: "Failed to fetch joke. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const animateJokeDisplay = () => {
    const jokeText = jokeContainerRef.current.innerText;
    let displayText = "";
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      displayText += jokeText[currentIndex];
      currentIndex++;
      jokeContainerRef.current.innerText = displayText;

      if (currentIndex >= jokeText.length) {
        clearInterval(typingInterval);
      }
    }, 50);
  };

  return (
    <>
      <CSSReset />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        backgroundColor="primary.900"
        animation={`${fadeInAnimation} 0.5s ease`}
      >
        <Box
          width="500px"
          padding="2rem"
          backgroundColor="primary.800"
          borderRadius="xl"
          boxShadow="dark-lg"
          textAlign="center"
          color="secondary"
          animation={`${slideInAnimation} 0.5s ease`}
        >
          <Heading as="h1" mb="2rem" color="secondary">
            Joke Generator
          </Heading>
          <Input
            type="text"
            placeholder="Enter the type of joke"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            mb="1.5rem"
            size="lg"
            variant="filled"
            color={"white"}
            _focus={{ borderColor: "primary.400", color: "white" }}
            _placeholder={{ color: "black" }}
          />
          <Button
            color="secondary"
            onClick={generateJoke}
            mb="1.5rem"
            size="lg"
            variant="solid"
            _hover={{ bg: "secondary", color: "primary.900" }}
            isLoading={loading}
            loadingText="Generating"
            border={"2px solid yellow"}
          >
            Generate Joke
          </Button>
          {joke && (
            <Box
              padding="1.5rem"
              backgroundColor="primary.700"
              borderRadius="md"
              color="primary.100"
              fontWeight="bold"
              cursor="pointer"
              _hover={{
                transform: "scale(1.05)",
                animation: `${scaleAnimation} 0.2s ease`,
              }}
              onClick={() =>
                toast({
                  title: "Joke",
                  description: joke,
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                })
              }
              ref={jokeContainerRef}
            >
              <Text
                fontSize="xl"
                color="secondary"
                whiteSpace="nowrap"
                animation={`${typewriterAnimation} ${
                  joke.length * 50
                }ms steps(${joke.length + 1})`}
              >
                {joke}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Joke;
