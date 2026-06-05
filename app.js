/* AI_CONTEXT — shopping center behavior. Vanilla JS, no dependencies. */
(function () {
  "use strict";
  var DATA = window.CATALOG || { aisles: [], items: [], meta: {} };
  var AISLES = DATA.aisles;
  var ITEMS = DATA.items;
  var byId = {};
  ITEMS.forEach(function (it) { byId[it.id] = it; });
  var aisleById = {};
  AISLES.forEach(function (a) { aisleById[a.id] = a; });

  var TIER_ORDER = { Core: 0, Recommended: 1, Situational: 2, Shortlist: 3, Showroom: 4 };
  var TIER_VAR = {
    Core: "var(--t-core)", Recommended: "var(--t-recommended)", Situational: "var(--t-situational)",
    Shortlist: "var(--t-shortlist)", Showroom: "var(--t-showroom)"
  };
  var COST_VAR = { "Free": "var(--c-free)", "Free tier": "var(--c-freetier)", "Paid": "var(--c-paid)" };

  // ---- "how it connects to Claude" facet, derived from type (+ a few overrides) ----
  var LINK_BY_TYPE = {
    "MCP server": "mcp", "Connector": "connector", "Agent Skill": "native",
    "Claude Code Plugin": "native", "Subagent": "native", "Concept": "native",
    "CLI tool": "cli", "Hook": "cli", "Web service": "standalone"
  };
  var LINK_OVERRIDE = { "awesome-claude-code": "standalone", "mermaid": "cli", "plantuml": "cli", "obsidian-kanban": "standalone" };
  var LINK_META = {
    mcp:        { label: "MCP",               where: "Claude Code & Desktop — add with `claude mcp add`" },
    connector:  { label: "Connector · Settings", where: "Claude apps → Settings → Connectors" },
    native:     { label: "Skill / built-in",  where: "Claude Code (skills also work in Claude apps & API)" },
    cli:        { label: "CLI",               where: "Your terminal — Claude runs it for you" },
    standalone: { label: "Standalone",        where: "Your browser/desktop — you operate it directly" }
  };
  function linkOf(it) { return LINK_OVERRIDE[it.id] || LINK_BY_TYPE[it.type] || "standalone"; }

  // ---- state ----
  var state = { search: "", aisle: "all", link: "all", tier: "all", cost: "all", sort: "tier" };
  var cart = loadCart();

  // ---- helpers ----
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function loadCart() { try { return JSON.parse(localStorage.getItem("aic_cart") || "[]"); } catch (e) { return []; } }
  function saveCart() { try { localStorage.setItem("aic_cart", JSON.stringify(cart)); } catch (e) {} }
  function inAisle(it, id) { return it.aisle === id || (it.also && it.also.indexOf(id) !== -1); }
  function rank(it) { return it.popRank || 0; }

  function matches(it) {
    if (state.aisle !== "all" && !inAisle(it, state.aisle)) return false;
    if (state.link !== "all" && linkOf(it) !== state.link) return false;
    if (state.tier !== "all" && it.tier !== state.tier) return false;
    if (state.cost !== "all" && it.cost !== state.cost) return false;
    if (state.search) {
      var q = state.search.toLowerCase();
      var hay = (it.name + " " + it.what + " " + it.why + " " + it.type + " " + it.aisle + " " +
                 (it.also || []).join(" ") + " " + it.tier + " " + it.cost + " " + (it.pop || "")).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  // ---- sorting ----
  function tierSort(a, b) {
    var d = (TIER_ORDER[a.tier] || 9) - (TIER_ORDER[b.tier] || 9);
    if (d) return d;
    var r = rank(b) - rank(a);
    if (r) return r;
    return a.name.localeCompare(b.name);
  }
  function popSort(a, b) { var r = rank(b) - rank(a); return r ? r : a.name.localeCompare(b.name); }
  function nameSort(a, b) { return a.name.localeCompare(b.name); }
  function sorter() { return state.sort === "pop" ? popSort : state.sort === "name" ? nameSort : tierSort; }

  // ---- build static UI ----
  function buildAisleChips() {
    var wrap = document.getElementById("aisleChips");
    var chips = ['<div class="chip active" data-aisle="all">🛒 All <span class="n">' + ITEMS.length + "</span></div>"];
    AISLES.forEach(function (a) {
      var n = ITEMS.filter(function (it) { return inAisle(it, a.id); }).length;
      if (!n) return;
      chips.push('<div class="chip" data-aisle="' + a.id + '" title="' + esc(a.blurb) + '">' +
        a.icon + " " + esc(a.name) + ' <span class="n">' + n + "</span></div>");
    });
    wrap.innerHTML = chips.join("");
    wrap.querySelectorAll(".chip").forEach(function (c) {
      c.addEventListener("click", function () {
        state.aisle = c.getAttribute("data-aisle");
        wrap.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("active"); });
        c.classList.add("active");
        render();
      });
    });
  }

  function buildStats() {
    var free = ITEMS.filter(function (it) { return it.cost === "Free"; }).length;
    var core = ITEMS.filter(function (it) { return it.tier === "Core"; }).length;
    var mcp = ITEMS.filter(function (it) { return linkOf(it) === "mcp"; }).length;
    document.getElementById("stats").innerHTML =
      '<div class="stat"><b>' + ITEMS.length + "</b>vetted items</div>" +
      '<div class="stat"><b>' + free + "</b>fully free</div>" +
      '<div class="stat"><b>' + core + "</b>core (start here)</div>" +
      '<div class="stat"><b>' + AISLES.length + "</b>departments</div>" +
      '<div class="stat"><b>' + mcp + "</b>MCP servers</div>";
  }

  // ---- card ----
  function card(it) {
    var inCart = cart.indexOf(it.id) !== -1;
    var lk = linkOf(it), lkMeta = LINK_META[lk];
    var c = el(
      '<article class="card" style="--tier-color:' + TIER_VAR[it.tier] + '">' +
        '<div class="row">' +
          "<div>" +
            '<div class="badges">' +
              '<span class="badge tier" style="background:' + TIER_VAR[it.tier] + '">' + esc(it.tier) + "</span>" +
              '<span class="badge cost" style="background:' + (COST_VAR[it.cost] || "var(--line-2)") + '">' + esc(it.cost) + "</span>" +
            "</div>" +
            "<h3>" + esc(it.name) + "</h3>" +
          "</div>" +
          '<span class="badge aisle" data-go="' + esc(it.aisle) + '">' + (aisleById[it.aisle] ? aisleById[it.aisle].icon : "") + " " + esc(aisleById[it.aisle] ? aisleById[it.aisle].name : it.aisle) + "</span>" +
        "</div>" +
        '<div class="badges">' +
          '<span class="badge link' + (lk === "connector" ? " connector" : "") + '" title="' + esc(lkMeta.where) + '">🔌 ' + esc(lkMeta.label) + "</span>" +
          '<span class="badge type">' + esc(it.type) + "</span>" +
          (it.costNote ? '<span class="badge type" title="cost note">ⓘ ' + esc(it.costNote) + "</span>" : "") +
        "</div>" +
        (it.pop ? '<div class="pop">' + popHtml(it.pop) + "</div>" : "") +
        '<div class="what">' + esc(it.what) + "</div>" +
        '<button class="details-toggle">Details ▾</button>' +
        '<div class="details">' +
          '<div><div class="lbl">Why it fits you</div><div class="why">' + esc(it.why) + "</div></div>" +
          '<div><div class="lbl">How you use it with Claude</div><div class="why">' + esc(lkMeta.where) + "</div></div>" +
          '<div><div class="lbl">Install</div><div class="install"><code>' + esc(it.install) + '</code><button class="copy-btn" data-copy="install">Copy</button></div></div>' +
          '<div><div class="lbl">Maturity / adoption</div><div class="why">' + esc(it.maturity) + "</div></div>" +
          '<div><div class="lbl">Heads-up / risk</div><div class="risk">' + esc(it.risk) + "</div></div>" +
          '<div><div class="lbl">Verdict</div><div class="why">' + esc(it.verdict) + "</div></div>" +
        "</div>" +
        '<div class="actions">' +
          '<button class="btn add-btn' + (inCart ? " added" : "") + '">' + (inCart ? "✓ In cart" : "+ Add to cart") + "</button>" +
          '<a class="btn ghost link-btn" href="' + esc(it.url) + '" target="_blank" rel="noopener" title="Open source">↗</a>' +
        "</div>" +
      "</article>"
    );

    c.querySelector(".details-toggle").addEventListener("click", function () {
      var d = c.querySelector(".details");
      var open = d.classList.toggle("open");
      this.textContent = open ? "Details ▴" : "Details ▾";
    });
    c.querySelector(".badge.aisle").addEventListener("click", function () {
      setAisle(this.getAttribute("data-go"));
      window.scrollTo({ top: document.querySelector(".filters").offsetTop - 70, behavior: "smooth" });
    });
    c.querySelector('[data-copy="install"]').addEventListener("click", function () {
      copy(it.install); toast("Install command copied");
    });
    c.querySelector(".add-btn").addEventListener("click", function () { toggleCart(it.id, this); });
    return c;
  }

  // pop string like "⭐57k · Massive · loved" — star highlighted, ⚠ flagged
  function popHtml(s) {
    return esc(s)
      .replace(/⭐/g, '<span class="star">⭐</span>')
      .replace(/⚠/g, '<span class="flag">⚠</span>');
  }

  function setAisle(id) {
    state.aisle = id;
    document.querySelectorAll("#aisleChips .chip").forEach(function (x) {
      x.classList.toggle("active", x.getAttribute("data-aisle") === id);
    });
    render();
  }

  // ---- render grid ----
  function render() {
    var grid = document.getElementById("grid");
    grid.innerHTML = "";
    var list = ITEMS.filter(matches);
    document.getElementById("resultCount").textContent = list.length + " of " + ITEMS.length + " items";

    if (!list.length) {
      grid.innerHTML = '<div class="empty">🤷 No tools match these filters.<br/>Try Reset or pick “All”.</div>';
      return;
    }

    var grouped = state.sort === "tier" && state.aisle === "all" && !state.search;
    if (grouped) {
      AISLES.forEach(function (a) {
        var inThis = list.filter(function (it) { return it.aisle === a.id; }).sort(tierSort);
        if (!inThis.length) return;
        grid.appendChild(el('<div class="aisle-head"><h2>' + a.icon + " " + esc(a.name) + '</h2><span class="blurb">' + esc(a.blurb) + "</span></div>"));
        inThis.forEach(function (it) { grid.appendChild(card(it)); });
      });
    } else {
      list.sort(sorter()).forEach(function (it) { grid.appendChild(card(it)); });
    }
  }

  // ---- cart ----
  function toggleCart(id, btn) {
    var i = cart.indexOf(id);
    if (i === -1) { cart.push(id); if (btn) { btn.classList.add("added"); btn.textContent = "✓ In cart"; } toast("Added to cart"); }
    else { cart.splice(i, 1); if (btn) { btn.classList.remove("added"); btn.textContent = "+ Add to cart"; } }
    saveCart(); updateCartCount(); renderCart();
  }
  function updateCartCount() { document.getElementById("cartCount").textContent = cart.length; }

  function renderCart() {
    var body = document.getElementById("cartBody");
    if (!cart.length) {
      body.innerHTML = '<p class="cart-hint">Your cart is empty. Add tools from the aisles and they collect here as a personal, ordered setup checklist — then copy it as Markdown (or paste it back to Claude Code and say “install these for me”).</p>';
      return;
    }
    var ordered = orderedCart();
    var html = '<p class="cart-hint">' + cart.length + ' item' + (cart.length > 1 ? "s" : "") + " — installed roughly in this order (Core first).</p>";
    ordered.forEach(function (it) {
      html += '<div class="cart-item"><div class="meta"><div class="nm">' +
        (aisleById[it.aisle] ? aisleById[it.aisle].icon + " " : "") + esc(it.name) +
        '  ·  <span style="color:var(--muted-2);font-weight:600;font-size:12px">' + esc(it.tier) + " · " + esc(LINK_META[linkOf(it)].label) + "</span></div>" +
        "<code>" + esc(it.install) + "</code></div>" +
        '<button class="rm" data-rm="' + it.id + '" title="Remove">&times;</button></div>';
    });
    body.innerHTML = html;
    body.querySelectorAll("[data-rm]").forEach(function (b) {
      b.addEventListener("click", function () { toggleCart(b.getAttribute("data-rm")); render(); });
    });
  }

  function orderedCart() {
    return cart.map(function (id) { return byId[id]; }).filter(Boolean).sort(function (a, b) {
      var aa = AISLES.findIndex(function (x) { return x.id === a.aisle; });
      var bb = AISLES.findIndex(function (x) { return x.id === b.aisle; });
      if (aa !== bb) return aa - bb;
      return tierSort(a, b);
    });
  }

  function exportChecklist() {
    var ordered = orderedCart();
    var lines = [
      "# AI_CONTEXT — my install checklist (" + ordered.length + " items)",
      "# Generated " + new Date().toISOString().slice(0, 10) + " from the shopping center.",
      "# Tip: paste this to Claude Code and say: \"install/set up these for me, Windows.\"",
      ""
    ];
    var lastAisle = null;
    ordered.forEach(function (it) {
      if (it.aisle !== lastAisle) {
        var a = aisleById[it.aisle];
        lines.push("", "## " + (a ? a.icon + " " + a.name : it.aisle));
        lastAisle = it.aisle;
      }
      lines.push("- [ ] **" + it.name + "** — " + it.tier + " · " + it.cost + " · " + LINK_META[linkOf(it)].label);
      lines.push("      install: " + it.install);
      lines.push("      docs:    " + it.url);
    });
    return lines.join("\n");
  }

  // ---- clipboard + toast ----
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(fallback);
    else fallback();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
    }
  }
  var toastT;
  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove("show"); }, 1600);
  }

  // ---- drawer + modal ----
  function openCart() { document.getElementById("drawer").classList.add("open"); document.getElementById("scrim").classList.add("open"); renderCart(); }
  function closeCart() { document.getElementById("drawer").classList.remove("open"); document.getElementById("scrim").classList.remove("open"); }

  function resetFilters() {
    state.search = ""; state.aisle = "all"; state.link = "all"; state.tier = "all"; state.cost = "all"; state.sort = "tier";
    document.getElementById("search").value = "";
    document.getElementById("linkSel").value = "all";
    document.getElementById("tierSel").value = "all";
    document.getElementById("costSel").value = "all";
    document.getElementById("sortSel").value = "tier";
    setAisle("all");
  }

  function init() {
    document.getElementById("heroTag").textContent = DATA.meta.tagline || document.getElementById("heroTag").textContent;
    document.getElementById("updated").textContent = DATA.meta.updated || "";
    buildStats(); buildAisleChips(); updateCartCount(); render();

    document.getElementById("search").addEventListener("input", function (e) { state.search = e.target.value.trim(); render(); });
    document.getElementById("linkSel").addEventListener("change", function (e) { state.link = e.target.value; render(); });
    document.getElementById("tierSel").addEventListener("change", function (e) { state.tier = e.target.value; render(); });
    document.getElementById("costSel").addEventListener("change", function (e) { state.cost = e.target.value; render(); });
    document.getElementById("sortSel").addEventListener("change", function (e) { state.sort = e.target.value; render(); });
    document.getElementById("resetBtn").addEventListener("click", resetFilters);
    document.getElementById("legendToggle").addEventListener("click", function () {
      document.getElementById("legend").classList.toggle("open");
    });

    document.getElementById("cartBtn").addEventListener("click", openCart);
    document.getElementById("closeCart").addEventListener("click", closeCart);
    document.getElementById("scrim").addEventListener("click", closeCart);
    document.getElementById("clearCart").addEventListener("click", function () {
      cart = []; saveCart(); updateCartCount(); renderCart(); render();
      document.getElementById("exportArea").style.display = "none";
    });
    document.getElementById("exportBtn").addEventListener("click", function () {
      if (!cart.length) { toast("Cart is empty"); return; }
      var text = exportChecklist();
      copy(text); toast("Checklist copied to clipboard");
      var area = document.getElementById("exportArea");
      area.style.display = "block"; area.value = text; area.focus(); area.select();
    });

    var pm = document.getElementById("protocolModal");
    document.getElementById("protocolBtn").addEventListener("click", function () { pm.classList.add("open"); });
    document.getElementById("closeProtocol").addEventListener("click", function () { pm.classList.remove("open"); });
    pm.addEventListener("click", function (e) { if (e.target === pm) pm.classList.remove("open"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { pm.classList.remove("open"); closeCart(); }
      if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault(); document.getElementById("search").focus();
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
