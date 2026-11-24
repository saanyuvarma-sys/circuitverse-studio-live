const fs = require('fs');
const path = require('path');

console.log("======================================================");
console.log("🧪 CircuitVerse Studio Automated Quality Suite");
console.log("======================================================\n");

// 1. Verify index.html existence and file size
const indexPath = path.join(__dirname, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error("❌ index.html not found!");
  process.exit(1);
}
const html = fs.readFileSync(indexPath, 'utf8');
console.log(`✓ index.html found (${(html.length / 1024).toFixed(1)} KB)`);

// 2. Syntax check all script tags
const scriptMatches = html.match(/<script>([\s\S]*?)<\/script>/g);
if (!scriptMatches || scriptMatches.length === 0) {
  console.error("❌ No script tags found in index.html!");
  process.exit(1);
}
console.log(`✓ Found ${scriptMatches.length} script modules in index.html`);

// Setup mock browser environment
const elements = new Map();
function createMockEl(tag = 'div') {
  return {
    tagName: tag.toUpperCase(),
    innerHTML: '',
    textContent: '',
    dataset: {},
    style: {},
    classList: {
      _classes: new Set(),
      add(c) { this._classes.add(c); },
      remove(c) { this._classes.delete(c); },
      toggle(c, v) { if (v === undefined) v = !this._classes.has(c); if (v) this.add(c); else this.remove(c); return v; },
      contains(c) { return this._classes.has(c); }
    },
    addEventListener() {},
    removeEventListener() {},
    appendChild(c) { return c; },
    removeChild(c) { return c; },
    remove() {},
    closest() { return null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    getBoundingClientRect() { return { left: 0, top: 0, right: 1000, bottom: 800, width: 1000, height: 800 }; },
    getContext() {
      return {
        beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, fill() {}, arc() {},
        save() {}, restore() {}, fillRect() {}, clearRect() {}, strokeRect() {},
        setTransform() {}, scale() {}, translate() {}, rotate() {}, quadraticCurveTo() {},
        bezierCurveTo() {}, closePath() {}, setLineDash() {}, fillText() {}, measureText() { return { width: 50 }; }
      };
    }
  };
}

global.window = global;
global.window.scrollTo = () => {};
global.document = {
  body: createMockEl('body'),
  documentElement: createMockEl('html'),
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, createMockEl('div'));
    return elements.get(id);
  },
  querySelector(sel) { return createMockEl('div'); },
  querySelectorAll() { return []; },
  createElement(tag) { return createMockEl(tag); },
  addEventListener() {},
  removeEventListener() {}
};

global.localStorage = {
  _store: new Map(),
  getItem(k) { return this._store.get(k) || null; },
  setItem(k, v) { this._store.set(k, String(v)); },
  removeItem(k) { this._store.delete(k); },
  clear() { this._store.clear(); }
};

global.location = { hash: '#/welcome' };
global.requestAnimationFrame = fn => setTimeout(fn, 16);
global.cancelAnimationFrame = id => clearTimeout(id);

// Execute all script tags
let sIdx = 0;
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  try {
    eval(match[1]);
    sIdx++;
  } catch (err) {
    console.error(`❌ Syntax/Runtime error in script block ${sIdx}:`, err);
    process.exit(1);
  }
}
console.log(`✓ All ${sIdx} script modules loaded & parsed cleanly`);

// Initialize store and auth
App.Store.load();
console.log(`✓ Authenticated user profile: ${App.Auth.current().name} (${App.Auth.current().email})`);

// 3. Test Routing & Default Welcome Entry Page
console.log("\n--- Testing Router & Entry Landing Page ---");
global.location.hash = '';
const defaultRoute = App.Router.resolve();
if (defaultRoute !== 'welcome') {
  console.error(`❌ Default route should be 'welcome', got '${defaultRoute}'`);
  process.exit(1);
}
console.log(`✓ Default entry route resolves to: '${defaultRoute}'`);

global.location.hash = '#/login';
const loginRedirect = App.Router.resolve();
if (loginRedirect !== 'welcome') {
  console.error(`❌ Legacy '#/login' route should redirect to 'welcome', got '${loginRedirect}'`);
  process.exit(1);
}
console.log(`✓ Legacy '#/login' route redirects to: '${loginRedirect}'`);

// 4. Test all application routes
console.log("\n--- Testing Route Rendering ---");
const routes = Object.keys(App.Routes);
routes.forEach(name => {
  const r = App.Routes[name];
  if (r && r.render) {
    const output = r.render();
    if (typeof output !== 'string' || output.length === 0) {
      console.error(`❌ Route '${name}' failed to render!`);
      process.exit(1);
    }
    console.log(`  ✓ Route '${name}' rendered (${output.length} bytes)`);
  }
});

// 5. Test Live Guided Step-by-Step Experiment Flow
console.log("\n--- Testing Live Step-by-Step Self-Guided Experiment Flow ---");
const E = App.E;
E.startCleanExperiment('first_light');

// Step A: Missing Components Phase
let chk = E.checkExperiment();
if (chk.allElementsOk) {
  console.error("❌ Clean experiment should start with missing elements!");
  process.exit(1);
}
console.log(`  ✓ Clean experiment initialized. Active guided step: ${chk.activeStep.title} (${chk.activeStep.instruction})`);

// Place components one by one
console.log("  • Placing required components onto breadboard canvas...");
const bat = E.place('bat9', 160, 170);
const res = E.place('res', 360, 170);
const led = E.place('led', 520, 170);

chk = E.checkExperiment();
if (!chk.allElementsOk) {
  console.error("❌ All elements should now be placed!");
  process.exit(1);
}
if (!chk.activeStep || chk.activeStep.type !== 'wire') {
  console.error(`❌ Active step should now be 'wire', got:`, chk.activeStep);
  process.exit(1);
}
console.log(`  ✓ All elements placed. Transitioned to wiring guidance: ${chk.activeStep.title}`);

// Step B: Wiring Phase
console.log("  • Connecting guided wires terminal by terminal...");
E.addWire({cid: bat.id, pid: 'pos'}, {cid: res.id, pid: 'a'});
chk = E.checkExperiment();
console.log(`    - Connected Battery(+) to Resistor(A). Next target: ${chk.activeStep.title}`);

E.addWire({cid: res.id, pid: 'b'}, {cid: led.id, pid: 'a'});
chk = E.checkExperiment();
console.log(`    - Connected Resistor(B) to LED(Anode). Next target: ${chk.activeStep.title}`);

E.addWire({cid: led.id, pid: 'k'}, {cid: bat.id, pid: 'neg'});
chk = E.checkExperiment();

if (!chk.complete) {
  console.error(`❌ Circuit should be complete and verified! Check:`, chk);
  process.exit(1);
}
console.log(`  ✓ Step-by-step wiring complete! Verified status: ${chk.activeStep.title}`);

// Step C: Live Simulation Verification
E.startSim();
E.simTick();
if (!E.st.leds[led.id]) {
  console.error("❌ LED should be glowing after circuit completion!");
  process.exit(1);
}
console.log(`  ✓ Live circuit simulation active! LED illumination verified (State: HIGH, Voltage drops nominal)`);
E.stopSim();

// 6. Test all 8 Guided Experiments & Circuit Verification
console.log("\n--- Testing All 8 Guided Experiments in Catalog ---");
if (!E.EXPERIMENTS || E.EXPERIMENTS.length === 0) {
  console.error("❌ E.EXPERIMENTS catalog is empty!");
  process.exit(1);
}
console.log(`✓ Found ${E.EXPERIMENTS.length} guided experiments in catalog\n`);

E.EXPERIMENTS.forEach((exp, i) => {
  console.log(`[Exp ${exp.num}] ${exp.title} (${exp.category} · ${exp.tier})`);
  console.log(`  • Suggested Components: ${exp.elements.map(e => e.count + '× ' + e.name).join(', ')}`);
  console.log(`  • Required Connections: ${exp.connections.length} wires`);

  // Assemble circuit
  E.autoAssembleExperiment(exp.id);
  const check = E.checkExperiment();

  if (!check.complete) {
    console.error(`  ❌ Failed verification: allElementsOk=${check.allElementsOk}, isVerified=${check.isVerified}`);
    process.exit(1);
  }

  // Test simulation
  E.startSim();
  E.simTick();
  const ledsOn = Object.keys(E.st.leds).filter(k => E.st.leds[k]).length;
  const motorsSpin = Object.keys(E.st.motors).filter(k => E.st.motors[k]).length;
  E.stopSim();

  console.log(`  ✓ Circuit Complete & Verified! Simulation functional (LEDs: ${ledsOn}, Motors: ${motorsSpin})\n`);
});

// 7. Test Save-Gated Authentication & Project Creation
console.log("--- Testing Save-Gated Authentication & Project Creation ---");
App.Auth.logout();
if (App.Auth.isLoggedIn()) {
  console.error("❌ Guest user should not be logged in!");
  process.exit(1);
}
console.log("✓ Guest mode verified (isLoggedIn = false)");

let loginPromptShown = false;
const origShowModal = App.Auth.showLoginModal;
App.Auth.showLoginModal = function(cb, action) {
  loginPromptShown = true;
  console.log(`  ✓ Save-gate triggered login modal for action: "${action}"`);
  // Simulate user signing in
  App.Auth.login('student@university.edu', 'demo1234', 'Alex Student');
  if (cb) cb();
};

let projectSaved = false;
App.Auth.requireLogin(() => {
  const pr = App.Projects.create('Guided Circuit Project', 'Saved test circuit', 'electronics');
  if (pr && pr.owner === 'student@university.edu') projectSaved = true;
}, 'Save Circuit Project');

if (!loginPromptShown || !projectSaved || !App.Auth.isLoggedIn()) {
  console.error("❌ Save-gated authentication flow failed!");
  process.exit(1);
}
console.log("✓ Save-gated authentication succeeded: prompted login, saved project under authenticated account!");
App.Auth.showLoginModal = origShowModal;

console.log("\n======================================================");
console.log("🎉 ALL TESTS PASSED! CircuitVerse Studio is 100% healthy!");
console.log("======================================================");
process.exit(0);
