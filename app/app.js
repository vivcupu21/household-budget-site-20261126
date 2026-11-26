/* Kitchen Table — household budget site.
   All data is the Marlowe household's own demo data, kept in this file.
   Edits are saved in the browser (localStorage) and never leave the device. */
"use strict";

/* The demo household lives in November 2026, so every figure on the site
   (days left in the month, bills due soon) is computed from this fixed day. */
var TODAY = new Date(2026, 10, 26);
var MONTHS = ["2026-10", "2026-11"];
var MONTH_NAMES = { "2026-10": "October 2026", "2026-11": "November 2026" };
var SHORT_MONTHS = { "2026-06": "Jun", "2026-07": "Jul", "2026-08": "Aug", "2026-09": "Sep", "2026-10": "Oct", "2026-11": "Nov" };

var CATEGORY_COLORS = {
  "Housing": "#2e5339", "Groceries": "#7a9b57", "Transport": "#4d7ea8", "Utilities": "#8a6fb8",
  "Dining Out": "#c05f3c", "Entertainment": "#d9a441", "Health": "#4fa08a", "Kids & School": "#b8577a",
  "Home & Garden": "#6b8e23", "Gifts & Giving": "#c98a2e", "Subscriptions": "#5b7d8a", "Personal": "#93765a",
  "Pets": "#a86a3c", "Savings": "#274c77"
};
var NEEDS = ["Housing", "Groceries", "Transport", "Utilities", "Health", "Kids & School", "Home & Garden"];
var WANTS = ["Dining Out", "Entertainment", "Gifts & Giving", "Subscriptions", "Personal", "Pets"];

var SEED = {
  household: "Marlowe Household",
  budgets: {
    "Housing": 1450, "Groceries": 780, "Transport": 340, "Utilities": 260,
    "Dining Out": 240, "Entertainment": 150, "Health": 180, "Kids & School": 260,
    "Home & Garden": 180, "Gifts & Giving": 120, "Subscriptions": 68,
    "Personal": 200, "Pets": 90, "Savings": 900
  },
  transactions: [
    /* --- November 2026: income --- */
    { id: "t1", date: "2026-11-02", payee: "Maya — salary", category: "Income", amount: 3400, note: "Monthly pay" },
    { id: "t2", date: "2026-11-02", payee: "Jordan — salary", category: "Income", amount: 2450, note: "Monthly pay" },
    /* --- November 2026: spending --- */
    { id: "t3", date: "2026-11-01", payee: "Rent — Maple Court", category: "Housing", amount: 1450, note: "Monthly rent" },
    { id: "t4", date: "2026-11-03", payee: "GreenMart Supermarket", category: "Groceries", amount: 86.40, note: "Weekly shop" },
    { id: "t5", date: "2026-11-03", payee: "Haircut — Sam's Barbers", category: "Personal", amount: 28, note: "" },
    { id: "t6", date: "2026-11-02", payee: "Metro Transit pass", category: "Transport", amount: 65, note: "Monthly pass" },
    { id: "t7", date: "2026-11-02", payee: "Transfer to emergency fund", category: "Savings", amount: 500, note: "Automatic transfer" },
    { id: "t8", date: "2026-11-04", payee: "Bella's Pizzeria", category: "Dining Out", amount: 46.80, note: "Family dinner" },
    { id: "t9", date: "2026-11-05", payee: "City Fuel Station", category: "Transport", amount: 42.30, note: "" },
    { id: "t10", date: "2026-11-05", payee: "School lunch program", category: "Kids & School", amount: 45, note: "November lunches" },
    { id: "t11", date: "2026-11-06", payee: "Cinema — family movie night", category: "Entertainment", amount: 38, note: "4 tickets" },
    { id: "t12", date: "2026-11-07", payee: "GreenMart Supermarket", category: "Groceries", amount: 74.15, note: "Weekly shop" },
    { id: "t13", date: "2026-11-07", payee: "Pet Pantry", category: "Pets", amount: 38.20, note: "Dog food + treats" },
    { id: "t14", date: "2026-11-08", payee: "Noodle House", category: "Dining Out", amount: 32.50, note: "Lunch out" },
    { id: "t15", date: "2026-11-08", payee: "Hardware Store — light bulbs", category: "Home & Garden", amount: 23.40, note: "" },
    { id: "t16", date: "2026-11-09", payee: "BrightSmile Dental", category: "Health", amount: 85, note: "Check-up" },
    { id: "t17", date: "2026-11-10", payee: "NorthNet Internet", category: "Utilities", amount: 79, note: "Monthly bill" },
    { id: "t18", date: "2026-11-10", payee: "Corner Market", category: "Groceries", amount: 32.80, note: "Top-up shop" },
    { id: "t19", date: "2026-11-11", payee: "Art supplies — Craft Store", category: "Kids & School", amount: 28.75, note: "School project" },
    { id: "t20", date: "2026-11-12", payee: "City Fuel Station", category: "Transport", amount: 38.75, note: "" },
    { id: "t21", date: "2026-11-12", payee: "StreamFlix", category: "Subscriptions", amount: 15.99, note: "Monthly plan" },
    { id: "t22", date: "2026-11-12", payee: "MusicWave", category: "Subscriptions", amount: 10.99, note: "Family plan" },
    { id: "t23", date: "2026-11-12", payee: "Birthday gift — Aunt Rosa", category: "Gifts & Giving", amount: 35, note: "" },
    { id: "t24", date: "2026-11-13", payee: "Coffee Corner", category: "Dining Out", amount: 12.40, note: "" },
    { id: "t25", date: "2026-11-14", payee: "GreenMart Supermarket", category: "Groceries", amount: 91.25, note: "Weekly shop" },
    { id: "t26", date: "2026-11-14", payee: "Bookshop — novel", category: "Personal", amount: 18.95, note: "" },
    { id: "t27", date: "2026-11-15", payee: "City Power & Light", category: "Utilities", amount: 132.40, note: "Electricity" },
    { id: "t28", date: "2026-11-15", payee: "Bella's Pizzeria", category: "Dining Out", amount: 52.30, note: "Family dinner" },
    { id: "t29", date: "2026-11-16", payee: "Board Game Cafe", category: "Entertainment", amount: 27.50, note: "Saturday afternoon" },
    { id: "t30", date: "2026-11-16", payee: "Transfer to holiday fund", category: "Savings", amount: 200, note: "Automatic transfer" },
    { id: "t31", date: "2026-11-17", payee: "City Pharmacy", category: "Health", amount: 34.60, note: "Prescription" },
    { id: "t32", date: "2026-11-17", payee: "Garden Center — soil & seeds", category: "Home & Garden", amount: 41.20, note: "Winter planting" },
    { id: "t33", date: "2026-11-18", payee: "City Water", category: "Utilities", amount: 64.20, note: "Water bill" },
    { id: "t34", date: "2026-11-18", payee: "FreshBox Delivery", category: "Groceries", amount: 58.60, note: "Groceries delivered" },
    { id: "t35", date: "2026-11-19", payee: "RideShare — airport run", category: "Transport", amount: 28.40, note: "Picking up Grandma" },
    { id: "t36", date: "2026-11-19", payee: "Vet check — Dr. Paws", category: "Pets", amount: 65, note: "Annual check-up" },
    { id: "t37", date: "2026-11-19", payee: "School field trip", category: "Kids & School", amount: 60, note: "Science museum" },
    { id: "t38", date: "2026-11-20", payee: "Taco Truck", category: "Dining Out", amount: 24.60, note: "Lunch" },
    { id: "t39", date: "2026-11-20", payee: "Cloud Photos", category: "Subscriptions", amount: 2.99, note: "Storage plan" },
    { id: "t40", date: "2026-11-21", payee: "GreenMart Supermarket", category: "Groceries", amount: 79.90, note: "Weekly shop" },
    { id: "t41", date: "2026-11-21", payee: "Clothing — thrift store", category: "Personal", amount: 42.50, note: "Winter coats" },
    { id: "t42", date: "2026-11-22", payee: "Coffee Corner", category: "Dining Out", amount: 9.80, note: "" },
    { id: "t43", date: "2026-11-23", payee: "City Fuel Station", category: "Transport", amount: 41.10, note: "" },
    { id: "t44", date: "2026-11-23", payee: "Mini Golf", category: "Entertainment", amount: 31, note: "Family outing" },
    { id: "t45", date: "2026-11-24", payee: "Corner Market", category: "Groceries", amount: 41.30, note: "Top-up shop" },
    { id: "t46", date: "2026-11-24", payee: "Food bank donation", category: "Gifts & Giving", amount: 25, note: "Monthly giving" },
    { id: "t47", date: "2026-11-25", payee: "Sushi Bar", category: "Dining Out", amount: 68, note: "Anniversary dinner" },
    /* --- October 2026 --- */
    { id: "t48", date: "2026-10-02", payee: "Maya — salary", category: "Income", amount: 3400, note: "Monthly pay" },
    { id: "t49", date: "2026-10-02", payee: "Jordan — salary", category: "Income", amount: 2450, note: "Monthly pay" },
    { id: "t50", date: "2026-10-01", payee: "Rent — Maple Court", category: "Housing", amount: 1450, note: "Monthly rent" },
    { id: "t51", date: "2026-10-02", payee: "Transfer to emergency fund", category: "Savings", amount: 500, note: "Automatic transfer" },
    { id: "t52", date: "2026-10-03", payee: "GreenMart Supermarket", category: "Groceries", amount: 92.10, note: "Weekly shop" },
    { id: "t53", date: "2026-10-04", payee: "Metro Transit pass", category: "Transport", amount: 65, note: "Monthly pass" },
    { id: "t54", date: "2026-10-05", payee: "Haircut — Sam's Barbers", category: "Personal", amount: 28, note: "" },
    { id: "t55", date: "2026-10-06", payee: "Bella's Pizzeria", category: "Dining Out", amount: 44.20, note: "Family dinner" },
    { id: "t56", date: "2026-10-07", payee: "School lunch program", category: "Kids & School", amount: 45, note: "October lunches" },
    { id: "t57", date: "2026-10-08", payee: "Cinema — family movie night", category: "Entertainment", amount: 34, note: "4 tickets" },
    { id: "t58", date: "2026-10-09", payee: "GreenMart Supermarket", category: "Groceries", amount: 81.30, note: "Weekly shop" },
    { id: "t59", date: "2026-10-09", payee: "Pet Pantry", category: "Pets", amount: 34.60, note: "Dog food" },
    { id: "t60", date: "2026-10-10", payee: "NorthNet Internet", category: "Utilities", amount: 79, note: "Monthly bill" },
    { id: "t61", date: "2026-10-11", payee: "City Fuel Station", category: "Transport", amount: 44.20, note: "" },
    { id: "t62", date: "2026-10-12", payee: "City Pharmacy", category: "Health", amount: 41.30, note: "" },
    { id: "t63", date: "2026-10-12", payee: "StreamFlix", category: "Subscriptions", amount: 15.99, note: "Monthly plan" },
    { id: "t64", date: "2026-10-12", payee: "MusicWave", category: "Subscriptions", amount: 10.99, note: "Family plan" },
    { id: "t65", date: "2026-10-13", payee: "Hardware Store — paint", category: "Home & Garden", amount: 31.60, note: "Hallway touch-up" },
    { id: "t66", date: "2026-10-14", payee: "City Power & Light", category: "Utilities", amount: 128.60, note: "Electricity" },
    { id: "t67", date: "2026-10-15", payee: "FreshBox Delivery", category: "Groceries", amount: 64.20, note: "Groceries delivered" },
    { id: "t68", date: "2026-10-16", payee: "Transfer to holiday fund", category: "Savings", amount: 200, note: "Automatic transfer" },
    { id: "t69", date: "2026-10-17", payee: "City Water", category: "Utilities", amount: 61.40, note: "Water bill" },
    { id: "t70", date: "2026-10-18", payee: "Sushi Bar", category: "Dining Out", amount: 61.50, note: "Dinner out" },
    { id: "t71", date: "2026-10-20", payee: "City Fuel Station", category: "Transport", amount: 39.80, note: "" },
    { id: "t72", date: "2026-10-20", payee: "Cloud Photos", category: "Subscriptions", amount: 2.99, note: "Storage plan" },
    { id: "t73", date: "2026-10-21", payee: "School field trip", category: "Kids & School", amount: 40, note: "Farm visit" },
    { id: "t74", date: "2026-10-22", payee: "GreenMart Supermarket", category: "Groceries", amount: 88.45, note: "Weekly shop" },
    { id: "t75", date: "2026-10-23", payee: "Clothing — thrift store", category: "Personal", amount: 55.40, note: "Kids' shoes" },
    { id: "t76", date: "2026-10-24", payee: "Taco Truck", category: "Dining Out", amount: 22.80, note: "Lunch" },
    { id: "t77", date: "2026-10-25", payee: "Board Game Cafe", category: "Entertainment", amount: 24, note: "Saturday afternoon" },
    { id: "t78", date: "2026-10-27", payee: "BrightSmile Dental", category: "Health", amount: 85, note: "Check-up" },
    { id: "t79", date: "2026-10-28", payee: "Corner Market", category: "Groceries", amount: 36.90, note: "Top-up shop" }
  ],
  bills: [
    { id: "b1", name: "Rent — Maple Court", amount: 1450, dueDay: 1, category: "Housing", autopay: true, paid: ["2026-10", "2026-11"] },
    { id: "b2", name: "Home Insurance — SafeCover", amount: 118, dueDay: 5, category: "Housing", autopay: true, paid: ["2026-10", "2026-11"] },
    { id: "b3", name: "NorthNet Internet", amount: 79, dueDay: 10, category: "Utilities", autopay: true, paid: ["2026-10", "2026-11"] },
    { id: "b4", name: "StreamFlix", amount: 15.99, dueDay: 12, category: "Subscriptions", autopay: true, paid: ["2026-10", "2026-11"] },
    { id: "b5", name: "MusicWave", amount: 10.99, dueDay: 12, category: "Subscriptions", autopay: true, paid: ["2026-10", "2026-11"] },
    { id: "b6", name: "City Power & Light", amount: 132.40, dueDay: 15, category: "Utilities", autopay: true, paid: ["2026-10", "2026-11"] },
    { id: "b7", name: "City Water", amount: 64.20, dueDay: 18, category: "Utilities", autopay: false, paid: ["2026-10", "2026-11"] },
    { id: "b8", name: "Mobile — NorthTel", amount: 96, dueDay: 22, category: "Utilities", autopay: true, paid: ["2026-10", "2026-11"] },
    { id: "b9", name: "Gym — Riverside Fitness", amount: 54, dueDay: 3, category: "Health", autopay: true, paid: ["2026-10", "2026-11"] },
    { id: "b10", name: "Car Insurance — SafeCover", amount: 142, dueDay: 28, category: "Transport", autopay: true, paid: ["2026-10"] }
  ],
  goals: [
    { id: "g1", name: "Emergency fund", target: 12000, saved: 7400, date: "2027-12-31", note: "Six months of expenses, for peace of mind." },
    { id: "g2", name: "Summer road trip", target: 2800, saved: 1950, date: "2027-07-01", note: "Two weeks driving the coast with the kids." },
    { id: "g3", name: "New family car", target: 9000, saved: 3200, date: "2028-03-01", note: "Replacing the old sedan before it gives up." },
    { id: "g4", name: "Home repairs", target: 3500, saved: 1100, date: "2027-09-01", note: "Roof patch and a new water heater." }
  ],
  /* Older months, kept as summaries for the Reports page. */
  history: {
    "2026-06": { income: 5850, spent: 4890 },
    "2026-07": { income: 5850, spent: 5120 },
    "2026-08": { income: 5850, spent: 4755 },
    "2026-09": { income: 5850, spent: 5010 }
  }
};

/* ---------------- state ---------------- */
var STORE_KEY = "kitchentable.v1";
var memoryStore = null;
function loadState() {
  try {
    var raw = window.localStorage.getItem(STORE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && parsed.transactions && parsed.budgets) return parsed;
    }
  } catch (e) { /* storage unavailable: keep everything in memory */ }
  return JSON.parse(JSON.stringify(SEED));
}
function saveState() {
  try { window.localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
  catch (e) { memoryStore = state; }
}
var state = loadState();
var currentMonth = "2026-11";
var currentRoute = "dashboard";

/* ---------------- helpers ---------------- */
function $(id) { return document.getElementById(id); }
function money(n) {
  return "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function money0(n) {
  return "$" + Math.round(Number(n)).toLocaleString("en-US");
}
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function monthOf(dateStr) { return dateStr.slice(0, 7); }
function txInMonth(month) {
  return state.transactions.filter(function (t) { return monthOf(t.date) === month; });
}
function monthIncome(month) {
  return txInMonth(month).filter(function (t) { return t.category === "Income"; })
    .reduce(function (s, t) { return s + t.amount; }, 0);
}
function monthSpent(month) {
  return txInMonth(month).filter(function (t) { return t.category !== "Income"; })
    .reduce(function (s, t) { return s + t.amount; }, 0);
}
function categorySpent(month) {
  var out = {};
  txInMonth(month).forEach(function (t) {
    if (t.category === "Income") return;
    out[t.category] = (out[t.category] || 0) + t.amount;
  });
  return out;
}
function totalBudget() {
  return Object.keys(state.budgets).reduce(function (s, k) { return s + state.budgets[k]; }, 0);
}
function fmtDate(dateStr) {
  var d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function daysInMonth(month) {
  var parts = month.split("-");
  return new Date(Number(parts[0]), Number(parts[1]), 0).getDate();
}
function colorFor(cat) { return CATEGORY_COLORS[cat] || "#8a7f6d"; }
function sortTx(a, b) {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.id < b.id ? 1 : -1;
}

/* ---------------- router ---------------- */
var ROUTES = ["dashboard", "budget", "transactions", "bills", "goals", "reports", "calculator"];
function routeFromHash() {
  var h = (window.location.hash || "#/dashboard").replace(/^#\/?/, "");
  return ROUTES.indexOf(h) >= 0 ? h : "dashboard";
}
function showPage(route) {
  currentRoute = route;
  ROUTES.forEach(function (r) {
    var el = $("page-" + r);
    if (el) el.hidden = (r !== route);
  });
  var links = document.querySelectorAll(".mainnav a");
  for (var i = 0; i < links.length; i++) {
    links[i].classList.toggle("active", links[i].getAttribute("data-route") === route);
  }
  render(route);
  window.scrollTo(0, 0);
}
function render(route) {
  renderMonthSwitch();
  if (route === "dashboard") renderDashboard();
  else if (route === "budget") renderBudget();
  else if (route === "transactions") renderTransactions();
  else if (route === "bills") renderBills();
  else if (route === "goals") renderGoals();
  else if (route === "reports") renderReports();
  else if (route === "calculator") renderCalculator();
}
function renderMonthSwitch() {
  var idx = MONTHS.indexOf(currentMonth);
  $("month-label").textContent = MONTH_NAMES[currentMonth];
  $("month-prev").disabled = idx <= 0;
  $("month-next").disabled = idx >= MONTHS.length - 1;
  var sub = $("dash-subtitle");
  if (sub) sub.textContent = "Here is where " + MONTH_NAMES[currentMonth].split(" ")[0] + " stands — what came in, what went out, and what is left.";
  var calcLabel = $("calc-month-label");
  if (calcLabel) calcLabel.textContent = MONTH_NAMES[currentMonth];
}

/* ---------------- dashboard ---------------- */
function donutSVG(spentByCat, total) {
  var size = 190, r = 78, cx = 95, cy = 95;
  var circ = 2 * Math.PI * r;
  var offset = 0;
  var parts = [];
  var cats = Object.keys(spentByCat).sort(function (a, b) { return spentByCat[b] - spentByCat[a]; });
  cats.forEach(function (cat) {
    var frac = total > 0 ? spentByCat[cat] / total : 0;
    var len = frac * circ;
    parts.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + colorFor(cat) +
      '" stroke-width="26" stroke-dasharray="' + Math.max(len - 1.5, 0).toFixed(1) + ' ' + (circ - Math.max(len - 1.5, 0)).toFixed(1) +
      '" stroke-dashoffset="' + (-offset).toFixed(1) + '" />');
    offset += len;
  });
  var pct = total > 0 ? Math.round(100 * (monthSpent(currentMonth) / monthIncome(currentMonth))) : 0;
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="Donut chart of spending by category">' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#efe8d8" stroke-width="26" />' +
    parts.join("") +
    '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" class="donut-center" font-size="24">' + money0(total) + '</text>' +
    '<text x="' + cx + '" y="' + (cy + 18) + '" text-anchor="middle" class="donut-center-sub" font-size="12">spent · ' + pct + '% of income</text>' +
    '</svg>';
}

function renderDashboard() {
  var income = monthIncome(currentMonth);
  var spent = monthSpent(currentMonth);
  var saved = categorySpent(currentMonth)["Savings"] || 0;
  var left = income - spent;
  var spentByCat = categorySpent(currentMonth);

  $("stat-income").textContent = money(income);
  $("stat-income-sub").textContent = "Maya $3,400 + Jordan $2,450";
  $("stat-spent").textContent = money(spent);
  $("stat-spent-sub").textContent = spentByCat ? Object.keys(spentByCat).length + " categories so far" : "";
  var leftEl = $("stat-left");
  leftEl.textContent = money(left);
  leftEl.classList.toggle("warn", left < 0);
  var dim = daysInMonth(currentMonth);
  var dayNo = currentMonth === "2026-11" ? TODAY.getDate() : dim;
  $("stat-left-sub").textContent = (dim - dayNo) + " days left in the month";
  $("stat-saved").textContent = money(saved);
  $("stat-saved-sub").textContent = Math.round(100 * saved / Math.max(income, 1)) + "% of income set aside";

  $("donut").innerHTML = donutSVG(spentByCat, spent);
  var top = Object.keys(spentByCat).sort(function (a, b) { return spentByCat[b] - spentByCat[a]; }).slice(0, 6);
  $("donut-legend").innerHTML = top.map(function (cat) {
    return '<li><span class="swatch" style="background:' + colorFor(cat) + '"></span>' + esc(cat) +
      '<span class="amt">' + money(spentByCat[cat]) + '</span></li>';
  }).join("");

  var cats = Object.keys(state.budgets).sort(function (a, b) { return (spentByCat[b] || 0) - (spentByCat[a] || 0); }).slice(0, 5);
  $("dash-budgets").innerHTML = cats.map(function (cat) {
    var b = state.budgets[cat], s = spentByCat[cat] || 0;
    var pct = b > 0 ? Math.round(100 * s / b) : 0;
    var cls = s > b ? "over" : (pct >= 80 ? "warn" : "");
    var tag = s > b ? "over" : (pct >= 100 ? "fully used" : (pct >= 80 ? "almost there" : "on track"));
    return '<div class="budget-row stack"><span class="cat-name">' + esc(cat) + '</span>' +
      '<span class="bar-wrap"><span class="bar"><i class="' + cls + '" style="width:' + Math.min(pct, 100) + '%"></i></span></span>' +
      '<span class="nums"><b>' + money(s) + '</b><span>of ' + money(b) + '</span></span>' +
      '<span class="pill-wrap"><span class="pill ' + cls + '">' + tag + '</span></span></div>';
  }).join("");

  var upcoming = state.bills
    .filter(function (b) { return b.paid.indexOf(currentMonth) < 0; })
    .sort(function (a, b) { return a.dueDay - b.dueDay; });
  var paidCount = state.bills.filter(function (b) { return b.paid.indexOf(currentMonth) >= 0; }).length;
  var billsHtml = upcoming.map(function (b) {
    var when = currentMonth === "2026-11" && b.dueDay >= TODAY.getDate()
      ? "due in " + (b.dueDay - TODAY.getDate()) + " day" + (b.dueDay - TODAY.getDate() === 1 ? "" : "s")
      : "due on the " + b.dueDay + "th";
    return '<li><span>' + esc(b.name) + ' <span class="due">· ' + when + '</span></span><span class="amt">' + money(b.amount) + '</span></li>';
  }).join("");
  billsHtml += '<li><span class="paid-tag">' + paidCount + ' of ' + state.bills.length + ' bills paid this month</span><span></span></li>';
  $("dash-bills").innerHTML = billsHtml;

  $("dash-goals").innerHTML = state.goals.slice(0, 3).map(function (g) {
    var pct = Math.min(100, Math.round(100 * g.saved / g.target));
    return '<div class="budget-row stack"><span class="cat-name">' + esc(g.name) + '<small>' + money(g.saved) + ' of ' + money(g.target) + '</small></span>' +
      '<span class="bar-wrap"><span class="bar"><i style="width:' + pct + '%"></i></span></span>' +
      '<span class="nums"><b>' + pct + '%</b></span></div>';
  }).join("");

  var recent = txInMonth(currentMonth).filter(function (t) { return t.category !== "Income"; }).sort(sortTx).slice(0, 6);
  $("dash-recent").innerHTML = recent.map(function (t) {
    return '<tr><td>' + fmtDate(t.date) + '</td><td>' + esc(t.payee) + '</td>' +
      '<td><span class="cat-chip">' + esc(t.category) + '</span></td>' +
      '<td class="num neg">−' + money(t.amount) + '</td></tr>';
  }).join("");
}

/* ---------------- budget page ---------------- */
function renderBudget() {
  var spentByCat = categorySpent(currentMonth);
  var planned = totalBudget();
  var spent = monthSpent(currentMonth);
  var income = monthIncome(currentMonth);
  $("bud-planned").textContent = money(planned);
  $("bud-spent").textContent = money(spent);
  $("bud-spent-sub").textContent = Math.round(100 * spent / Math.max(planned, 1)) + "% of the plan used";
  $("bud-ready").textContent = money(income - planned);

  var cats = Object.keys(state.budgets).sort();
  $("budget-rows").innerHTML = cats.map(function (cat) {
    var b = state.budgets[cat], s = spentByCat[cat] || 0;
    var pct = b > 0 ? Math.round(100 * s / b) : 0;
    var cls = s > b ? "over" : (pct >= 80 ? "warn" : "");
    var tag = s > b ? "over by " + money(s - b) : (pct >= 100 ? "fully used" : (pct >= 80 ? "almost there" : "on track"));
    var remaining = b - s;
    return '<div class="budget-row" data-cat="' + esc(cat) + '">' +
      '<span class="cat-name">' + esc(cat) + '<small>' + (remaining >= 0 ? money(remaining) + " left" : money(-remaining) + " over") + '</small></span>' +
      '<span class="bar-wrap"><span class="bar"><i class="' + cls + '" style="width:' + Math.min(pct, 100) + '%"></i></span></span>' +
      '<span class="nums"><b>' + money(s) + '</b><span>' + pct + '% of plan</span></span>' +
      '<span><input type="number" min="0" step="1" value="' + b + '" data-budget-for="' + esc(cat) + '" aria-label="Monthly budget for ' + esc(cat) + '"></span>' +
      '<span class="pill-wrap"><span class="pill ' + cls + '">' + tag + '</span>' +
      (SEED.budgets[cat] === undefined ? ' <button type="button" class="del" data-del-cat="' + esc(cat) + '" aria-label="Remove ' + esc(cat) + '">×</button>' : '') +
      '</span></div>';
  }).join("");

  var inputs = document.querySelectorAll("[data-budget-for]");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", function (ev) {
      var cat = ev.target.getAttribute("data-budget-for");
      var val = Math.max(0, Math.round(Number(ev.target.value) || 0));
      state.budgets[cat] = val;
      saveState();
      renderBudget();
    });
  }
  var dels = document.querySelectorAll("[data-del-cat]");
  for (var j = 0; j < dels.length; j++) {
    dels[j].addEventListener("click", function (ev) {
      var cat = ev.target.getAttribute("data-del-cat");
      delete state.budgets[cat];
      saveState();
      renderBudget();
    });
  }
}

/* ---------------- transactions page ---------------- */
function fillCategorySelects() {
  var cats = Object.keys(state.budgets).sort();
  var txSel = $("tx-category");
  txSel.innerHTML = cats.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join("");
  var billSel = $("bill-category");
  billSel.innerHTML = cats.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join("");
  var filterSel = $("tx-filter-cat");
  var current = filterSel.value;
  filterSel.innerHTML = '<option value="">All categories</option>' +
    '<option>Income</option>' +
    cats.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join("");
  filterSel.value = current;
}

function renderTransactions() {
  fillCategorySelects();
  var q = ($("tx-search").value || "").toLowerCase();
  var catF = $("tx-filter-cat").value;
  var typeF = $("tx-filter-type").value;
  var list = txInMonth(currentMonth).sort(sortTx).filter(function (t) {
    if (catF && t.category !== catF) return false;
    if (typeF === "spending" && t.category === "Income") return false;
    if (typeF === "income" && t.category !== "Income") return false;
    if (q && (t.payee + " " + (t.note || "")).toLowerCase().indexOf(q) < 0) return false;
    return true;
  });
  var income = monthIncome(currentMonth);
  var spent = monthSpent(currentMonth);
  $("tx-count").textContent = "· " + list.length + " of " + txInMonth(currentMonth).length + " in " + MONTH_NAMES[currentMonth];
  $("tx-rows").innerHTML = list.length ? list.map(function (t) {
    var isInc = t.category === "Income";
    return '<tr><td>' + fmtDate(t.date) + '</td><td>' + esc(t.payee) + '</td>' +
      '<td><span class="cat-chip">' + esc(t.category) + '</span></td>' +
      '<td>' + esc(t.note || "") + '</td>' +
      '<td class="num ' + (isInc ? "pos" : "neg") + '">' + (isInc ? "+" : "−") + money(t.amount) + '</td>' +
      '<td><button type="button" class="row-del" data-del-tx="' + t.id + '" aria-label="Delete ' + esc(t.payee) + '">×</button></td></tr>';
  }).join("") : '<tr><td colspan="6">Nothing matches — try a different search or filter.</td></tr>';
  $("tx-balance").textContent = money(income - spent);
  $("tx-balance-sub").textContent = "· income " + money(income) + " minus spending " + money(spent);
  var dels = document.querySelectorAll("[data-del-tx]");
  for (var i = 0; i < dels.length; i++) {
    dels[i].addEventListener("click", function (ev) {
      var id = ev.target.getAttribute("data-del-tx");
      state.transactions = state.transactions.filter(function (t) { return t.id !== id; });
      saveState();
      renderTransactions();
    });
  }
}

/* ---------------- bills page ---------------- */
function billIsPaid(bill, month) { return bill.paid.indexOf(month) >= 0; }
function renderBills() {
  fillCategorySelects();
  var due = 0, paid = 0;
  state.bills.forEach(function (b) {
    if (billIsPaid(b, currentMonth)) paid += b.amount; else due += b.amount;
  });
  $("bill-due").textContent = money(due + paid);
  $("bill-due-sub").textContent = state.bills.length + " recurring bills";
  $("bill-paid").textContent = money(paid);
  $("bill-paid-sub").textContent = state.bills.filter(function (b) { return billIsPaid(b, currentMonth); }).length + " bills settled";
  var leftEl = $("bill-left");
  leftEl.textContent = money(due);
  leftEl.classList.toggle("warn", due > 0 && currentMonth === "2026-11");
  $("bill-left-sub").textContent = state.bills.filter(function (b) { return !billIsPaid(b, currentMonth); }).length + " still open";

  var sorted = state.bills.slice().sort(function (a, b) { return a.dueDay - b.dueDay; });
  $("bill-list").innerHTML = sorted.map(function (b) {
    var isPaid = billIsPaid(b, currentMonth);
    var when = currentMonth === "2026-11" && !isPaid && b.dueDay >= TODAY.getDate()
      ? "Due in " + (b.dueDay - TODAY.getDate()) + " day" + (b.dueDay - TODAY.getDate() === 1 ? "" : "s")
      : (isPaid ? "Paid for " + MONTH_NAMES[currentMonth].split(" ")[0] : "Due on the " + b.dueDay + "th");
    return '<div class="bill-row">' +
      '<span class="bill-name">' + esc(b.name) + '<small>' + esc(b.category) + (b.autopay ? " · autopay on" : " · pay by hand") + '</small></span>' +
      '<span class="bill-amt">' + money(b.amount) + '</span>' +
      '<span>' + when + '</span>' +
      '<span>' + (isPaid ? '<span class="paid-tag">✓ Paid</span>' : '<span class="pill warn">To pay</span>') + '</span>' +
      '<span><button type="button" class="btn btn-small" data-bill-toggle="' + b.id + '">' + (isPaid ? "Mark unpaid" : "Mark paid") + '</button></span>' +
      '</div>';
  }).join("");
  var toggles = document.querySelectorAll("[data-bill-toggle]");
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener("click", function (ev) {
      var id = ev.target.getAttribute("data-bill-toggle");
      for (var k = 0; k < state.bills.length; k++) {
        if (state.bills[k].id === id) {
          var idx = state.bills[k].paid.indexOf(currentMonth);
          if (idx >= 0) state.bills[k].paid.splice(idx, 1);
          else state.bills[k].paid.push(currentMonth);
        }
      }
      saveState();
      renderBills();
    });
  }
}

/* ---------------- goals page ---------------- */
function renderGoals() {
  var savedTotal = state.goals.reduce(function (s, g) { return s + g.saved; }, 0);
  var targetTotal = state.goals.reduce(function (s, g) { return s + g.target; }, 0);
  $("goal-saved").textContent = money(savedTotal);
  $("goal-saved-sub").textContent = Math.round(100 * savedTotal / Math.max(targetTotal, 1)) + "% of all targets";
  $("goal-left").textContent = money(Math.max(targetTotal - savedTotal, 0));

  $("goal-list").innerHTML = state.goals.map(function (g) {
    var pct = Math.min(100, Math.round(100 * g.saved / g.target));
    var done = g.saved >= g.target;
    var monthly = "";
    if (!done && g.date) {
      var end = new Date(g.date + "T12:00:00");
      var monthsLeft = Math.max(1, (end.getFullYear() - TODAY.getFullYear()) * 12 + (end.getMonth() - TODAY.getMonth()));
      monthly = "About " + money((g.target - g.saved) / monthsLeft) + " a month gets there by " +
        end.toLocaleDateString("en-US", { month: "long", year: "numeric" }) + ".";
    }
    return '<article class="goal-card"><h3>' + esc(g.name) + '</h3>' +
      '<p class="goal-meta">' + esc(g.note || "") + '</p>' +
      '<p><strong>' + money(g.saved) + '</strong> of ' + money(g.target) + ' · ' + pct + '%</p>' +
      '<span class="bar"><i style="width:' + pct + '%"></i></span>' +
      '<p class="goal-meta">' + (done ? '<span class="goal-done">✓ Goal reached — well done!</span>' : esc(monthly)) + '</p>' +
      (done ? "" : '<div class="goal-add"><input type="number" min="1" step="1" placeholder="Amount ($)" data-goal-amt="' + g.id + '" aria-label="Amount to add to ' + esc(g.name) + '">' +
        '<button type="button" class="btn btn-primary btn-small" data-goal-add="' + g.id + '">Add funds</button></div>') +
      '</article>';
  }).join("");

  var adds = document.querySelectorAll("[data-goal-add]");
  for (var i = 0; i < adds.length; i++) {
    adds[i].addEventListener("click", function (ev) {
      var id = ev.target.getAttribute("data-goal-add");
      var input = document.querySelector('[data-goal-amt="' + id + '"]');
      var amt = Math.round(Number(input.value) || 0);
      if (amt <= 0) { input.focus(); return; }
      for (var k = 0; k < state.goals.length; k++) {
        if (state.goals[k].id === id) state.goals[k].saved += amt;
      }
      state.transactions.push({
        id: "t" + Date.now(), date: "2026-11-26", payee: "Transfer to " + state.goals.filter(function (g) { return g.id === id; })[0].name,
        category: "Savings", amount: amt, note: "Added from Goals"
      });
      saveState();
      renderGoals();
    });
  }
}

/* ---------------- reports page ---------------- */
function renderReports() {
  var months = ["2026-06", "2026-07", "2026-08", "2026-09", "2026-10", "2026-11"];
  var rows = months.map(function (m) {
    if (state.history[m]) return { m: m, income: state.history[m].income, spent: state.history[m].spent };
    return { m: m, income: monthIncome(m), spent: monthSpent(m) };
  });
  var maxV = 0;
  rows.forEach(function (r) { maxV = Math.max(maxV, r.income, r.spent); });
  $("report-bars").innerHTML =
    '<div class="bars">' + rows.map(function (r) {
      var ih = Math.round(150 * r.income / maxV);
      var sh = Math.round(150 * r.spent / maxV);
      return '<div class="bar-group"><span class="bar-val">' + money0(r.spent) + '</span>' +
        '<div class="bar-pair"><i class="b-inc" style="height:' + ih + 'px" title="Income ' + money(r.income) + '"></i>' +
        '<i class="b-spend" style="height:' + sh + 'px" title="Spent ' + money(r.spent) + '"></i></div>' +
        '<span class="bar-label">' + SHORT_MONTHS[r.m] + '</span></div>';
    }).join("") + '</div>' +
    '<p class="legend-inline"><span><span class="swatch" style="background:#2e5339"></span>Income</span>' +
    '<span><span class="swatch" style="background:#c05f3c"></span>Spent</span></p>';
  var best = rows.reduce(function (a, r) { return r.spent < a.spent ? r : a; });
  $("report-bars-note").textContent = "Lightest month: " + MONTH_NAMES[best.m].split(" ")[0] + " at " + money(best.spent) +
    ". November is a partial month (26 of 30 days).";

  var spentByCat = categorySpent(currentMonth);
  var spent = monthSpent(currentMonth);
  var cats = Object.keys(spentByCat).sort(function (a, b) { return spentByCat[b] - spentByCat[a]; });
  $("report-cats").innerHTML = cats.map(function (cat) {
    var s = spentByCat[cat];
    var pct = Math.round(100 * s / Math.max(spent, 1));
    return '<div class="budget-row"><span class="cat-name">' + esc(cat) + '<small>' + pct + '% of spending</small></span>' +
      '<span class="bar-wrap"><span class="bar"><i style="width:' + pct + '%;background:' + colorFor(cat) + '"></i></span></span>' +
      '<span class="nums"><b>' + money(s) + '</b></span><span></span><span></span></div>';
  }).join("");

  var income = monthIncome(currentMonth);
  var saved = spentByCat["Savings"] || 0;
  var topCat = cats[0] || "—";
  var over = Object.keys(state.budgets).filter(function (c) { return (spentByCat[c] || 0) > state.budgets[c]; });
  var dim = daysInMonth(currentMonth);
  var dayNo = currentMonth === "2026-11" ? TODAY.getDate() : dim;
  var projected = dayNo < dim ? Math.round(spent / dayNo * dim) : spent;
  var insights = [];
  insights.push("<strong>" + esc(topCat) + "</strong> is the biggest cost this month at <strong>" + money(spentByCat[topCat] || 0) + "</strong> — " +
    Math.round(100 * (spentByCat[topCat] || 0) / Math.max(spent, 1)) + "% of everything spent.");
  insights.push(over.length
    ? "<strong>" + over.length + " categor" + (over.length === 1 ? "y is" : "ies are") + " over budget:</strong> " + over.map(function (c) { return esc(c) + " by " + money((spentByCat[c] || 0) - state.budgets[c]); }).join(", ") + ". Small trims there cover it."
    : "No category is over budget this month — the plan is holding.");
  insights.push("At the current pace, the month ends near <strong>" + money(projected) + "</strong> of spending, leaving about <strong>" + money(Math.max(income - projected, 0)) + "</strong> unspent.");
  insights.push("The household saved <strong>" + money(saved) + "</strong> this month — a savings rate of <strong>" + Math.round(100 * saved / Math.max(income, 1)) + "%</strong> of income.");
  insights.push("Spending is <strong>" + money0(spent) + "</strong> against <strong>" + money0(income) + "</strong> of income, so the household is living <strong>" + money(income - spent) + "</strong> below its means.");
  $("report-insights").innerHTML = insights.map(function (s) { return "<li>" + s + "</li>"; }).join("");
}

/* ---------------- calculator page ---------------- */
function splitFor(income, needsPct, wantsPct, savePct) {
  return {
    needs: income * needsPct / 100,
    wants: income * wantsPct / 100,
    save: income * savePct / 100
  };
}
function renderCalculator() {
  var income = Math.max(0, Number($("calc-income").value) || 0);
  var needsPct = Number($("calc-needs").value);
  var wantsPct = Number($("calc-wants").value);
  var savePct = Number($("calc-save").value);
  $("calc-needs-out").textContent = needsPct + "%";
  $("calc-wants-out").textContent = wantsPct + "%";
  $("calc-save-out").textContent = savePct + "%";
  var total = needsPct + wantsPct + savePct;
  var msg = $("calc-msg");
  if (total !== 100) {
    msg.textContent = "Those three add up to " + total + "% — a budget needs 100%.";
    msg.classList.remove("ok");
  } else {
    msg.textContent = "That adds up to 100%.";
    msg.classList.add("ok");
  }
  var split = splitFor(income, needsPct, wantsPct, savePct);
  $("calc-results").innerHTML =
    '<div class="split-row"><span><strong>Needs</strong> · ' + needsPct + '%</span>' +
    '<span class="bar"><i style="width:' + needsPct + '%"></i></span><span class="amt">' + money(split.needs) + '</span></div>' +
    '<div class="split-row"><span><strong>Wants</strong> · ' + wantsPct + '%</span>' +
    '<span class="bar"><i style="width:' + wantsPct + '%;background:#c05f3c"></i></span><span class="amt">' + money(split.wants) + '</span></div>' +
    '<div class="split-row"><span><strong>Savings</strong> · ' + savePct + '%</span>' +
    '<span class="bar"><i style="width:' + savePct + '%;background:#7a9b57"></i></span><span class="amt">' + money(split.save) + '</span></div>' +
    '<p class="card-foot">On ' + money(income) + ' a month, that is ' + money(split.needs) + ' for the must-haves, ' +
    money(split.wants) + ' for the nice-to-haves, and ' + money(split.save) + ' put aside.</p>';

  var spentByCat = categorySpent(currentMonth);
  var spent = monthSpent(currentMonth);
  var incomeM = monthIncome(currentMonth);
  function groupSum(list) {
    return list.reduce(function (s, c) { return s + (spentByCat[c] || 0); }, 0);
  }
  var aNeeds = groupSum(NEEDS), aWants = groupSum(WANTS), aSave = spentByCat["Savings"] || 0;
  function cmpRow(label, actual, target) {
    var diff = actual - target;
    var cls = diff <= 0 ? "diff-good" : "diff-bad";
    var word = diff <= 0 ? money(-diff) + " under" : money(diff) + " over";
    return "<tr><td>" + label + "</td><td class=\"num\">" + money(actual) + "</td><td class=\"num\">" + money(target) + "</td>" +
      "<td class=\"num " + cls + "\">" + word + "</td></tr>";
  }
  var tNeeds = incomeM * needsPct / 100, tWants = incomeM * wantsPct / 100, tSave = incomeM * savePct / 100;
  $("calc-actual").innerHTML =
    '<div class="table-scroll"><table class="compare-table"><thead><tr><th></th><th class="num">Actually spent</th><th class="num">Rule says</th><th class="num">Difference</th></tr></thead><tbody>' +
    cmpRow("Needs", aNeeds, tNeeds) + cmpRow("Wants", aWants, tWants) + cmpRow("Savings", aSave, tSave) +
    '<tr><td><strong>Total</strong></td><td class="num"><strong>' + money(spent) + '</strong></td><td class="num"><strong>' + money(incomeM) + '</strong></td>' +
    '<td class="num">' + (spent <= incomeM ? '<span class="diff-good">' + money(incomeM - spent) + ' left over</span>' : '<span class="diff-bad">' + money(spent - incomeM) + ' over income</span>') + '</td></tr>' +
    '</tbody></table></div>';
}

/* ---------------- forms ---------------- */
function bindForms() {
  $("form-tx").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var amount = Math.round(Number($("tx-amount").value) * 100) / 100;
    if (!(amount > 0)) { $("tx-msg").textContent = "Enter an amount above $0."; return; }
    var payee = $("tx-payee").value.trim();
    if (!payee) { $("tx-msg").textContent = "Tell us where the money went."; return; }
    state.transactions.push({
      id: "t" + Date.now(), date: $("tx-date").value, payee: payee,
      category: $("tx-category").value, amount: amount, note: $("tx-note").value.trim()
    });
    saveState();
    $("tx-msg").textContent = "Added " + payee + " — " + money(amount) + ".";
    $("tx-msg").classList.add("ok");
    ev.target.reset();
    $("tx-date").value = "2026-11-26";
    renderTransactions();
  });

  $("form-category").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var name = $("cat-name").value.trim();
    var amount = Math.max(0, Math.round(Number($("cat-amount").value) || 0));
    if (!name) { $("cat-msg").textContent = "Give the category a name."; return; }
    if (state.budgets[name] !== undefined) { $("cat-msg").textContent = "That category already exists — edit its amount above."; return; }
    state.budgets[name] = amount;
    saveState();
    $("cat-msg").textContent = "Added " + name + " with a " + money(amount) + " monthly budget.";
    $("cat-msg").classList.add("ok");
    ev.target.reset();
    renderBudget();
  });

  $("form-bill").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var name = $("bill-name").value.trim();
    var amount = Math.round(Number($("bill-amount").value) * 100) / 100;
    var day = Math.min(28, Math.max(1, Number($("bill-day").value) || 1));
    if (!name || !(amount > 0)) { $("bill-msg").textContent = "Enter a bill name and an amount above $0."; return; }
    state.bills.push({
      id: "b" + Date.now(), name: name, amount: amount, dueDay: day,
      category: $("bill-category").value, autopay: $("bill-autopay").checked, paid: []
    });
    saveState();
    $("bill-msg").textContent = "Added " + name + " — " + money(amount) + ", due on the " + day + "th.";
    $("bill-msg").classList.add("ok");
    ev.target.reset();
    renderBills();
  });

  $("form-goal").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var name = $("goal-name").value.trim();
    var target = Math.round(Number($("goal-target").value) || 0);
    var start = Math.max(0, Math.round(Number($("goal-start").value) || 0));
    if (!name || target <= 0) { $("goal-msg").textContent = "Enter a goal name and a target above $0."; return; }
    state.goals.push({
      id: "g" + Date.now(), name: name, target: target, saved: Math.min(start, target),
      date: $("goal-date").value || "2027-06-01", note: ""
    });
    saveState();
    $("goal-msg").textContent = "Created the goal " + name + " — target " + money(target) + ".";
    $("goal-msg").classList.add("ok");
    ev.target.reset();
    $("goal-date").value = "2027-06-01";
    renderGoals();
  });

  ["tx-search", "tx-filter-cat", "tx-filter-type"].forEach(function (id) {
    $(id).addEventListener("input", renderTransactions);
    $(id).addEventListener("change", renderTransactions);
  });

  ["calc-income", "calc-needs", "calc-wants", "calc-save"].forEach(function (id) {
    $(id).addEventListener("input", renderCalculator);
    $(id).addEventListener("change", renderCalculator);
  });

  $("month-prev").addEventListener("click", function () {
    var idx = MONTHS.indexOf(currentMonth);
    if (idx > 0) { currentMonth = MONTHS[idx - 1]; render(currentRoute); }
  });
  $("month-next").addEventListener("click", function () {
    var idx = MONTHS.indexOf(currentMonth);
    if (idx < MONTHS.length - 1) { currentMonth = MONTHS[idx + 1]; render(currentRoute); }
  });

  $("reset-data").addEventListener("click", function () {
    if (window.confirm("Reset all demo data? Your edits will be lost.")) {
      try { window.localStorage.removeItem(STORE_KEY); } catch (e) { /* ignore */ }
      state = JSON.parse(JSON.stringify(SEED));
      currentMonth = "2026-11";
      render(currentRoute);
    }
  });
}

/* ---------------- init ---------------- */
window.addEventListener("hashchange", function () { showPage(routeFromHash()); });
bindForms();
fillCategorySelects();
showPage(routeFromHash());
