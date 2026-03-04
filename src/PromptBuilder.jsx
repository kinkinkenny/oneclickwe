import { useState } from "react";

const IMPROVEMENTS = [
  {
    tag: "GEO",
    color: "#00d4ff",
    title: "Generative Engine Optimisation",
    desc: "Added Phase 4 for Google AI Overviews, Perplexity & ChatGPT — structures content so AI engines cite your page as the authoritative answer.",
  },
  {
    tag: "VEO",
    color: "#ffaa00",
    title: "Video Engine Optimisation",
    desc: "Added YouTube title/description hooks, short-form video content ideas & VideoObject schema — captures video carousel rankings on Google.",
  },
  {
    tag: "E-E-A-T",
    color: "#ff6b9d",
    title: "Experience · Expertise · Authoritativeness · Trust",
    desc: "Prompts the AI to recommend trust signals (testimonials, accreditations, case studies) that Google's Quality Rater Guidelines weight heavily.",
  },
  {
    tag: "Schema",
    color: "#a855f7",
    title: "Structured Data Markup",
    desc: "Now outputs LocalBusiness, FAQPage, Service & BreadcrumbList schema recommendations — unlocks rich results and featured snippets.",
  },
  {
    tag: "Featured Snippets",
    color: "#00e5a0",
    title: "Position Zero Targeting",
    desc: "Instructs explicit paragraph/list/table formatting for each H2 so content is structurally eligible for Google's Answer Box.",
  },
];

function generatePrompt(product, description, audience) {
  return `【角色設定】
你現在是一位專注於「英國市場」的頂級 SEO / GEO / VEO 策略專家及網站架構師。你深諳英式英語（British English）的搜尋習慣、本地化 SEO 條件、解答引擎優化（AEO）的邏輯，以及生成式引擎優化（GEO）與影片引擎優化（VEO）的最新策略。

【輸入資料】
產品/服務名稱：${product || "[請在此輸入]"}
簡單簡介：${description || "[請在此輸入]"}
目標受眾：${audience || "[請在此輸入，例如：英國本地中小企、倫敦消費者等]"}

【任務指令】
請根據上述輸入資料，嚴格按照以下五個階段進行深度分析並輸出結構：

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
階段一：英國市場搜尋意圖與關鍵字研究 (Research Phase)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 搜尋意圖分析：分析英國目標受眾在尋找此類服務時，最關心的 3 個核心痛點。他們通常會問什麼問題？

2. 關鍵字矩陣（必須使用正宗英式英語）：
   - 5 個高轉換率「主打關鍵字」
   - 10 個「長尾/LSI 關鍵字」（包含 AEO 疑問句型）
   - 3 個「People Also Ask (PAA)」精準問題
   - 3 個「Featured Snippet 奪取型」關鍵字（適合 paragraph / list / table 格式）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
階段二：SEO & AEO 主導的單頁網站架構 (Blueprint Phase)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
規劃一個高轉換率的單頁網站（Single-page Website）內容骨架。
- 按順序列出網頁板塊（Hero Section, 痛點與方案, 服務詳情, E-E-A-T 信任區塊, AEO FAQ, CTA）
- 清晰標明 H1 / H2 / H3 標籤及對應部署的關鍵字
- 每個 H2 板塊標明 Featured Snippet 格式建議（paragraph / list / table）
- 指定建議的 Schema Markup 類型（LocalBusiness, FAQPage, Service, BreadcrumbList 等）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
階段三：GEO — 生成式引擎優化策略 (Generative Engine Phase)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
針對 Google AI Overviews、Perplexity、ChatGPT Search、Bing Copilot：
1. 列出 3 個「AI 引擎最容易引用」的直接答案句型結構（concise factual statements）
2. 建議 2 個實體優化（Entity Optimisation）方向，令網站成為該領域的權威實體
3. 建議內容格式：哪些段落應以「定義 + 例子 + 數據」結構撰寫，以提高 AI 引用率

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
階段四：VEO — 影片引擎優化策略 (Video Engine Phase)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
針對 YouTube、Google Video Carousel、TikTok Search：
1. 提供 3 個 YouTube 影片標題建議（含主打關鍵字，符合英式英語搜尋習慣）
2. 提供影片描述首段 Hook 範本（前 150 字符，包含關鍵字）
3. 建議 3 個 YouTube Shorts / TikTok 短片主題（配合網站內容，提高品牌搜尋量）
4. 指明應在網頁嵌入 VideoObject Schema 的位置

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
階段五：E-E-A-T 信任信號策略 (Trust Signal Phase)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
根據 Google Quality Rater Guidelines，建議：
1. 3 種「Experience」信號（例如：創辦人故事、案例研究、before/after 展示）
2. 3 種「Expertise」信號（例如：行業資格、媒體提及、數據引用）
3. 2 種「Authoritativeness」建立方法（英國本地相關）
4. 3 種「Trustworthiness」元素（隱私政策、評價徽章、安全認證等）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
階段六：輸出給 Node 2 的標準化 Payload (Strict Data Output)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
嚴格要求：此區塊不允許任何多餘對話、解釋或廢話。完全按照以下格式標籤輸出：

[NODE_2_PAYLOAD_START]
PRIMARY_KEYWORDS: [最重要的 3-5 個關鍵字，逗號分隔]
AEO_INTENT: [2-3 個必須解答的用戶痛點/問題]
GEO_STATEMENTS: [2 個適合 AI 引擎引用的直接答案句]
VEO_TITLES: [2 個 YouTube 影片標題建議]
EEAT_SIGNALS: [3 個最重要的信任信號]
SCHEMA_TYPES: [建議部署的 Schema 類型清單]
SITE_STRUCTURE:
- H1: [標題概念] | 關鍵字: [字詞] | Snippet格式: [paragraph/list/table]
- H2: [標塊概念] | 關鍵字: [字詞] | Snippet格式: [paragraph/list/table]
  - H3: [細節概念] | 關鍵字: [字詞]
(繼續列出所有 H2/H3 結構...)
[NODE_2_PAYLOAD_END]`;
}

export default function PromptBuilder() {
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [copied, setCopied] = useState(false);

  const prompt = generatePrompt(product, description, audience);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const inputStyle = {
    width: "100%",
    background: "#0d1526",
    border: "1px solid #1e2a45",
    borderRadius: 10,
    padding: "10px 14px",
    color: "#e0e6ff",
    fontSize: ".85rem",
    fontFamily: "'Segoe UI','PingFang TC',sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s",
  };

  return (
    <div style={{ fontFamily: "'Segoe UI','PingFang TC',sans-serif", background: "#0a0e1a", color: "#e0e6ff", minHeight: "100vh", padding: "36px 20px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 style={{ fontSize: "1.7rem", fontWeight: 800, background: "linear-gradient(135deg,#6c63ff,#00d4ff,#00e5a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: 1.5, marginBottom: 8 }}>
          🧠 Step 1 — Prompt Builder
        </h1>
        <p style={{ color: "#7a85a8", fontSize: ".85rem", letterSpacing: 1 }}>
          SEO · GEO · VEO · AEO · E-E-A-T — UK Market Edition
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Improvements Banner */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: ".72rem", color: "#7a85a8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
            ✦ 已加入以下優化（原版 Prompt 升級）
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {IMPROVEMENTS.map((imp) => (
              <div key={imp.tag} style={{ background: "#111827", border: `1px solid ${imp.color}33`, borderRadius: 12, padding: "10px 14px", flex: "1 1 220px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ background: imp.color + "22", color: imp.color, borderRadius: 6, padding: "2px 8px", fontSize: ".65rem", fontWeight: 700, letterSpacing: .5 }}>{imp.tag}</span>
                  <span style={{ fontSize: ".72rem", color: "#e8edff", fontWeight: 600 }}>{imp.title}</span>
                </div>
                <p style={{ margin: 0, fontSize: ".72rem", color: "#7a85a8", lineHeight: 1.6 }}>{imp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Input Fields */}
        <div style={{ background: "#111827", border: "1px solid #1e2a45", borderRadius: 16, padding: "24px", marginBottom: 24 }}>
          <div style={{ fontSize: ".8rem", color: "#6c63ff", fontWeight: 700, letterSpacing: 1, marginBottom: 18 }}>
            ⚡ 填入你的資料，即時生成完整 Prompt
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: ".72rem", color: "#ff6b9d", fontWeight: 600, letterSpacing: .5, display: "block", marginBottom: 5 }}>★ 必填 — 產品/服務名稱</label>
              <input
                style={inputStyle}
                placeholder="例如：Handmade Ceramic Workshops、London Legal Consultancy"
                value={product}
                onChange={e => setProduct(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: ".72rem", color: "#7a85a8", fontWeight: 600, letterSpacing: .5, display: "block", marginBottom: 5 }}>◎ 選填 — 簡單簡介</label>
              <textarea
                style={{ ...inputStyle, minHeight: 72, resize: "vertical" }}
                placeholder="例如：We provide bespoke SEO consultancy for UK SMEs, specialising in local search and content strategy."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: ".72rem", color: "#7a85a8", fontWeight: 600, letterSpacing: .5, display: "block", marginBottom: 5 }}>◎ 選填 — 目標受眾</label>
              <input
                style={inputStyle}
                placeholder="例如：UK SMEs in London、British homeowners aged 30-55、Independent retailers across England"
                value={audience}
                onChange={e => setAudience(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Generated Prompt */}
        <div style={{ background: "#111827", border: "1px solid #1e2a45", borderRadius: 16, padding: "24px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: ".8rem", color: "#00d4ff", fontWeight: 700, letterSpacing: 1 }}>📋 生成的完整 Prompt（可直接 Paste 入 Claude / ChatGPT）</span>
            <button
              onClick={handleCopy}
              style={{
                background: copied ? "#00e5a0" : "linear-gradient(135deg,#6c63ff,#00d4ff)",
                border: "none", borderRadius: 8, padding: "8px 18px",
                color: "#fff", fontWeight: 700, fontSize: ".78rem", cursor: "pointer",
                transition: "all .2s", letterSpacing: .5,
              }}
            >
              {copied ? "✓ Copied!" : "Copy Prompt"}
            </button>
          </div>
          <pre style={{
            background: "#0d1526",
            border: "1px solid #1e2a45",
            borderRadius: 10,
            padding: "16px",
            fontSize: ".72rem",
            color: "#c5cde8",
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            maxHeight: 420,
            overflowY: "auto",
            margin: 0,
            fontFamily: "'Courier New', monospace",
          }}>
            {prompt}
          </pre>
        </div>

        {/* Tips */}
        <div style={{ background: "linear-gradient(135deg,#0d1526,#111827)", border: "1px solid #6c63ff33", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: ".72rem", color: "#6c63ff", fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>💡 使用貼士</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              "將 Prompt 貼入 Claude 3.5 Sonnet 或 ChatGPT-4o 效果最佳",
              "Node 2 Payload 可直接傳給下一個 Content Agent 節點",
              "GEO 部分生成嘅句子可直接用作網站 Meta Description",
              "VEO 標題建議可直接上傳至 YouTube，無需額外改寫",
            ].map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: ".75rem", color: "#7a85a8" }}>
                <span style={{ color: "#6c63ff", flexShrink: 0 }}>→</span>
                {tip}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
