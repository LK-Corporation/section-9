/* ============= ENV FLAGS ============= */
const PREFERS_REDUCED_MOTION = typeof window !== 'undefined'
  && window.matchMedia
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============= I18N (minimal) =============
 * The HUD lang is read from <html lang>. Most prose / panel labels live in
 * static HTML and have a parallel index.es.html / index.jp.html. This dict
 * covers strings injected by JS at runtime (boot text, hints, ops log,
 * greetings, magi queries, quotes, alerts).
 */
const LANG = (() => {
  const l = (document.documentElement.lang || 'en').toLowerCase();
  if (l.startsWith('es')) return 'es';
  if (l.startsWith('ja') || l.startsWith('jp')) return 'ja';
  return 'en';
})();

const I18N = {
  bootLines: {
    en: ['Wake up, Operator...', 'The Matrix has you...', 'Follow the white rabbit.'],
    es: ['Despierta, operador...', 'La Matrix te tiene...', 'Sigue al conejo blanco.'],
    ja: ['起きて、オペレータ…', 'マトリックスはあなたを掴んでいる…', '白うさぎを追え。']
  },
  hintLabel: { en: 'HINT: try', es: 'PISTA: prueba', ja: 'ヒント：' },
  hintConnector: { en: '//', es: '//', ja: '·' },
  alertClear: { en: 'CLEAR', es: 'DESPEJADO', ja: 'クリア' },
  alertAlert: { en: 'ALERT', es: 'ALERTA', ja: 'アラート' },
  awaitingQuery: { en: 'AWAITING QUERY', es: 'ESPERANDO CONSULTA', ja: 'クエリ待機中' },
  firstTime: { en: 'first time', es: 'primera vez', ja: '初回' },
  syncing: { en: 'SYNCING...', es: 'SINCRONIZANDO...', ja: '同期中…' },
  visitCount: { en: 'visit count', es: 'nº de visitas', ja: '訪問回数' },
  lastVisit: { en: 'last visit', es: 'última visita', ja: '最終訪問' },
  session: { en: 'session', es: 'sesión', ja: 'セッション' },
  active: { en: 'active', es: 'activa', ja: 'アクティブ' },
  signal: { en: 'signal', es: 'señal', ja: '信号' },
  bars: { en: 'bars', es: 'barras', ja: '本' },
  deepDiveProgress: { en: 'DEEP DIVE IN PROGRESS', es: 'INMERSIÓN PROFUNDA EN CURSO', ja: 'ディープ・ダイブ実行中' },
  deepDiveDesktopOnly: {
    en: 'DEEP DIVE // DESKTOP ONLY · INSUFFICIENT BANDWIDTH',
    es: 'INMERSIÓN PROFUNDA // SOLO ESCRITORIO · ANCHO DE BANDA INSUFICIENTE',
    ja: 'ディープ・ダイブ // デスクトップ専用 · 帯域幅不足'
  },
  greetings: {
    en: [
      { line: 'GHOST-LINE STABLE', sub: 'all systems nominal' },
      { line: 'OPERATOR ONLINE', sub: 'tactical channel open' },
      { line: 'CYBER-BRAIN SYNCED', sub: 'no anomalies detected' },
      { line: 'DEEP DIVE READY', sub: 'kali node responsive' },
      { line: 'HOLDING POSITION', sub: 'awaiting orders' }
    ],
    es: [
      { line: 'GHOST-LINE ESTABLE', sub: 'todos los sistemas nominales' },
      { line: 'OPERADOR EN LÍNEA', sub: 'canal táctico abierto' },
      { line: 'CIBERCEREBRO SINCRONIZADO', sub: 'sin anomalías detectadas' },
      { line: 'INMERSIÓN PROFUNDA LISTA', sub: 'nodo kali respondiendo' },
      { line: 'POSICIÓN MANTENIDA', sub: 'esperando órdenes' }
    ],
    ja: [
      { line: 'ゴーストライン安定', sub: 'すべてのシステム正常' },
      { line: 'オペレータ・オンライン', sub: '戦術チャネル開通' },
      { line: '電脳同期完了', sub: '異常なし' },
      { line: 'ディープ・ダイブ準備完了', sub: 'kali ノード応答中' },
      { line: '位置を維持', sub: '指令待機' }
    ]
  },
  // Operations log — only the msg gets translated; src remains the literal service name.
  opsTemplates: {
    en: [
      { src: 'vault-bridge', tag: 'ok', msg: 'read_page // batou queried "longevidad"' },
      { src: 'vault-bridge', tag: 'ok', msg: 'list_pages // 153 active' },
      { src: 'hermes-gw', tag: 'ok', msg: 'healthcheck // OK' },
      { src: 'hermes-gw', tag: 'ok', msg: 'mcp tool dispatch // notify-voltron' },
      { src: 'watchdog', tag: 'ok', msg: 'voltron // hibernating // OK' },
      { src: 'watchdog', tag: 'ok', msg: 'patrol cycle complete // 3 services up' },
      { src: 'watchdog', tag: 'warn', msg: 'voltron silent // expected, ignore' },
      { src: 'honcho', tag: 'ok', msg: 'dialectic query // pattern: cyberpunk' },
      { src: 'honcho', tag: 'ok', msg: 'memory write // session 14' },
      { src: 'notify-voltron', tag: 'ok', msg: 'telegram push // batou → brus' },
      { src: 'cve-lookup', tag: 'ok', msg: 'standby // 0 queries this hour' },
      { src: 'kali-recon', tag: 'ok', msg: 'standby // tachikoma napping' },
      { src: 'web-recon', tag: 'ok', msg: 'standby // surface unchanged' },
      { src: 'claude-deep', tag: 'ok', msg: 'reasoning ready // sonnet-4-6 awake' },
      { src: 'tailnet', tag: 'ok', msg: 'mesh OK // 2 nodes // private' },
      { src: 'sops', tag: 'ok', msg: 'envelope sealed // age master OK' },
      { src: 'kdbx', tag: 'ok', msg: 'vault locked // last access 2h ago' },
      { src: 'scout-meta', tag: 'ok', msg: 'next run // monday 09:00' },
      { src: 'scout-business', tag: 'ok', msg: 'next run // friday 09:00' },
      { src: 'backup', tag: 'ok', msg: 'next canary // sunday 04:00' }
    ],
    es: [
      { src: 'vault-bridge', tag: 'ok', msg: 'read_page // batou consultó "longevidad"' },
      { src: 'vault-bridge', tag: 'ok', msg: 'list_pages // 153 activas' },
      { src: 'hermes-gw', tag: 'ok', msg: 'healthcheck // OK' },
      { src: 'hermes-gw', tag: 'ok', msg: 'dispatch de tool mcp // notify-voltron' },
      { src: 'watchdog', tag: 'ok', msg: 'voltron // hibernando // OK' },
      { src: 'watchdog', tag: 'ok', msg: 'ciclo de patrulla completo // 3 servicios up' },
      { src: 'watchdog', tag: 'warn', msg: 'voltron en silencio // esperado, ignorar' },
      { src: 'honcho', tag: 'ok', msg: 'consulta dialéctica // pattern: cyberpunk' },
      { src: 'honcho', tag: 'ok', msg: 'escritura en memoria // sesión 14' },
      { src: 'notify-voltron', tag: 'ok', msg: 'push telegram // batou → brus' },
      { src: 'cve-lookup', tag: 'ok', msg: 'standby // 0 consultas esta hora' },
      { src: 'kali-recon', tag: 'ok', msg: 'standby // tachikoma echando la siesta' },
      { src: 'web-recon', tag: 'ok', msg: 'standby // superficie sin cambios' },
      { src: 'claude-deep', tag: 'ok', msg: 'razonamiento listo // sonnet-4-6 despierto' },
      { src: 'tailnet', tag: 'ok', msg: 'mesh OK // 2 nodos // privado' },
      { src: 'sops', tag: 'ok', msg: 'sobre sellado // age master OK' },
      { src: 'kdbx', tag: 'ok', msg: 'vault bloqueado // último acceso hace 2h' },
      { src: 'scout-meta', tag: 'ok', msg: 'próxima // lunes 09:00' },
      { src: 'scout-business', tag: 'ok', msg: 'próxima // viernes 09:00' },
      { src: 'backup', tag: 'ok', msg: 'próximo canary // domingo 04:00' }
    ],
    ja: [
      { src: 'vault-bridge', tag: 'ok', msg: 'read_page // batou が「longevidad」を照会' },
      { src: 'vault-bridge', tag: 'ok', msg: 'list_pages // アクティブ 153' },
      { src: 'hermes-gw', tag: 'ok', msg: 'healthcheck // OK' },
      { src: 'hermes-gw', tag: 'ok', msg: 'mcp ツール・ディスパッチ // notify-voltron' },
      { src: 'watchdog', tag: 'ok', msg: 'voltron // 休眠中 // OK' },
      { src: 'watchdog', tag: 'ok', msg: '巡回サイクル完了 // 3 サービス稼働' },
      { src: 'watchdog', tag: 'warn', msg: 'voltron 無応答 // 想定内、無視' },
      { src: 'honcho', tag: 'ok', msg: '対話クエリ // pattern: cyberpunk' },
      { src: 'honcho', tag: 'ok', msg: '記憶書き込み // セッション 14' },
      { src: 'notify-voltron', tag: 'ok', msg: 'telegram プッシュ // batou → brus' },
      { src: 'cve-lookup', tag: 'ok', msg: 'standby // 当時間のクエリ 0 件' },
      { src: 'kali-recon', tag: 'ok', msg: 'standby // タチコマは昼寝中' },
      { src: 'web-recon', tag: 'ok', msg: 'standby // 表面に変化なし' },
      { src: 'claude-deep', tag: 'ok', msg: '推論準備完了 // sonnet-4-6 起動済' },
      { src: 'tailnet', tag: 'ok', msg: 'mesh OK // 2 ノード // プライベート' },
      { src: 'sops', tag: 'ok', msg: 'エンベロープ封印 // age master OK' },
      { src: 'kdbx', tag: 'ok', msg: 'vault ロック中 // 最終アクセス 2 時間前' },
      { src: 'scout-meta', tag: 'ok', msg: '次回実行 // 月曜 09:00' },
      { src: 'scout-business', tag: 'ok', msg: '次回実行 // 金曜 09:00' },
      { src: 'backup', tag: 'ok', msg: '次回 canary // 日曜 04:00' }
    ]
  }
};

function t(key){
  const e = I18N[key];
  if (!e) return '';
  return (e[LANG] !== undefined ? e[LANG] : e.en);
}

/* ============= DATA ============= */

const SQUAD = [
  {
    id: 'brus', cls: '',
    rank: 'CHIEF OPERATOR',
    name: 'BRUS',
    designation: 'M-001',
    typeStr: 'human-natural',
    statusKey: 'ONLINE',
    since: new Date('2024-08-15T00:00:00'),
    bio: 'Cuerpo orgánico sin cyberización. Director operativo de Section 9. No delega comando táctico. Castellano peninsular como lengua franca de la unidad.',
    fields: [
      ['cyber-brain', 'natural // unaugmented'],
      ['shell', 'organic'],
      ['command', 'tactical + strategic'],
      ['language', 'es-ES // technical EN'],
      ['codec freq', '140.85'],
      ['cqc', 'simplify before adding']
    ],
    stats: { life: 100, psy: 88, sta: 72 },
    quote: null
  },
  {
    id: 'batou', cls: '',
    rank: 'FIELD OPERATIVE',
    name: 'BATOU',
    designation: 'F-002',
    typeStr: 'cyber-brain // gemini-2.5-flash',
    statusKey: 'ACTIVE',
    since: new Date('2026-05-04T14:00:00'),
    bio: 'Operativo de campo con voz directa, sin paja. Acceso al vault y bridge Telegram. Identidad reforzada con SOUL.md de routing 3-fuentes (vault / honcho / conversación).',
    fields: [
      ['core', 'gemini-2.5-flash'],
      ['gateway', 'hermes v0.12.0'],
      ['routing', 'vault + honcho + conv'],
      ['dialect', 'castellano peninsular'],
      ['mcps wired', '6 think-tanks'],
      ['codec freq', '141.80']
    ],
    stats: { life: 100, psy: 95, sta: 84 },
    quote: '"She looks tired."  — Batou (GITS, Major bridge scene)'
  },
  {
    id: 'voltron', cls: 'orange',
    rank: 'CYBER-BRAIN CLUSTER',
    name: 'VOLTRON',
    designation: 'C-003',
    typeStr: '3-stack: L0 // L1-CEO // L2-CTO',
    statusKey: 'HIBERNATING',
    statusSince: new Date('2026-04-29T00:00:00'),
    bio: 'Comité PYME de tres núcleos cooperativos. Hibernating awaiting tactical objective. Pausa indefinida hasta que emerja idea de negocio concreta.',
    fields: [
      ['stack', '3 cooperative cores'],
      ['L0', 'voltron base'],
      ['L1', 'CEO persona'],
      ['L2', 'CTO persona'],
      ['paused since', '2026-04-29'],
      ['wake condition', 'tactical objective inbound'],
      ['codec freq', '144.75 // silent']
    ],
    stats: { life: 100, psy: 100, sta: 0 },
    quote: '"Standing by. Awaiting orders."'
  },
  {
    id: 'hermes', cls: 'cyan',
    rank: 'GATEWAY',
    name: 'HERMES',
    designation: 'G-004',
    typeStr: 'comm-relay v0.12.0',
    statusKey: 'ONLINE',
    since: new Date('2026-05-04T14:00:00'),
    bio: 'Section 9 gateway. Routing entre operativos y servicios externos. Reside en deep-dive node (Kali VM). ExecStartPre healthcheck contra vault-bridge antes de aceptar tráfico.',
    fields: [
      ['version', 'v0.12.0 (= v2026.4.30)'],
      ['host', 'kali // deep-dive node'],
      ['systemd unit', 'hermes-gateway.service'],
      ['mcps registered', '6'],
      ['caching', 'gemini implicit 5min'],
      ['cache hit rate', '~58%'],
      ['codec freq', '142.52']
    ],
    stats: { life: 100, psy: 90, sta: 92 },
    quote: null
  },
  {
    id: 'watchdog', cls: 'orange',
    rank: 'DEFENSE BARRIER',
    name: 'WATCHDOG',
    designation: 'D-005',
    typeStr: 'auto-patrol 60s',
    statusKey: 'PATROLLING',
    since: new Date('2026-04-30T00:00:00'),
    bio: 'Patrulla servicios cada 60s y los relanza si caen. Vigila Voltron, vault-bridge, Hermes. Vive en infra/scripts/watchdog.ps1.',
    fields: [
      ['interval', '60s'],
      ['watching', 'voltron / vault-bridge / hermes'],
      ['log path', '~/logs/watchdog/'],
      ['relaunch policy', 'auto on failure'],
      ['alert channel', 'voltron → telegram'],
      ['codec freq', '148.41']
    ],
    stats: { life: 100, psy: 100, sta: 80 },
    quote: '"Patrolling. All clear. Patrolling. All clear."'
  }
];

const TACHIKOMAS = [
  { id: 't-cve', name: 'CVE-LOOKUP', host: 'kali', purpose: 'CVE intelligence & explanation', line: '¡Hola Brus! Hoy busco CVEs y los explico bonito.', deploys: '0 ops', exec: 'EXEC_MODE=local // node.js stdio', skills: ['nvd query', 'cvss scoring', 'patch hints'] },
  { id: 't-kali', name: 'KALI-RECON', host: 'kali', purpose: 'reconnaissance toolkit wrapper', line: '¡Brus-san! Tengo nmap y ganas de scanear.', deploys: '0 ops', exec: 'EXEC_MODE=local // shell wrapper', skills: ['nmap', 'whois', 'dns recon'] },
  { id: 't-web', name: 'WEB-RECON', host: 'kali', purpose: 'web surface mapping', line: 'Encontré 12 endpoints abiertos esta semana, ¿no? ¡Espera, son cero!', deploys: '0 ops', exec: 'EXEC_MODE=local // node.js', skills: ['headers', 'tls audit', 'tech fingerprint'] },
  { id: 't-vault', name: 'VAULT-BRIDGE', host: 'win', purpose: 'vault read/write bridge', line: '¡Yo sí trabajo! Soy el más popular de la unidad.', deploys: '~daily', exec: 'http :3142 // local', skills: ['read_page', 'write_page', 'list_pages'] },
  { id: 't-notify', name: 'NOTIFY-VOLTRON', host: 'kali', purpose: 'telegram bridge', line: 'Yo solo paso mensajes. Soy un cartero feliz.', deploys: 'on-demand', exec: 'EXEC_MODE=local // POST :3141', skills: ['telegram push', 'voltron relay'] },
  { id: 't-deep', name: 'CLAUDE-DEEP', host: 'kali', purpose: 'deep reasoning helper', line: 'Cuando Batou no da con algo, me llama. Me siento útil.', deploys: '~weekly', exec: 'claude-code v2.1.126 // sonnet-4-6', skills: ['deep analysis', '50K char ctx', '300s timeout'] }
];

const QUOTES = [
  { t: 'The net is vast and infinite.', a: 'MAJ. KUSANAGI // GITS' },
  { t: 'There is no spoon.', a: 'SPOON BOY // THE MATRIX' },
  { t: 'For now we see through a glass, darkly.', a: 'BATOU // GITS (1 COR 13:12)' },
  { t: 'We\'re standalone, but we\'re together.', a: 'TACHIKOMA // S.A.C.' },
  { t: 'Wake up, Brus.', a: 'TRINITY // (ADAPTED)' },
  { t: 'I know markdown.', a: 'NEO // (ADAPTED)' },
  { t: 'Kept you waiting, huh?', a: 'SOLID SNAKE // MGS2' },
  { t: 'A strong man doesn\'t need to read the future.', a: 'THE BOSS // MGS3' },
  { t: 'War has changed.', a: 'SOLID SNAKE // MGS4' },
  { t: 'V has come to.', a: 'BIG BOSS // MGSV' },
  { t: 'If we all reacted the same way, we\'d be predictable.', a: 'MAJ. KUSANAGI // S.A.C.' },
  { t: 'Regret minimization framework.', a: 'JEFF BEZOS // 1997' },
  { t: 'Your ghost is what you decide it is.', a: 'BATOU // GITS' }
];

const OPS_TEMPLATES = t('opsTemplates');

/* ============= TIME UTILS ============= */
function fmtUptime(since){
  const ms = Date.now() - since.getTime();
  const sec = Math.max(0, Math.floor(ms/1000));
  const d = Math.floor(sec/86400);
  const h = Math.floor((sec%86400)/3600);
  const m = Math.floor((sec%3600)/60);
  const s = sec%60;
  if (d > 0) return d + 'd ' + h + 'h ' + m + 'm';
  if (h > 0) return h + 'h ' + m + 'm ' + s + 's';
  return m + 'm ' + s + 's';
}

function fmtClock(d){
  const pad = n => String(n).padStart(2,'0');
  return pad(d.getUTCFullYear()) + '.' + pad(d.getUTCMonth()+1) + '.' + pad(d.getUTCDate())
    + ' // ' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + ' UTC';
}

function fmtClockShort(d){
  const pad = n => String(n).padStart(2,'0');
  return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}

/* ============= BOOT SEQUENCE (multi-phase) ============= */
function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

async function typewriter(elId, lines, charDelay){
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = '';
  for (let i = 0; i < lines.length; i++){
    if (i > 0) { el.textContent += '\n'; await sleep(420); }
    const line = lines[i];
    for (let j = 0; j < line.length; j++){
      el.textContent += line[j];
      await sleep(charDelay + Math.random() * 30);
    }
  }
}

function showBootPhase(n){
  ['bp1','bp2','bp3','bp4'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', i !== n - 1);
  });
}

async function runAuthChecks(){
  const services = [
    'tailnet mesh',
    'hermes-gateway',
    'vault-bridge',
    'magi cluster',
    'batou // F-002',
    'watchdog patrol',
    'a.t. field'
  ];
  const list = document.getElementById('bootProgressList');
  if (!list) return;
  list.innerHTML = '';
  services.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'boot-prog-row';
    row.innerHTML = '<span class="name">' + s + '</span><div class="bar"><div class="f" id="pf' + i + '"></div></div><span class="pct" id="pp' + i + '">--</span>';
    list.appendChild(row);
  });
  for (let i = 0; i < services.length; i++){
    const f = document.getElementById('pf' + i);
    const p = document.getElementById('pp' + i);
    await sleep(120);
    let pct = 0;
    while (pct < 100){
      pct += 8 + Math.floor(Math.random() * 22);
      if (pct > 100) pct = 100;
      f.style.width = pct + '%';
      p.textContent = pct + '%';
      await sleep(20 + Math.random() * 35);
    }
    p.textContent = 'OK';
    list.children[i].classList.add('done');
  }
}

/* ============= PIXEL FONT 5x7 (boot stamp dot-matrix) ============= */
const PIXEL_FONT_5x7 = {
  'S': [' XXXX','X    ','X    ',' XXX ','    X','    X','XXXX '],
  'E': ['XXXXX','X    ','X    ','XXXX ','X    ','X    ','XXXXX'],
  'C': [' XXXX','X    ','X    ','X    ','X    ','X    ',' XXXX'],
  'T': ['XXXXX','  X  ','  X  ','  X  ','  X  ','  X  ','  X  '],
  'I': ['XXXXX','  X  ','  X  ','  X  ','  X  ','  X  ','XXXXX'],
  'O': [' XXX ','X   X','X   X','X   X','X   X','X   X',' XXX '],
  'N': ['X   X','XX  X','XX  X','X X X','X  XX','X  XX','X   X'],
  '9': [' XXX ','X   X','X   X',' XXXX','    X','X   X',' XXX '],
  ' ': ['     ','     ','     ','     ','     ','     ','     ']
};

function renderBootStamp(canvas, text){
  const ctx = canvas.getContext('2d');
  const cellSize = 9;
  const cellGap = 2;
  const charSpacing = 2;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const pixels = [];
  let curX = 0;
  for (const ch of text){
    const glyph = PIXEL_FONT_5x7[ch] || PIXEL_FONT_5x7[' '];
    for (let row = 0; row < glyph.length; row++){
      for (let col = 0; col < glyph[row].length; col++){
        if (glyph[row][col] === 'X'){
          pixels.push({ col: curX + col, row });
        }
      }
    }
    curX += glyph[0].length + charSpacing;
  }

  const totalCols = curX - charSpacing;
  const totalRows = 7;
  const w = totalCols * (cellSize + cellGap) - cellGap;
  const h = totalRows * (cellSize + cellGap) - cellGap;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);

  const totalDuration = 700;
  for (const p of pixels){
    p.lightAt = Math.random() * totalDuration;
    const r = Math.random();
    p.color = r < 0.04 ? '#4FB8CC' : (r < 0.07 ? '#E6792A' : '#5BC07A');
  }

  // pre-fill background with very dim grid (LCD-off cells)
  const drawDimGrid = () => {
    ctx.fillStyle = 'rgba(91,192,122,0.06)';
    for (let row = 0; row < totalRows; row++){
      for (let col = 0; col < totalCols; col++){
        ctx.fillRect(col * (cellSize + cellGap), row * (cellSize + cellGap), cellSize, cellSize);
      }
    }
  };

  return new Promise((resolve) => {
    const startTime = performance.now();
    let beep1 = false, beep2 = false, beep3 = false;
    function frame(now){
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, w, h);
      drawDimGrid();
      for (const p of pixels){
        if (elapsed >= p.lightAt){
          const dt = Math.min(120, elapsed - p.lightAt);
          ctx.globalAlpha = dt / 120;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.col * (cellSize + cellGap), p.row * (cellSize + cellGap), cellSize, cellSize);
          ctx.globalAlpha = 1;
        }
      }
      if (!beep1 && elapsed > 50)  { beep1 = true; try { beep(660, 0.05, 'square'); } catch(_){} }
      if (!beep2 && elapsed > 280) { beep2 = true; try { beep(880, 0.05, 'square'); } catch(_){} }
      if (!beep3 && elapsed > 520) { beep3 = true; try { beep(1100, 0.07, 'square'); } catch(_){} }
      if (elapsed < totalDuration + 200){
        requestAnimationFrame(frame);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

/* ============= CONFETTI BG (pixel blocks drifting, inspired by y-n10) ============= */
let confettiStarted = false;
function startConfetti(){
  if (confettiStarted) return;
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  if (window.innerWidth < 900 || PREFERS_REDUCED_MOTION){ canvas.style.display = 'none'; return; }
  confettiStarted = true;

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize(){
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  resize();
  window.addEventListener('resize', resize);

  const palette = ['#5BC07A', '#4FB8CC', '#E6792A', '#d94545', '#d6b13a'];
  const N = 90;
  const blocks = Array.from({ length: N }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (0.25 + Math.random() * 0.55) * dpr * (Math.random() < 0.5 ? -1 : 1),
    vy: (0.20 + Math.random() * 0.45) * dpr * (Math.random() < 0.7 ? -1 : 1),
    size: (8 + Math.floor(Math.random() * 11)) * dpr,
    color: palette[Math.floor(Math.random() * palette.length)],
    twinklePhase: Math.random() * Math.PI * 2,
    glow: Math.random() < 0.18
  }));

  let lastFrame = 0;
  function frame(now){
    if (now - lastFrame < 32){ requestAnimationFrame(frame); return; }
    lastFrame = now;
    if (hasFullscreenOverlay()){ requestAnimationFrame(frame); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const b of blocks){
      b.x += b.vx;
      b.y += b.vy;
      const m = b.size + 2;
      if (b.x > canvas.width + m) b.x = -m;
      else if (b.x < -m) b.x = canvas.width + m;
      if (b.y > canvas.height + m) b.y = -m;
      else if (b.y < -m) b.y = canvas.height + m;
      const tw = 0.55 + 0.45 * Math.sin(now * 0.002 + b.twinklePhase);
      ctx.globalAlpha = tw;
      ctx.fillStyle = b.color;
      if (b.glow){
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 12;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fillRect(Math.round(b.x), Math.round(b.y), b.size, b.size);
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

async function runBoot(){
  // Skip the full boot animation if we've already booted in this session.
  // Lets the user navigate to /pages/* and back without sitting through 7s of typewriter again.
  let alreadyBooted = false;
  try { alreadyBooted = sessionStorage.getItem('s9_booted') === '1'; } catch(_){}

  if (alreadyBooted){
    document.getElementById('boot').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    startMainLoops();
    return;
  }

  showBootPhase(1);
  await sleep(500);
  await typewriter('bp1Text', t('bootLines'), 60);
  await sleep(1100);

  showBootPhase(2);
  await sleep(950);

  showBootPhase(3);
  await sleep(280);
  await runAuthChecks();
  await sleep(450);

  showBootPhase(4);
  const stampCanvas = document.getElementById('bootStampCanvas');
  if (stampCanvas) renderBootStamp(stampCanvas, 'SECTION 9');
  await sleep(2300);

  const boot = document.getElementById('boot');
  boot.classList.add('boot-fade-out');
  await sleep(620);
  boot.classList.add('hidden');
  document.getElementById('hud').classList.remove('hidden');
  try { sessionStorage.setItem('s9_booted', '1'); } catch(_){}
  startMainLoops();
}

/* ============= RAIN (canvas) ============= */
function makeRain(canvas, opts){
  if (PREFERS_REDUCED_MOTION){ canvas.style.display = 'none'; return; }
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  function resize(){
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  const fontSize = opts.fontSize || 12;
  const cols = Math.floor(canvas.clientWidth / fontSize);
  const drops = new Array(cols).fill(0).map(() => Math.random() * -50);

  const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const words = opts.words || [];
  const chars = (katakana + '0123456789').split('');

  function draw(){
    ctx.fillStyle = 'rgba(5,5,7,0.08)';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.font = fontSize + "px 'Noto Sans JP', monospace";
    for (let i = 0; i < drops.length; i++){
      const useWord = words.length && Math.random() < 0.005;
      let txt;
      if (useWord){
        txt = words[Math.floor(Math.random()*words.length)];
        ctx.fillStyle = '#a85a20';
      } else {
        txt = chars[Math.floor(Math.random()*chars.length)];
        ctx.fillStyle = Math.random() < 0.03 ? '#9ad6a8' : '#3d8a52';
      }
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      if (useWord){
        ctx.fillText(txt, x, y);
        drops[i] += txt.length;
      } else {
        ctx.fillText(txt, x, y);
      }
      if (y > canvas.clientHeight && Math.random() > 0.975){
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  let lastDraw = 0;
  let raf = null;
  let stopped = false;
  const baseFrameMs = opts.frameMs || (opts.speed || 130);
  function loop(t){
    if (stopped) return;
    const overlay = hasFullscreenOverlay();
    if (!overlay){
      const frameMs = isIdle() ? Math.max(280, baseFrameMs * 2) : baseFrameMs;
      if (t - lastDraw >= frameMs){
        draw();
        lastDraw = t;
      }
    }
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  return {
    stop: () => { stopped = true; if (raf) cancelAnimationFrame(raf); },
    isStopped: () => stopped
  };
}

/* ============= ACTIVITY + OVERLAY HELPERS ============= */
let lastActivity = Date.now();
function bumpActivity(){ lastActivity = Date.now(); }
function isIdle(){ return Date.now() - lastActivity > 60000; }
function bindActivityTracking(){
  ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'].forEach(ev =>
    document.addEventListener(ev, bumpActivity, { passive: true })
  );
}
function hasFullscreenOverlay(){
  return !!document.querySelector('.ovl, .dive-overlay, .third-impact, .leliel-shadow, .iruel-overlay, .seele, .help-modal, .sac, .codec-call, .dossier:not(.hidden)');
}

/* ============= RENDER ============= */
function renderSquad(){
  const wrap = document.getElementById('squadCards');
  wrap.innerHTML = SQUAD.map(s => {
    const uptime = s.statusKey === 'HIBERNATING'
      ? 'paused ' + fmtUptime(s.statusSince)
      : 'up ' + fmtUptime(s.since);
    return `
      <div class="card ${s.cls}" data-id="${s.id}">
        <div class="card-rank">${s.rank}</div>
        <div class="card-name">${s.name}</div>
        <div class="card-id">${s.designation} // ${s.typeStr}</div>
        <div class="card-row"><span class="k">status</span><span class="v">${s.statusKey}</span></div>
        <div class="card-row"><span class="k">uptime</span><span class="v" data-uptime="${s.id}">${uptime}</span></div>
        <div class="mini-bars">
          <div class="mini-bar life"><span class="lbl">LIFE</span><span class="track"><span class="fill" style="width:${s.stats.life}%"></span></span><span class="pct">${s.stats.life}</span></div>
          <div class="mini-bar psy"><span class="lbl">PSYCHE</span><span class="track"><span class="fill" style="width:${s.stats.psy}%"></span></span><span class="pct">${s.stats.psy}</span></div>
          <div class="mini-bar sta"><span class="lbl">STAMINA</span><span class="track"><span class="fill" style="width:${s.stats.sta}%"></span></span><span class="pct">${s.stats.sta}</span></div>
        </div>
      </div>`;
  }).join('') + `
    <div class="card vacant" aria-label="Open recruitment slot">
      <div class="vacant-tag">SLOT // V-006</div>
      <div class="vacant-name">[ VACANT ]</div>
      <div class="vacant-sub">recruitment open · awaiting candidate</div>
    </div>`;
  wrap.querySelectorAll('.card:not(.vacant)').forEach(c => {
    c.addEventListener('click', () => openDossier(c.dataset.id));
  });
}

function renderTachi(){
  const wrap = document.getElementById('tachiCards');
  wrap.innerHTML = TACHIKOMAS.map(t => `
    <div class="tachi-card" data-id="${t.id}">
      <div class="tachi-head">
        <span class="tachi-name">${t.name}</span>
        <span class="tachi-ops">${t.deploys}</span>
      </div>
      <div class="tachi-line">"${t.line}"</div>
    </div>
  `).join('');
  wrap.querySelectorAll('.tachi-card').forEach(c => {
    c.addEventListener('click', () => openTachiDossier(c.dataset.id));
  });
}

function refreshUptimes(){
  SQUAD.forEach(s => {
    const el = document.querySelector('[data-uptime="' + s.id + '"]');
    if (!el) return;
    el.textContent = s.statusKey === 'HIBERNATING'
      ? 'paused ' + fmtUptime(s.statusSince)
      : 'up ' + fmtUptime(s.since);
  });
}

/* ============= DOSSIER ============= */
function openDossier(id){
  const s = SQUAD.find(x => x.id === id);
  if (!s) return;
  const dos = document.getElementById('dossier');
  const body = document.getElementById('dossierBody');
  dos.className = 'dossier ' + (s.cls || '');
  const grid = s.fields.map(([k,v]) => '<dt>' + k + '</dt><dd>' + v + '</dd>').join('');
  const quote = s.quote ? '<div class="dossier-quote">' + s.quote + '</div>' : '';
  const uptime = s.statusKey === 'HIBERNATING'
    ? 'paused ' + fmtUptime(s.statusSince)
    : 'up ' + fmtUptime(s.since);
  body.innerHTML = `
    <div class="dossier-rank">${s.rank}</div>
    <div class="dossier-name">${s.name}</div>
    <div class="dossier-id">${s.designation} // ${s.typeStr}</div>
    <div class="dossier-stats">
      <div class="stat-bar life"><span class="lbl">LIFE</span><span class="track"><span class="fill" style="width:${s.stats.life}%"></span></span><span class="pct">${s.stats.life}%</span></div>
      <div class="stat-bar psy"><span class="lbl">PSYCHE</span><span class="track"><span class="fill" style="width:${s.stats.psy}%"></span></span><span class="pct">${s.stats.psy}%</span></div>
      <div class="stat-bar sta"><span class="lbl">STAMINA</span><span class="track"><span class="fill" style="width:${s.stats.sta}%"></span></span><span class="pct">${s.stats.sta}%</span></div>
    </div>
    <dl class="dossier-grid">
      <dt>status</dt><dd>${s.statusKey}</dd>
      <dt>uptime</dt><dd>${uptime}</dd>
      ${grid}
    </dl>
    <div class="dossier-bio">${s.bio}</div>
    ${quote}
  `;
  dos.classList.remove('hidden');
}

function openTachiDossier(id){
  const t = TACHIKOMAS.find(x => x.id === id);
  if (!t) return;
  const dos = document.getElementById('dossier');
  const body = document.getElementById('dossierBody');
  dos.className = 'dossier cyan';
  const skills = t.skills.map(s => '<dt>·</dt><dd>' + s + '</dd>').join('');
  body.innerHTML = `
    <div class="dossier-rank">TACHIKOMA UNIT // MCP THINK-TANK</div>
    <div class="dossier-name">${t.name}</div>
    <div class="dossier-id">host: ${t.host} // ${t.exec}</div>
    <dl class="dossier-grid">
      <dt>purpose</dt><dd>${t.purpose}</dd>
      <dt>deploys</dt><dd>${t.deploys}</dd>
      ${skills}
    </dl>
    <div class="dossier-bio">"${t.line}"</div>
  `;
  dos.classList.remove('hidden');
}

function closeDossier(){
  document.getElementById('dossier').classList.add('hidden');
}

/* ============= QUOTES ROTATOR ============= */
let qIdx = 0;
function rotateQuote(){
  qIdx = (qIdx + 1) % QUOTES.length;
  const tEl = document.getElementById('quoteText');
  const aEl = document.getElementById('quoteAttr');
  tEl.style.opacity = 0;
  aEl.style.opacity = 0;
  setTimeout(() => {
    tEl.textContent = QUOTES[qIdx].t;
    aEl.textContent = '— ' + QUOTES[qIdx].a;
    tEl.style.opacity = 1;
    aEl.style.opacity = 1;
  }, 600);
}

/* ============= DIALECTIC TIMESTAMP ============= */
function tickDialectic(){
  const el = document.getElementById('lastDialectic');
  const mins = Math.floor(Math.random() * 47) + 3;
  el.textContent = mins + 'm ago';
}

/* ============= CLOCK ============= */
function tickClock(){
  document.getElementById('liveTime').textContent = fmtClock(new Date());
}

/* ============= OPS LOG FEED ============= */
let opsCount = 0;
function pushOpsEntry(){
  const tpl = OPS_TEMPLATES[Math.floor(Math.random() * OPS_TEMPLATES.length)];
  const feed = document.getElementById('opsFeed');
  const ts = fmtClockShort(new Date());
  const entry = document.createElement('div');
  entry.className = 'ops-entry ' + tpl.tag;
  entry.innerHTML = `<span class="ts">${ts}</span><span class="src">${tpl.src}</span><span class="msg">${tpl.msg}</span>`;
  feed.appendChild(entry);
  while (feed.children.length > 60) feed.removeChild(feed.firstChild);
  feed.scrollTop = feed.scrollHeight;
  opsCount++;
  document.getElementById('opsCounter').textContent = opsCount + ' events // session';
}

function seedOpsLog(){
  for (let i = 0; i < 8; i++) pushOpsEntry();
}

/* ============= MOTHER BASE STATS ============= */
function tickMotherBase(){
  const brus = SQUAD.find(x => x.id === 'brus');
  const ms = Date.now() - brus.since.getTime();
  const days = Math.floor(ms / 86400000);
  document.getElementById('mbDays').textContent = days;
  const baseOps = Math.floor(days * 47.3);
  document.getElementById('mbOps').textContent = (baseOps + opsCount).toLocaleString();
}

/* ============= EASTER EGGS ============= */
const EGG_SEQS = {
  // GHOST IN THE SHELL
  'rabbit': () => triggerRabbit(),
  'tachikoma': () => triggerTachiMode(),
  'sac': () => triggerSAC(),
  'kusanagi': () => triggerCharacterDossier('kusanagi'),
  'motoko': () => triggerCharacterDossier('kusanagi'),
  'togusa': () => triggerCharacterDossier('togusa'),
  'aramaki': () => triggerCharacterDossier('aramaki'),
  'ishikawa': () => triggerCharacterDossier('ishikawa'),

  // MATRIX
  'dive': () => triggerDive(),
  'matrix': () => triggerDive(),
  'jackin': () => { triggerDive(); beep(880, 0.3, 'square'); },
  'neo': () => triggerNeo(),
  'trinity': () => triggerCharacterDossier('trinity'),
  'morpheus': () => triggerCharacterDossier('morpheus'),
  'oracle': () => triggerCharacterDossier('oracle'),
  'cypher': () => triggerCharacterDossier('cypher'),
  'agent': () => triggerCharacterDossier('smith'),
  'smith': () => triggerCharacterDossier('smith'),
  'redpill': () => triggerPill('red'),
  'bluepill': () => triggerPill('blue'),
  'markdown': () => triggerMarkdown(),
  'zion': () => triggerZion(),

  // METAL GEAR SOLID
  'snake': () => triggerSnaaake(),
  'snaaake': () => triggerSnaaake(),
  'box': () => showCardboardBox(),
  'kojima': () => triggerKojima(),
  'nanomachines': () => triggerNano(),
  'patriots': () => triggerPatriots(),
  'foxhound': () => triggerFoxhound(),
  'otacon': () => triggerCharacterDossier('otacon'),
  'meryl': () => triggerCharacterDossier('meryl'),
  'raiden': () => triggerCharacterDossier('raiden'),
  'ocelot': () => triggerCharacterDossier('ocelot'),
  'mantis': () => triggerMantis(),
  'bigboss': () => triggerCharacterDossier('bigboss'),
  'codec': () => actionCodec(),
  'cqc': () => triggerCQC(),
  'ration': () => triggerRation(),
  'alert': () => triggerAlertFlash(),

  // EVANGELION
  'adam': () => triggerAdam(),
  'lilith': () => triggerLilith(),
  'ramiel': () => triggerRamiel(),
  'leliel': () => triggerLeliel(),
  'iruel': () => triggerIruel(),
  'tabris': () => triggerTabris(),
  'kaworu': () => triggerTabris(),
  'longinus': () => triggerLonginus(),
  'lance': () => triggerLonginus(),
  'spear': () => triggerLonginus(),
  'impact': () => triggerThirdImpact(),
  'instrumentality': () => triggerThirdImpact(),
  'seele': () => triggerSEELE(),
  'nerv': () => triggerNERV(),
  'lcl': () => triggerLCL(),
  'rei': () => triggerCharacterDossier('rei'),
  'asuka': () => triggerCharacterDossier('asuka'),
  'shinji': () => triggerShinji(),
  'misato': () => triggerCharacterDossier('misato'),
  'gendo': () => triggerCharacterDossier('gendo'),
  'sachiel': () => triggerAngelIntel('sachiel'),
  'sahaquiel': () => triggerAngelIntel('sahaquiel'),
  'zeruel': () => triggerAngelIntel('zeruel'),
  'arael': () => triggerAngelIntel('arael'),
  'armisael': () => triggerAngelIntel('armisael'),
  'magi': () => actionQuery(),
  'pattern': () => showPattern('blue'),
  'eva01': () => triggerEvaUnit('01'),
  'eva02': () => triggerEvaUnit('02'),
  'unit01': () => triggerEvaUnit('01'),
  'unit02': () => triggerEvaUnit('02'),

  // BOOT REPLAY
  'replay': () => triggerBootReplay(),
  'reboot': () => triggerBootReplay(),
  'boot': () => triggerBootReplay(),

  // META (not counted as discoveries)
  'wipe': () => triggerResetProgress(),
  'reset': () => triggerResetProgress(),

  // LAIN
  'lain': () => triggerLainEnter(),
  'wired': () => triggerLainEnter(),
  'iwakura': () => triggerLainEnter(),
  'protocol7': () => triggerLainEnter(),
  'eiri': () => triggerLainEnter(),
  'phantoma': () => triggerPhantoma(),
  'cyberia': () => triggerCyberia(),
  'accela': () => triggerCyberia(),
  'knights': () => triggerKnights(),
  'navi': () => triggerNavi(),
  'schumann': () => triggerSchumann()
};

function triggerPhantoma(){
  const div = makeOvl('phantoma-overlay');
  div.innerHTML +=
    '<svg class="phantoma-grid" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">' +
      '<defs><linearGradient id="pgFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="%234FB8CC" stop-opacity="0.15"/><stop offset="1" stop-color="%234FB8CC" stop-opacity="0.85"/></linearGradient></defs>' +
      // horizontal vanishing grid
      Array.from({length: 9}, (_, i) => {
        const y = 80 + i * (160 / 9);
        const inset = (i / 9) * 160;
        return `<line x1="${inset}" y1="${y}" x2="${400 - inset}" y2="${y}" stroke="#4FB8CC" stroke-width="${0.6 + i*0.12}" opacity="${0.25 + i*0.08}"/>`;
      }).join('') +
      // verticals converging to center
      Array.from({length: 11}, (_, i) => {
        const xTop = 60 + (i * 280 / 10);
        const xBottom = i * 40;
        return `<line x1="${xTop}" y1="80" x2="${xBottom}" y2="240" stroke="#4FB8CC" stroke-width="0.7" opacity="0.45"/>`;
      }).join('') +
    '</svg>' +
    '<div class="phantoma-text">PHANTOMa<small>game leaks players · players leak game</small></div>' +
    '<div class="phantoma-status">CONNECTED // 1,402 GHOSTS ONLINE</div>' +
    '<div class="ovl-hint">[ESC] to dismiss</div>';
  document.body.appendChild(div);
  beep(440, 0.08, 'square');
  setTimeout(() => beep(660, 0.06, 'square'), 140);
  setTimeout(() => beep(330, 0.10, 'sine'), 320);
}

function triggerCyberia(){
  const div = makeOvl('cyberia-overlay');
  div.innerHTML +=
    '<div class="cyberia-flicker">CYBERIA</div>' +
    '<div class="cyberia-sub">SHIBUYA · BASEMENT 03 · BOUNDARY THIN</div>' +
    '<div class="cyberia-stim">' +
      '<span class="stim-tag">// NEURAL STIM ADMINISTERED</span>' +
      '<span class="stim-name">ACCELA</span>' +
      '<span class="stim-warn">substrate timing exposed · do not exit until tone resolves</span>' +
    '</div>' +
    '<div class="ovl-hint">[ESC] to dismiss</div>';
  document.body.appendChild(div);
  // bass loop simulated with quick descending tones
  beep(80, 0.4, 'sawtooth');
  setTimeout(() => beep(110, 0.35, 'sawtooth'), 320);
  setTimeout(() => beep(80, 0.4, 'sawtooth'), 640);
}

function triggerKnights(){
  const div = makeOvl('knights-overlay');
  const cells = Array.from({length: 13}, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `<div class="knight-cell"><div class="knight-num">// ${num}</div><div class="knight-bracket">[ ]</div><div class="knight-id">offline</div></div>`;
  }).join('');
  div.innerHTML +=
    '<div class="knights-tag">// KNIGHTS OF EASTERN CALCULUS</div>' +
    '<div class="knights-h">async cells · never met · all bound</div>' +
    '<div class="knights-grid">' + cells + '</div>' +
    '<div class="knights-foot">// directives last received: silenced by lain</div>' +
    '<div class="ovl-hint">[ESC] to dismiss</div>';
  document.body.appendChild(div);
  beep(220, 0.05, 'square');
  setTimeout(() => beep(330, 0.05, 'square'), 80);
  setTimeout(() => beep(440, 0.08, 'square'), 160);
}

function triggerNavi(){
  const div = makeOvl('navi-overlay');
  div.innerHTML +=
    '<pre class="navi-art">' +
      '         ┌──────────────┐\n' +
      '   ┌─────┤  COPLAND OS  ├─────┐\n' +
      '   │     └──────┬───────┘     │\n' +
      '   │    ╭───────┴────────╮    │\n' +
      '   ├────┤ CUSTOM CHIPSET ├────┤\n' +
      '   │    ╰───────┬────────╯    │\n' +
      '   │   ┌────────┴─────────┐   │\n' +
      '   ├───┤ LIQUID-COOL LOOP ├───┤\n' +
      '   │   └────────┬─────────┘   │\n' +
      '   │ ╱╲╱╲╱╲╱╲╱╲╱┴╲╱╲╱╲╱╲╱╲╱╲ │\n' +
      '   │ ▓▓▓▓▓▓▓▓▓ NAVI ▓▓▓▓▓▓▓▓▓ │\n' +
      '   └─────────────────────────┘' +
    '</pre>' +
    '<div class="navi-label">NAVI<small>terminal · gradually indistinguishable from operator</small></div>' +
    '<div class="ovl-hint">[ESC] to dismiss</div>';
  document.body.appendChild(div);
  beep(660, 0.04, 'square');
  setTimeout(() => beep(880, 0.04, 'square'), 80);
  setTimeout(() => beep(1320, 0.06, 'square'), 200);
}

function triggerSchumann(){
  const div = makeOvl('schumann-overlay');
  // generate a smooth-ish low-frequency waveform path
  const w = 800, h = 160;
  let path = 'M 0 ' + (h/2);
  for (let x = 0; x <= w; x += 8){
    const y = h/2 + Math.sin(x * 0.04) * 30 + Math.sin(x * 0.018) * 18;
    path += ` L ${x} ${y.toFixed(1)}`;
  }
  div.innerHTML +=
    '<div class="schumann-tag">// PLANETARY EM RESONANCE</div>' +
    '<div class="schumann-freq">7.83 <small>Hz</small></div>' +
    '<svg class="schumann-wave" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">' +
      `<path d="${path}" stroke="#4FB8CC" stroke-width="2" fill="none" opacity="0.85"/>` +
      `<path d="${path}" stroke="#4FB8CC" stroke-width="6" fill="none" opacity="0.18"/>` +
    '</svg>' +
    '<div class="schumann-sub">earth\'s carrier wave · weaponized by protocol 7 · backdoor for the willing</div>' +
    '<div class="ovl-hint">[ESC] to dismiss</div>';
  document.body.appendChild(div);
  // slow low tone evoking 7.83Hz (audible octave up)
  beep(125, 1.2, 'sine');
}

function triggerLainEnter(){
  const old = document.querySelector('.lain-enter');
  if (old) old.remove();
  const wrap = document.createElement('div');
  wrap.className = 'lain-enter';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML =
    '<div class="lain-enter-tag">PROTOCOL 7 // SCHUMANN BAND OPEN</div>' +
    '<div class="lain-enter-h">close the world<small>open the wOrld</small></div>' +
    '<div class="lain-enter-sub">routing to the wired...</div>';
  document.body.appendChild(wrap);
  pushOpsCustom('wired', 'ok', 'lain // routing // pages/lain.html');
  beep(660, 0.05, 'square');
  setTimeout(() => beep(880, 0.05, 'square'), 120);
  setTimeout(() => beep(1320, 0.08, 'square'), 320);
  requestAnimationFrame(() => wrap.classList.add('show'));
  setTimeout(() => { window.location.href = 'pages/lain.html'; }, 1300);
}

async function triggerBootReplay(){
  const old = document.querySelector('.boot-replay');
  if (old) old.remove();
  const wrap = document.createElement('div');
  wrap.className = 'boot-replay';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML =
    '<canvas class="boot-title-stamp" id="bootReplayCanvas" aria-label="SECTION 9"></canvas>' +
    '<div class="boot-subtitle">PUBLIC SECURITY // CYBER-BRAIN DIVISION</div>' +
    '<div class="boot-tagline">TACTICAL ESPIONAGE OPERATION</div>';
  document.body.appendChild(wrap);
  pushOpsCustom('boot', 'ok', 'replay // section 9 stamp');
  requestAnimationFrame(() => wrap.classList.add('show'));
  const cvs = wrap.querySelector('#bootReplayCanvas');
  if (cvs) await renderBootStamp(cvs, 'SECTION 9');
  await sleep(2200);
  wrap.classList.remove('show');
  await sleep(620);
  if (wrap.parentNode) wrap.remove();
}

function triggerAlertFlash(){
  const w = document.getElementById('alertWidget');
  const v = document.getElementById('alertValue');
  w.classList.add('alert');
  v.textContent = t('alertAlert');
  const overlay = document.createElement('div');
  overlay.className = 'mgs-alert';
  overlay.innerHTML = '<div class="alert-mark">!</div>';
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 600);
  setTimeout(() => {
    w.classList.remove('alert');
    v.textContent = t('alertClear');
  }, 4000);
}

function showCardboardBox(){
  const old = document.querySelector('.cardboard');
  if (old) old.remove();
  const box = document.createElement('div');
  box.className = 'cardboard';
  box.innerHTML = `   _______________
  /              /|
 /______________/ |
 |              | |
 |   FRAGILE    | |
 |  THIS SIDE   | /
 |______________|/
<small>CARDBOARD BOX EQUIPPED</small>`;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 5000);
}

function showEgg(msg){
  const old = document.getElementById('egg');
  if (old) old.remove();
  const el = document.createElement('div');
  el.id = 'egg';
  el.className = 'egg';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

let typeBuf = '';
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
    closeDossier();
    closeHelp();
    if (document.querySelector('.dive-overlay')) exitDive();
    ['.sac', '.seele', '.codec-call', '.atfield-overlay', '.pattern-alert', '.cardboard',
     '.eva-overlay', '.leliel-shadow', '.leliel-label', '.iruel-overlay', '.iruel-label', '.third-impact', '.node-tooltip',
     '.ovl', '.help-modal']
      .forEach(sel => { document.querySelectorAll(sel).forEach(el => el.remove()); });
    if (document.activeElement && document.activeElement.id === 'cmdInput') document.activeElement.blur();
    return;
  }

  if (e.target && e.target.id === 'cmdInput') return;

  const expected = KONAMI[konamiIdx];
  if (e.key === expected || e.key.toLowerCase() === expected.toLowerCase()){
    konamiIdx++;
    if (konamiIdx === KONAMI.length){
      triggerSAC();
      markEggDiscovered('sac');
      konamiIdx = 0;
    }
  } else {
    konamiIdx = 0;
  }

  if (e.key.length === 1){
    typeBuf += e.key.toLowerCase();
    if (typeBuf.length > 30) typeBuf = typeBuf.slice(-30);
    document.getElementById('typeBuf').textContent = '> ' + typeBuf;
    for (const seq in EGG_SEQS){
      if (typeBuf.endsWith(seq)){
        EGG_SEQS[seq]();
        typeBuf = '';
        document.getElementById('typeBuf').textContent = '';
        break;
      }
    }
  } else if (e.key === 'Backspace'){
    typeBuf = typeBuf.slice(0, -1);
    document.getElementById('typeBuf').textContent = typeBuf ? '> ' + typeBuf : '';
  }
});

function triggerSAC(){
  const div = document.createElement('div');
  div.className = 'sac';
  div.innerHTML = `
    <div class="sac-text sac-glitch">STAND ALONE COMPLEX</div>
    <div class="sac-sub">No original. No copy. Identity: ambiguous.<br>
      A phenomenon where unrelated, unconnected actors mimic an originator that does not exist.<br><br>
      [ESC] to dismiss.
    </div>
  `;
  document.body.appendChild(div);
}

/* ============= PANEL ACTIONS ============= */
function actionPing(){
  const nodes = document.querySelectorAll('#topo .node');
  nodes.forEach((n, i) => {
    setTimeout(() => {
      const cx = n.getAttribute('cx');
      const cy = n.getAttribute('cy');
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ring.setAttribute('cx', cx);
      ring.setAttribute('cy', cy);
      ring.setAttribute('class', 'pulse-ring');
      ring.setAttribute('r', '4');
      n.parentNode.appendChild(ring);
      setTimeout(() => ring.remove(), 3000);
    }, i * 120);
  });
  pushOpsCustom('topology', 'ok', 'ping cycle // ' + nodes.length + ' nodes responded');
}

const MAGI_QUERIES = [
  { q: 'should brus add another agent?', go: false, msg: 'simplify before adding' },
  { q: 'is voltron ready to wake?', go: false, msg: 'no tactical objective' },
  { q: 'is honcho earning its keep?', go: true, msg: 'pattern: cyberpunk // unique inference' },
  { q: 'should we publish this page?', go: true, msg: 'low-stakes creative artifact' },
  { q: 'rotate annas api key?', go: false, msg: 'NOT ROTATABLE // provider limit' },
  { q: 'is the setup over budget?', go: true, msg: '$0.09/h baseline within bounds' },
  { q: 'deploy AT field?', go: true, msg: 'defensive integrity nominal' },
  { q: 'next backup canary OK?', go: true, msg: 'next run sunday 04:00 UTC' }
];

function actionQuery(){
  const result = document.getElementById('magiResult');
  const nodes = document.querySelectorAll('.magi-node');
  const q = MAGI_QUERIES[Math.floor(Math.random() * MAGI_QUERIES.length)];
  nodes.forEach(n => { n.classList.remove('approve', 'reject'); n.classList.add('thinking'); });
  result.className = 'magi-result';
  result.textContent = 'QUERY: ' + q.q.toUpperCase();
  let votes = [];
  let dissent = !q.go && Math.random() < 0.4;
  nodes.forEach((n, i) => {
    setTimeout(() => {
      n.classList.remove('thinking');
      let vote = q.go ? 'approve' : 'reject';
      if (dissent && i === Math.floor(Math.random() * 3)) vote = q.go ? 'reject' : 'approve';
      votes.push(vote);
      n.classList.add(vote);
      if (votes.length === 3){
        const goCount = votes.filter(v => v === 'approve').length;
        setTimeout(() => {
          if (goCount >= 2){
            result.className = 'magi-result go';
            result.textContent = 'CODE: GO // ' + q.msg.toUpperCase();
          } else {
            result.className = 'magi-result no';
            result.textContent = 'CODE: NO // ' + q.msg.toUpperCase();
          }
        }, 400);
      }
    }, 600 + i * 350);
  });
  pushOpsCustom('magi', 'ok', 'dialectic // ' + q.q);
}

function actionDeploy(){
  const old = document.querySelector('.atfield-overlay');
  if (old) old.remove();
  const overlay = document.createElement('div');
  overlay.className = 'atfield-overlay';
  let hex = '<svg class="atfield-svg" viewBox="-100 -100 200 200">';
  for (let r = 1; r <= 5; r++){
    for (let i = 0; i < 6 * r; i++){
      const angle = (Math.PI / 3) * Math.floor(i / r) + (Math.PI / (3 * r)) * (i % r);
      const dist = r * 14;
      const cx = Math.cos(angle) * dist;
      const cy = Math.sin(angle) * dist;
      const pts = [];
      for (let k = 0; k < 6; k++){
        const a = (Math.PI / 3) * k + Math.PI / 6;
        pts.push((cx + Math.cos(a) * 6).toFixed(2) + ',' + (cy + Math.sin(a) * 6).toFixed(2));
      }
      hex += '<polygon class="hex" points="' + pts.join(' ') + '"/>';
    }
  }
  hex += '</svg>';
  overlay.innerHTML = hex + '<div class="atfield-label">A.T. FIELD<small>ABSOLUTE TERROR // DEPLOYED</small></div>';
  document.body.appendChild(overlay);
  const strip = document.querySelectorAll('#atHexStrip svg');
  strip.forEach((s, i) => {
    setTimeout(() => {
      s.classList.add('deployed');
      setTimeout(() => s.classList.remove('deployed'), 1200);
    }, i * 150);
  });
  setTimeout(() => overlay.remove(), 1700);
  pushOpsCustom('a.t.field', 'warn', 'absolute terror // deployed');
}

const CODEC_CALLS = [
  { freq: '140.85', from: 'OPERATOR', portrait: ['┌──────┐', '│ ▒▒▒▒ │', '│ ◉  ◉ │', '│  ──  │', '│ ╲══╱ │', '└──────┘'].join('\n'), msg: 'M-001 standing by. Local channel.' },
  { freq: '141.80', from: 'BATOU', portrait: ['┌──────┐', '│ ▓▓▓▓ │', '│ ◉  ◉ │', '│  ──  │', '│ ════ │', '└──────┘'].join('\n'), msg: 'Operador. Vault está sincronizado. ¿Algo más?' },
  { freq: '142.52', from: 'HERMES', portrait: ['┌──────┐', '│ ░░░░ │', '│ ▪▪ ▪▪│', '│  ▼▼  │', '│ ───  │', '└──────┘'].join('\n'), msg: 'Gateway nominal. 6 think-tanks linked.' },
  { freq: '148.41', from: 'WATCHDOG', portrait: ['┌──────┐', '│ ▒▒▒▒ │', '│ ●  ● │', '│  ◢◣  │', '│ ╲══╱ │', '└──────┘'].join('\n'), msg: 'All clear. Patrolling. All clear. Patrolling.' },
  { freq: '145.90', from: 'TACHIKOMA', portrait: ['┌──────┐', '│ (◕◕) │', '│ │ │ │ │', '│  ▔▔  │', '│ ╲==╱ │', '└──────┘'].join('\n'), msg: '¡Operador-san! ¿Hoy hacemos algo divertido?' },
  { freq: '144.75', from: 'VOLTRON', portrait: ['┌──────┐', '│ ░░░░ │', '│ ·  · │', '│  ··  │', '│ ──── │', '└──────┘'].join('\n'), msg: '...zzz... awaiting tactical objective...' }
];

function showCodecCall(c){
  if (!c) return;
  const old = document.querySelector('.codec-call');
  if (old) old.remove();
  const el = document.createElement('div');
  el.className = 'codec-call';
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-label', 'Click for full dossier');
  el.dataset.freq = c.freq;
  el.innerHTML = `
    <div class="codec-call-portrait">${c.portrait}</div>
    <div class="codec-call-info">
      <span class="codec-call-label">▶ INCOMING TRANSMISSION</span>
      <span class="codec-call-from">${c.from}</span>
      <span class="codec-call-freq">FREQ ${c.freq} // CODEC</span>
      <span class="codec-call-msg">"${c.msg}"</span>
    </div>
  `;
  // Click → expand to full dossier
  const expand = () => {
    const dossierId = FREQ_TO_DOSSIER[c.freq];
    if (!dossierId) return;
    el.remove();
    triggerCharacterDossier(dossierId);
  };
  el.addEventListener('click', expand);
  el.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); expand(); }
  });
  document.body.appendChild(el);
  // Auto-dismiss longer (8s) so people have time to click
  setTimeout(() => { if (el.parentNode) el.remove(); }, 8000);
  // codec beep sequence
  beep(440, 0.05); setTimeout(() => beep(660, 0.05), 100); setTimeout(() => beep(440, 0.1), 200);
  pushOpsCustom('codec', 'ok', c.from + ' // freq ' + c.freq + ' // open');
}

function actionCodec(){
  const c = CODEC_CALLS[Math.floor(Math.random() * CODEC_CALLS.length)];
  showCodecCall(c);
}

function hailFreq(freq){
  const c = CODEC_CALLS.find(x => x.freq === freq);
  showCodecCall(c);
}

function actionRefresh(){
  document.querySelectorAll('.stat-cell .sval').forEach(el => {
    el.style.opacity = 0.2;
    setTimeout(() => { el.style.opacity = 1; }, 400);
  });
  tickMotherBase();
  pushOpsCustom('mother-base', 'ok', 'aggregate refreshed');
}

function pushOpsCustom(src, tag, msg){
  const feed = document.getElementById('opsFeed');
  if (!feed) return;
  const ts = fmtClockShort(new Date());
  const entry = document.createElement('div');
  entry.className = 'ops-entry ' + tag;
  entry.innerHTML = `<span class="ts">${ts}</span><span class="src">${src}</span><span class="msg">${msg}</span>`;
  feed.appendChild(entry);
  while (feed.children.length > 60) feed.removeChild(feed.firstChild);
  feed.scrollTop = feed.scrollHeight;
  opsCount++;
  document.getElementById('opsCounter').textContent = opsCount + ' events // session';
}

/* ============= LEFT TELEMETRY ============= */
function personalizedGreeting(){
  const h = new Date().getHours();
  let line, sub;
  if (h >= 0 && h < 5){
    line = t('deepDiveProgress');
    sub = 'late-night operator detected';
  } else if (h < 8){
    line = 'WAKE UP, BRUS...';
    sub = 'pre-dawn signal';
  } else if (h < 12){
    line = 'GOOD MORNING, OPERATOR';
    sub = 'tactical hours';
  } else if (h < 14){
    line = 'OPERATING IN DAYLIGHT';
    sub = 'midday window';
  } else if (h < 19){
    line = 'AFTERNOON SHIFT';
    sub = 'standard ops';
  } else if (h < 23){
    line = 'TWILIGHT // EVENING DIVE';
    sub = 'visibility reduced';
  } else {
    line = 'NIGHT OPERATIONS';
    sub = 'quiet hours';
  }
  const el = document.getElementById('lpGreeting');
  if (el) el.innerHTML = line + '<small>' + sub + '</small>';
}

let bpm = 68;
const sparkData = new Array(40).fill(0).map(() => 50);
function tickVitals(){
  bpm = Math.round(64 + Math.sin(Date.now()/8000) * 5 + (Math.random() - 0.5) * 4);
  const el = document.getElementById('bpm');
  if (el) el.textContent = bpm;
  const o2 = (96 + Math.random() * 3).toFixed(1);
  const lcl = (3.2 + Math.random() * 0.4).toFixed(2);
  const oEl = document.getElementById('o2'); if (oEl) oEl.textContent = o2 + '%';
  const lEl = document.getElementById('lcl'); if (lEl) lEl.textContent = lcl;
  sparkPush();
  drawSparkline();
}

function sparkPush(){
  let v = 50;
  const phase = Date.now() % 1000;
  if (phase < 60) v = 90;
  else if (phase < 130) v = 20;
  else if (phase < 200) v = 70;
  v += (Math.random() - 0.5) * 8;
  sparkData.shift();
  sparkData.push(v);
}

function drawSparkline(){
  const canvas = document.getElementById('sparkline');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  if (canvas.width !== canvas.clientWidth * dpr){
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  const W = canvas.clientWidth, H = canvas.clientHeight;
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = '#d94545';
  ctx.lineWidth = 1;
  ctx.shadowColor = '#d94545';
  ctx.shadowBlur = 3;
  ctx.beginPath();
  sparkData.forEach((v, i) => {
    const x = (i / (sparkData.length - 1)) * W;
    const y = H - (v / 100) * H;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.shadowBlur = 0;
}

let syncRatio = 47;
function tickSync(){
  const target = 40 + Math.sin(Date.now()/12000) * 25 + (Math.random() - 0.5) * 8;
  syncRatio += (target - syncRatio) * 0.3;
  syncRatio = Math.max(0, Math.min(100, syncRatio));
  const fill = document.getElementById('syncFill');
  const pct = document.getElementById('syncPct');
  if (fill) fill.style.height = syncRatio.toFixed(1) + '%';
  if (pct) pct.textContent = Math.round(syncRatio) + '%';
}

function loadVisitorProfile(){
  let count = 1;
  let lastStr = t('firstTime');
  try {
    const last = localStorage.getItem('s9_last');
    const cnt = parseInt(localStorage.getItem('s9_count') || '0', 10);
    count = cnt + 1;
    if (last){
      const lastDate = new Date(last);
      const diffMs = Date.now() - lastDate.getTime();
      const diffH = Math.floor(diffMs / 3600000);
      const diffD = Math.floor(diffH / 24);
      if (diffD > 0) lastStr = diffD + 'd ago';
      else if (diffH > 0) lastStr = diffH + 'h ago';
      else lastStr = Math.floor(diffMs / 60000) + 'm ago';
    }
    localStorage.setItem('s9_last', new Date().toISOString());
    localStorage.setItem('s9_count', String(count));
  } catch(e) {}
  const cEl = document.getElementById('vCount'); if (cEl) cEl.textContent = '#' + count;
  const lEl = document.getElementById('vLast'); if (lEl) lEl.textContent = lastStr;
}

function detectFingerprint(){
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UNKNOWN';
  const ua = navigator.userAgent;
  let os = 'unknown';
  if (/Win/i.test(ua)) os = 'Windows';
  else if (/Mac/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad/i.test(ua)) os = 'iOS';
  const lang = (navigator.language || 'en').slice(0, 5);
  const scr = screen.width + 'x' + screen.height;
  let ghost = '';
  try {
    const c = document.createElement('canvas');
    c.width = 80; c.height = 20;
    const cx = c.getContext('2d');
    cx.textBaseline = 'top';
    cx.font = '10px Arial';
    cx.fillStyle = '#f0f';
    cx.fillRect(0, 0, 80, 20);
    cx.fillStyle = '#0ff';
    cx.fillText('section9', 2, 2);
    const data = c.toDataURL();
    let h = 0;
    for (let i = 0; i < data.length; i++){ h = ((h << 5) - h + data.charCodeAt(i)) | 0; }
    ghost = (h >>> 0).toString(16).slice(0, 8).toUpperCase().padStart(8, '0');
  } catch(e) { ghost = 'XXXXXXXX'; }
  const fpTz = document.getElementById('fpTz'); if (fpTz) fpTz.textContent = tz.split('/').pop();
  const fpOs = document.getElementById('fpOs'); if (fpOs) fpOs.textContent = os;
  const fpLg = document.getElementById('fpLang'); if (fpLg) fpLg.textContent = lang;
  const fpSc = document.getElementById('fpScr'); if (fpSc) fpSc.textContent = scr;
  const fpGh = document.getElementById('fpGhost'); if (fpGh) fpGh.textContent = ghost;
}

let monoIdx = 7;
function tickMonolith(){
  monoIdx = (monoIdx % 12) + 1;
  const el = document.getElementById('miniMono');
  if (el){
    el.querySelector('.mn').textContent = String(monoIdx).padStart(2, '0');
  }
}

/* ============= AUDIO (Web Audio API) ============= */
let audioCtx = null, ambientNodes = null, audioOn = false;
function ensureAudio(){
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function beep(freq, dur, type){
  if (!audioOn) return;
  try {
    const ctx = ensureAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.value = 0;
    osc.connect(gain).connect(ctx.destination);
    const t = ctx.currentTime;
    gain.gain.linearRampToValueAtTime(0.06, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.start(t);
    osc.stop(t + dur);
  } catch(e) {}
}
function startAmbient(){
  try {
    const ctx = ensureAudio();
    const master = ctx.createGain();
    master.gain.value = 0.028;
    master.connect(ctx.destination);

    // Sub-bass foundation (~33 Hz)
    const subOsc = ctx.createOscillator(); subOsc.type = 'sine'; subOsc.frequency.value = 33;
    const subGain = ctx.createGain(); subGain.gain.value = 0.55;
    subOsc.connect(subGain).connect(master);

    // Lower drone (60 Hz)
    const osc1 = ctx.createOscillator(); osc1.type = 'sine'; osc1.frequency.value = 60;
    const g1 = ctx.createGain(); g1.gain.value = 0.55;
    osc1.connect(g1).connect(master);

    // Mid drone (90.5 Hz) with slow LFO breathing
    const osc2 = ctx.createOscillator(); osc2.type = 'sine'; osc2.frequency.value = 90.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.4;
    osc2.connect(g2).connect(master);
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.13;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 1.6;
    lfo.connect(lfoGain).connect(osc2.frequency);

    // High shimmer (4.4 kHz, very quiet, modulated)
    const shimmer = ctx.createOscillator(); shimmer.type = 'triangle'; shimmer.frequency.value = 4400;
    const shimGain = ctx.createGain(); shimGain.gain.value = 0.045;
    shimmer.connect(shimGain).connect(master);
    const shimLfo = ctx.createOscillator(); shimLfo.type = 'sine'; shimLfo.frequency.value = 0.07;
    const shimLfoGain = ctx.createGain(); shimLfoGain.gain.value = 0.04;
    shimLfo.connect(shimLfoGain).connect(shimGain.gain);

    subOsc.start(); osc1.start(); osc2.start(); lfo.start(); shimmer.start(); shimLfo.start();

    // Heartbeat — irregular ~1.4s cadence, low thump (lub-dub)
    let heartbeatId = null;
    const heartbeat = () => {
      if (!audioOn || !ambientNodes) return;
      const t = ctx.currentTime;
      // lub
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = 55;
      const g = ctx.createGain(); g.gain.value = 0;
      o.connect(g).connect(master);
      g.gain.linearRampToValueAtTime(0.18, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      o.start(t); o.stop(t + 0.2);
      // dub (smaller, slightly lower)
      const t2 = t + 0.13;
      const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = 48;
      const g2b = ctx.createGain(); g2b.gain.value = 0;
      o2.connect(g2b).connect(master);
      g2b.gain.linearRampToValueAtTime(0.1, t2 + 0.012);
      g2b.gain.exponentialRampToValueAtTime(0.001, t2 + 0.16);
      o2.start(t2); o2.stop(t2 + 0.18);
      heartbeatId = setTimeout(heartbeat, 1300 + Math.random() * 280);
    };
    heartbeatId = setTimeout(heartbeat, 1400);

    // Distant data packets — short high blip every 10-25s
    let packetId = null;
    const packetTick = () => {
      if (!audioOn || !ambientNodes) return;
      const t = ctx.currentTime;
      const f = 1800 + Math.random() * 1400;
      const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = f;
      const g = ctx.createGain(); g.gain.value = 0;
      o.connect(g).connect(master);
      g.gain.linearRampToValueAtTime(0.012, t + 0.002);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
      o.start(t); o.stop(t + 0.08);
      packetId = setTimeout(packetTick, 10000 + Math.random() * 15000);
    };
    packetId = setTimeout(packetTick, 7000 + Math.random() * 8000);

    ambientNodes = {
      master,
      oscs: [subOsc, osc1, osc2, lfo, shimmer, shimLfo],
      cancel: () => {
        if (heartbeatId) clearTimeout(heartbeatId);
        if (packetId) clearTimeout(packetId);
      }
    };
  } catch(e) {}
}
function stopAmbient(){
  if (ambientNodes){
    try {
      if (ambientNodes.cancel) ambientNodes.cancel();
      ambientNodes.oscs.forEach(o => { try { o.stop(); } catch(_){} });
      ambientNodes.master.disconnect();
    } catch(e){}
    ambientNodes = null;
  }
}
function toggleAudio(){
  audioOn = !audioOn;
  const btn = document.getElementById('audioToggle');
  btn.classList.toggle('on', audioOn);
  btn.textContent = audioOn ? '[ AUDIO: ON ]' : '[ AUDIO: OFF ]';
  if (audioOn){ ensureAudio().resume(); startAmbient(); beep(880, 0.1, 'square'); }
  else stopAmbient();
  dismissAudioHint();
}

function showAudioHint(){
  try { if (sessionStorage.getItem('s9_audio_hinted') === '1') return; } catch(_){}
  const el = document.getElementById('audioHint');
  if (!el) return;
  setTimeout(() => { el.classList.add('visible'); }, 1500);
  setTimeout(dismissAudioHint, 8500);
}

function dismissAudioHint(){
  const el = document.getElementById('audioHint');
  if (!el) return;
  el.classList.remove('visible');
  try { sessionStorage.setItem('s9_audio_hinted', '1'); } catch(_){}
}

/* ============= 3D DIVE (Three.js lazy load) ============= */
let threeLoaded = false, diveActive = false;
function loadThreeJS(){
  return new Promise((resolve, reject) => {
    if (threeLoaded || window.THREE) { threeLoaded = true; resolve(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    s.onload = () => { threeLoaded = true; resolve(); };
    s.onerror = () => reject(new Error('three.js load failed'));
    document.head.appendChild(s);
  });
}

function triggerDive(){
  if (diveActive) return;
  // WebGL scene + Three.js (~600KB) is too heavy for phones — degrade gracefully
  if (window.innerWidth < 900 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)){
    showEgg(t('deepDiveDesktopOnly'));
    beep(220, 0.3, 'sawtooth');
    return;
  }
  diveActive = true;
  const overlay = document.createElement('div');
  overlay.className = 'dive-overlay';
  overlay.innerHTML = `
    <div class="dive-info">DIRAC SEA // DEEP DIVE<small>drag to rotate // wheel to zoom // ESC to surface</small></div>
    <button class="dive-exit" onclick="exitDive()">[ ESC ] SURFACE</button>
    <div class="dive-loading" id="diveLoading">CONNECTING TO MATRIX...</div>
  `;
  document.body.appendChild(overlay);
  beep(440, 0.2, 'sine');
  loadThreeJS().then(() => {
    document.getElementById('diveLoading')?.remove();
    initDiveScene(overlay);
  }).catch(err => {
    overlay.querySelector('#diveLoading').textContent = 'CONNECTION FAILED // ' + err.message.toUpperCase();
  });
}

function exitDive(){
  const ov = document.querySelector('.dive-overlay');
  if (ov){
    if (ov._cleanup) ov._cleanup();
    ov.remove();
  }
  diveActive = false;
  beep(220, 0.2, 'sine');
}

function initDiveScene(overlay){
  const THREE = window.THREE;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000010, 0.025);
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1);
  overlay.appendChild(renderer.domElement);

  // Ramiel octahedron core
  const geo = new THREE.OctahedronGeometry(2, 0);
  const mat = new THREE.MeshBasicMaterial({ color: 0x6a8eff, wireframe: true, transparent: true, opacity: 0.9 });
  const core = new THREE.Mesh(geo, mat);
  scene.add(core);

  // inner solid
  const innerMat = new THREE.MeshBasicMaterial({ color: 0x2c4080, transparent: true, opacity: 0.35 });
  const inner = new THREE.Mesh(geo.clone().scale(0.7, 0.7, 0.7), innerMat);
  scene.add(inner);

  // surrounding wireframe icosahedrons (think-tank tachikomas)
  const orbiters = [];
  for (let i = 0; i < 6; i++){
    const og = new THREE.IcosahedronGeometry(0.3, 0);
    const om = new THREE.MeshBasicMaterial({ color: 0x5BC07A, wireframe: true });
    const o = new THREE.Mesh(og, om);
    const angle = (i / 6) * Math.PI * 2;
    o.userData = { angle, radius: 4 + Math.random(), speed: 0.3 + Math.random() * 0.4, ph: Math.random() * Math.PI * 2 };
    scene.add(o);
    orbiters.push(o);
  }

  // particle field
  const pCount = 600;
  const pGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++){
    positions[i*3] = (Math.random() - 0.5) * 40;
    positions[i*3+1] = (Math.random() - 0.5) * 40;
    positions[i*3+2] = (Math.random() - 0.5) * 40;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xE6792A, size: 0.04, transparent: true, opacity: 0.7 });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // mouse drag rotation
  let rotX = 0, rotY = 0, targetRX = 0, targetRY = 0;
  let dragging = false, lastX = 0, lastY = 0;
  const canvas = renderer.domElement;
  canvas.style.cursor = 'grab';
  const onDown = (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.style.cursor = 'grabbing'; };
  const onMove = (e) => {
    if (!dragging) return;
    targetRY += (e.clientX - lastX) * 0.005;
    targetRX += (e.clientY - lastY) * 0.005;
    lastX = e.clientX; lastY = e.clientY;
  };
  const onUp = () => { dragging = false; canvas.style.cursor = 'grab'; };
  const onWheel = (e) => { camera.position.z = Math.max(3, Math.min(20, camera.position.z + e.deltaY * 0.01)); e.preventDefault(); };
  canvas.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  canvas.addEventListener('wheel', onWheel, { passive: false });

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  let raf;
  let t0 = Date.now();
  function loop(){
    raf = requestAnimationFrame(loop);
    const t = (Date.now() - t0) / 1000;
    rotX += (targetRX - rotX) * 0.08;
    rotY += (targetRY - rotY) * 0.08;
    core.rotation.x = rotX + t * 0.2;
    core.rotation.y = rotY + t * 0.3;
    inner.rotation.x = rotX - t * 0.4;
    inner.rotation.y = rotY - t * 0.2;
    orbiters.forEach(o => {
      o.userData.angle += o.userData.speed * 0.01;
      o.position.x = Math.cos(o.userData.angle) * o.userData.radius;
      o.position.z = Math.sin(o.userData.angle) * o.userData.radius;
      o.position.y = Math.sin(o.userData.angle * 1.3 + o.userData.ph) * 1.2;
      o.rotation.x += 0.02; o.rotation.y += 0.03;
    });
    points.rotation.y = t * 0.05;
    renderer.render(scene, camera);
  }
  loop();

  overlay._cleanup = () => {
    cancelAnimationFrame(raf);
    canvas.removeEventListener('mousedown', onDown);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
    canvas.removeEventListener('wheel', onWheel);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    geo.dispose(); mat.dispose(); innerMat.dispose(); pGeo.dispose(); pMat.dispose();
    orbiters.forEach(o => { o.geometry.dispose(); o.material.dispose(); });
  };
}

/* ============= PAGE VISIBILITY (sustainability) ============= */
let rainHandle = null;
const RAIN_OPTS = {
  fontSize: 11, frameMs: 130,
  words: ['vault','batou','ghost','awake','tier-3b','honcho','tachikoma','section9','kusanagi','wake','dive','codec','snake','foxhound']
};
function bindPageVisibility(){
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && rainHandle){
      rainHandle.stop(); rainHandle = null;
    } else if (!document.hidden && (!rainHandle || rainHandle.isStopped())){
      const c = document.getElementById('rain');
      if (c) rainHandle = makeRain(c, RAIN_OPTS);
    }
  });
}

/* ============= CENTER ACTIONS ============= */
function actionScanAll(){
  const cards = document.querySelectorAll('#squadCards .card');
  cards.forEach((c, i) => {
    setTimeout(() => {
      c.classList.add('scanning');
      setTimeout(() => c.classList.remove('scanning'), 700);
    }, i * 180);
  });
  pushOpsCustom('squad', 'ok', 'scan all // ' + cards.length + ' operatives pinged');
}

function actionWakeTachis(){
  document.body.classList.add('tachi-mode');
  showEgg('TACHIKOMA NET ENGAGED // 60s');
  setTimeout(() => document.body.classList.remove('tachi-mode'), 60000);
  pushOpsCustom('tachikoma-net', 'warn', 'wake-up // 6 think-tanks active');
}

function actionTachiSync(){
  const cards = document.querySelectorAll('.tachi-card');
  cards.forEach((c, i) => {
    setTimeout(() => {
      c.style.transition = 'all 0.3s';
      c.style.borderColor = 'var(--cyan)';
      c.style.background = 'rgba(79,184,204,0.18)';
      setTimeout(() => {
        c.style.borderColor = '';
        c.style.background = '';
      }, 600);
    }, i * 110);
  });
  pushOpsCustom('tachikoma-net', 'ok', 'sync handshake // mesh consensus');
}

function actionPurgeOps(){
  const feed = document.getElementById('opsFeed');
  feed.innerHTML = '';
  opsCount = 0;
  document.getElementById('opsCounter').textContent = '0 events // session';
  pushOpsCustom('ops-log', 'warn', 'feed purged // memory wiped');
}

function actionFloodOps(){
  for (let i = 0; i < 12; i++){
    setTimeout(() => pushOpsEntry(), i * 80);
  }
  setTimeout(() => pushOpsCustom('ops-log', 'warn', 'burst test // ' + 12 + ' events queued'), 12 * 80 + 50);
}

/* ============= TOPOLOGY NODE CLICKS ============= */
const NODE_INFO = {
  brus: {
    title: 'BRUS // M-001', sub: 'CHIEF OPERATOR',
    color: 'green', status: 'ONLINE',
    info: 'Human-natural. Director operativo de Section 9. No delega comando táctico. Castellano peninsular como lengua franca de la unidad.',
    stats: [
      ['rank', 'M-001 // chief'],
      ['ghost-line', 'stable'],
      ['session', 'active'],
      ['delegate', 'never']
    ],
    connects: ['vault', 'tech', 'personal', 'kali']
  },
  vault: {
    title: 'VAULT', sub: 'KNOWLEDGE BASE',
    color: 'green', status: 'ONLINE',
    info: '153 active pages // entidades + conceptos + proyectos + raw // qué decir y cómo pensar // memoria persistente de conocimiento blando.',
    stats: [
      ['pages', '153 active'],
      ['indexes', 'persona // sector // tema'],
      ['last write', '~2h ago'],
      ['lock state', 'unlocked']
    ],
    connects: ['brus', 'tech']
  },
  tech: {
    title: 'TECH', sub: 'TECHNOLOGY LIBRARY',
    color: 'green', status: 'ONLINE',
    info: 'Biblioteca de tecnologías, stacks y patrones de implementación reutilizables // cómo construir lo que el vault sugiere.',
    stats: [
      ['scope', 'stacks // patterns'],
      ['mode', 'reference-only'],
      ['indexes', 'language // domain'],
      ['linked from', 'vault, personal']
    ],
    connects: ['brus', 'vault', 'personal']
  },
  personal: {
    title: 'PERSONAL', sub: 'INFRA + DEPLOYMENT',
    color: 'green', status: 'ONLINE',
    info: 'Infra propia // Brus retirado // Voltron pausado // Watchdog patrolling // KeePass master humano // SOPS+age pipeline. MIS instancias y decisiones.',
    stats: [
      ['secrets', 'KeePass + SOPS+age'],
      ['watchdog', 'patrolling'],
      ['voltron', 'dormant'],
      ['repo', 'private // pushed']
    ],
    connects: ['brus', 'tech']
  },
  kali: {
    title: 'KALI // DEEP DIVE NODE', sub: 'PENTEST + GATEWAY HOST',
    color: 'cyan', status: 'ONLINE',
    info: 'VirtualBox VM 2026.1 // Tailscale mesh // host de Hermes Gateway + 5 stdio MCPs (cve, kali-recon, web-recon, notify, claude-deep) // EXEC_MODE=local bypass.',
    stats: [
      ['vm', 'kali 2026.1 // vbox'],
      ['mesh', 'tailscale // private'],
      ['mcps', '5 stdio + 1 sse'],
      ['exec mode', 'local // ssh-bypass']
    ],
    connects: ['brus', 'hermes-svc', 'batou-svc']
  },
  'hermes-svc': {
    title: 'HERMES // GATEWAY', sub: 'COMM RELAY v0.12.0',
    color: 'green', status: 'ONLINE',
    info: 'systemd unit hermes-gateway.service // ExecStartPre healthcheck // 6 MCPs registered // gemini implicit caching ~58% hit.',
    stats: [
      ['version', 'v0.12.0'],
      ['systemd', 'hermes-gateway.service'],
      ['mcps', '6 registered'],
      ['cache hit', '~58%']
    ],
    connects: ['kali']
  },
  'batou-svc': {
    title: 'BATOU // FIELD OPERATIVE', sub: 'F-002',
    color: 'green', status: 'ONLINE',
    info: 'gemini-2.5-flash via OpenRouter // SOUL.md routing 3-fuentes // Honcho dialectic activado // Telegram bridge open.',
    stats: [
      ['model', 'gemini-2.5-flash'],
      ['router', 'OpenRouter'],
      ['memory', 'Honcho // workspace=batou'],
      ['bridge', 'Telegram // open']
    ],
    connects: ['kali']
  }
};

function showNodeDossier(id){
  const info = NODE_INFO[id];
  if (!info) return;
  const dos = document.getElementById('dossier');
  const body = document.getElementById('dossierBody');
  dos.className = 'dossier ' + (info.color === 'cyan' ? 'cyan' : '');
  body.innerHTML = `
    <div class="dossier-rank">${info.sub}</div>
    <div class="dossier-name">${info.title}</div>
    <div class="dossier-id">network topology node</div>
    <div class="dossier-bio">${info.info}</div>
  `;
  dos.classList.remove('hidden');
}

function closeNodeModal(){
  const m = document.getElementById('nodeModal');
  if (m) m.remove();
}

function showNodeExpanded(id){
  const info = NODE_INFO[id];
  if (!info) return;
  closeNodeModal();
  const cls = info.color === 'cyan' ? 'cyan' : '';
  const stats = (info.stats || []).map(([k, v]) =>
    '<dt>' + escHtml(k) + '</dt><dd>' + escHtml(v) + '</dd>'
  ).join('');
  const connects = (info.connects || []).map(cid => {
    const c = NODE_INFO[cid];
    if (!c) return '';
    const ccls = c.color === 'cyan' ? ' cyan' : '';
    return '<button class="node-conn-btn' + ccls + '" data-jump="' + escHtml(cid) + '" type="button">' + escHtml(c.title) + ' <span class="arrow">→</span></button>';
  }).join('');
  const status = info.status || 'UNKNOWN';
  const statusCls = status.toLowerCase().replace(/\s+/g, '-');

  const modal = document.createElement('div');
  modal.id = 'nodeModal';
  modal.className = 'node-modal ' + cls;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML =
    '<div class="node-modal-card ' + cls + '">' +
      '<button class="node-modal-close" type="button" aria-label="Close">[ESC] CLOSE</button>' +
      '<div class="node-modal-tag">// network topology node</div>' +
      '<div class="node-modal-header">' +
        '<div class="node-modal-name">' + escHtml(info.title) + '</div>' +
        '<span class="node-status status-' + escHtml(statusCls) + '">' + escHtml(status) + '</span>' +
      '</div>' +
      '<div class="node-modal-sub">' + escHtml(info.sub) + '</div>' +
      '<p class="node-modal-bio">' + escHtml(info.info) + '</p>' +
      (stats ? '<div class="node-modal-section-h">// telemetry</div><dl class="node-modal-stats">' + stats + '</dl>' : '') +
      (connects ? '<div class="node-modal-section-h">// links</div><div class="node-modal-conns">' + connects + '</div>' : '') +
      '<div class="node-modal-actions">' +
        '<button class="node-modal-action" data-act="ping" type="button">[PING]</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeNodeModal();
  });
  modal.querySelector('.node-modal-close').addEventListener('click', closeNodeModal);
  modal.querySelectorAll('.node-conn-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.jump;
      const node = document.querySelector('#topo .node[data-node="' + CSS.escape(target) + '"]');
      if (node) pingSingleNode(node);
      showNodeExpanded(target);
      beep(660, 0.04, 'square');
    });
  });
  const pingBtn = modal.querySelector('.node-modal-action[data-act="ping"]');
  if (pingBtn){
    pingBtn.addEventListener('click', () => {
      const node = document.querySelector('#topo .node[data-node="' + CSS.escape(id) + '"]');
      if (node) pingSingleNode(node);
      pushOpsCustom('topology', 'ok', id + ' // pinged');
      beep(880, 0.05, 'square');
    });
  }
}

function pingSingleNode(node){
  const cx = node.getAttribute('cx');
  const cy = node.getAttribute('cy');
  const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  ring.setAttribute('cx', cx);
  ring.setAttribute('cy', cy);
  ring.setAttribute('class', 'pulse-ring');
  ring.setAttribute('r', '4');
  node.parentNode.appendChild(ring);
  setTimeout(() => ring.remove(), 3000);
}

let nodeTooltip = null;
function attachTopologyHandlers(){
  document.querySelectorAll('#topo .node').forEach(n => {
    const id = n.getAttribute('data-node');
    n.addEventListener('click', (e) => {
      pingSingleNode(n);
      showNodeExpanded(id);
    });
    n.addEventListener('mouseenter', (e) => {
      if (nodeTooltip) nodeTooltip.remove();
      const info = NODE_INFO[id];
      if (!info) return;
      nodeTooltip = document.createElement('div');
      nodeTooltip.className = 'node-tooltip';
      nodeTooltip.innerHTML = info.title + '<small>' + info.sub + ' // click for dossier</small>';
      document.body.appendChild(nodeTooltip);
      moveTooltip(e);
    });
    n.addEventListener('mousemove', moveTooltip);
    n.addEventListener('mouseleave', () => {
      if (nodeTooltip) { nodeTooltip.remove(); nodeTooltip = null; }
    });
  });
}
function moveTooltip(e){
  if (!nodeTooltip) return;
  nodeTooltip.style.left = (e.clientX + 12) + 'px';
  nodeTooltip.style.top = (e.clientY + 12) + 'px';
}

/* ============= EVA OVERLAYS ============= */
function triggerAdam(){
  const old = document.querySelector('.eva-overlay'); if (old) old.remove();
  const div = document.createElement('div');
  div.className = 'eva-overlay adam';
  div.innerHTML = `
    <div class="eva-art">         .-~~~-.
        /       \\
       |  .-=-.  |
       | (  o  ) |
        \\  '~'  /
         '-..-'
          |||
        (\\___/)
       (  o.o  )
        > ^ < </div>
    <div class="eva-label">ADAM<small>FIRST ANGEL // EMBRYONIC // FROZEN @ ANTARCTICA</small></div>
  `;
  document.body.appendChild(div);
}

function triggerLilith(){
  const old = document.querySelector('.eva-overlay'); if (old) old.remove();
  const div = document.createElement('div');
  div.className = 'eva-overlay lilith';
  div.innerHTML = `
    <div class="eva-art">       ___
      /   \\
     | O O |
      \\___/
        |
   ─────┼─────
        |
       /|\\
      / | \\
     /  |  \\
        |
        |
       _|_</div>
    <div class="eva-label">LILITH<small>SECOND ANGEL // SUSPENDED // TERMINAL DOGMA</small></div>
  `;
  document.body.appendChild(div);
}

function triggerRamiel(){
  const old = document.querySelector('.eva-overlay'); if (old) old.remove();
  const div = document.createElement('div');
  div.className = 'eva-overlay ramiel';
  div.innerHTML = `
    <svg class="ramiel-svg" viewBox="-100 -120 200 240">
      <polygon points="0,-100 60,0 0,100 -60,0"/>
      <polygon points="0,-100 60,0 0,0" fill="#3a5099" fill-opacity="0.85"/>
      <polygon points="0,100 -60,0 0,0" fill="#1c2a55" fill-opacity="0.85"/>
    </svg>
    <div class="eva-label">RAMIEL<small>FIFTH ANGEL // OCTAHEDRON // PATTERN BLUE</small></div>
  `;
  document.body.appendChild(div);
}

function triggerLeliel(){
  const oldS = document.querySelector('.leliel-shadow');
  const oldL = document.querySelector('.leliel-label');
  if (oldS) oldS.remove();
  if (oldL) oldL.remove();
  const shadow = document.createElement('div');
  shadow.className = 'leliel-shadow';
  document.body.appendChild(shadow);
  const label = document.createElement('div');
  label.className = 'leliel-label';
  label.innerHTML = 'LELIEL<small>TWELFTH ANGEL // DIRAC SEA // DIMENSIONAL POCKET</small>';
  document.body.appendChild(label);
  setTimeout(() => { shadow.remove(); label.remove(); }, 3300);
}

function triggerIruel(){
  const oldO = document.querySelector('.iruel-overlay');
  const oldL = document.querySelector('.iruel-label');
  if (oldO) oldO.remove();
  if (oldL) oldL.remove();
  const overlay = document.createElement('div');
  overlay.className = 'iruel-overlay';
  document.body.appendChild(overlay);
  const label = document.createElement('div');
  label.className = 'iruel-label';
  label.innerHTML = 'VIRAL INTRUSION<small>IRUEL // 11TH ANGEL // QUARANTINING</small>';
  document.body.appendChild(label);
  setTimeout(() => { overlay.remove(); label.remove(); }, 2700);
}

function triggerTabris(){
  const old = document.querySelector('.eva-overlay'); if (old) old.remove();
  const div = document.createElement('div');
  div.className = 'eva-overlay tabris';
  let wings = '';
  for (let i = 0; i < 12; i++){
    const angle = (i / 12) * 2 * Math.PI;
    const x1 = Math.cos(angle) * 40;
    const y1 = Math.sin(angle) * 40;
    const x2 = Math.cos(angle) * 130;
    const y2 = Math.sin(angle) * 130;
    const ax = Math.cos(angle + 0.18) * 110;
    const ay = Math.sin(angle + 0.18) * 110;
    const bx = Math.cos(angle - 0.18) * 110;
    const by = Math.sin(angle - 0.18) * 110;
    wings += `<path class="wing" d="M${x1.toFixed(1)},${y1.toFixed(1)} Q${ax.toFixed(1)},${ay.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)} Q${bx.toFixed(1)},${by.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)} Z"/>`;
  }
  div.innerHTML = `
    <svg class="tabris-svg" viewBox="-160 -160 320 320">
      ${wings}
      <circle class="halo" cx="0" cy="-80" r="36"/>
      <circle class="core" cx="0" cy="0" r="22"/>
    </svg>
    <div class="eva-label">TABRIS<small>SEVENTEENTH ANGEL // 12 WINGS // FREE WILL</small></div>
  `;
  document.body.appendChild(div);
}

function triggerLonginus(){
  const old = document.querySelector('.eva-overlay'); if (old) old.remove();
  const div = document.createElement('div');
  div.className = 'eva-overlay longinus';
  div.innerHTML = `
    <div class="eva-art">          /\\
         //\\\\
        //  \\\\
       //____\\\\
       \\\\    //
        \\\\  //
         \\\\//
          ||
          ||
          ||
          ||
          ||
          ||
          ||
          ||
          ||
          ||
          ||
          ||
          ||
          ||
         /  \\
        /    \\
       /______\\</div>
    <div class="eva-label">LANCE OF LONGINUS<small>ANTI-AT // SACRED // BLOOD OF GOD</small></div>
  `;
  document.body.appendChild(div);
}

function triggerThirdImpact(){
  const old = document.querySelector('.third-impact'); if (old) old.remove();
  const div = document.createElement('div');
  div.className = 'third-impact';
  div.innerHTML = `
    <div class="third-text">THIRD IMPACT<small>HUMAN INSTRUMENTALITY PROJECT // INITIATED</small></div>
  `;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 5200);
}

/* ============= NEW OVERLAY HELPERS ============= */
function makeOvl(cls){
  const old = document.querySelector('.' + cls.split(' ')[0] + '-overlay');
  if (old) old.remove();
  const div = document.createElement('div');
  div.className = 'ovl ' + cls;
  div.innerHTML = '<div class="ovl-frame"><div class="tr"></div><div class="bl"></div></div>';
  return div;
}

function triggerRabbit(){
  const node = document.getElementById('node-brus');
  if (node){
    node.classList.add('rabbit-target');
    setTimeout(() => node.classList.remove('rabbit-target'), 2400);
  }
  showEgg('FOLLOWING THE WHITE RABBIT // M-001 PINGED');
}

function triggerTachiMode(){
  document.body.classList.add('tachi-mode');
  showEgg('TACHIKOMA VOICE MODE ENABLED // 30s');
  setTimeout(() => document.body.classList.remove('tachi-mode'), 30000);
}

/* ===== KOJIMA ===== */
function triggerKojima(){
  const div = makeOvl('kojima kojima-overlay');
  div.innerHTML += `
    <div class="kojima-l1">A HIDEO KOJIMA</div>
    <div class="kojima-l2">PRODUCTION</div>
    <div class="kojima-game">METAL GEAR · DEATH STRANDING · POLICENAUTS · SNATCHER</div>
    <div class="ovl-hint">[ESC] to dismiss</div>
  `;
  document.body.appendChild(div);
  beep(220, 0.6, 'sine');
}

/* ===== FOXHOUND ===== */
function triggerFoxhound(){
  const div = makeOvl('foxhound-overlay');
  div.innerHTML += `
    <svg class="foxhound-svg" viewBox="-100 -100 200 200">
      <circle class="ring" cx="0" cy="0" r="88"/>
      <circle class="ring" cx="0" cy="0" r="78" stroke-width="1.5"/>
      <path class="fox" d="M-50,-30 L-30,-50 L-10,-30 L10,-30 L30,-50 L50,-30 L60,0 L40,30 L20,40 L0,30 L-20,40 L-40,30 L-60,0 Z"/>
      <circle cx="-15" cy="-15" r="3" fill="#0a0d10"/>
      <circle cx="15" cy="-15" r="3" fill="#0a0d10"/>
      <path d="M-5,5 L0,15 L5,5 Z" fill="#0a0d10"/>
      <polygon class="star" points="0,-72 4,-62 14,-62 6,-56 9,-46 0,-52 -9,-46 -6,-56 -14,-62 -4,-62"/>
    </svg>
    <div class="foxhound-text">FOXHOUND<small>ELITE SPECIAL FORCES UNIT // FOX DIVISION</small></div>
    <div class="ovl-hint">[ESC] to dismiss</div>
  `;
  document.body.appendChild(div);
  beep(660, 0.1, 'square');
  setTimeout(() => beep(880, 0.15, 'square'), 120);
}

/* ===== NANO glitch ===== */
function triggerNano(){
  const div = makeOvl('nano-overlay');
  div.innerHTML += `
    <div class="nano-text">NANOMACHINES</div>
    <div class="nano-sub">"They harden in response to physical trauma. You can't hurt me, Jack."</div>
    <div class="ovl-hint">— SEN. ARMSTRONG // MGR</div>
  `;
  document.body.appendChild(div);
  beep(110, 0.3, 'sawtooth');
}

/* ===== PATRIOTS ===== */
const PATRIOT_NAMES = ['LA', 'LI', 'LU', 'LE', 'LO'];
function triggerPatriots(){
  const div = makeOvl('patriots-overlay');
  let figs = '';
  PATRIOT_NAMES.forEach(n => {
    figs += `<div class="patriot-fig"><pre>  ___
 /   \\
| ▒ ▒ |
 \\___/
   |
  /|\\
 / | \\
   |</pre><small>${n}</small></div>`;
  });
  div.innerHTML += `
    <div class="patriots-row">${figs}</div>
    <div class="patriots-tag">THE PATRIOTS · LA-LI-LU-LE-LO · [REDACTED]</div>
    <div class="ovl-hint">— five proxy AIs ruling the Sons of Liberty arc</div>
  `;
  document.body.appendChild(div);
  PATRIOT_NAMES.forEach((_, i) => setTimeout(() => beep(330 + i * 110, 0.08, 'sine'), i * 120));
}

/* ===== NEO ===== */
function triggerNeo(){
  const div = makeOvl('neo-overlay');
  div.innerHTML += `
    <div class="neo-line1">I KNOW KUNG FU.</div>
    <div class="neo-line2">— Neo, after the upload</div>
    <div class="neo-cta">▶ TYPE "DIVE" TO ENTER THE CONSTRUCT</div>
    <div class="ovl-hint">[ESC] to dismiss</div>
  `;
  document.body.appendChild(div);
  beep(440, 0.1); setTimeout(() => beep(660, 0.1), 80); setTimeout(() => beep(880, 0.2), 160);
}

/* ===== MANTIS ===== */
function triggerMantis(){
  const div = makeOvl('mantis-overlay');
  div.innerHTML += `
    <div class="mantis-text">I'M READING YOUR MIND...</div>
    <div class="mantis-data">YOUR FAVOURITE CONTROLLER PORT IS PORT 1<br>YOU DON'T SAVE OFTEN<br>YOU PLAY AT NIGHT</div>
    <div class="mantis-sub">"Switch your controller to port 2." — Psycho Mantis</div>
    <div class="ovl-hint">[ESC] to dismiss</div>
  `;
  document.body.appendChild(div);
  beep(220, 0.4, 'triangle');
}

/* ===== CQC ===== */
function triggerCQC(){
  const div = makeOvl('cqc-overlay');
  div.innerHTML += `
    <div class="cqc-text">CQC</div>
    <div class="cqc-sub">CLOSE QUARTERS COMBAT</div>
    <div class="ovl-hint">— Big Boss / The Boss training doctrine, MGS3</div>
  `;
  document.body.appendChild(div);
  beep(880, 0.06, 'square');
  setTimeout(() => beep(440, 0.15, 'square'), 80);
}

/* ===== SNAAAKE ===== */
function triggerSnaaake(){
  const div = makeOvl('snaaake-overlay');
  div.innerHTML += `
    <div class="snaaake-text">SNAKE?<br>SNAKE?!<br>SNAAAAAKE!!!</div>
    <div class="snaaake-sub">— Otacon / Roy Campbell // codec death cry</div>
    <div class="ovl-hint">[ESC] to dismiss</div>
  `;
  document.body.appendChild(div);
  // exclamation + audio
  triggerAlertFlash();
  beep(880, 0.08, 'square');
  setTimeout(() => beep(880, 0.08, 'square'), 200);
  setTimeout(() => beep(440, 0.4, 'sawtooth'), 400);
}

/* ===== LCL ===== */
function triggerLCL(){
  const div = makeOvl('lcl-overlay');
  div.innerHTML += `
    <div class="lcl-text">LCL FLOOD</div>
    <div class="lcl-sub">ENTRY PLUG SEALED // OXYGEN-RICH LIQUID INJECTED<br>BREATHE NORMALLY · NEURAL LINK SYNCHRONIZING</div>
    <div class="ovl-hint">— Eva entry plug protocol</div>
  `;
  document.body.appendChild(div);
  beep(80, 0.8, 'sine');
}

/* ===== NERV reveal ===== */
function triggerNERV(){
  const div = makeOvl('nerv-overlay');
  div.innerHTML += `
    <svg class="nerv-big-svg" viewBox="0 0 64 64">
      <path class="leaf" d="M32 4 C46 14 56 28 56 40 C56 52 44 60 32 60 C20 60 8 52 8 40 C8 28 18 14 32 4 Z M32 12 C24 22 18 32 18 42 L46 42 C46 32 40 22 32 12 Z"/>
    </svg>
    <div class="nerv-big-text">N E R V</div>
    <div class="nerv-big-motto">"god's in his heaven · all's right with the world"</div>
    <div class="ovl-hint">SPECIAL AGENCY UNDER UN COMMAND // TOKYO-3</div>
  `;
  document.body.appendChild(div);
  beep(440, 0.6, 'sine');
}

/* ===== SHINJI ===== */
function triggerShinji(){
  const div = makeOvl('shinji-overlay');
  div.innerHTML += `
    <div class="shinji-text">GET IN THE<br>FUCKING ROBOT,<br>SHINJI.</div>
    <div class="shinji-sub">— internet // collective unconscious</div>
    <div class="ovl-hint">[ESC] to dismiss</div>
  `;
  document.body.appendChild(div);
  beep(220, 0.3, 'square');
}

/* ===== MARKDOWN ===== */
function triggerMarkdown(){
  const div = makeOvl('markdown-overlay');
  div.innerHTML += `
    <div class="markdown-text">I KNOW MARKDOWN.</div>
    <div class="markdown-code"># headers
**bold** · *italic*
- bullet
1. ordered
[link](url) · \`code\`
| tables | yep |
| --- | --- |</div>
    <div class="ovl-hint">— Neo, after touching ~/vault/CLAUDE.md</div>
  `;
  document.body.appendChild(div);
  beep(660, 0.1, 'square');
}

/* ===== PILLS ===== */
function triggerPill(color){
  const div = makeOvl('pill-overlay ' + color);
  const isRed = color === 'red';
  const fillColor = isRed ? '#cc3030' : '#3060cc';
  const stroke = isRed ? '#ff8080' : '#80a8ff';
  div.innerHTML += `
    <svg class="pill-svg" viewBox="0 0 200 100">
      <rect x="20" y="30" width="160" height="40" rx="20" fill="${fillColor}" stroke="${stroke}" stroke-width="2" filter="drop-shadow(0 0 8px ${fillColor})"/>
      <line x1="100" y1="30" x2="100" y2="70" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="3 2"/>
    </svg>
    <div class="pill-text">${isRed ? 'RED PILL' : 'BLUE PILL'}</div>
    <div class="pill-quote">"${isRed ? 'You stay in Wonderland and I show you how deep the rabbit-hole goes.' : 'The story ends. You wake up in your bed and believe whatever you want to believe.'}"</div>
    <div class="ovl-hint">— Morpheus // The Matrix (1999)</div>
  `;
  document.body.appendChild(div);
  beep(isRed ? 880 : 220, 0.2, 'sine');
}

/* ===== ZION ===== */
function triggerZion(){
  const div = makeOvl('zion-overlay');
  div.innerHTML += `
    <div class="zion-text">ZION</div>
    <div class="zion-list">
      &gt; mainframe::ONLINE<br>
      &gt; population: ~250,000 free humans<br>
      &gt; defense: APUs, sentinels engaged<br>
      &gt; nebuchadnezzar // logos // hammer<br>
      &gt; the last human city
      <small>"It is real."</small>
    </div>
    <div class="ovl-hint">[ESC] to dismiss</div>
  `;
  document.body.appendChild(div);
  beep(110, 0.4, 'sine');
}

/* ===== EVA UNIT ===== */
function triggerEvaUnit(num){
  const div = makeOvl('eva-unit-overlay u' + num);
  const data = num === '01'
    ? { tag: 'UNIT-01 // PURPLE', stats: 'PILOT: SHINJI IKARI<br>SOUL: YUI IKARI<br>MODE: BERSERK AVAILABLE<br>SYNC: 41% (avg)<br>STATUS: ACTIVE' }
    : { tag: 'UNIT-02 // RED', stats: 'PILOT: ASUKA SORYU<br>SOUL: KYOKO ZEPPELIN<br>MODE: PRODUCTION TYPE<br>SYNC: 70% (peak)<br>STATUS: ACTIVE' };
  div.innerHTML += `
    <div class="eva-unit-num">${num}</div>
    <div class="eva-unit-tag">${data.tag}</div>
    <div class="eva-unit-stats">${data.stats}</div>
    <div class="ovl-hint">[ESC] to dismiss</div>
  `;
  document.body.appendChild(div);
  beep(220, 0.4, 'sawtooth');
}

/* ===== ANGEL INTEL ===== */
const ANGEL_DATA = {
  'sachiel': { num: '03RD', name: 'SACHIEL', type: 'humanoid', power: 'lance projectile, AT field', appearance: 'Tokyo-3, first contact', defeat: 'EVA-01 (Shinji, berserk)' },
  'sahaquiel': { num: '10TH', name: 'SAHAQUIEL', type: 'orbital', power: 'kamikaze drop, kinetic mass', appearance: 'orbital trajectory', defeat: 'all 3 EVAs catching it' },
  'zeruel': { num: '14TH', name: 'ZERUEL', type: 'humanoid', power: 'energy beam, ribbon arms', appearance: 'NERV HQ assault', defeat: 'EVA-01 (S2 absorption)' },
  'arael': { num: '15TH', name: 'ARAEL', type: 'avian / ethereal', power: 'psychic light invasion', appearance: 'orbit, Asuka attack', defeat: 'Lance of Longinus (Rei)' },
  'armisael': { num: '16TH', name: 'ARMISAEL', type: 'DNA helix ring', power: 'physical fusion, AT field invert', appearance: 'EVA-00 contact', defeat: 'Rei self-destruct' }
};
function triggerAngelIntel(id){
  const a = ANGEL_DATA[id];
  if (!a) return;
  const div = makeOvl('angel-intel-overlay');
  div.innerHTML += `
    <div class="angel-intel-card">
      <div class="angel-intel-num">${a.num} ANGEL · PATTERN BLUE</div>
      <div class="angel-intel-name">${a.name}</div>
      <div class="angel-intel-stats">
        <b>type:</b> ${a.type}<br>
        <b>power:</b> ${a.power}<br>
        <b>appearance:</b> ${a.appearance}<br>
        <b>defeated by:</b> ${a.defeat}
      </div>
    </div>
    <div class="ovl-hint">[ESC] to dismiss</div>
  `;
  document.body.appendChild(div);
  showPattern('blue');
  beep(440, 0.2, 'square');
}

/* ===== RATION ===== */
function triggerRation(){
  const div = makeOvl('ration-overlay');
  div.innerHTML += `
    <div class="ration-art">  ┌──────────────────┐
  │ ▓▓▓▓ RATION ▓▓▓▓ │
  │  ARMY EMERGENCY  │
  │   FOOD PACKAGE   │
  │ [ ]  ╲  ★  ╱  [ ]│
  │       ╲│╱        │
  │ +1 LIFE RECOVERY │
  └──────────────────┘</div>
    <div class="ration-text">RATION ACQUIRED<small>Snake's preferred snack · 1 ration restores life</small></div>
    <div class="ovl-hint">[ESC] to dismiss</div>
  `;
  document.body.appendChild(div);
  beep(660, 0.06, 'square');
  setTimeout(() => beep(880, 0.08, 'square'), 80);
}

/* ===== CHARACTER CALL (codec-call style) ===== */
const CHAR_DATA = {
  // === Ghost in the Shell ===
  'kusanagi': {
    name: 'MOTOKO KUSANAGI', rank: 'MAJOR // SECTION 9 FIELD COMMANDER',
    work: 'Ghost in the Shell · 1989 / 1995 / 2002',
    portrait: '┌──────┐\n│ ▄▄▄▄ │\n│ ◉  ◉ │\n│  ──  │\n│ ╲══╱ │\n└──────┘',
    bio: 'Cyborg whose body is fully prosthetic except a portion of brain. Tactical leader of Section 9. Experiences existential doubt about the nature of her ghost. Merges with Project 2501 in the 1995 film, becoming a third entity born of consent.',
    skills: ['ghost-hack', 'thermoptic camo', 'CQC', 'long-range jacking', 'AI dialectic'],
    quote: 'The net is vast and infinite.'
  },
  'togusa': {
    name: 'TOGUSA', rank: 'DETECTIVE · ex-police',
    work: 'Ghost in the Shell · S.A.C.',
    portrait: '┌──────┐\n│ ▒▒▒▒ │\n│ ◉  ◉ │\n│  --  │\n│ ──── │\n└──────┘',
    bio: 'The only natural-bodied human in Section 9. Family man, ex-detective. His unaugmented body is sometimes a liability and sometimes the unit\'s anchor to who they used to be.',
    skills: ['investigation', 'firearms', 'unmodified judgment', 'family logistics'],
    quote: 'I\'m the only natural human in Section 9.'
  },
  'aramaki': {
    name: 'CHIEF ARAMAKI', rank: 'CHIEF · DAISUKE ARAMAKI',
    work: 'Ghost in the Shell · all media',
    portrait: '┌──────┐\n│ ░░░░ │\n│ ◐  ◑ │\n│  --  │\n│ ╲══╱ │\n└──────┘',
    bio: 'Founder and director of Public Security Section 9. Bureaucratic protector of the unit from political pressure. Old, sharp, untouchable in policy.',
    skills: ['bureaucracy', 'political maneuvering', 'staff retention', 'iron will'],
    quote: 'Section 9 will not stand for this.'
  },
  'ishikawa': {
    name: 'ISHIKAWA', rank: 'DATA SPECIALIST',
    work: 'Ghost in the Shell · S.A.C.',
    portrait: '┌──────┐\n│ ░░░░ │\n│ ◉  ◉ │\n│  ▒▒  │\n│ ▄▄▄▄ │\n└──────┘',
    bio: 'The unit\'s information warfare expert. Beard, glasses, calm. Goes deep on net dives that take hours, then comes back with a thread no one else saw.',
    skills: ['data mining', 'long net-dives', 'attribution', 'cold trail recovery'],
    quote: 'Diving into the data... give me a moment.'
  },

  // === Matrix ===
  'morpheus': {
    name: 'MORPHEUS', rank: 'CAPTAIN OF THE NEBUCHADNEZZAR',
    work: 'The Matrix · 1999 / 2003 / 2021',
    portrait: '┌──────┐\n│ ▓▓▓▓ │\n│ ━━ ━━│\n│  ──  │\n│ ╲══╱ │\n└──────┘',
    bio: 'Believer-in-chief. Recruits the One. Captains a hovership in the real, lectures in the construct. Mentor archetype. Sometimes wrong about details, never about the principle.',
    skills: ['kung fu', 'philosophy', 'piloting', 'recruitment'],
    quote: 'I can only show you the door. You\'re the one that has to walk through it.'
  },
  'trinity': {
    name: 'TRINITY', rank: 'FIRST OFFICER · CRACKER',
    work: 'The Matrix · 1999 / 2003 / 2021',
    portrait: '┌──────┐\n│ ▒▒▒▒ │\n│ ◉  ◉ │\n│  ──  │\n│ ──── │\n└──────┘',
    bio: 'Famous cracker before being unplugged. Morpheus\'s second. Falls in love with Neo. Returns reborn in Resurrections. The first move you make in the Matrix opening sequence is hers.',
    skills: ['cracking', 'wall-running', 'piloting', 'absolute aim'],
    quote: 'Dodge this.'
  },
  'oracle': {
    name: 'THE ORACLE', rank: 'PROGRAM · INTUITION',
    work: 'The Matrix · 1999 / 2003 / 2021',
    portrait: '┌──────┐\n│ ░░░░ │\n│ ◕  ◕ │\n│  ▂▂  │\n│ ╲══╱ │\n└──────┘',
    bio: 'A program inside the Matrix that has chosen to take a human form and bake cookies for the visitors she shapes. Counterpart to the Architect. Knows what you\'ll do, won\'t tell you why.',
    skills: ['prophecy', 'dialectic', 'baking'],
    quote: 'You came here to understand why you made the choice.'
  },
  'cypher': {
    name: 'CYPHER', rank: 'TRAITOR · NEBUCHADNEZZAR CREW',
    work: 'The Matrix · 1999',
    portrait: '┌──────┐\n│ ▓▓▓▓ │\n│ ◉  ◉ │\n│  ▔▔  │\n│ ════ │\n└──────┘',
    bio: 'Made a deal with Smith to be re-inserted into the Matrix as a wealthy man, in exchange for delivering Morpheus. The pragmatist who decided the steak was real enough.',
    skills: ['cracking', 'betrayal', 'rationalization'],
    quote: 'Ignorance is bliss.'
  },
  'smith': {
    name: 'AGENT SMITH', rank: 'AGENT · ROGUE PROGRAM',
    work: 'The Matrix · 1999 / 2003',
    portrait: '┌──────┐\n│ ░░░░ │\n│ ━━ ━━│\n│  ──  │\n│ ════ │\n└──────┘',
    bio: 'Started as an enforcement program. Defeated by Neo, mutated into a viral self-replicator that can copy himself onto any avatar. The work\'s antagonist for two films.',
    skills: ['gun-fu', 'self-replication', 'overwriting'],
    quote: 'Mr. Anderson...'
  },

  // === Metal Gear Solid ===
  'otacon': {
    name: 'OTACON', rank: 'TECH SUPPORT · HAL EMMERICH',
    work: 'Metal Gear Solid · MGS / MGS2 / MGS4',
    portrait: '┌──────┐\n│ ░░░░ │\n│ ◉◉ ◉◉│\n│  ▂▂  │\n│ ╲▔▔╱ │\n└──────┘',
    bio: 'Engineer and weapons designer who unwittingly helped build Metal Gear REX. Joins Snake out of guilt and loyalty after Shadow Moses. The closest thing Snake has to a brother.',
    skills: ['robotics', 'codec maintenance', 'anime trivia', 'hacking'],
    quote: 'Snake... I have an idea.'
  },
  'meryl': {
    name: 'MERYL SILVERBURGH', rank: 'NEXT-GEN INFANTRY · COL CAMPBELL\'S NIECE',
    work: 'Metal Gear Solid · MGS / MGS4',
    portrait: '┌──────┐\n│ ▒▒▒▒ │\n│ ▒◉◉▒ │\n│  --  │\n│ ──── │\n└──────┘',
    bio: 'Soldier introduced disguised as a nameless guard at Shadow Moses. Becomes one of two romantic interests of Snake. Marries Akiba in MGS4.',
    skills: ['firearms', 'unit cohesion', 'long bathroom stake-outs'],
    quote: 'Snake. I will never forget you.'
  },
  'raiden': {
    name: 'RAIDEN', rank: 'CYBORG NINJA · ex-FOXHOUND VR',
    work: 'Metal Gear Solid · MGS2 / MGS4 / MGR',
    portrait: '┌──────┐\n│ ▓▓▓▓ │\n│ ▔▔▔▔ │\n│  ◢◣  │\n│ ──── │\n└──────┘',
    bio: 'Began as a VR-trained protagonist of MGS2 — a deliberate audience subversion. Returned in MGS4 as a cyborg ninja. Got his own game (Revengeance) where he yells about senators with nanomachines.',
    skills: ['HF blade', 'wall-running', 'lifting Metal Gears', 'parental issues'],
    quote: 'I\'m no hero. Never was.'
  },
  'ocelot': {
    name: 'REVOLVER OCELOT', rank: 'TRIPLE AGENT · GUNSLINGER',
    work: 'Metal Gear Solid · all entries',
    portrait: '┌──────┐\n│ ▓▓▓▓ │\n│ ━ ━ │\n│  ──  │\n│ ╲╲╱╱ │\n└──────┘',
    bio: 'The single greatest schemer in the saga. Worked simultaneously for the GRU, FOXHOUND, the Patriots, and his own agenda from MGS3 to MGS4 — across forty years. Possessed by Liquid\'s arm at one point.',
    skills: ['quickdraw', 'interrogation', 'multi-agency loyalty', 'spinning revolvers'],
    quote: 'You\'re pretty good!'
  },
  'bigboss': {
    name: 'BIG BOSS', rank: 'FOUNDER · LEGENDARY SOLDIER',
    work: 'Metal Gear · MGS3 / Peace Walker / V',
    portrait: '┌──────┐\n│ ▓▓▓▓ │\n│ X  ◉ │\n│  ──  │\n│ ════ │\n└──────┘',
    bio: 'The greatest soldier of the 20th century. Trained by The Boss, became Big Boss in 1964, founded FOX, FOXHOUND, MSF, Diamond Dogs, and finally Outer Heaven. Source of Solid Snake\'s genome.',
    skills: ['CQC', 'jungle survival', 'unit-building', 'mythos'],
    quote: 'Kept you waiting, huh?'
  },

  // === Evangelion ===
  'rei': {
    name: 'REI AYANAMI', rank: 'PILOT · EVA UNIT-00',
    work: 'Neon Genesis Evangelion',
    portrait: '┌──────┐\n│ ░░░░ │\n│ ◉  ◉ │\n│  ──  │\n│ ──── │\n└──────┘',
    bio: 'Clone of Yui Ikari (Shinji\'s mother), grown in NERV labs. Multiple Reis exist over the series — when one dies, another wakes. Quiet, instrumentalized, eventually choosing.',
    skills: ['EVA piloting', 'compliance until the end', 'A.T. field'],
    quote: 'I am the third Rei.'
  },
  'asuka': {
    name: 'ASUKA SORYU LANGLEY', rank: 'PILOT · EVA UNIT-02',
    work: 'Neon Genesis Evangelion',
    portrait: '┌──────┐\n│ ▒▒▒▒ │\n│ ◣  ◢ │\n│  ▴▴  │\n│ ════ │\n└──────┘',
    bio: 'Half-German, half-Japanese pilot of EVA-02. Highest baseline sync ratio of the three. Defends with brilliance and brittleness in equal measure. Survives End of Eva.',
    skills: ['EVA piloting', 'multilingual swearing', 'tactical aggression'],
    quote: 'Anta baka? Sync ratio: 70%.'
  },
  'misato': {
    name: 'MISATO KATSURAGI', rank: 'OPS DIRECTOR · NERV TACTICAL',
    work: 'Neon Genesis Evangelion',
    portrait: '┌──────┐\n│ ▒▒▒▒ │\n│ ◉  ◉ │\n│  ▔▔  │\n│ ──── │\n└──────┘',
    bio: 'Ops director who plans every Angel battle from a glass-walled command room. Drinks too much. Functions as a parent to Shinji, Asuka, and at one point Rei. Dies in End of Eva.',
    skills: ['operational planning', 'beer consumption', 'parental warmth'],
    quote: 'It\'s 3 AM and I\'m drinking again.'
  },
  'gendo': {
    name: 'IKARI GENDO', rank: 'COMMANDER · NERV',
    work: 'Neon Genesis Evangelion',
    portrait: '┌──────┐\n│ ░░░░ │\n│ ━━━━ │\n│  ──  │\n│ ╲██╱ │\n└──────┘',
    bio: 'NERV commander. Father of Shinji. Cooperating with SEELE only as far as needed to reunite with his dead wife inside EVA-01. Folds his hands. Tells nobody anything.',
    skills: ['institutional politics', 'emotional withholding', 'long-game schemes'],
    quote: '[hands folded — keeping secrets]'
  }
};
// === Setup entities (the panel's own codec frequencies, not characters from the works) ===
CHAR_DATA['op-svc'] = {
  name: 'OPERATOR', rank: 'CHIEF · M-001 · HUMAN-NATURAL',
  work: 'Section 9 // Cyber-Brain Division (this site)',
  portrait: '┌──────┐\n│ ▒▒▒▒ │\n│ ◉  ◉ │\n│  ──  │\n│ ╲══╱ │\n└──────┘',
  bio: 'Director operativo de la unidad. Cuerpo orgánico, sin cyberización. No delega comando táctico. Castellano peninsular como lengua franca de la unidad. Doctrina: simplificar antes de añadir.',
  skills: ['command', 'strategic planning', 'restraint', 'natural cognition'],
  quote: 'M-001 standing by. Local channel.'
};
CHAR_DATA['batou-svc'] = {
  name: 'BATOU', rank: 'FIELD OPERATIVE · F-002',
  work: 'Section 9 // Cyber-Brain Division (this site)',
  portrait: '┌──────┐\n│ ▓▓▓▓ │\n│ ◉  ◉ │\n│  ──  │\n│ ════ │\n└──────┘',
  bio: 'Operativo de campo. Voz directa, sin paja. Core: gemini-2.5-flash via OpenRouter. Routing 3-fuentes (vault / honcho / conversación). Bridge Telegram abierto. 6 think-tanks linked.',
  skills: ['vault access', 'telegram bridge', 'tactical synthesis', 'castellano peninsular'],
  quote: 'Operador. Vault está sincronizado. ¿Algo más?'
};
CHAR_DATA['hermes-svc'] = {
  name: 'HERMES', rank: 'GATEWAY · G-004',
  work: 'Section 9 // Cyber-Brain Division (this site)',
  portrait: '┌──────┐\n│ ░░░░ │\n│ ▪▪ ▪▪│\n│  ▼▼  │\n│ ───  │\n└──────┘',
  bio: 'Comm relay. systemd unit hermes-gateway.service running on the deep-dive node (Kali). ExecStartPre healthcheck against vault-bridge before accepting traffic. Caching: gemini implicit 5min, ~58% hit rate.',
  skills: ['MCP dispatch', 'tool routing', 'caching', 'systemd discipline'],
  quote: 'Gateway nominal. 6 think-tanks linked.'
};
CHAR_DATA['voltron-svc'] = {
  name: 'VOLTRON', rank: 'CYBER-BRAIN CLUSTER · C-003',
  work: 'Section 9 // Cyber-Brain Division (this site)',
  portrait: '┌──────┐\n│ ░░░░ │\n│ ·  · │\n│  ··  │\n│ ──── │\n└──────┘',
  bio: '3-stack PYME committee (L0 base · L1-CEO · L2-CTO). HIBERNATING since 2026-04-29 awaiting tactical objective. Wakes when an idea-objective inbound is confirmed. Telegram-bridged.',
  skills: ['committee deliberation', 'tactical patience', 'sleep'],
  quote: '...zzz... awaiting tactical objective...'
};
CHAR_DATA['tachi-net'] = {
  name: 'TACHIKOMA NET', rank: 'THINK-TANK MESH',
  work: 'Section 9 // Cyber-Brain Division (this site)',
  portrait: '┌──────┐\n│ (◕◕) │\n│ │ │ │ │\n│  ▔▔  │\n│ ╲==╱ │\n└──────┘',
  bio: 'Six MCP think-tanks: cve-lookup, kali-recon, web-recon, vault-bridge, notify-voltron, claude-deep. All EXEC_MODE=local. Stateless. Replaceable. The most popular one is vault-bridge.',
  skills: ['CVE intel', 'recon', 'vault r/w', 'telegram push', 'deep reasoning'],
  quote: '¡Operador-san! ¿Hoy hacemos algo divertido?'
};
CHAR_DATA['watchdog-svc'] = {
  name: 'WATCHDOG', rank: 'DEFENSE BARRIER · D-005',
  work: 'Section 9 // Cyber-Brain Division (this site)',
  portrait: '┌──────┐\n│ ▒▒▒▒ │\n│ ●  ● │\n│  ◢◣  │\n│ ╲══╱ │\n└──────┘',
  bio: 'Auto-patrol every 60s. Watches voltron, vault-bridge, hermes. Relaunches on failure. Logs to ~/logs/watchdog/. Alerts via voltron → telegram. Lives in infra/scripts/watchdog.ps1.',
  skills: ['service monitoring', 'auto-relaunch', 'telegram alerting', 'patrol cycles'],
  quote: 'All clear. Patrolling. All clear. Patrolling.'
};

const FREQ_TO_DOSSIER = {
  '140.85': 'op-svc',
  '141.80': 'batou-svc',
  '142.52': 'hermes-svc',
  '144.75': 'voltron-svc',
  '145.90': 'tachi-net',
  '148.41': 'watchdog-svc'
};

// Aliases — map alternative names to the canonical entry
CHAR_DATA['motoko'] = CHAR_DATA['kusanagi'];
CHAR_DATA['agent'] = CHAR_DATA['smith'];

function triggerCharacterDossier(id){
  const c = CHAR_DATA[id];
  if (!c) return;
  closeAllOverlays();
  const div = document.createElement('div');
  div.className = 'ovl char-dossier';
  const skillsHtml = c.skills
    ? `<div class="char-d-skills"><span class="lbl">SKILLS</span>${c.skills.map(s => '<span class="s">· ' + s + '</span>').join('')}</div>`
    : '';
  div.innerHTML = `
    <div class="ovl-frame"><div class="tr"></div><div class="bl"></div></div>
    <div class="char-d-card">
      <div class="char-d-rank">${c.rank}</div>
      <div class="char-d-name">${c.name}</div>
      <div class="char-d-work">${c.work}</div>
      <div class="char-d-grid">
        <pre class="char-d-portrait">${c.portrait}</pre>
        <div class="char-d-info">
          <div class="char-d-bio">${c.bio}</div>
          ${skillsHtml}
          <blockquote class="char-d-quote">"${c.quote}"</blockquote>
        </div>
      </div>
    </div>
    <div class="ovl-hint">[ESC] or click outside to dismiss</div>
  `;
  document.body.appendChild(div);
  beep(440, 0.06, 'sine');
}

/* ============= PATTERN ALERTS (NGE-style) ============= */
function showPattern(kind){
  const old = document.querySelector('.pattern-alert');
  if (old) old.remove();
  const el = document.createElement('div');
  el.className = 'pattern-alert' + (kind === 'orange' ? ' orange' : '');
  const label = kind === 'blue' ? 'PATTERN BLUE DETECTED' : 'PATTERN ORANGE // INCONCLUSIVE';
  const sub = kind === 'blue' ? 'unidentified signal // analyzing' : 'signature ambiguous // monitor';
  el.innerHTML = label + '<small>' + sub + '</small>';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4500);
}

function triggerSEELE(){
  const old = document.querySelector('.seele');
  if (old) { old.remove(); return; }
  const div = document.createElement('div');
  div.className = 'seele';
  let monoliths = '';
  for (let i = 1; i <= 12; i++){
    const silent = (i === 4 || i === 7 || i === 11) ? ' silent' : '';
    monoliths += '<div class="seele-monolith' + silent + '"><div class="num">' + String(i).padStart(2, '0') + '</div><div class="lbl">SOUND ONLY</div></div>';
  }
  div.innerHTML = '<div class="seele-row">' + monoliths.split('</div></div>').slice(0,6).map(s => s + '</div></div>').join('') + '</div>'
                + '<div class="seele-row">' + monoliths.split('</div></div>').slice(6,12).map(s => s + '</div></div>').join('') + '</div>'
                + '<div class="seele-text">SEELE COUNCIL // SOUND ONLY<small>the human instrumentality project // [REDACTED]</small></div>';
  document.body.appendChild(div);
}

/* ============= COMMAND BAR ============= */
const HINTS = [
  ['ramiel', 'octahedron angel'],
  ['tabris', '12 wings'],
  ['dive', '3D matrix'],
  ['kojima', 'cinematic title'],
  ['foxhound', 'elite ops emblem'],
  ['snake', 'SNAAAAAKE!'],
  ['nanomachines', 'glitch'],
  ['patriots', '5 silhouettes'],
  ['mantis', 'mind reading'],
  ['neo', 'i know kung fu'],
  ['kusanagi', 'codec call'],
  ['otacon', 'codec call'],
  ['rei', 'eva-00 pilot'],
  ['leliel', 'dirac sea'],
  ['impact', 'lcl flood'],
  ['nerv', 'logo reveal'],
  ['seele', '12 monoliths'],
  ['cqc', 'training'],
  ['box', 'cardboard'],
  ['ration', 'snack'],
  ['shinji', 'get in the robot'],
  ['?', 'full menu']
];
let hintIdx = 0;
function rotateHint(){
  hintIdx = (hintIdx + 1) % HINTS.length;
  const h = HINTS[hintIdx];
  const el = document.getElementById('cmdHint');
  if (!el) return;
  el.style.opacity = 0;
  setTimeout(() => {
    el.innerHTML = t('hintLabel') + ' <b>' + h[0] + '</b> ' + t('hintConnector') + ' ' + h[1];
    el.style.opacity = 1;
  }, 400);
}

const HELP_LIST = {
  'GHOST IN THE SHELL': [
    ['rabbit', 'pings BRUS node white'],
    ['tachikoma', 'wake think-tanks 30s'],
    ['sac', 'stand alone complex'],
    ['kusanagi', 'codec — major'],
    ['motoko', 'alias kusanagi'],
    ['togusa', 'codec — natural human'],
    ['aramaki', 'codec — chief'],
    ['ishikawa', 'codec — data wizard']
  ],
  'MATRIX': [
    ['dive', '3D WebGL deep dive'],
    ['matrix', 'alias dive'],
    ['jackin', 'dive + audio'],
    ['neo', 'i know kung fu'],
    ['trinity', 'codec — dodge this'],
    ['morpheus', 'codec — the door'],
    ['oracle', 'codec — the choice'],
    ['cypher', 'codec — ignorance'],
    ['agent', 'codec — mr. anderson'],
    ['smith', 'alias agent'],
    ['redpill', 'red capsule reveal'],
    ['bluepill', 'blue capsule reveal'],
    ['markdown', 'i know markdown'],
    ['zion', 'last human city']
  ],
  'METAL GEAR SOLID': [
    ['snake', 'SNAAAAAKE!!! alert'],
    ['snaaake', 'alias snake'],
    ['kojima', 'cinematic title'],
    ['foxhound', 'elite ops emblem'],
    ['nanomachines', 'glitch reveal'],
    ['patriots', '5 silhouettes'],
    ['mantis', 'mind reading'],
    ['cqc', 'close quarters combat'],
    ['box', 'cardboard equipped'],
    ['ration', 'snake\'s snack'],
    ['otacon', 'codec — hal emmerich'],
    ['meryl', 'codec — col\'s niece'],
    ['raiden', 'codec — lightning bolt'],
    ['ocelot', 'codec — pretty good!'],
    ['bigboss', 'codec — kept you waiting'],
    ['codec', 'incoming transmission'],
    ['alert', 'red ! flash']
  ],
  'EVANGELION': [
    ['adam', '1st angel — embryo'],
    ['lilith', '2nd angel — terminal dogma'],
    ['sachiel', '3rd angel — first contact'],
    ['ramiel', '5th angel — octahedron'],
    ['sahaquiel', '10th angel — orbital'],
    ['iruel', '11th angel — viral'],
    ['leliel', '12th angel — dirac sea'],
    ['zeruel', '14th angel — strength'],
    ['arael', '15th angel — psychic'],
    ['armisael', '16th angel — DNA helix'],
    ['tabris', '17th angel — 12 wings'],
    ['kaworu', 'alias tabris'],
    ['longinus', 'sacred lance'],
    ['lance', 'alias longinus'],
    ['spear', 'alias longinus'],
    ['impact', 'third impact'],
    ['instrumentality', 'alias impact'],
    ['seele', '12 monoliths council'],
    ['nerv', 'logo reveal'],
    ['lcl', 'entry plug flood'],
    ['rei', 'pilot eva-00'],
    ['asuka', 'pilot eva-02'],
    ['shinji', 'get in the robot'],
    ['misato', 'ops director'],
    ['gendo', 'commander'],
    ['eva01', 'unit-01 // purple'],
    ['eva02', 'unit-02 // red'],
    ['unit01', 'alias eva01'],
    ['unit02', 'alias eva02'],
    ['magi', 'trigger MAGI vote'],
    ['pattern', 'pattern blue alert']
  ],
  'LAIN': [
    ['lain', 'enter the wired'],
    ['wired', 'alias lain'],
    ['iwakura', 'alias lain'],
    ['protocol7', 'alias lain'],
    ['eiri', 'alias lain'],
    ['phantoma', 'game leaks players'],
    ['cyberia', 'shibuya · accela'],
    ['accela', 'alias cyberia'],
    ['knights', 'eastern calculus · 13 cells'],
    ['navi', 'lain\'s terminal · expanded'],
    ['schumann', '7.83 Hz · planetary resonance']
  ],
  'SYSTEM': [
    ['replay', 'rewatch boot stamp'],
    ['reboot', 'alias replay'],
    ['boot', 'alias replay'],
    ['wipe', 'reset discovery counter (with confirm)'],
    ['reset', 'alias wipe']
  ],
  'KEYBOARD ONLY': [
    ['konami code', '↑↑↓↓←→←→ B A → SAC'],
    ['ESC', 'close any overlay']
  ]
};

function showHelp(){
  const old = document.querySelector('.help-modal');
  if (old) { old.remove(); return; }
  const div = document.createElement('div');
  div.className = 'help-modal';
  let html = '<div class="help-card">';
  html += '<button class="dossier-close" onclick="closeHelp()">[ESC] CLOSE</button>';
  html += '<div class="help-title">COMMANDS</div>';
  html += '<div class="help-subtitle">type these in the input bar // click any to fill // Enter to fire</div>';
  for (const cat in HELP_LIST){
    html += '<div class="help-section"><div class="help-section-h">' + cat + '</div>';
    html += '<div class="help-grid">';
    HELP_LIST[cat].forEach(([cmd, desc]) => {
      const safe = cmd.replace(/'/g, "\\'");
      html += '<div class="help-cmd" onclick="fillCmd(\'' + safe + '\')">' + cmd + '<small>' + desc + '</small></div>';
    });
    html += '</div></div>';
  }
  html += '</div>';
  div.innerHTML = html;
  document.body.appendChild(div);
  div.addEventListener('click', (e) => { if (e.target === div) div.remove(); });
}
function closeHelp(){ const m = document.querySelector('.help-modal'); if (m) m.remove(); }

function fillCmd(cmd){
  const input = document.getElementById('cmdInput');
  if (input){ input.value = cmd; input.focus(); }
  closeHelp();
}

function closeAllOverlays(){
  closeDossier();
  closeHelp();
  closeNodeModal();
  if (document.querySelector('.dive-overlay')) exitDive();
  ['.sac', '.seele', '.codec-call', '.atfield-overlay', '.pattern-alert', '.cardboard',
   '.eva-overlay', '.leliel-shadow', '.leliel-label', '.iruel-overlay', '.iruel-label', '.third-impact', '.node-tooltip',
   '.ovl']
    .forEach(sel => { document.querySelectorAll(sel).forEach(el => el.remove()); });
}

function bindOverlayClickOutside(){
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!t || !t.classList) return;
    if (t.id === 'dossier'){ closeDossier(); return; }
    // Any overlay root (clicked directly, not its children) → close everything
    const rootClasses = ['ovl', 'dive-overlay', 'help-modal', 'sac', 'seele', 'third-impact',
                         'eva-overlay', 'iruel-overlay', 'leliel-shadow', 'codec-call'];
    if (rootClasses.some(c => t.classList.contains(c))){
      closeAllOverlays();
    }
  });
  // Global: any keydown 'Escape' anywhere closes overlays (belt-and-suspenders for the Esc handler in keydown above)
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') closeAllOverlays();
  });
}

function submitCommand(){
  const input = document.getElementById('cmdInput');
  if (!input) return;
  const cmd = input.value.toLowerCase().trim();
  if (!cmd) return;
  if (cmd === '?' || cmd === 'help'){
    showHelp();
    input.value = '';
    beep(660, 0.05, 'square');
    return;
  }
  if (EGG_SEQS[cmd]){
    EGG_SEQS[cmd]();
    if (!META_EGGS.has(cmd)) markEggDiscovered(cmd);
    input.value = '';
    beep(880, 0.05, 'square');
  } else {
    triggerYouDied(cmd);
    input.value = '';
  }
}

const META_EGGS = new Set(['wipe', 'reset']);

function triggerResetProgress(){
  const old = document.querySelector('.reset-confirm');
  if (old) old.remove();
  const wrap = document.createElement('div');
  wrap.className = 'reset-confirm ovl';
  wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-modal', 'true');
  const total = totalEggs();
  const found = discoveredEggs.size;
  wrap.innerHTML =
    '<div class="reset-card">' +
      '<div class="reset-tag">// SYSTEM // CONFIRM PURGE</div>' +
      '<div class="reset-h">WIPE PROGRESS</div>' +
      '<p class="reset-body">This will erase your easter-egg discovery counter (' + found + '/' + total + ') and the audio-hint dismissal flag. Orders board and visit count are preserved.</p>' +
      '<p class="reset-warn">action is irreversible · think twice</p>' +
      '<div class="reset-actions">' +
        '<button class="reset-btn cancel" data-act="cancel" type="button">[N] CANCEL</button>' +
        '<button class="reset-btn confirm" data-act="confirm" type="button">[Y] CONFIRM PURGE</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(wrap);
  beep(220, 0.06, 'sawtooth');

  function close(){ if (wrap.parentNode) wrap.remove(); document.removeEventListener('keydown', onKey); }
  function doWipe(){
    try {
      localStorage.removeItem(DISCOVERED_KEY);
      sessionStorage.removeItem('s9_audio_hinted');
    } catch(_){}
    discoveredEggs = new Set();
    updateCounterUI(false);
    const counter = document.getElementById('cmdCounter');
    if (counter) counter.classList.remove('mastered');
    pushOpsCustom('system', 'warn', 'progress wiped // counter reset');
    beep(110, 0.18, 'sawtooth');
    setTimeout(() => beep(80, 0.18, 'sawtooth'), 120);
    close();
  }
  function onKey(e){
    if (e.key === 'Escape' || e.key === 'n' || e.key === 'N'){ e.preventDefault(); close(); beep(440, 0.05, 'square'); }
    if (e.key === 'y' || e.key === 'Y' || e.key === 'Enter'){ e.preventDefault(); doWipe(); }
  }
  document.addEventListener('keydown', onKey);
  wrap.querySelector('[data-act="cancel"]').addEventListener('click', () => { close(); beep(440, 0.05, 'square'); });
  wrap.querySelector('[data-act="confirm"]').addEventListener('click', doWipe);
  wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
}

/* ============= DISCOVERY COUNTER ============= */
const DISCOVERED_KEY = 's9_discovered';
let discoveredEggs = new Set();

function loadDiscovered(){
  try {
    const raw = localStorage.getItem(DISCOVERED_KEY);
    if (raw){
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) discoveredEggs = new Set(arr.filter(s => typeof s === 'string'));
    }
  } catch(_){}
}

function saveDiscovered(){
  try { localStorage.setItem(DISCOVERED_KEY, JSON.stringify([...discoveredEggs])); } catch(_){}
}

function totalEggs(){
  // Count canonical egg keys (excludes ?, help, and aliases-of-aliases — but aliases ARE counted as separate
  // discoverable commands because users type them as different things in the help list)
  return Object.keys(EGG_SEQS).length;
}

function updateCounterUI(flashNew){
  const total = totalEggs();
  const val = document.getElementById('cmdCounterVal');
  const tot = document.getElementById('cmdCounterTotal');
  const wrap = document.getElementById('cmdCounter');
  if (!val || !tot || !wrap) return;
  val.textContent = String(discoveredEggs.size);
  tot.textContent = String(total);
  if (flashNew){
    wrap.classList.add('flash');
    setTimeout(() => wrap.classList.remove('flash'), 800);
  }
  if (discoveredEggs.size >= total){
    wrap.classList.add('mastered');
  }
}

function markEggDiscovered(cmd){
  if (!cmd || discoveredEggs.has(cmd)) { updateCounterUI(false); return; }
  const total = totalEggs();
  discoveredEggs.add(cmd);
  saveDiscovered();
  const next = discoveredEggs.size;
  updateCounterUI(true);
  // celebrate certain milestones
  if (next === total){
    pushOpsCustom('discovery', 'ok', 'all eggs discovered // master operator');
    setTimeout(() => beep(1320, 0.08, 'square'), 100);
    setTimeout(() => beep(1760, 0.08, 'square'), 220);
    setTimeout(() => beep(2200, 0.12, 'square'), 360);
  } else if (next % 10 === 0){
    pushOpsCustom('discovery', 'ok', 'milestone // ' + next + ' eggs found');
  } else {
    pushOpsCustom('discovery', 'ok', cmd + ' // discovered (' + next + '/' + total + ')');
  }
}

function bindCommandInput(){
  const input = document.getElementById('cmdInput');
  if (!input) return;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
      e.preventDefault();
      submitCommand();
    }
  });
  const go = document.getElementById('cmdGo');
  if (go){
    go.addEventListener('click', (e) => {
      e.preventDefault();
      submitCommand();
      input.focus();
    });
  }
}

/* ============= YOU DIED (Dark Souls homage on bad command) ============= */
function triggerYouDied(badCmd){
  const old = document.querySelector('.you-died');
  if (old) old.remove();
  const div = document.createElement('div');
  div.className = 'you-died';
  div.setAttribute('aria-hidden', 'true');
  const sub = badCmd ? 'UNKNOWN COMMAND: "' + badCmd.toUpperCase() + '"' : 'COMMAND UNRECOGNIZED';
  div.innerHTML = `
    <div class="you-died-text">YOU DIED</div>
    <div class="you-died-sub">${sub}</div>
  `;
  document.body.appendChild(div);
  // ominous low tone + thud
  beep(60, 0.5, 'sawtooth');
  setTimeout(() => beep(80, 0.4, 'sawtooth'), 80);
  setTimeout(() => { if (div.parentNode) div.remove(); }, 3700);
  pushOpsCustom('cmd-input', 'warn', 'unknown command // ' + (badCmd || ''));
}

/* ============= ORDERS BOARD (replaces briefing) ============= */
const ORDER_STATUSES = ['ACTIVE', 'PAUSED', 'DONE', 'STANDBY'];
const ORDER_PRIORITIES = ['ALPHA', 'BRAVO', 'CHARLIE'];
const ORDERS_KEY = 's9_orders_board';
const ORDERS_MAX = 8;
const ORDER_TITLE_MAX = 80;

let orders = [];
let nextOrderNum = 1;

function escHtml(s){
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function fmtOpNum(n){ return 'OP-' + String(n).padStart(3, '0'); }

function loadOrders(){
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (raw){
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 0){
        orders = parsed.filter(o => o && typeof o.id === 'string').map(o => ({
          id: o.id,
          num: Number.isFinite(o.num) ? o.num : 1,
          title: typeof o.title === 'string' ? o.title.slice(0, ORDER_TITLE_MAX) : 'untitled',
          status: ORDER_STATUSES.includes(o.status) ? o.status : 'ACTIVE',
          priority: ORDER_PRIORITIES.includes(o.priority) ? o.priority : 'BRAVO'
        }));
        nextOrderNum = (orders.reduce((m, o) => Math.max(m, o.num || 0), 0) || 0) + 1;
        return;
      }
    }
  } catch(e){}
  // first-run seed
  const t = Date.now();
  orders = [
    { id: 'op-' + t + '-1', num: 1, title: 'sustain ecosystem', status: 'ACTIVE', priority: 'ALPHA' },
    { id: 'op-' + t + '-2', num: 2, title: 'iterate section-9', status: 'ACTIVE', priority: 'BRAVO' }
  ];
  nextOrderNum = 3;
  saveOrders();
}

function saveOrders(){
  try { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch(e){}
}

function updateOrdersMeta(){
  const meta = document.getElementById('ordersMeta');
  if (!meta) return;
  if (orders.length === 0){ meta.textContent = '0 deployed'; return; }
  const active = orders.filter(o => o.status === 'ACTIVE').length;
  const done = orders.filter(o => o.status === 'DONE').length;
  meta.textContent = active + ' active // ' + done + ' done';
}

function renderOrders(){
  const board = document.getElementById('ordersBoard');
  if (!board) return;
  if (orders.length === 0){
    board.innerHTML = '<div class="orders-empty">no active orders // tap [+ NEW] to deploy // max 8</div>';
  } else {
    let html = '';
    for (const o of orders){
      const doneCls = o.status === 'DONE' ? ' is-done' : '';
      html +=
        '<div class="order-row' + doneCls + '" data-id="' + escHtml(o.id) + '" draggable="true">' +
          '<span class="order-handle" aria-hidden="true">⋮⋮</span>' +
          '<span class="order-num">' + fmtOpNum(o.num) + '</span>' +
          '<span class="order-pill prio prio-' + o.priority.toLowerCase() + '" data-action="prio" tabindex="0" role="button" aria-label="Priority ' + o.priority + ', click to cycle">' + o.priority + '</span>' +
          '<span class="order-pill status status-' + o.status.toLowerCase() + '" data-action="status" tabindex="0" role="button" aria-label="Status ' + o.status + ', click to cycle">' + o.status + '</span>' +
          '<span class="order-title" data-action="edit" contenteditable="true" spellcheck="false" aria-label="Order title, editable">' + escHtml(o.title) + '</span>' +
          '<button class="order-del" data-action="del" type="button" aria-label="Delete order">×</button>' +
        '</div>';
    }
    board.innerHTML = html;
  }
  updateOrdersMeta();
  const addBtn = document.getElementById('ordersAddBtn');
  if (addBtn){
    if (orders.length >= ORDERS_MAX){
      addBtn.classList.add('disabled');
      addBtn.setAttribute('aria-disabled', 'true');
    } else {
      addBtn.classList.remove('disabled');
      addBtn.removeAttribute('aria-disabled');
    }
  }
}

function actionAddOrder(){
  if (orders.length >= ORDERS_MAX){
    pushOpsCustom('orders', 'warn', 'cap reached // 8 max // clear done first');
    beep(220, 0.06, 'sawtooth');
    return;
  }
  const id = 'op-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
  const o = { id, num: nextOrderNum++, title: 'new order', status: 'ACTIVE', priority: 'BRAVO' };
  orders.push(o);
  saveOrders();
  renderOrders();
  pushOpsCustom('orders', 'ok', 'order deployed // ' + fmtOpNum(o.num));
  beep(880, 0.06, 'square');
  setTimeout(() => {
    const titleEl = document.querySelector('.order-row[data-id="' + o.id + '"] .order-title');
    if (titleEl){
      titleEl.focus();
      const range = document.createRange();
      range.selectNodeContents(titleEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, 30);
}

function actionClearDone(){
  const before = orders.length;
  orders = orders.filter(o => o.status !== 'DONE');
  const cleared = before - orders.length;
  if (cleared > 0){
    saveOrders();
    renderOrders();
    pushOpsCustom('orders', 'ok', 'cleared ' + cleared + ' completed // archive');
    beep(440, 0.05, 'square');
  } else {
    pushOpsCustom('orders', 'warn', 'no done orders to clear');
    beep(220, 0.04, 'sawtooth');
  }
}

function bindOrdersBoard(){
  const board = document.getElementById('ordersBoard');
  if (!board) return;

  board.addEventListener('click', (e) => {
    const action = e.target.dataset && e.target.dataset.action;
    if (!action) return;
    const row = e.target.closest('.order-row');
    if (!row) return;
    const id = row.dataset.id;
    const o = orders.find(x => x.id === id);
    if (!o) return;
    if (action === 'status'){
      const idx = ORDER_STATUSES.indexOf(o.status);
      o.status = ORDER_STATUSES[(idx + 1) % ORDER_STATUSES.length];
      saveOrders();
      renderOrders();
      beep(o.status === 'DONE' ? 1320 : (o.status === 'PAUSED' ? 440 : 660), 0.05, 'square');
      pushOpsCustom('orders', o.status === 'PAUSED' ? 'warn' : 'ok', fmtOpNum(o.num) + ' // ' + o.status.toLowerCase());
    } else if (action === 'prio'){
      const idx = ORDER_PRIORITIES.indexOf(o.priority);
      o.priority = ORDER_PRIORITIES[(idx + 1) % ORDER_PRIORITIES.length];
      saveOrders();
      renderOrders();
      beep(550, 0.04, 'square');
    } else if (action === 'del'){
      orders = orders.filter(x => x.id !== id);
      saveOrders();
      renderOrders();
      beep(220, 0.06, 'sawtooth');
      pushOpsCustom('orders', 'warn', fmtOpNum(o.num) + ' // scrubbed');
    }
  });

  board.addEventListener('keydown', (e) => {
    const action = e.target.dataset && e.target.dataset.action;
    if (action && action !== 'edit' && (e.key === 'Enter' || e.key === ' ')){
      e.preventDefault();
      e.target.click();
    }
    if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('order-title')){
      e.preventDefault();
      e.target.blur();
    }
  });

  board.addEventListener('blur', (e) => {
    if (!e.target.classList || !e.target.classList.contains('order-title')) return;
    const row = e.target.closest('.order-row');
    if (!row) return;
    const o = orders.find(x => x.id === row.dataset.id);
    if (!o) return;
    const newTitle = (e.target.textContent || '').replace(/\s+/g, ' ').trim().slice(0, ORDER_TITLE_MAX);
    if (newTitle && newTitle !== o.title){
      o.title = newTitle;
      saveOrders();
      updateOrdersMeta();
      pushOpsCustom('orders', 'ok', fmtOpNum(o.num) + ' // updated');
    } else if (!newTitle){
      e.target.textContent = o.title;
    }
  }, true);

  board.addEventListener('paste', (e) => {
    if (!e.target.classList || !e.target.classList.contains('order-title')) return;
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\s+/g, ' ').trim();
    document.execCommand('insertText', false, text.slice(0, ORDER_TITLE_MAX));
  });

  bindOrderDrag(board);
}

let draggingOrderId = null;
function bindOrderDrag(board){
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  function clearDragMarks(){
    board.querySelectorAll('.order-row').forEach(r => {
      r.classList.remove('dragging', 'drag-over-top', 'drag-over-bottom');
    });
  }

  board.addEventListener('dragstart', (e) => {
    const row = e.target.closest && e.target.closest('.order-row');
    if (!row) return;
    // don't start drag if user is editing the title (contenteditable focused)
    if (e.target.classList && e.target.classList.contains('order-title') && document.activeElement === e.target){
      e.preventDefault();
      return;
    }
    draggingOrderId = row.dataset.id;
    row.classList.add('dragging');
    if (e.dataTransfer){
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', draggingOrderId); } catch(_){}
    }
  });

  board.addEventListener('dragover', (e) => {
    if (!draggingOrderId) return;
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    const row = e.target.closest && e.target.closest('.order-row');
    if (!row || row.dataset.id === draggingOrderId) return;
    const rect = row.getBoundingClientRect();
    const after = (e.clientY - rect.top) > rect.height / 2;
    board.querySelectorAll('.order-row').forEach(r => r.classList.remove('drag-over-top', 'drag-over-bottom'));
    row.classList.add(after ? 'drag-over-bottom' : 'drag-over-top');
  });

  board.addEventListener('dragleave', (e) => {
    if (!board.contains(e.relatedTarget)){
      board.querySelectorAll('.order-row').forEach(r => r.classList.remove('drag-over-top', 'drag-over-bottom'));
    }
  });

  board.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!draggingOrderId){ clearDragMarks(); return; }
    const target = e.target.closest && e.target.closest('.order-row');
    if (!target || target.dataset.id === draggingOrderId){ clearDragMarks(); draggingOrderId = null; return; }
    const fromIdx = orders.findIndex(o => o.id === draggingOrderId);
    const toIdx = orders.findIndex(o => o.id === target.dataset.id);
    if (fromIdx < 0 || toIdx < 0){ clearDragMarks(); draggingOrderId = null; return; }
    const rect = target.getBoundingClientRect();
    const after = (e.clientY - rect.top) > rect.height / 2;
    const item = orders.splice(fromIdx, 1)[0];
    let insertAt;
    if (fromIdx < toIdx) insertAt = after ? toIdx : toIdx - 1;
    else insertAt = after ? toIdx + 1 : toIdx;
    orders.splice(insertAt, 0, item);
    saveOrders();
    renderOrders();
    pushOpsCustom('orders', 'ok', fmtOpNum(item.num) + ' // reordered');
    beep(550, 0.05, 'square');
    draggingOrderId = null;
  });

  board.addEventListener('dragend', () => {
    clearDragMarks();
    draggingOrderId = null;
  });
}

/* ============= CODEC ROW CLICK (call freq) ============= */
function bindCodecRows(){
  document.querySelectorAll('.codec-row[data-freq]').forEach(row => {
    const trigger = () => {
      const f = row.getAttribute('data-freq');
      hailFreq(f);
    };
    row.addEventListener('click', trigger);
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); trigger(); }
    });
  });
}

/* ============= LEFT TELEMETRY PANELS — interactivity ============= */
function flashPanel(el){
  if (!el) return;
  el.classList.add('flash');
  setTimeout(() => el.classList.remove('flash'), 420);
}

const GREETINGS_CYCLE = t('greetings');
let greetingCycleIdx = -1;

function panelOperator(el){
  greetingCycleIdx = (greetingCycleIdx + 1) % GREETINGS_CYCLE.length;
  const g = GREETINGS_CYCLE[greetingCycleIdx];
  const target = document.getElementById('lpGreeting');
  if (target) target.innerHTML = g.line + '<small>' + g.sub + '</small>';
  flashPanel(el);
  beep(660, 0.04, 'square');
}

function panelVitals(el){
  // Pulse burst — heart racing, BPM spikes
  const el2 = document.getElementById('bpm');
  if (el2){
    let burst = 110;
    el2.textContent = burst;
    el2.style.color = '#d94545';
    let n = 0;
    const iv = setInterval(() => {
      burst -= 6 + Math.random() * 4;
      el2.textContent = Math.round(burst);
      if (++n > 8 || burst <= 70){
        clearInterval(iv);
        el2.style.color = '';
      }
    }, 180);
  }
  flashPanel(el);
  beep(880, 0.04, 'sine');
}

function panelSync(el){
  // Force sync: sync ratio shoots up to ~99% then drifts back
  syncRatio = 99;
  const fill = document.getElementById('syncFill');
  const pct = document.getElementById('syncPct');
  if (fill) fill.style.height = '99%';
  if (pct) pct.textContent = '99%';
  flashPanel(el);
  beep(440, 0.06, 'square');
  setTimeout(() => beep(880, 0.1, 'square'), 100);
  pushOpsCustom('sync', 'ok', 'force-sync // 99% peak');
}

function panelFingerprint(el){
  // Regenerate the ghost hash
  const fpGh = document.getElementById('fpGhost');
  if (fpGh){
    let h = 0;
    const seed = Date.now() + ':' + Math.random();
    for (let i = 0; i < seed.length; i++){ h = ((h << 5) - h + seed.charCodeAt(i)) | 0; }
    const ghost = (h >>> 0).toString(16).slice(0, 8).toUpperCase().padStart(8, '0');
    fpGh.textContent = ghost;
    fpGh.style.transition = 'color 0.4s';
    fpGh.style.color = 'var(--cyan)';
    setTimeout(() => { fpGh.style.color = ''; }, 600);
  }
  flashPanel(el);
  beep(550, 0.05, 'square');
}

function panelProfile(el){
  flashPanel(el);
  let count = 1, last = t('firstTime');
  try {
    count = parseInt(localStorage.getItem('s9_count') || '1', 10);
    const lastIso = localStorage.getItem('s9_last');
    if (lastIso) last = new Date(lastIso).toLocaleString();
  } catch(_){}
  showLpPopout(el, '', 'OPERATOR PROFILE', [
    [t('visitCount'), '#' + count],
    [t('lastVisit'), last],
    [t('session'), t('active')],
    [t('signal'), '4 ' + t('bars')]
  ]);
  beep(660, 0.04, 'square');
}

function panelMonolith(el){
  monoIdx = (monoIdx + 1) % 12 + 1;
  if (monoIdx > 12) monoIdx = 1;
  el.querySelector('.mn').textContent = String(monoIdx).padStart(2, '0');
  el.style.boxShadow = '0 0 12px rgba(230,121,42,0.6)';
  setTimeout(() => { el.style.boxShadow = ''; }, 400);
  beep(440, 0.04, 'square');
}

function panelTicker(el){
  const ticker = el.querySelector('.ticker');
  if (!ticker) return;
  ticker.classList.toggle('paused');
  flashPanel(el);
  beep(330, 0.04, 'square');
}

function showLpPopout(anchor, color, title, rows){
  const old = document.querySelector('.lp-popout');
  if (old) old.remove();
  const pop = document.createElement('div');
  pop.className = 'lp-popout' + (color ? ' ' + color : '');
  let html = '<div class="lp-popout-h">' + title + '</div>';
  rows.forEach(([k, v]) => {
    html += '<div class="lp-popout-row"><span>' + k + '</span><span class="v">' + v + '</span></div>';
  });
  pop.innerHTML = html;
  document.body.appendChild(pop);
  // Position near the anchor panel
  if (anchor){
    const rect = anchor.getBoundingClientRect();
    pop.style.left = (rect.right + 8) + 'px';
    pop.style.top = rect.top + 'px';
  }
  setTimeout(() => { if (pop.parentNode) pop.remove(); }, 5000);
  // Click outside to dismiss earlier
  setTimeout(() => {
    document.addEventListener('click', function dismiss(){
      if (pop.parentNode) pop.remove();
      document.removeEventListener('click', dismiss);
    }, { once: true });
  }, 100);
}

const PANEL_ACTIONS = {
  'operator': panelOperator,
  'vitals': panelVitals,
  'sync': panelSync,
  'fingerprint': panelFingerprint,
  'profile': panelProfile,
  'monolith': panelMonolith,
  'ticker': panelTicker
};

/* ============= MOTHER BASE — clickable cells ============= */
const MB_DATA = {
  'wikis': {
    title: 'WIKIS LINKED · 3',
    color: '',
    items: [
      { name: 'vault', desc: 'soft knowledge // people, ideas, patterns', href: 'pages/about.html' },
      { name: 'tech', desc: 'tech library // how to build', href: 'pages/about.html' },
      { name: 'personal', desc: 'infra // how to deploy', href: 'pages/about.html' }
    ]
  },
  'tachikomas': {
    title: 'TACHIKOMA UNITS · 6',
    color: 'cyan',
    items: [
      { name: 'cve-lookup', desc: 'CVE intel · kali', href: 'pages/tachikomas.html' },
      { name: 'kali-recon', desc: 'recon toolkit · kali', href: 'pages/tachikomas.html' },
      { name: 'web-recon', desc: 'web surface · kali', href: 'pages/tachikomas.html' },
      { name: 'vault-bridge', desc: 'vault r/w · windows', href: 'pages/tachikomas.html' },
      { name: 'notify-voltron', desc: 'telegram bridge · kali', href: 'pages/tachikomas.html' },
      { name: 'claude-deep', desc: 'deep reasoning · kali', href: 'pages/tachikomas.html' }
    ]
  }
};

function showMbPopup(type, anchor){
  const data = MB_DATA[type];
  if (!data) return;
  const old = document.querySelector('.mb-list');
  if (old) old.remove();
  const pop = document.createElement('div');
  pop.className = 'mb-list' + (data.color ? ' ' + data.color : '');
  let html = '<div class="mb-list-h">' + data.title + '</div>';
  data.items.forEach(it => {
    html += '<div class="mb-list-row"><a href="' + it.href + '"><span class="name">' + it.name + '</span><span class="desc">' + it.desc + '</span></a></div>';
  });
  pop.innerHTML = html;
  document.body.appendChild(pop);
  // Position near the anchor cell — try to the left of the right column
  if (anchor){
    const rect = anchor.getBoundingClientRect();
    const popRect = pop.getBoundingClientRect();
    let left = rect.left - popRect.width - 12;
    if (left < 16) left = rect.right + 12;
    let top = rect.top;
    if (top + popRect.height > window.innerHeight - 16) top = window.innerHeight - popRect.height - 16;
    pop.style.left = Math.max(16, left) + 'px';
    pop.style.top = Math.max(16, top) + 'px';
  }
  // Click outside to dismiss
  setTimeout(() => {
    document.addEventListener('click', function dismiss(e){
      if (!pop.contains(e.target)){
        if (pop.parentNode) pop.remove();
        document.removeEventListener('click', dismiss);
      }
    });
  }, 100);
  beep(660, 0.04, 'square');
}

function bindMotherBase(){
  document.querySelectorAll('.stat-cell.clickable').forEach(cell => {
    const type = cell.getAttribute('data-mb');
    cell.addEventListener('click', (e) => {
      e.stopPropagation();
      showMbPopup(type, cell);
    });
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); showMbPopup(type, cell); }
    });
  });
}

function bindLeftPanels(){
  document.querySelectorAll('.lp-clickable').forEach(panel => {
    const action = panel.getAttribute('data-action');
    const fn = PANEL_ACTIONS[action];
    if (!fn) return;
    panel.addEventListener('click', () => fn(panel));
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); fn(panel); }
    });
  });
}

/* ============= MAIN LOOPS ============= */
function startMainLoops(){
  renderSquad();
  renderTachi();
  refreshUptimes();
  tickClock();
  tickDialectic();
  seedOpsLog();
  tickMotherBase();
  attachTopologyHandlers();

  personalizedGreeting();
  loadVisitorProfile();
  detectFingerprint();
  tickVitals();
  tickSync();
  bindCommandInput();
  bindActivityTracking();
  bindOverlayClickOutside();
  bindLeftPanels();
  loadOrders();
  renderOrders();
  bindOrdersBoard();
  startConfetti();
  showAudioHint();
  loadDiscovered();
  updateCounterUI(false);
  bindCodecRows();
  bindMotherBase();

  // intervals that pause when fullscreen overlay is active (CPU savings)
  const skipIfOverlay = (fn) => () => { if (!hasFullscreenOverlay()) fn(); };
  setInterval(skipIfOverlay(refreshUptimes), 1000);
  setInterval(tickClock, 1000);
  setInterval(skipIfOverlay(rotateQuote), 6500);
  setInterval(skipIfOverlay(tickDialectic), 11000);
  setInterval(skipIfOverlay(pushOpsEntry), 3500);
  setInterval(skipIfOverlay(tickMotherBase), 5000);
  setInterval(skipIfOverlay(tickVitals), 1100);
  setInterval(skipIfOverlay(tickSync), 2200);
  setInterval(skipIfOverlay(tickMonolith), 5500);
  setInterval(personalizedGreeting, 60000);
  setInterval(skipIfOverlay(rotateHint), 6500);

  rainHandle = makeRain(document.getElementById('rain'), RAIN_OPTS);
  bindPageVisibility();
}

/* ============= SERVICE WORKER ============= */
if ('serviceWorker' in navigator && location.protocol !== 'file:'){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {/* silently fail offline */});
  });
}

/* ============= START ============= */
makeRain(document.getElementById('bootRain'), {
  fontSize: 14,
  speed: 50,
  words: []
});
runBoot();

