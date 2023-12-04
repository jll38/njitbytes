import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { Button } from "@mui/joy";
import { motion, useAnimation } from "framer-motion";
import Layout from "./Layout";
import { Logo } from "../components/Logo";
import axios from "axios";

const chopsticks = [
  { size: "small", image: "/images/little_chopstick.png" },
  { size: "medium", image: "/images/chopstick.png" },
  { size: "large", image: "/images/big_chopstick.png" },
];

const Sushi = ({ sushiPosition, jumpControls }) => (
  <motion.img
    src="/images/animated_sushi.png"
    alt="Sushi"
    style={{
      width: "11%",
      position: "absolute",
      bottom: `${Math.min(40, Math.max(0, (sushiPosition / 40) * 100))}%`,
      left: "10%",
    }}
    animate={jumpControls}
  />
);

const Chopstick = ({ chopstickPosition, chopstickControls, currentChopstick }) => (
  <motion.img
    src={currentChopstick.image}
    alt={`Chopstick - ${currentChopstick.size}`}
    style={{
      position: "absolute",
      bottom: "0",
      left: `${chopstickPosition}%`,
    }}
    animate={chopstickControls}
  />
);

const Scoreboard = ({ score, highScore }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      width: "70%",
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
    }}
  >
    <div style={{ textAlign: "center", flex: "1" }}>
      <div style={{ fontSize: "1rem", marginBottom: "5px", fontWeight: "bold" }}>
        Game Score
      </div>
      <div style={{ fontSize: "2rem", marginBottom: "15px" }}>{Math.floor(score)}</div>
    </div>
    <div
      style={{
        marginLeft: "20px",
        borderLeft: "1px solid #ccc",
        paddingLeft: "20px",
        flex: "1",
      }}
    >
      <div style={{ fontSize: "1rem", marginBottom: "5px", fontWeight: "bold" }}>
        High Score
      </div>
      <div style={{ fontSize: "2rem", marginBottom: "15px" }}>{Math.floor(highScore)}</div>
    </div>
  </div>
);

const Leaderboard = ({ leaderboard }) => (
  <div
    style={{
      position: "relative",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      width: "35vh",
      margin: "auto",
      boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s",
      transformStyle: "preserve-3d",
      transformOrigin: "center",
      transform: "perspective(1000px) rotateX(0deg)",
    }}
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg)")}
  >
    <div
      style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "10px",
        borderBottom: "1px solid #ccc",
        paddingBottom: "10px",
      }}
    >
      Leaderboard
    </div>
    <div
      style={{
        fontSize: "1.2rem",
        marginBottom: "10px",
        width: "100%",
        display: "block",
        margin: "0 auto",
      }}
    >
      <div style={{ width: "30%", display: "inline-block" }}>Name</div>
      <div style={{ width: "30%", display: "inline-block", textAlign: "right" }}>Score</div>
    </div>
    {leaderboard.map((leaderboardEntry, index) => (
      <div
        key={index}
        style={{
          fontSize: "1.2rem",
          marginBottom: "10px",
          width: "100%",
          display: "block",
          margin: "0 auto",
        }}
      >
        <div style={{ width: "30%", display: "inline-block" }}>{`${index + 1}. ${leaderboardEntry.name}`}</div>
        <div style={{ width: "30%", display: "inline-block", textAlign: "right" }}>
          {Math.round(leaderboardEntry.score)}
        </div>
      </div>
    ))}
  </div>
);

const initialState = {
  gameActive: false,
  score: 0,
  sushiPosition: 0,
  chopstickSpeed: 5,
  chopstickPosition: 100,
  currentChopstick: chopsticks[1],
  canJump: true,
  leaderboard: [],
  highScore: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GAME_ACTIVE":
    case "SET_SCORE":
    case "SET_SUSHI_POSITION":
    case "SET_CHOPSTICK_SPEED":
    case "SET_CHOPSTICK_POSITION":
    case "SET_CURRENT_CHOPSTICK":
    case "SET_CAN_JUMP":
    case "SET_LEADERBOARD":
    case "SET_HIGH_SCORE":
      return { ...state, [action.type]: action.payload };
    default:
      return state;
  }
};

export function Play() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { gameActive, score, sushiPosition, chopstickSpeed, chopstickPosition, currentChopstick, canJump, leaderboard, highScore } = state;

  const sushiRef = useRef(null);
  const chopstickRef = useRef(null);
  const jumpControls = useAnimation();
  const chopstickControls = useAnimation();

  const jump = useCallback(() => {
    if (gameActive && canJump) {
      dispatch({ type: "SET_CAN_JUMP", payload: false });
      jumpControls.start({
        y: [-150, 0],
        transition: { duration: 1.2, ease: "easeInOut" },
        onComplete: () => {
          setTimeout(() => {
            dispatch({ type: "SET_SUSHI_POSITION", payload: 0 });
            dispatch({ type: "SET_CAN_JUMP", payload: true });
          }, 2000);
        },
      });
    }
  }, [gameActive, canJump, jumpControls]);

  const getRandomChopstick = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * chopsticks.length);
    return chopsticks[randomIndex];
  }, []);

  const endGame = async () => {
    dispatch({ type: "SET_GAME_ACTIVE", payload: false });

    try {
      const response = await axios.get("https://api.njitbytes.co/leaderboard", {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD,
        },
      });

      if (response.status === 200) {
        const fetchedLeaderboard = response.data;
        dispatch({ type: "SET_LEADERBOARD", payload: fetchedLeaderboard });

        let updatedLeaderboard = [...fetchedLeaderboard];
        let playerAdded = false;

        for (let i = 0; i < fetchedLeaderboard.length; i++) {
          if (score > fetchedLeaderboard[i].score) {
            updatedLeaderboard.splice(i, 0, {
              name: JSON.parse(localStorage.getItem("byte_name")),
              score,
            });
            playerAdded = true;
            break;
          }
        }

        if (!playerAdded && updatedLeaderboard.length < 10) {
          updatedLeaderboard.push({
            name: JSON.parse(localStorage.getItem("byte_name")),
            score,
          });
        }

        updatedLeaderboard = updatedLeaderboard.slice(0, 10);

        dispatch({ type: "SET_LEADERBOARD", payload: updatedLeaderboard });
        localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));

        if (score > highScore) {
          dispatch({ type: "SET_HIGH_SCORE", payload: score });
          localStorage.setItem("highScore", score);
        }
      } else {
        throw new Error("Failed to fetch leaderboard");
      }
    } catch (error) {
      console.error("Error updating leaderboard:", error);
    }
  };

  const gameLoop = useCallback(() => {
    if (gameActive) {
      dispatch({ type: "SET_SCORE", payload: score + 0.1 });

      const isJumping = sushiPosition > 1 && sushiPosition <= 40;
      const newPosition = isJumping ? sushiPosition - 2 : sushiPosition + 2;

      if (isJumping) {
        dispatch({ type: "SET_SUSHI_POSITION", payload: Math.min(40, Math.max(0, newPosition)) });
      }

      dispatch({ type: "SET_CHOPSTICK_POSITION", payload: chopstickPosition - chopstickSpeed });

      const sushiRect = sushiRef.current?.getBoundingClientRect();
      const chopstickRect = chopstickRef.current?.getBoundingClientRect();

      if (
        sushiRect?.top < chopstickRect?.bottom &&
        sushiRect?.bottom > chopstickRect?.top &&
        sushiRect?.left < chopstickRect?.right &&
        sushiRect?.right > chopstickRect?.left
      ) {
        endGame();
      }

      if (chopstickPosition < 0) {
        dispatch({ type: "SET_CHOPSTICK_POSITION", payload: 100 });
        dispatch({ type: "SET_CURRENT_CHOPSTICK", payload: getRandomChopstick() });

        if (score % 100 === 0 && chopstickSpeed < 100) {
          dispatch({ type: "SET_CHOPSTICK_SPEED", payload: chopstickSpeed + 2 });
        }
      }

      jumpControls.start({
        bottom: `${Math.min(40, Math.max(0, (sushiPosition / 40) * 100))}%`,
        transition: { duration: 0.1 },
      });

      chopstickControls.start((i) => ({
        x: [-100, 0],
        transition: { duration: chopstickSpeed, ease: "linear", delay: i * 0.1 },
      }));
    }
  }, [gameActive, score, sushiPosition, chopstickSpeed, chopstickPosition, jumpControls, chopstickControls, getRandomChopstick, sushiRef, chopstickRef, endGame]);

  const startGame = useCallback(() => {
    dispatch({ type: "SET_GAME_ACTIVE", payload: true });
    dispatch({ type: "SET_SCORE", payload: 0 });
    dispatch({ type: "SET_SUSHI_POSITION", payload: 0 });
    dispatch({ type: "SET_CHOPSTICK_SPEED", payload: 6 });
    dispatch({ type: "SET_CHOPSTICK_POSITION", payload: 100 });
    dispatch({ type: "SET_CURRENT_CHOPSTICK", payload: getRandomChopstick() });
  }, [getRandomChopstick]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.njitbytes.co/leaderboard", {
          auth: {
            username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
            password: process.env.REACT_APP_BASIC_AUTH_PASSWORD,
          },
        });
  
        if (response.status === 200) {
          const leaderboardData = response.data;
          dispatch({ type: "SET_LEADERBOARD", payload: leaderboardData });
        } else {
          console.error("Failed to fetch leaderboard");
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
  
    fetchData(); // Fetch leaderboard on component mount
  
    const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    dispatch({ type: "SET_LEADERBOARD", payload: storedLeaderboard });
    dispatch({ type: "SET_HIGH_SCORE", payload: Number(localStorage.getItem("highScore")) || 0 });
  
    const gameLoopInterval = setInterval(() => {
      gameLoop();
      if (sushiPosition === 0 && !canJump) {
        dispatch({ type: "SET_CAN_JUMP", payload: true });
      }
    }, 100);
  
    return () => clearInterval(gameLoopInterval);
  }, [gameLoop, sushiPosition, canJump]);

  return (
    <Layout>
      <Logo includeChip={false} />
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        {/* ... Game introduction and background */}
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Welcome to Sushi Run!
        </div>
        <div
          style={{
            position: "relative",
            width: "90%",
            paddingTop: "45%",
            border: "3px solid #4CAF50",
            overflow: "hidden",
            marginBottom: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          }}
        >
          <img
            src="/images/animated_background.png"
            alt="Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: "0",
              left: "0",
            }}
          />
          {gameActive && <Sushi sushiPosition={sushiPosition} jumpControls={jumpControls} />}
          {gameActive && (
            <Chopstick
              chopstickPosition={chopstickPosition}
              chopstickControls={chopstickControls}
              currentChopstick={currentChopstick}
            />
          )}
        </div>
        {/* ... Game score display */}
        <Scoreboard score={score} highScore={highScore} />
        {/* ... Game controls */}
        <div>
          {!gameActive && (
            <Button
              variant="contained"
              onClick={startGame}
              sx={{
                fontSize: "1.5rem",
                marginTop: "20px",
                borderRadius: "20px",
                backgroundColor: "#4CAF50",
                color: "white",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              Start Game
            </Button>
          )}
          {gameActive && (
            <Button
              variant="contained"
              onClick={jump}
              sx={{
                fontSize: "1.5rem",
                marginTop: "20px",
                borderRadius: "20px",
                backgroundColor: canJump ? "#2196F3" : "#ccc",
                color: "white",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: canJump ? "scale(1.1)" : "none",
                },
              }}
            >
              Jump
            </Button>
          )}
        </div>
        {/* ... Game instructions */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <div style={{ fontSize: "1rem", marginBottom: "20px" }}>
            Help the sushi jump over the chopsticks and see how far you can go.
          </div>
          <div style={{ fontSize: "1rem" }}>Use the "Jump" button to make the sushi jump. Good luck!</div>
        </div>
        {/* ... Leaderboard display */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {leaderboard.length > 0 ? (
            <Leaderboard leaderboard={leaderboard} />
          ) : (
            <div style={{ fontSize: "1rem" }}>No scores yet. Be the first to reach the leaderboard!</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
