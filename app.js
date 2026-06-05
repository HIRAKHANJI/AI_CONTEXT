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

  // ---- state ----
  var state = { search: "", aisle: "all", tier: "all", type: "all", freeOnly: false, group: true };
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

  function matches(it) {
    if (state.aisle !== "all" && !inAisle(it, state.aisle)) return false;
    if (state.tier !== "all" && it.tier !== state.tier) return false;
    if (state.type !== "all" && it.type !== state.type) return false;
    if (state.freeOnly && it.cost !== "Free") return false;
    if (state.search) {
      var q = state.search.toLowerCase();
      var hay = (it.name + " " + it.what + " " + it.why + " " + it.type + " " + it.aisle + " " +
                 (it.also || []).join(" ") + " " + it.tier + " " + it.cost).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  // ---- build static UI ----
  function buildAisleChips() {
    var wrap = document.getElementById("aisleChips");
    var total = ITEMS.length;
    var chips = ['<div class="chip active" data-aisle="all">🛒 All <span class="n">' + total + "</span></div>"];
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

  function buildTypeSelect() {
    var sel = document.getElementById("typeSel");
    var types = {};
    ITEMS.forEach(function (it) { types[it.type] = (types[it.type] || 0) + 1; });
    var opts = ['<option value="all">All types</option>'];
    Object.keys(types).sort().forEach(function (t) {
      opts.push('<option value="' + esc(t) + '">' + esc(t) + " (" + types[t] + ")</option>");
    });
    sel.innerHTML = opts.join("");
    sel.addEventListener("change", function () { state.type = sel.value; render(); });
  }

  function buildStats() {
    var free = ITEMS.filter(function (it) { return it.cost === "Free"; }).length;
    var core = ITEMS.filter(function (it) { return it.tier === "Core"; }).length;
    var mcp = ITEMS.filter(function (it) { return it.type === "MCP server"; }).length;
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
        '<div class="badges"><span class="badge type">' + esc(it.type) + "</span>" +
          (it.costNote ? '<span class="badge type" title="cost note">ⓘ ' + esc(it.costNote) + "</span>" : "") + "</div>" +
        '<div class="what">' + esc(it.what) + "</div>" +
        '<div class="maturity">📈 ' + esc(it.maturity) + "</div>" +
        '<button class="details-toggle">Details ▾</button>' +
        '<div class="details">' +
          '<div><div class="lbl">Why it fits you</div><div class="why">' + esc(it.why) + "</div></div>" +
          '<div><div class="lbl">Install</div><div class="install"><code>' + esc(it.install) + '</code><button class="copy-btn" data-copy="install">Copy</button></div></div>' +
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
      var id = this.getAttribute("data-go");
      state.aisle = id;
      var chips = document.querySelectorAll("#aisleChips .chip");
      chips.forEach(function (x) { x.classList.toggle("active", x.getAttribute("data-aisle") === id); });
      render();
      window.scrollTo({ top: document.querySelector(".filters").offsetTop - 70, behavior: "smooth" });
    });
    c.querySelector('[data-copy="install"]').addEventListener("click", function () {
      copy(it.install); toast("Install command copied");
    });
    c.querySelector(".add-btn").addEventListener("click", function () { toggleCart(it.id, this); });
    return c;
  }

  // ---- render grid ----
  function render() {
    var grid = document.getElementById("grid");
    grid.innerHTML = "";
    var list = ITEMS.filter(matches);

    if (!list.length) {
      grid.innerHTML = '<div class="empty">🤷 No tools match these filters.<br/>Try clearing the search or picking “All”.</div>';
      return;
    }

    if (state.group && state.aisle === "all" && !state.search) {
      AISLES.forEach(function (a) {
        var inThis = list.filter(function (it) { return it.aisle === a.id; })
                         .sort(tierSort);
        if (!inThis.length) return;
        var head = el('<div class="aisle-head"><h2>' + a.icon + " " + esc(a.name) + '</h2><span class="blurb">' + esc(a.blurb) + "</span></div>");
        grid.appendChild(head);
        inThis.forEach(function (it) { grid.appendChild(card(it)); });
      });
    } else {
      list.sort(tierSort).forEach(function (it) { grid.appendChild(card(it)); });
    }
  }
  function tierSort(a, b) {
    var d = (TIER_ORDER[a.tier] || 9) - (TIER_ORDER[b.tier] || 9);
    return d !== 0 ? d : a.name.localeCompare(b.name);
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
        '  ·  <span style="color:var(--muted-2);font-weight:600;font-size:12px">' + esc(it.tier) + " · " + esc(it.cost) + "</span></div>" +
        "<code>" + esc(it.install) + "</code></div>" +
        '<button class="rm" data-rm="' + it.id + '" title="Remove">&times;</button></div>';
    });
    body.innerHTML = html;
    body.querySelectorAll("[data-rm]").forEach(function (b) {
      b.addEventListener("click", function () {
        toggleCart(b.getAttribute("data-rm"));
        // also refresh any matching add button on the grid
        render();
      });
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
      lines.push("- [ ] **" + it.name + "** — " + it.tier + " · " + it.cost);
      lines.push("      install: " + it.install);
      lines.push("      docs:    " + it.url);
    });
    return lines.join("\n");
  }

  // ---- clipboard + toast ----
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(fallback);
    } else { fallback(); }
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

  // ---- drawer + modal wiring ----
  function openCart() { document.getElementById("drawer").classList.add("open"); document.getElementById("scrim").classList.add("open"); renderCart(); }
  function closeCart() { document.getElementById("drawer").classList.remove("open"); document.getElementById("scrim").classList.remove("open"); }

  function init() {
    document.getElementById("heroTag").textContent = DATA.meta.tagline || document.getElementById("heroTag").textContent;
    document.getElementById("updated").textContent = DATA.meta.updated || "";
    buildStats(); buildAisleChips(); buildTypeSelect(); updateCartCount(); render();

    document.getElementById("search").addEventListener("input", function (e) { state.search = e.target.value.trim(); render(); });
    document.getElementById("freeOnly").addEventListener("change", function (e) { state.freeOnly = e.target.checked; render(); });
    document.getElementById("groupAisle").addEventListener("change", function (e) { state.group = e.target.checked; render(); });

    var tierSeg = document.getElementById("tierSeg");
    tierSeg.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        tierSeg.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active"); state.tier = b.getAttribute("data-tier"); render();
      });
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
