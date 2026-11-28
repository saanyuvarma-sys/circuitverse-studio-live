# CircuitVerse Studio

**Design. Simulate. Explore.**

CircuitVerse Studio is an interactive, browser-based engineering learning platform for exploring electronics, digital circuits, aerospace mechanics, and simulation workflows.

## Live Website

https://saanyuvarma-sys.github.io/CircuitVerse-Studio/

---

## What's New & Upgraded

### 1. Frictionless Exploration & Save-Gated Projects
- **Explore 100% Freely**: Zero barriers, passwords, or mandatory login required on initial entry. Explore, build circuits, test sensors and motors, and run simulations freely in guest mode.
- **Save-Gated Personal Projects**: When you are ready to save a circuit project or manage custom projects across sessions, sign in with your email or use one-click demo sign-in to securely store your designs.
- **Brand New Entry Landing Page (`#/welcome`)**: A clean, responsive welcome hub presenting quick actions, the 3 laboratories showcase, a quick-start experiment matrix, and instant access to the Electronics Lab with zero friction.
- **Persistent Local Session**: Work is automatically saved in your browser's local storage under your engineering profile with XP, achievements, and offline project management.

### 2. Live Self-Guided Experiment Assistant
- **Step-by-Step Hands-On Guidance**: When users build circuits by themselves, the studio actively guides each move:
  - **Component Guidance**: Points out which component to place next with pulsing golden highlights (`PLACE NEXT`) in the component library sidebar.
  - **Canvas Pin Overlays**: When wiring, the canvas dynamically renders glowing target beacons around the exact terminals to connect (`1. START` in Gold, `2. TARGET` in Green) along with animated trajectory curves.
  - **Live Connection Detection**: As soon as a terminal-to-terminal wire is created, the assistant automatically detects it and advances to the next step.
- **Self-Guided Mode vs. Auto-Assemble**:
  - `Build Yourself (Step-by-Step)`: Clears the breadboard and guides you through building the schematic by hand from scratch.
  - `Auto-Assemble`: One-click schematic placement and wiring for instant solution inspection.

### 3. Real-Time Simulation Engine & Verified Circuits
- When a circuit is completed, the simulation immediately fires up:
  - **LEDs** illuminate with authentic radial glow and voltage-drop simulation.
  - **Push Buttons & Knife Switches** toggle states in real time on canvas.
  - **555 Timer IC** astable oscillators pulse and blink output LEDs at selectable frequencies.
  - **Arduino Uno** microcontrollers run pin 13 blinking clock cycles.
  - **DC Motors** spin with motion-blur rotor graphics and compute rotational RPM.
  - **LDR Photoresistors** detect ambient lighting thresholds to control night-lights.

### 4. Pixel-Perfect Alignment & Responsive Design
- Clean grid alignment across `.welcome-grid`, `.lab-cards`, `.proj-grid`, and `.expt-list`.
- Unified 3-column laboratory layout with matching heights across the component library, canvas stage, and inspector tabs.

---

## Laboratories

- **Electronics Lab** — interactive circuit construction, component suggestions, step-by-step wiring guides, digital logic simulation, and real-time circuit verification.
- **Aerospace Lab** — educational aerospace systems, satellite power simulation, orbital mechanics, and UAV flight telemetry.
- **Simulation Lab & Mission Control** — multi-channel waveform inspection, session recordings, and analytical telemetry.

---

## 8 Built-in Guided Experiments

1. **[EXP 01] First Light (LED + Resistor Loop)** — 9V Battery → 220Ω Resistor → Red LED.
2. **[EXP 02] Interactive Push-Button Switch** — Momentary tactile push switch controlling current flow to an LED.
3. **[EXP 03] SPST Knife Toggle Switch** — Maintained power switch activating a yellow indicator light.
4. **[EXP 04] Arduino Uno D13 LED Blink** — Microcontroller pin D13 flashing an LED with a 1 Hz digital square wave.
5. **[EXP 05] 555 Timer Astable Oscillator** — Dual RC network timer generating repetitive square wave clock pulses.
6. **[EXP 06] Dual-Input AND Logic Gate** — Binary logic gate demonstrating $Y = A \cdot B$ boolean switching.
7. **[EXP 07] DC Motor Electromechanical Drive** — Direct current motor converting electrical energy into mechanical rotational torque.
8. **[EXP 08] LDR Photoresistor Night-Light** — Photoconductive cadmium sulfide sensor triggering light threshold detection.

---

## Run Locally

### Option 1: Node.js (Recommended)
```bash
npm start
# or
node serve.js
```
Then open [http://localhost:3000/](http://localhost:3000/) in your browser.

### Option 2: Python
```bash
python -m http.server 8080
```
Then open [http://localhost:8080/](http://localhost:8080/) in your browser.

### Option 3: Direct File
Open `index.html` directly in any web browser.

---

## Run Automated Quality Tests

To run the built-in quality test suite verifying script modules, all 12 routes, and all 8 self-guided experiments:
```bash
npm test
```

---

## License & Credits

- Created for educational engineering and open-source science simulation.
- Original repository: [CircuitVerse-Studio](https://github.com/saanyuvarma-sys/CircuitVerse-Studio)
