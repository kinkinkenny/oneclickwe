import { useState } from "react";
import PromptBuilder from "./PromptBuilder.jsx";

const steps = [
  {
    num: 1, side: "L", color: "#6c63ff",
    agent: "Research Agent", icon: "🔍",
    title: "數據與意圖分析",
    action: "接收客戶基礎輸入，執行深度市場挖掘與搜尋引擎分析",
    outputs: [
      { label: "核心 SEO 關鍵字", text: "高搜尋量目標詞彙清單" },
      { label: "AEO 解答意圖", text: "Answer Engine Optimization 策略" },
      { label: "市場需求洞察", text: "競品分析 & 用戶核心痛點" },
    ]
  },
  {
    num: 2, side: "R", color: "#00d4ff",
    agent: "Architecture Agent", icon: "🗺️",
    title: "網站骨架與規格策劃",
    action: "整合 Step 0 客戶原始資料 + Step 1 SEO/AEO 數據，規劃完整網站架構",
    outputs: [
      { label: "Site Map 網站地圖", text: "清晰頁面結構與層級規劃" },
      { label: "內容要求規格書", text: "嚴格文案標準，傳遞予 Content Agent" },
    ]
  },
  {
    num: 3, side: "L", color: "#ff6b9d",
    agent: "Content Agent", icon: "✍️",
    title: "核心文案與視覺指令生成",
    action: "嚴格遵循 Step 2 規格書，產出真正落入網頁嘅全站內容",
    outputs: [
      { label: "全站 SEO 完稿文案", text: "H1, H2, 內文, CTA 各頁齊備" },
      { label: "Banner 視覺與文字指令", text: "視覺氛圍 Prompt + 疊字內容" },
      { label: "配圖需求指令", text: "各段落所需相片類型標示" },
    ]
  },
];

const parallelSteps = [
  {
    num: 4, color: "#ffaa00",
    agent: "Banner Generation Agent", icon: "🎨",
    title: "橫幅主圖合成",
    action: "呼叫 Remote Ocean → ComfyUI API / Pixel API 生成 Hero Banner",
    outputs: [
      { label: "AI 生成 Banner 底圖", text: "符合視覺指令嘅高質素底圖" },
      { label: "完整 Banner 圖檔", text: "底圖 + Step 3 文字完美疊加輸出" },
    ]
  },
  {
    num: 5, color: "#00e5a0",
    agent: "Photo Sourcing Agent", icon: "📸",
    title: "商業圖庫搜尋",
    action: "根據 Step 3 配圖需求，呼叫 Pexels / Pixabay API 自動篩選下載",
    outputs: [
      { label: "高清商業授權相片", text: "自動篩選最符合情境圖片" },
      { label: "已分類圖庫", text: "按頁面/段落對應整理完畢" },
    ]
  },
];

const lateSteps = [
  {
    num: 6, side: "R", color: "#a855f7",
    agent: 'Web Builder "Coco"', icon: "⚙️",
    title: "前端編程與排版",
    action: "終極大整合：Coco 接收 Site Map + 完稿文案 + Banner 圖 + 圖庫相片",
    outputs: [
      { label: "完整 HTML/CSS/JS", text: "文字圖片結合成完整網站代碼" },
      { label: "頁面區塊輸出", text: "符合規格書結構，準備部署" },
    ]
  },
  {
    num: 7, side: "L", color: "#00ff88",
    agent: "CMS Integration", icon: "🌐",
    title: "系統部署上線",
    action: "Coco 完成編碼後，透過 API 直接連線 ZTOA Standard CMS，全自動發佈",
    outputs: [
      { label: "自動建立頁面", text: "CMS 完整頁面架構一鍵生成" },
      { label: "圖片上傳 & 文案貼入", text: "全站資源自動上傳完成" },
      { label: "網站正式發佈", text: "Live 上線，即時可訪問" },
    ]
  },
];

function CardContent({ step }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 26, height: 26, borderRadius: "50%", background: step.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: ".7rem", fontWeight: 700, color: "#fff", flexShrink: 0,
        }}>{step.num}</div>
        <span style={{ fontSize: ".65rem", color: step.color, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{step.agent}</span>
      </div>
      <div style={{ fontSize: "1rem", fontWeight: 700, color: "#e8edff", marginBottom: 8 }}>
        {step.icon} {step.title}
      </div>
      <div style={{ fontSize: ".78rem", color: "#7a85a8", marginBottom: 10, lineHeight: 1.6, borderLeft: `2px solid ${step.color}`, paddingLeft: 10 }}>
        {step.action}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {step.outputs.map((o, i) => (
          <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", background: "#0d1526", border: "1px solid #1e2a45", borderRadius: 8, padding: "6px 10px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: step.color, marginTop: 5, flexShrink: 0 }} />
            <span style={{ fontSize: ".76rem", color: "#c5cde8", lineHeight: 1.5 }}>
              <span style={{ color: "#e8edff", fontWeight: 600 }}>{o.label}</span>
              {o.text ? ` — ${o.text}` : ""}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function Card({ step }) {
  const [hovered, setHovered] = useState(false);
  const isLeft = step.side === "L";

  return (
    <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 36, position: "relative" }}>
      {isLeft && (
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: "calc(50% - 40px)",
            background: "#111827",
            border: "1px solid #1e2a45",
            borderRadius: 16,
            padding: "18px 20px",
            position: "relative",
            transition: "transform .3s, box-shadow .3s",
            transform: hovered ? "translateY(-4px)" : "none",
            boxShadow: hovered ? `0 12px 36px ${step.color}33` : "none",
          }}
        >
          <CardContent step={step} />
          <div style={{ position: "absolute", top: 32, right: -40, width: 38, height: 2, background: step.color }} />
        </div>
      )}

      <div style={{
        position: "absolute", left: "50%", top: 32,
        width: 14, height: 14, borderRadius: "50%",
        background: step.color, transform: "translateX(-50%)",
        boxShadow: `0 0 10px ${step.color}`, zIndex: 2,
      }} />

      {!isLeft && (
        <div style={{ width: "calc(50% - 40px)", marginLeft: "auto" }}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              background: "#111827",
              border: "1px solid #1e2a45",
              borderRadius: 16,
              padding: "18px 20px",
              position: "relative",
              transition: "transform .3s, box-shadow .3s",
              transform: hovered ? "translateY(-4px)" : "none",
              boxShadow: hovered ? `0 12px 36px ${step.color}33` : "none",
            }}
          >
            <CardContent step={step} />
            <div style={{ position: "absolute", top: 32, left: -40, width: 38, height: 2, background: step.color }} />
          </div>
        </div>
      )}
    </div>
  );
}

function ParallelCard({ step }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1, minWidth: 260, background: "#111827",
        border: `1px solid ${step.color}33`, borderRadius: 16, padding: "18px 20px",
        transition: "transform .3s, box-shadow .3s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? `0 12px 36px ${step.color}33` : "none",
      }}
    >
      <CardContent step={step} />
    </div>
  );
}

const NAV_TABS = [
  { id: "flow", label: "🚀 系統流程圖" },
  { id: "prompt", label: "🧠 Step 1 Prompt Builder" },
];

export default function ZTOAFlow() {
  const [activeTab, setActiveTab] = useState("flow");

  if (activeTab === "prompt") return (
    <>
      <nav style={{ background: "#0d1120", borderBottom: "1px solid #1e2a45", padding: "10px 20px", display: "flex", gap: 8, position: "sticky", top: 0, zIndex: 100 }}>
        {NAV_TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: activeTab === t.id ? "linear-gradient(135deg,#6c63ff,#00d4ff)" : "transparent",
            border: activeTab === t.id ? "none" : "1px solid #1e2a45",
            borderRadius: 8, padding: "7px 16px", color: activeTab === t.id ? "#fff" : "#7a85a8",
            fontSize: ".78rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Segoe UI','PingFang TC',sans-serif",
          }}>{t.label}</button>
        ))}
      </nav>
      <PromptBuilder />
    </>
  );

  return (
    <div style={{ fontFamily: "'Segoe UI','PingFang TC',sans-serif", background: "#0a0e1a", color: "#e0e6ff", minHeight: "100vh", padding: "36px 20px" }}>

      {/* Nav Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36 }}>
        {NAV_TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: activeTab === t.id ? "linear-gradient(135deg,#6c63ff,#00d4ff)" : "transparent",
            border: activeTab === t.id ? "none" : "1px solid #1e2a45",
            borderRadius: 8, padding: "7px 18px", color: activeTab === t.id ? "#fff" : "#7a85a8",
            fontSize: ".78rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Segoe UI','PingFang TC',sans-serif",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, background: "linear-gradient(135deg,#6c63ff,#00d4ff,#ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: 2 }}>
          🚀 ZTOA 全自動化建站系統
        </h1>
        <p style={{ color: "#7a85a8", marginTop: 8, fontSize: ".88rem", letterSpacing: 1 }}>One-Click Website Generation — Full Flow Architecture</p>
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto", position: "relative" }}>

        <div style={{
          position: "absolute", left: "50%", top: 0, bottom: 0, width: 2,
          background: "linear-gradient(to bottom,#6c63ff,#00d4ff,#ff6b9d,#a855f7,#00ff88)",
          transform: "translateX(-50%)", zIndex: 0,
        }} />

        {/* Step 0 */}
        <div style={{ background: "linear-gradient(135deg,#1a1040,#0d1526)", border: "1px solid #6c63ff44", borderRadius: 16, padding: "22px 26px", textAlign: "center", marginBottom: 40, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "1rem", color: "#6c63ff", fontWeight: 700, marginBottom: 14, letterSpacing: .5 }}>⚡ STEP 0 — 觸發點：客戶輸入</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "★ 必填", text: "一句產品/服務描述", color: "#ff6b9d" },
              { label: "◎ 選填", text: "希望加入嘅內容", color: "#7a85a8" },
              { label: "◎ 選填", text: "公司名稱", color: "#7a85a8" },
            ].map((f, i) => (
              <div key={i} style={{ background: "#111827", border: "1px solid #2a3550", borderRadius: 8, padding: "7px 14px", fontSize: ".8rem" }}>
                <span style={{ color: f.color, fontWeight: 700 }}>{f.label}</span>
                <span style={{ color: "#c5cde8" }}> {f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 24, fontSize: "1.4rem", position: "relative", zIndex: 1, color: "#7a85a8" }}>↓</div>

        {/* Steps 1–3 */}
        {steps.map(s => (
          <div key={s.num} style={{ position: "relative", zIndex: 1 }}>
            <Card step={s} />
          </div>
        ))}

        {/* Parallel Steps 4 & 5 */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: 36 }}>
          <div style={{ textAlign: "center", marginBottom: 12, color: "#7a85a8", fontSize: ".73rem", letterSpacing: 1, border: "1px dashed #1e2a45", borderRadius: 8, padding: "5px 10px" }}>
            ⚡ 並行處理 PARALLEL PROCESSING ⚡
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {parallelSteps.map(s => <ParallelCard key={s.num} step={s} />)}
          </div>
        </div>

        {/* Steps 6–7 */}
        {lateSteps.map(s => (
          <div key={s.num} style={{ position: "relative", zIndex: 1 }}>
            <Card step={s} />
          </div>
        ))}

        {/* Final */}
        <div style={{ background: "linear-gradient(135deg,#0d2010,#0a0e1a)", border: "1px solid #00ff8833", borderRadius: 16, padding: "26px 30px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "1.2rem", color: "#00ff88", fontWeight: 700, marginBottom: 10 }}>🎉 網站正式上線</div>
          <div style={{ color: "#7a85a8", fontSize: ".83rem", lineHeight: 1.7 }}>
            從「一句描述」到「完整網站」，全程零人手介入<br />
            SEO 優化 · 專業設計 · 商業授權圖片 · 自動部署
          </div>
          <div style={{ display: "inline-block", background: "#00ff8818", border: "1px solid #00ff8844", color: "#00ff88", borderRadius: 20, padding: "4px 16px", fontSize: ".72rem", fontWeight: 600, marginTop: 12, letterSpacing: 1 }}>
            ● LIVE
          </div>
        </div>

      </div>
    </div>
  );
}
