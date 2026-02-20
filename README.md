# Tic Tac Toe

A browser-based Tic Tac Toe game built with vanilla JavaScript, HTML, and CSS.

This project was created as part of The Odin Project curriculum to practice modular JavaScript, game state management, and DOM manipulation without using frameworks.

---

## Features

- Single Player Mode (vs CPU)
- Two Player Mode
- Turn-based engine using modulo logic
- Win detection
- Draw detection
- Dynamic board rendering
- Scoreboard UI
- Modular architecture using an IIFE for game state

---

## What This Project Focuses On

This project emphasizes:

- Separating game logic from UI rendering
- Using an IIFE module pattern to encapsulate private state
- Implementing a turn engine
- Avoiding global state pollution
- Building a simple controller layer to orchestrate events

---

## Architecture Overview

The project is split into three conceptual layers.

### 1. Game Module (IIFE)

Handles:

- Board state
- Player creation
- Move validation
- Win and draw detection
- Turn tracking using `movesMade`
- CPU move generation

Game state is private and only exposed through controlled methods.

---

### 2. Render Layer

Responsible for:

- Drawing the board
- Updating the scoreboard
- Re-rendering after moves

Rendering reads state from the Game module but does not modify it directly.

---

### 3. Controller

Handles:

- Form submission for player setup
- Cell click events
- Triggering CPU moves
- Re-rendering after valid actions

The controller connects UI events to Game logic.

---

## Turn Engine

Turns are determined using:

```js
players[movesMade % players.length]
```

This ensures:

Proper alternating turns

Seamless handling of single-player and two-player modes

No hardcoded player 1 or player 2 logic

CPU Logic

The CPU:

Randomly selects a legal move

Automatically triggers after a valid human move in single-player mode


## Tech Stack

HTML

CSS (Grid Layout)

JavaScript (ES6+)

IIFE Module Pattern

No frameworks or libraries were used.


## Lessons Learned

Avoid caching derived state such as currentPlayer.

Derive turn logic from source-of-truth values.

Keep rendering separate from state mutation.

Event-driven architecture prevents console-driven debugging.

Operator precedence in JavaScript can break ternary expressions unexpectedly.


##  Future Improvements

Smarter CPU using a minimax algorithm

Persistent score tracking

Game reset logic improvements

Animation transitions

Accessibility improvements


## Built While Learning

This project was completed while working through The Odin Project curriculum and served as a deep dive into modular JavaScript and architecture thinking
