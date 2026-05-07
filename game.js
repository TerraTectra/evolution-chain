const SAVE_KEY = "evolution-chain-save-v1";

const resourceMeta = {
  matter: { name: "Материя", icon: "◌" },
  energy: { name: "Энергия", icon: "⚡" },
  complexity: { name: "Сложность", icon: "⬡" },
  stability: { name: "Стабильность", icon: "◆" },
  information: { name: "Информация", icon: "⌁" },
  biomass: { name: "Биомасса", icon: "☘" },
};

const stages = [
  {
    title: "Атомы",
    short: "Атомы",
    description: "Материя существует как набор простых элементов. Пока это не жизнь, а сырьё будущей сложности: углерод, водород, кислород, азот, фосфор и сера.",
    requires: { matter: 80, energy: 35, complexity: 10 },
    unlockText: "Атомы начали образовывать устойчивые связи."
  },
  {
    title: "Простые молекулы",
    short: "Молекулы",
    description: "Появляются вода, метан, аммиак и углекислый газ. Среда ещё хаотична, но химические реакции уже создают первые устойчивые комбинации.",
    requires: { matter: 180, energy: 90, complexity: 45, stability: 20 },
    unlockText: "Простые молекулы стали основой органической химии."
  },
  {
    title: "Органические молекулы",
    short: "Органика",
    description: "Углеродные цепочки усложняются. Аминокислоты, липиды, сахара и нуклеотиды становятся материалом для будущей жизни.",
    requires: { matter: 320, energy: 160, complexity: 120, stability: 70 },
    unlockText: "Органика накопила достаточно разнообразия для полимеров."
  },
  {
    title: "Полимеры",
    short: "Полимеры",
    description: "Малые молекулы собираются в длинные структуры. Белки и РНК-подобные цепи открывают путь к хранению формы, функции и информации.",
    requires: { matter: 520, energy: 260, complexity: 260, stability: 160, information: 60 },
    unlockText: "Полимеры начали хранить и передавать структуру."
  },
  {
    title: "Самокопирование",
    short: "Репликация",
    description: "Некоторые структуры начинают копировать себя. Ошибки копирования становятся не поломкой, а источником отбора и вариативности.",
    requires: { matter: 760, energy: 420, complexity: 440, stability: 260, information: 180 },
    unlockText: "Репликация создала первый механизм наследования."
  },
  {
    title: "Протоклетки",
    short: "Протоклетки",
    description: "Молекулярные системы получают оболочку. Мембрана отделяет внутреннюю химию от внешнего хаоса: появляется почти-жизнь.",
    requires: { matter: 1050, energy: 640, complexity: 680, stability: 420, information: 340, biomass: 80 },
    unlockText: "Протоклетки удержали внутреннюю среду."
  },
  {
    title: "Первые клетки",
    short: "Клетки",
    description: "Возникают автономные живые единицы: обмен веществ, рост, деление и наследование. Химия перешла порог жизни.",
    requires: { matter: 1450, energy: 900, complexity: 980, stability: 700, information: 620, biomass: 260 },
    unlockText: "Первые клетки начали настоящую биологическую эволюцию."
  },
  {
    title: "Одноклеточная жизнь",
    short: "Одноклеточные",
    description: "Жизнь учится двигаться, питаться, конкурировать и адаптироваться. Впереди — фотосинтез, эукариоты, многоклеточность и разум.",
    requires: {},
    unlockText: "Дальнейшие эпохи будут добавлены в следующих версиях."
  }
];

const upgrades = [
  {
    id: "bonding",
    name: "Химические связи",
    stage: 0,
    description: "Атомы чаще образуют устойчивые пары и цепочки.",
    cost: { matter: 25, energy: 10 },
    effect: { rates: { matter: 0.35, energy: 0.12 }, click: { complexity: 1 } }
  },
  {
    id: "thermal_pool",
    name: "Тёплый первичный бассейн",
    stage: 0,
    description: "Среда удерживает реакции достаточно долго, чтобы накапливать сложность.",
    cost: { matter: 60, energy: 28, complexity: 8 },
    effect: { rates: { complexity: 0.18, stability: 0.08 } }
  },
  {
    id: "catalysts",
    name: "Катализаторы",
    stage: 1,
    description: "Некоторые структуры ускоряют реакции, не разрушаясь сразу.",
    cost: { matter: 120, energy: 65, complexity: 35 },
    effect: { rates: { energy: 0.22, complexity: 0.34 } }
  },
  {
    id: "carbon_chains",
    name: "Углеродные цепочки",
    stage: 1,
    description: "Углерод становится каркасом для более сложных молекул.",
    cost: { matter: 170, energy: 85, complexity: 55, stability: 14 },
    effect: { rates: { matter: 0.5, complexity: 0.5 } }
  },
  {
    id: "amino_soup",
    name: "Аминокислотный суп",
    stage: 2,
    description: "Органическая среда начинает производить заготовки будущих белков.",
    cost: { matter: 240, energy: 130, complexity: 100, stability: 40 },
    effect: { rates: { complexity: 0.7, stability: 0.25 } }
  },
  {
    id: "lipid_bubbles",
    name: "Липидные пузырьки",
    stage: 2,
    description: "Жироподобные молекулы сами собираются в оболочки.",
    cost: { matter: 310, energy: 150, complexity: 130, stability: 60 },
    effect: { rates: { stability: 0.55, biomass: 0.05 } }
  },
  {
    id: "rna_world",
    name: "РНК-мир",
    stage: 3,
    description: "Появляется молекулярный носитель информации и функции.",
    cost: { matter: 430, energy: 220, complexity: 220, stability: 120 },
    effect: { rates: { information: 0.42, complexity: 0.55 } }
  },
  {
    id: "protein_folds",
    name: "Белковые складки",
    stage: 3,
    description: "Форма молекулы становится инструментом действия.",
    cost: { matter: 500, energy: 250, complexity: 260, information: 40 },
    effect: { rates: { stability: 0.5, information: 0.28 } }
  },
  {
    id: "copy_errors",
    name: "Ошибки копирования",
    stage: 4,
    description: "Неточные копии создают материал для отбора.",
    cost: { matter: 640, energy: 360, complexity: 390, stability: 200, information: 130 },
    effect: { rates: { information: 0.75, complexity: 0.75 } }
  },
  {
    id: "selection_pressure",
    name: "Давление отбора",
    stage: 4,
    description: "Нестабильные варианты исчезают, удачные — накапливаются.",
    cost: { matter: 720, energy: 400, complexity: 430, stability: 230, information: 160 },
    effect: { rates: { stability: 0.8, biomass: 0.1 } }
  },
  {
    id: "membrane",
    name: "Мембрана",
    stage: 5,
    description: "Внутренний мир отделяется от внешнего. Это главный шаг к клетке.",
    cost: { matter: 850, energy: 520, complexity: 560, stability: 360, information: 260, biomass: 40 },
    effect: { rates: { stability: 1.1, biomass: 0.35 } }
  },
  {
    id: "metabolism",
    name: "Примитивный метаболизм",
    stage: 5,
    description: "Система учится добывать энергию из среды, а не ждать удачных реакций.",
    cost: { matter: 980, energy: 600, complexity: 650, stability: 400, information: 300, biomass: 70 },
    effect: { rates: { energy: 1.2, biomass: 0.45 } }
  },
  {
    id: "division",
    name: "Деление клетки",
    stage: 6,
    description: "Жизнь получает устойчивый способ размножения.",
    cost: { matter: 1150, energy: 760, complexity: 820, stability: 560, information: 500, biomass: 160 },
    effect: { rates: { biomass: 1.05, information: 0.8 } }
  },
  {
    id: "micro_ecology",
    name: "Микроэкосистема",
    stage: 6,
    description: "Клетки начинают конкурировать и занимать разные химические ниши.",
    cost: { matter: 1320, energy: 820, complexity: 910, stability: 620, information: 560, biomass: 220 },
    effect: { rates: { matter: 1.2, energy: 1.1, complexity: 1.1, biomass: 0.8 } }
  }
];

const events = [
  { text: "Метеоритная бомбардировка перемешала химическую среду.", gain: { matter: 35, energy: 20 } },
  { text: "Гидротермальный источник дал стабильный поток энергии.", gain: { energy: 45, stability: 12 } },
  { text: "Резкое охлаждение разрушило часть нестабильных соединений.", gain: { stability: 18 }, lose: { complexity: 18 } },
  { text: "Электрические разряды ускорили синтез органики.", gain: { energy: 25, complexity: 24 } },
  { text: "Удачная самосборка усилила внутреннюю организацию.", gain: { complexity: 30, information: 12 } },
  { text: "Среда стала агрессивнее. Выживают только устойчивые структуры.", gain: { stability: 35 }, lose: { matter: 20 } },
  { text: "Случайная вариация оказалась полезной.", gain: { information: 35, biomass: 8 } },
];

const defaultState = () => ({
  resources: {
    matter: 0,
    energy: 0,
    complexity: 0,
    stability: 0,
    information: 0,
    biomass: 0,
  },
  rates: {
    matter: 0.08,
    energy: 0.04,
    complexity: 0,
    stability: 0,
    information: 0,
    biomass: 0,
  },
  stage: 0,
  owned: [],
  log: ["Система запущена. Материя ещё не жива, но путь уже начался."],
  lastTick: Date.now(),
  nextEventAt: Date.now() + 25000,
});

let state = loadGame();

const els = {
  stageTitle: document.getElementById("stageTitle"),
  stageBadge: document.getElementById("stageBadge"),
  stageDescription: document.getElementById("stageDescription"),
  visualCore: document.getElementById("visualCore"),
  progressText: document.getElementById("progressText"),
  progressBar: document.getElementById("progressBar"),
  advanceBtn: document.getElementById("advanceBtn"),
  resourcesGrid: document.getElementById("resourcesGrid"),
  upgradesList: document.getElementById("upgradesList"),
  upgradeCount: document.getElementById("upgradeCount"),
  timeline: document.getElementById("timeline"),
  eventLog: document.getElementById("eventLog"),
  saveBtn: document.getElementById("saveBtn"),
  resetBtn: document.getElementById("resetBtn"),
  actMatter: document.getElementById("actMatter"),
  actComplexity: document.getElementById("actComplexity"),
  actStability: document.getElementById("actStability"),
  actReplicate: document.getElementById("actReplicate"),
};

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const base = defaultState();
    return {
      ...base,
      ...parsed,
      resources: { ...base.resources, ...parsed.resources },
      rates: { ...base.rates, ...parsed.rates },
      owned: Array.isArray(parsed.owned) ? parsed.owned : [],
      log: Array.isArray(parsed.log) ? parsed.log.slice(0, 20) : base.log,
      lastTick: Date.now(),
    };
  } catch {
    return defaultState();
  }
}

function saveGame() {
  state.lastTick = Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function resetGame() {
  const confirmed = confirm("Сбросить эволюцию и начать с атомов?");
  if (!confirmed) return;
  localStorage.removeItem(SAVE_KEY);
  state = defaultState();
  render();
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 24);
}

function formatNumber(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return Math.floor(value).toString();
}

function addResources(delta, multiplier = 1) {
  Object.entries(delta).forEach(([key, value]) => {
    state.resources[key] = Math.max(0, (state.resources[key] || 0) + value * multiplier);
  });
}

function canAfford(cost) {
  return Object.entries(cost).every(([key, value]) => (state.resources[key] || 0) >= value);
}

function pay(cost) {
  Object.entries(cost).forEach(([key, value]) => {
    state.resources[key] -= value;
  });
}

function costToText(cost) {
  return Object.entries(cost)
    .map(([key, value]) => `${resourceMeta[key].name}: ${formatNumber(value)}`)
    .join(" · ");
}

function buyUpgrade(id) {
  const upgrade = upgrades.find((item) => item.id === id);
  if (!upgrade || state.owned.includes(id) || upgrade.stage > state.stage || !canAfford(upgrade.cost)) return;
  pay(upgrade.cost);
  state.owned.push(id);
  if (upgrade.effect?.rates) {
    Object.entries(upgrade.effect.rates).forEach(([key, value]) => {
      state.rates[key] = (state.rates[key] || 0) + value;
    });
  }
  addLog(`Открытие: ${upgrade.name}. ${upgrade.description}`);
  render();
  saveGame();
}

function getStageProgress() {
  const current = stages[state.stage];
  const requirements = Object.entries(current.requires || {});
  if (!requirements.length) return 1;
  const total = requirements.reduce((sum, [key, value]) => {
    return sum + Math.min((state.resources[key] || 0) / value, 1);
  }, 0);
  return total / requirements.length;
}

function canAdvance() {
  const current = stages[state.stage];
  if (!current || !Object.keys(current.requires || {}).length) return false;
  return canAfford(current.requires);
}

function advanceStage() {
  if (!canAdvance() || state.stage >= stages.length - 1) return;
  const current = stages[state.stage];
  pay(current.requires);
  state.stage += 1;
  addLog(current.unlockText);
  addLog(`Новая стадия: ${stages[state.stage].title}.`);
  render();
  saveGame();
}

function runRandomEvent() {
  const event = events[Math.floor(Math.random() * events.length)];
  if (event.gain) addResources(event.gain);
  if (event.lose) {
    Object.entries(event.lose).forEach(([key, value]) => {
      state.resources[key] = Math.max(0, state.resources[key] - value);
    });
  }
  addLog(event.text);
  state.nextEventAt = Date.now() + 22000 + Math.random() * 28000;
}

function tick() {
  const now = Date.now();
  const dt = Math.min((now - state.lastTick) / 1000, 8);
  state.lastTick = now;
  Object.entries(state.rates).forEach(([key, value]) => {
    state.resources[key] += value * dt;
  });
  if (now >= state.nextEventAt) runRandomEvent();
  render();
}

function renderResources() {
  els.resourcesGrid.innerHTML = Object.entries(resourceMeta).map(([key, meta]) => `
    <article class="resource-card">
      <span>${meta.icon} ${meta.name}</span>
      <strong>${formatNumber(state.resources[key] || 0)}</strong>
      <small>+${(state.rates[key] || 0).toFixed(2)} / сек</small>
    </article>
  `).join("");
}

function renderStage() {
  const stage = stages[state.stage];
  els.stageTitle.textContent = stage.title;
  els.stageBadge.textContent = `${state.stage + 1} / ${stages.length}`;
  els.stageDescription.textContent = stage.description;

  const progress = getStageProgress();
  els.progressText.textContent = `${Math.floor(progress * 100)}%`;
  els.progressBar.style.width = `${Math.floor(progress * 100)}%`;

  if (state.stage >= stages.length - 1) {
    els.advanceBtn.disabled = true;
    els.advanceBtn.textContent = "Конец MVP: дальше будет новая эпоха";
  } else {
    els.advanceBtn.disabled = !canAdvance();
    els.advanceBtn.textContent = canAdvance()
      ? `Перейти: ${stages[state.stage + 1].title}`
      : `Нужно: ${costToText(stage.requires)}`;
  }

  renderVisual();
}

function renderVisual() {
  const nodes = 6 + state.stage * 4;
  const sizeBase = Math.max(9, 26 - state.stage * 1.5);
  let html = "";
  for (let i = 0; i < nodes; i += 1) {
    const angle = (Math.PI * 2 * i) / nodes;
    const radius = 45 + (i % 4) * 28 + state.stage * 5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const size = sizeBase + (i % 3) * 5;
    html += `<span class="core-node" style="width:${size}px;height:${size}px;transform:translate(${x}px,${y}px);animation-delay:${i * 0.12}s"></span>`;
  }
  els.visualCore.innerHTML = html;
}

function renderUpgrades() {
  const visible = upgrades.filter((upgrade) => upgrade.stage <= state.stage);
  els.upgradeCount.textContent = `${state.owned.length} открыто`;
  els.upgradesList.innerHTML = visible.map((upgrade) => {
    const owned = state.owned.includes(upgrade.id);
    const buyable = !owned && canAfford(upgrade.cost);
    return `
      <article class="upgrade-card ${owned ? "owned" : ""} ${buyable ? "buyable" : ""}">
        <div class="upgrade-top">
          <strong>${upgrade.name}</strong>
          <span class="soft-pill">${owned ? "открыто" : `этап ${upgrade.stage + 1}`}</span>
        </div>
        <p>${upgrade.description}</p>
        <div class="cost-line">${owned ? "Эффект активен" : costToText(upgrade.cost)}</div>
        <button class="primary-btn" ${owned || !buyable ? "disabled" : ""} onclick="buyUpgrade('${upgrade.id}')">
          ${owned ? "Уже открыто" : buyable ? "Открыть" : "Недостаточно ресурсов"}
        </button>
      </article>
    `;
  }).join("");
}

function renderTimeline() {
  els.timeline.innerHTML = stages.map((stage, index) => `
    <article class="timeline-item ${index === state.stage ? "active" : ""} ${index < state.stage ? "done" : ""}">
      <div class="timeline-index">${index + 1}</div>
      <div>
        <strong>${stage.short}</strong>
        <p>${index < state.stage ? "пройдено" : index === state.stage ? "текущий этап" : "ещё впереди"}</p>
      </div>
    </article>
  `).join("");
}

function renderLog() {
  els.eventLog.innerHTML = state.log.map((entry) => `<div class="log-entry">${entry}</div>`).join("");
}

function render() {
  renderStage();
  renderResources();
  renderUpgrades();
  renderTimeline();
  renderLog();
}

els.actMatter.addEventListener("click", () => {
  const boost = 1 + state.stage * 0.15;
  addResources({ matter: 8, energy: 3 }, boost);
  render();
});

els.actComplexity.addEventListener("click", () => {
  if (!canAfford({ matter: 10, energy: 6 })) return addLog("Недостаточно материи или энергии для усложнения.");
  pay({ matter: 10, energy: 6 });
  addResources({ complexity: 8 + state.stage * 1.5 });
  render();
});

els.actStability.addEventListener("click", () => {
  if (!canAfford({ complexity: 12, energy: 5 })) return addLog("Нужна сложность и энергия для стабилизации.");
  pay({ complexity: 12, energy: 5 });
  addResources({ stability: 7 + state.stage * 1.2 });
  render();
});

els.actReplicate.addEventListener("click", () => {
  if (!canAfford({ information: 18, energy: 8 })) return addLog("Для репликации нужна информация и энергия.");
  pay({ information: 18, energy: 8 });
  addResources({ biomass: 9 + state.stage * 1.6, complexity: 3 });
  render();
});

els.advanceBtn.addEventListener("click", advanceStage);
els.saveBtn.addEventListener("click", () => {
  saveGame();
  addLog("Прогресс сохранён в браузере.");
  renderLog();
});
els.resetBtn.addEventListener("click", resetGame);

setInterval(tick, 1000);
setInterval(saveGame, 10000);
render();
