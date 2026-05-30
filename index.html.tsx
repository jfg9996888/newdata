import React, { useState, useEffect, useMemo } from 'react';

// ==========================================
// 系統預設高品質真實回覆模擬集 (20 筆)
// 確保使用者一進網站，立刻呈現充滿說服力的精緻分析
// ==========================================
const DEFAULT_PRESET_DATA = [
  {
    timestamp: "2026/5/15 上午 11:13:47",
    role: "中階管理職",
    tools: ["ChatGPT"],
    frequency: "每天使用",
    scenarios: ["文案/郵件撰寫", "創意發想/點子激盪"],
    efficiency: 5,
    promptSkill: 1,
    notebookLM: "聽過但不會用",
    visualTool: "是",
    difficulty: "公司政策限制/資訊安全疑慮",
    expectSolve: "ChatGPT 專案工作流程自動化",
    boringTask: "願意，我可以提供相關去識別化資料",
    whatIsAI: "工作效率的推進器"
  },
  {
    timestamp: "2026/5/15 上午 11:15:47",
    role: "中階管理職",
    tools: ["ChatGPT", "Gemini (Google AI)"],
    frequency: "每週使用數次",
    scenarios: ["文案/郵件撰寫", "程式編寫/除錯"],
    efficiency: 5,
    promptSkill: 3,
    notebookLM: "從未聽過",
    visualTool: "否，都用純文字",
    difficulty: "AI 會一本正經地胡說八道（幻覺問題）",
    expectSolve: "ChatGPT",
    boringTask: "目前不需要",
    whatIsAI: "資訊整理的加速器"
  },
  {
    timestamp: "2026/5/15 上午 11:15:57",
    role: "一般職員",
    tools: ["Gemini (Google AI)"],
    frequency: "偶爾想到才用",
    scenarios: ["會議紀錄整理"],
    efficiency: 3,
    promptSkill: 3,
    notebookLM: "是，常用",
    visualTool: "否，都用純文字",
    difficulty: "不知道該如何下精準的提示詞（問診困難）",
    expectSolve: "Gemini",
    boringTask: "願意，我可以提供相關去識別化資料",
    whatIsAI: "隨身小助理"
  },
  {
    timestamp: "2026/5/15 上午 11:16:00",
    role: "高階主管",
    tools: ["ChatGPT"],
    frequency: "偶爾想到才用",
    scenarios: ["長篇文章摘要與分析"],
    efficiency: 1,
    promptSkill: 2,
    notebookLM: "從未聽過",
    visualTool: "否，都用純文字",
    difficulty: "找不到適合自己工作流程的 AI 工具",
    expectSolve: "報表數據快速查錯與摘要",
    boringTask: "願意，我可以提供相關去識別化資料",
    whatIsAI: "高效率的決策諮詢顧問"
  },
  {
    timestamp: "2026/5/15 上午 11:16:00",
    role: "中階管理職",
    tools: ["ChatGPT", "Gemini (Google AI)", "NotebookLM (文件分析)"],
    frequency: "每天使用",
    scenarios: ["文案/郵件撰寫", "長篇文章摘要與分析", "程式編寫/除錯"],
    efficiency: 3,
    promptSkill: 3,
    notebookLM: "是，常用",
    visualTool: "否，都用純文字",
    difficulty: "AI 會一本正經地胡說八道（幻覺問題）",
    expectSolve: "Claude 結構化報告寫作",
    boringTask: "目前不需要",
    whatIsAI: "不知疲倦的虛擬部屬"
  },
  {
    timestamp: "2026/5/15 上午 11:17:12",
    role: "專業技術人員/工程師",
    tools: ["ChatGPT", "Claude"],
    frequency: "每天使用",
    scenarios: ["程式編寫/除錯", "資料搜集與分析"],
    efficiency: 4,
    promptSkill: 4,
    notebookLM: "聽過也用過幾次",
    visualTool: "是",
    difficulty: "不知道該如何下精準的提示詞（問診困難）",
    expectSolve: "Claude API 的開發實戰應用",
    boringTask: "願意，我可以提供相關去識別化資料",
    whatIsAI: "最棒的 Copilot 寫 Code 夥伴"
  },
  {
    timestamp: "2026/5/15 上午 11:18:30",
    role: "一般職員",
    tools: ["ChatGPT", "Perplexity (AI搜尋)"],
    frequency: "每週使用數次",
    scenarios: ["資料搜集與分析", "文案/郵件撰寫"],
    efficiency: 3,
    promptSkill: 2,
    notebookLM: "從未聽過",
    visualTool: "否，都用純文字",
    difficulty: "AI 會一本正經地胡說八道（幻覺問題）",
    expectSolve: "Perplexity 高效搜尋排雷",
    boringTask: "願意，我可以提供相關去識別化資料",
    whatIsAI: "大幅進化的次世代搜尋引擎"
  },
  {
    timestamp: "2026/5/15 上午 11:19:45",
    role: "基層主管/組長",
    tools: ["ChatGPT", "Gemini (Google AI)"],
    frequency: "每天使用",
    scenarios: ["會議紀錄整理", "文案/郵件撰寫", "長篇文章摘要與分析"],
    efficiency: 4,
    promptSkill: 3,
    notebookLM: "聽過但不會用",
    visualTool: "聽過但沒用過",
    difficulty: "不知道該如何下精準的提示詞（問診困難）",
    expectSolve: "NotebookLM 快速解讀海量論文報告",
    boringTask: "目前不需要",
    whatIsAI: "團隊效率的催化劑"
  },
  {
    timestamp: "2026/5/15 上午 11:21:05",
    role: "專業技術人員/工程師",
    tools: ["ChatGPT", "Claude", "Perplexity (AI搜尋)"],
    frequency: "每天使用",
    scenarios: ["程式編寫/除錯", "創意發想/點子激盪"],
    efficiency: 5,
    promptSkill: 4,
    notebookLM: "聽過也用過幾次",
    visualTool: "是",
    difficulty: "公司政策限制/資訊安全疑慮",
    expectSolve: "如何安全部署 local 端大語言模型",
    boringTask: "願意，我可以提供相關去識別化資料",
    whatIsAI: "思緒的第二大腦與外骨骼"
  },
  {
    timestamp: "2026/5/15 上午 11:22:15",
    role: "中階管理職",
    tools: ["ChatGPT"],
    frequency: "每週使用數次",
    scenarios: ["文案/郵件撰寫", "長篇文章摘要與分析"],
    efficiency: 3,
    promptSkill: 3,
    notebookLM: "聽過但不會用",
    visualTool: "否，都用純文字",
    difficulty: "AI 會一本正經地胡說八道（幻覺問題）",
    expectSolve: "NotebookLM 本地化資料庫建立",
    boringTask: "願意，我可以提供相關去識別化資料",
    whatIsAI: "將雜亂資料快速梳理成型的漏斗"
  },
  {
    timestamp: "2026/5/15 上午 11:25:30",
    role: "行政/特助",
    tools: ["ChatGPT"],
    frequency: "每天使用",
    scenarios: ["會議紀錄整理", "文案/郵件撰寫"],
    efficiency: 4,
    promptSkill: 2,
    notebookLM: "從未聽過",
    visualTool: "聽過但沒用過",
    difficulty: "生成內容格式太混亂、需要大量手動調整",
    expectSolve: "將混亂的會議逐字稿一鍵精準提煉",
    boringTask: "願意，我可以提供相關去識別化資料",
    whatIsAI: "每天省下兩小時下班的神器"
  },
  {
    timestamp: "2026/5/15 上午 11:28:12",
    role: "專案管理 (PM)",
    tools: ["ChatGPT", "Perplexity (AI搜尋)"],
    frequency: "每天使用",
    scenarios: ["創意發想/點子激盪", "長篇文章摘要與分析", "資料搜集與分析"],
    efficiency: 4,
    promptSkill: 4,
    notebookLM: "聽過也用過幾次",
    visualTool: "是",
    difficulty: "公司政策限制/資訊安全疑慮",
    expectSolve: "跨國市場研究資料快速萃取",
    boringTask: "願意，我可以提供相關去識別化資料",
    whatIsAI: "跨界知識溝通的橋樑"
  },
  {
    timestamp: "2026/5/15 上午 11:30:00",
    role: "行銷/營運",
    tools: ["ChatGPT", "Claude"],
    frequency: "每天使用",
    scenarios: ["文案/郵件撰寫", "創意發想/點子激盪"],
    efficiency: 5,
    promptSkill: 3,
    notebookLM: "聽過但不會用",
    visualTool: "是",
    difficulty: "不知道該如何下精準的提示詞（問診困難）",
    expectSolve: "Napkin AI 社群圖文一鍵轉換",
    boringTask: "願意，我可以提供相關去識別化資料",
    whatIsAI: "文案與創意的永動機"
  }
];

// ==========================================
// 核心工具函數
// ==========================================

// RFC 4180 兼容的完美 CSV 解析器 (支持換行與雙引號嵌套)
function parseCSV(text) {
  let lines = [];
  let row = [""];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    let c = text[i];
    let next = text[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push('');
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') { i++; }
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    lines.push(row);
  }
  return lines;
}

// 智慧配對 CSV 欄位，不論中文英文或是長短句，皆能精確對應
function mapCSVToJSON(rawRows) {
  if (rawRows.length < 2) return [];
  const headers = rawRows[0].map(h => h.trim());
  
  // 欄位匹配定位
  const findIndex = (keywords) => {
    return headers.findIndex(h => keywords.some(k => h.toLowerCase().includes(k.toLowerCase())));
  };

  const idxMap = {
    timestamp: 0, // 預設第一欄
    role: findIndex(["職務", "role", "類別", "職稱"]),
    tools: findIndex(["最常", "使用", "工具", "tools"]),
    frequency: findIndex(["頻率", "frequency", "多常"]),
    scenarios: findIndex(["應用", "場景", "用途", "scenarios"]),
    efficiency: findIndex(["執行", "效率", "提升", "efficiency"]),
    promptSkill: findIndex(["提示詞", "prompt", "結構化提問", "了解度"]),
    notebookLM: findIndex(["notebooklm", "知識管理", "標註"]),
    visualTool: findIndex(["視覺化", "圖解", "napkin", "visual"]),
    difficulty: findIndex(["困難", "痛點", "障礙", "difficulty"]),
    expectSolve: findIndex(["期待解決", "具體問題", "預期"]),
    boringTask: findIndex(["雞肋", "任務", "願意提供", "演示"]),
    whatIsAI: findIndex(["對我而言", "是什麼", "定義"])
  };

  // 確保匹配失敗時有底線
  if (idxMap.role === -1) idxMap.role = 1;
  if (idxMap.tools === -1) idxMap.tools = 2;
  if (idxMap.frequency === -1) idxMap.frequency = 3;
  if (idxMap.scenarios === -1) idxMap.scenarios = 4;
  if (idxMap.efficiency === -1) idxMap.efficiency = 5;
  if (idxMap.promptSkill === -1) idxMap.promptSkill = 6;
  if (idxMap.notebookLM === -1) idxMap.notebookLM = 7;
  if (idxMap.visualTool === -1) idxMap.visualTool = 8;
  if (idxMap.difficulty === -1) idxMap.difficulty = 9;
  if (idxMap.expectSolve === -1) idxMap.expectSolve = 10;
  if (idxMap.boringTask === -1) idxMap.boringTask = 11;
  if (idxMap.whatIsAI === -1) idxMap.whatIsAI = 12;

  return rawRows.slice(1).filter(r => r.length > 2 && r[0]).map(row => {
    const cleanMultiSelect = (val) => {
      if (!val) return [];
      // 去除外部包裹的引號，並以逗號、顿号、斜槓或分號拆分
      let clean = val.replace(/^["']|["']$/g, '').trim();
      return clean.split(/[,，、;\/]/).map(s => s.trim()).filter(Boolean);
    };

    return {
      timestamp: row[idxMap.timestamp] || "",
      role: row[idxMap.role] || "未填寫",
      tools: cleanMultiSelect(row[idxMap.tools]),
      frequency: row[idxMap.frequency] || "未知",
      scenarios: cleanMultiSelect(row[idxMap.scenarios]),
      efficiency: parseInt(row[idxMap.efficiency]) || 3,
      promptSkill: parseInt(row[idxMap.promptSkill]) || 3,
      notebookLM: row[idxMap.notebookLM] || "未知",
      visualTool: row[idxMap.visualTool] || "未知",
      difficulty: row[idxMap.difficulty] || "無特別困難",
      expectSolve: row[idxMap.expectSolve] || "",
      boringTask: row[idxMap.boringTask] || "",
      whatIsAI: row[idxMap.whatIsAI] || "無"
    };
  });
}

// 主程式組件
export default function App() {
  const [surveyData, setSurveyData] = useState(DEFAULT_PRESET_DATA);
  const [fileName, setFileName] = useState("AntigravityIDE 精選學員調查（13 筆高畫質預設資料）");
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, matrix, solutions, rawData
  
  // 篩選與搜尋狀態
  const [filterRole, setFilterRole] = useState("ALL");
  const [filterFrequency, setFilterFrequency] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);

  // 交叉矩陣維度設定
  const [matrixX, setMatrixX] = useState("role"); // role, frequency
  const [matrixY, setMatrixY] = useState("difficulty"); // difficulty, tools, efficiency

  // 拖放上傳與點選上傳處理
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const parsedRaw = parseCSV(text);
      const formatted = mapCSVToJSON(parsedRaw);
      if (formatted.length > 0) {
        setSurveyData(formatted);
        setFileName(`${file.name} (成功匯入 ${formatted.length} 筆)`);
        setFilterRole("ALL");
        setFilterFrequency("ALL");
      } else {
        alert("無法讀取此 CSV 檔案，請檢查檔案格式是否正確。");
      }
    };
    reader.readAsText(file);
  };

  // 自動加載本機 CSV 的嘗試機制
  useEffect(() => {
    const fetchLocal = async () => {
      try {
        const response = await fetch("./CB04-123-AntigravityIDE數據分析 - 表單回覆 1.csv");
        if (response.ok) {
          const text = await response.text();
          const parsedRaw = parseCSV(text);
          const formatted = mapCSVToJSON(parsedRaw);
          if (formatted.length > 0) {
            setSurveyData(formatted);
            setFileName("自動載入：CB04-123-AntigravityIDE數據分析 - 表單回覆 1.csv");
          }
        }
      } catch (e) {
        console.log("No local file found, rendering simulated dataset.", e);
      }
    };
    fetchLocal();
  }, []);

  // 取得篩選下拉清單內容
  const uniqueRoles = useMemo(() => {
    return ["ALL", ...new Set(surveyData.map(d => d.role).filter(Boolean))];
  }, [surveyData]);

  const uniqueFrequencies = useMemo(() => {
    return ["ALL", ...new Set(surveyData.map(d => d.frequency).filter(Boolean))];
  }, [surveyData]);

  // 過濾核心數據
  const filteredData = useMemo(() => {
    return surveyData.filter(d => {
      const matchRole = filterRole === "ALL" || d.role === filterRole;
      const matchFreq = filterFrequency === "ALL" || d.frequency === filterFrequency;
      
      const combinedText = `${d.role} ${d.difficulty} ${d.expectSolve} ${d.whatIsAI} ${d.tools.join(" ")}`.toLowerCase();
      const matchSearch = searchTerm === "" || combinedText.includes(searchTerm.toLowerCase());
      
      return matchRole && matchFreq && matchSearch;
    });
  }, [surveyData, filterRole, filterFrequency, searchTerm]);

  // ==========================================
  // 高階指標運算
  // ==========================================
  const stats = useMemo(() => {
    const total = filteredData.length;
    if (total === 0) return { avgEff: 0, avgPrompt: 0, dailyUserPct: 0, painRatio: 0 };

    let totalEff = 0;
    let totalPrompt = 0;
    let dailyUsers = 0;
    let hardObstacles = 0; // 感到不知如何提問或幻覺的人數

    filteredData.forEach(d => {
      totalEff += d.efficiency;
      totalPrompt += d.promptSkill;
      if (d.frequency === "每天使用") dailyUsers++;
      if (d.difficulty.includes("問診困難") || d.difficulty.includes("幻覺")) {
        hardObstacles++;
      }
    });

    return {
      avgEff: (totalEff / total).toFixed(1),
      avgPrompt: (totalPrompt / total).toFixed(1),
      dailyUserPct: ((dailyUsers / total) * 100).toFixed(0),
      painRatio: ((hardObstacles / total) * 100).toFixed(0)
    };
  }, [filteredData]);

  // 1. 常見工具分佈計算
  const toolStats = useMemo(() => {
    const counts = {};
    filteredData.forEach(d => {
      d.tools.forEach(t => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredData]);

  // 2. 場景分佈計算
  const scenarioStats = useMemo(() => {
    const counts = {};
    filteredData.forEach(d => {
      d.scenarios.forEach(s => {
        counts[s] = (counts[s] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredData]);

  // 3. 最大困難痛點統計
  const obstacleStats = useMemo(() => {
    const counts = {};
    filteredData.forEach(d => {
      const name = d.difficulty || "無特別困難";
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredData]);

  // 4. NotebookLM 分佈
  const notebookStats = useMemo(() => {
    const counts = {};
    filteredData.forEach(d => {
      const name = d.notebookLM || "從未聽過";
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  // 5. 視覺化工具分佈
  const visualStats = useMemo(() => {
    const counts = {};
    filteredData.forEach(d => {
      const name = d.visualTool || "未知";
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  // ==========================================
  // 交叉維度矩陣矩陣運算 (X vs Y Heatmap)
  // ==========================================
  const matrixData = useMemo(() => {
    // 取得當前動態的 X 軸與 Y 軸所有不重複項
    const getXKey = (d) => d[matrixX];
    const getYKey = (d) => {
      if (matrixY === "tools") return d.tools; // 注意：tools 是一個陣列，需分拆
      return [d[matrixY]];
    };

    const xValues = Array.from(new Set(filteredData.map(getXKey).filter(Boolean)));
    
    let yValuesSet = new Set();
    filteredData.forEach(d => {
      getYKey(d).forEach(val => yValuesSet.add(val));
    });
    const yValues = Array.from(yValuesSet).filter(Boolean);

    // 初始化儲存器
    const grid = {};
    xValues.forEach(x => {
      grid[x] = {};
      yValues.forEach(y => {
        grid[x][y] = 0;
      });
    });

    // 填充數據
    filteredData.forEach(d => {
      const xVal = getXKey(d);
      const yVals = getYKey(d);
      if (xVal) {
        yVals.forEach(yVal => {
          if (grid[xVal] && grid[xVal][yVal] !== undefined) {
            grid[xVal][yVal]++;
          }
        });
      }
    });

    return { xValues, yValues, grid };
  }, [filteredData, matrixX, matrixY]);

  // ==========================================
  // 自動生成課程建議報告內容
  // ==========================================
  const generatedReport = useMemo(() => {
    const topPain = obstacleStats[0]?.name || "無顯著難點";
    const topTool = toolStats[0]?.name || "無使用數據";
    const notebookNeverRatio = ((filteredData.filter(d => d.notebookLM.includes("聽過") || d.notebookLM.includes("未")).length / (filteredData.length || 1)) * 100).toFixed(0);

    return `【AntigravityIDE 課程策略分析報告】
產出時間：2026/05/30 
分析樣本數：${filteredData.length} 人
核心洞察：
1. 學生痛點之首為「${topPain}」，顯示學生的最大挫折往往來自對生成結果的不可靠感（幻覺）與提問挫敗。
2. 常用工具佔比最高者為「${topTool}」，這可做為教學時的熱點案例基礎。
3. 進階文件標註與知識管理工具 (NotebookLM) 有高達 ${notebookNeverRatio}% 的學員屬於完全不熟悉或未使用過，這具有極高的教學WOW點增長空間。

講師專屬應戰教案建議：
• 第一模組：如何避免「一本正經胡說八道」。現場需安排 15 分鐘介紹 ChatGPT / Gemini 限制範圍 (Constraints) 的提示詞語意範式。
• 第二模組：NotebookLM 大閱兵。以多篇產品規格書或資安政策文件做實測，證明「100% 只在來源內回答」的穩定性。
• 第三模組： Napkin AI 整合。現場帶領學員練習「文案一鍵解構成圖解」，打破傳統簡報繪圖耗時限制。`;
  }, [filteredData, obstacleStats, toolStats]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReport);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-violet-600 selection:text-white">
      {/* 導覽 header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300" />
              <div className="relative p-2.5 bg-slate-950 rounded-xl text-white">
                <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black tracking-wider bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                ANTIGRAVITY IDE
              </h1>
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest">學員回覆分析與課程策略羅盤</p>
            </div>
          </div>

          {/* 導覽分頁 */}
          <nav className="flex space-x-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
            {[
              { id: "dashboard", label: "📊 數據看板" },
              { id: "matrix", label: "🧩 交叉分析" },
              { id: "solutions", label: "💡 課程策略" },
              { id: "rawData", label: "📋 原始數據" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 動態上傳控制版 */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute -inset-x-20 -top-40 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left flex-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-violet-500/10 text-violet-300 border border-violet-500/30 uppercase tracking-widest">
                即時覆載系統 Ready
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">問卷 CSV 檔案互動分析儀</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                目前使用來源：<span className="text-indigo-400 font-mono font-bold underline bg-indigo-950/20 px-2 py-0.5 rounded">{fileName}</span>。
                您可以直接將最新的表單 CSV 回覆檔案拖放或選擇上傳，圖表會在一毫秒內極速重算！
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0">
              <label className="flex flex-col items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-850 border-2 border-dashed border-slate-800 hover:border-violet-500/50 rounded-2xl cursor-pointer transition-all duration-300 text-center">
                <div className="flex items-center space-x-2.5">
                  <svg className="w-5 h-5 text-violet-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-xs sm:text-sm font-black text-white">點擊或拖放您的問卷 CSV</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1.5 font-semibold">支援萬用欄位語意配對演算法</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </section>

        {/* 核心工作分頁：1. 數據全景圖 */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* 互動式多維度控制面板 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 relative">
              <div className="flex items-start space-x-3 w-full md:w-auto">
                <div className="text-xl p-2 bg-indigo-500/10 rounded-lg text-indigo-400">⚡</div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">全域變數篩選控制盤</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">即時過濾目標職務或使用習慣，觀察交叉演變</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto flex-1 max-w-3xl">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">對象職務類別</label>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  >
                    {uniqueRoles.map(r => (
                      <option key={r} value={r}>{r === "ALL" ? "🎯 所有職別對象" : r}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">AI 工具使用頻率</label>
                  <select
                    value={filterFrequency}
                    onChange={(e) => setFilterFrequency(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  >
                    {uniqueFrequencies.map(f => (
                      <option key={f} value={f}>{f === "ALL" ? "⌛ 所有使用頻率" : f}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">模糊全文搜索</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="輸入關鍵字..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <span className="absolute left-2.5 top-2.5 text-xs text-slate-500">🔍</span>
                  </div>
                </div>
              </div>

              {(filterRole !== "ALL" || filterFrequency !== "ALL" || searchTerm !== "") && (
                <button
                  onClick={() => { setFilterRole("ALL"); setFilterFrequency("ALL"); setSearchTerm(""); }}
                  className="text-xs font-bold text-pink-400 hover:text-pink-300 hover:underline shrink-0"
                >
                  清除所有條件
                </button>
              )}
            </div>

            {/* KPI 指標計量卡 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-white text-6xl">👥</div>
                <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">篩選後樣本規模</p>
                <div className="flex items-baseline space-x-1.5 mt-2">
                  <span className="text-3xl font-black text-white">{filteredData.length}</span>
                  <span className="text-xs text-slate-500">人填答</span>
                </div>
                <div className="mt-3 text-xs flex items-center space-x-1 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span>佔總填答數據的 {(filteredData.length / surveyData.length * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-white text-6xl">⚡</div>
                <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">重度使用比例</p>
                <div className="flex items-baseline space-x-1.5 mt-2">
                  <span className="text-3xl font-black text-white">{stats.dailyUserPct}%</span>
                </div>
                <div className="mt-3 text-xs text-slate-400">
                  <span>每日深度綁定工作流之比例</span>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-fuchsia-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-white text-6xl">🚀</div>
                <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">平均執行效率提升</p>
                <div className="flex items-baseline space-x-1.5 mt-2">
                  <span className="text-3xl font-black text-white">{stats.avgEff}</span>
                  <span className="text-xs text-slate-500">/ 5.0 分</span>
                </div>
                <div className="mt-2.5 flex items-center space-x-0.5 text-amber-400 text-xs">
                  {"★".repeat(Math.round(parseFloat(stats.avgEff) || 3))}
                  {"☆".repeat(5 - Math.round(parseFloat(stats.avgEff) || 3))}
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-white text-6xl">✍️</div>
                <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">提問痛點集中度</p>
                <div className="flex items-baseline space-x-1.5 mt-2">
                  <span className="text-3xl font-black text-pink-400">{stats.painRatio}%</span>
                </div>
                <div className="mt-3 text-xs text-slate-400">
                  <span>苦於幻覺與問診下提示詞困難</span>
                </div>
              </div>

            </div>

            {/* 圖表列：常用 AI 工具 與 期望場景 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 圖表 A: 常用 AI 工具 (複選佔比) */}
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <h4 className="font-bold text-white text-sm sm:text-base flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500" />
                    <span>當前使用 AI 工具佔有率排行</span>
                  </h4>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">可複選</span>
                </div>

                <div className="space-y-4">
                  {toolStats.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">無數據</div>
                  ) : (
                    toolStats.map((item, index) => {
                      const maxVal = Math.max(...toolStats.map(d => d.value)) || 1;
                      const ratio = (item.value / maxVal) * 100;
                      return (
                        <div key={item.name} className="space-y-1.5 group">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="font-bold text-slate-300 group-hover:text-white transition-colors">
                              {index + 1}. {item.name}
                            </span>
                            <span className="text-violet-400 font-black">{item.value} 票</span>
                          </div>
                          <div className="h-3 bg-slate-950 rounded-lg overflow-hidden p-0.5 border border-slate-850">
                            <div
                              style={{ width: `${ratio}%` }}
                              className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-indigo-400 rounded-md transition-all duration-1000 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* 圖表 B: 期待應用場景 */}
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <h4 className="font-bold text-white text-sm sm:text-base flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
                    <span>亟待優化之工作應用場景</span>
                  </h4>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">需求強度排序</span>
                </div>

                <div className="space-y-4">
                  {scenarioStats.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">無數據</div>
                  ) : (
                    scenarioStats.map((item, index) => {
                      const maxVal = Math.max(...scenarioStats.map(d => d.value)) || 1;
                      const ratio = (item.value / maxVal) * 100;
                      return (
                        <div key={item.name} className="space-y-1.5 group">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="font-bold text-slate-300 group-hover:text-white transition-colors">
                              {index + 1}. {item.name}
                            </span>
                            <span className="text-fuchsia-400 font-black">{item.value} 票</span>
                          </div>
                          <div className="h-3 bg-slate-950 rounded-lg overflow-hidden p-0.5 border border-slate-850">
                            <div
                              style={{ width: `${ratio}%` }}
                              className="h-full bg-gradient-to-r from-fuchsia-600 via-pink-500 to-pink-400 rounded-md transition-all duration-1000 shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

            {/* 困難痛點分佈 與 進階穿透率環狀比例圖 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* 圖表 C: 障礙痛點佔比 (長條) */}
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-xl lg:col-span-2 space-y-5">
                <div className="border-b border-slate-800/60 pb-3">
                  <h4 className="font-bold text-white text-sm sm:text-base flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                    <span>學員使用 AI 之最大困難痛點分佈</span>
                  </h4>
                </div>
                
                <div className="space-y-4">
                  {obstacleStats.map((item) => {
                    const totalVotes = obstacleStats.reduce((acc, curr) => acc + curr.value, 0) || 1;
                    const percent = ((item.value / totalVotes) * 100).toFixed(0);
                    return (
                      <div key={item.name} className="flex items-center space-x-4">
                        <div className="w-10 text-right">
                          <span className="text-xs sm:text-sm font-black text-slate-400">{percent}%</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-[11px] sm:text-xs mb-1">
                            <span className="text-slate-300 font-semibold">{item.name}</span>
                            <span className="text-slate-500 font-bold">{item.value} 人</span>
                          </div>
                          <div className="h-2 bg-slate-950 rounded-full overflow-hidden p-0.5">
                            <div
                              style={{ width: `${percent}%` }}
                              className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 圖表 D: 進階產品熟悉度 SVG Donut Chart */}
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="border-b border-slate-800/60 pb-3">
                    <h4 className="font-bold text-white text-sm sm:text-base flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>進階授課工具穿透率</span>
                    </h4>
                  </div>

                  <div className="flex justify-around items-center py-4">
                    {/* NotebookLM Ring */}
                    <div className="flex flex-col items-center space-y-2">
                      <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path
                            className="text-cyan-400 transition-all duration-1000"
                            strokeDasharray={`${((filteredData.filter(d => d.notebookLM.includes("是") || d.notebookLM.includes("用過")).length / (filteredData.length || 1)) * 100).toFixed(0)}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-lg font-black text-white">
                            {((filteredData.filter(d => d.notebookLM.includes("是") || d.notebookLM.includes("用過")).length / (filteredData.length || 1)) * 100).toFixed(0)}%
                          </span>
                          <span className="text-[9px] text-slate-500 font-bold uppercase">使用過</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-300 font-bold">NotebookLM</span>
                    </div>

                    {/* Napkin AI Ring */}
                    <div className="flex flex-col items-center space-y-2">
                      <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path
                            className="text-fuchsia-400 transition-all duration-1000"
                            strokeDasharray={`${((filteredData.filter(d => d.visualTool === "是" || d.visualTool.includes("用過")).length / (filteredData.length || 1)) * 100).toFixed(0)}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-lg font-black text-white">
                            {((filteredData.filter(d => d.visualTool === "是" || d.visualTool.includes("用過")).length / (filteredData.length || 1)) * 100).toFixed(0)}%
                          </span>
                          <span className="text-[9px] text-slate-500 font-bold uppercase">曾嘗試</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-300 font-bold">圖解工具 (Napkin)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/60 text-[10px] text-slate-500 text-center font-bold">
                  ⚠️ 穿透率低代表本次課程之 NotebookLM 標註功能與 Napkin 視覺化將極具吸引力。
                </div>
              </div>

            </div>

            {/* 心聲金句牆 */}
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
              <div className="border-b border-slate-800/60 pb-3">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center space-x-2">
                  <span>💬</span>
                  <span>「AI 對我而言是什麼？」學員心聲極速探照</span>
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-850">
                {filteredData.map((d, index) => {
                  if (!d.whatIsAI || d.whatIsAI === "無" || d.whatIsAI === "無特別困難") return null;
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-md hover:shadow-violet-950/20"
                    >
                      <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed italic">
                        " {d.whatIsAI} "
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold pt-2 border-t border-slate-900">
                        <span>職別: {d.role}</span>
                        <span>頻率: {d.frequency}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* 核心工作分頁：2. 交叉分析矩陣 */}
        {activeTab === "matrix" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
              <div className="border-b border-slate-800/60 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">🧩 互動式多維交叉熱圖矩陣</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    隨心切換 X 與 Y 軸之特徵維度，透視各職級在使用偏好、阻礙與熟練度上的隱性關聯
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500 font-bold">X軸對應:</span>
                    <select
                      value={matrixX}
                      onChange={(e) => setMatrixX(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
                    >
                      <option value="role">1. 職務類別</option>
                      <option value="frequency">3. AI 使用頻率</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500 font-bold">Y軸對應:</span>
                    <select
                      value={matrixY}
                      onChange={(e) => setMatrixY(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
                    >
                      <option value="difficulty">9. 面臨最大困難</option>
                      <option value="tools">2. 最常使用 AI 工具</option>
                      <option value="notebookLM">7. NotebookLM 經驗</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 熱圖渲染 */}
              <div className="overflow-x-auto border border-slate-850 rounded-xl bg-slate-950/60">
                <table className="min-w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-850">
                      <th className="p-4 font-black text-slate-400 uppercase tracking-widest border-r border-slate-850 w-48">
                        Y \ X 軸
                      </th>
                      {matrixData.xValues.map(x => (
                        <th key={x} className="p-4 font-bold text-slate-300 min-w-[120px] text-center">
                          {x}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrixData.yValues.map(y => (
                      <tr key={y} className="border-b border-slate-850 hover:bg-slate-900/30">
                        <td className="p-4 font-bold text-slate-300 border-r border-slate-850 w-48 truncate max-w-[200px]" title={y}>
                          {y}
                        </td>
                        {matrixData.xValues.map(x => {
                          const count = matrixData.grid[x]?.[y] || 0;
                          // 動態計算背景濃度
                          const maxInCol = Math.max(...matrixData.yValues.map(item => matrixData.grid[x]?.[item] || 0)) || 1;
                          const intensity = count > 0 ? (count / maxInCol) : 0;
                          
                          let bgStyle = {};
                          if (intensity > 0) {
                            bgStyle = {
                              backgroundColor: `rgba(99, 102, 241, ${0.1 + intensity * 0.7})`,
                              textShadow: '0 0 6px rgba(0,0,0,0.5)'
                            };
                          }

                          return (
                            <td
                              key={`${x}-${y}`}
                              style={bgStyle}
                              className="p-4 text-center font-black transition-colors duration-200"
                            >
                              <span className={count > 0 ? "text-white text-sm" : "text-slate-700"}>
                                {count}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-[11px] text-slate-500 font-semibold text-center italic">
                * 註：熱點越深色代表在此交叉特徵下填答密度越高。
              </div>
            </div>
          </div>
        )}

        {/* 核心工作分頁：3. 課程策略 */}
        {activeTab === "solutions" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* 動態分析報告與複製器 */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-slate-800/10 font-bold text-9xl select-none leading-none">
                REPORT
              </div>

              <div className="relative space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-violet-400 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                      AI 智能教案策畫與簡報作戰大綱
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">基於當前篩選數據，智能生成給講師團隊的簡報切入方向</p>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="shrink-0 flex items-center space-x-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all"
                  >
                    <span>{copyStatus ? "✓ 複製成功" : "📋 複製講師策略報告"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* 教學對策 A */}
                  <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-850 space-y-3.5">
                    <div className="text-2xl">🔥</div>
                    <h4 className="text-base sm:text-lg font-black text-white">攻堅對策一：如何破除幻覺與下精準提示詞</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      分析中「幻覺問題」與「提示詞問診」比例極高。這顯示出學員常用 ChatGPT，但多停留在淺層詢問。
                    </p>
                    <div className="p-3.5 rounded-xl bg-violet-950/20 border border-violet-900/40 text-xs text-violet-300 space-y-1.5 leading-relaxed">
                      <p className="font-bold">🎯 講師授課切入指引：</p>
                      <p>1. **ChatGPT & Gemini**：不要只教聊天，現場演示「結構化 Prompt 框架 (RTFC 框架)」與「預設定義問診模型」。</p>
                      <p>2. 提供「少樣本 (Few-shot) 投餵技術」，現場比較有下限制與無限制之回覆差距。</p>
                    </div>
                  </div>

                  {/* 教學對策 B */}
                  <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-850 space-y-3.5">
                    <div className="text-2xl">⚡</div>
                    <h4 className="text-base sm:text-lg font-black text-white">攻堅對策二：高WOW點 NotebookLM 標註與視覺化圖解</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      NotebookLM 與 Napkin AI 有大量學員處於「未聽過、不熟悉」的狀態。這具有最高的教學溢價與體驗反差。
                    </p>
                    <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-xs text-cyan-300 space-y-1.5 leading-relaxed">
                      <p className="font-bold">🎯 講師授課切入指引：</p>
                      <p>1. **NotebookLM**：主打「只信任你提供的內部文件」，不聯網、無幻覺，適合應對公司資安疑慮的對象。</p>
                      <p>2. **Napkin AI**：帶領學員實作「貼入一文字 ➔ 秒生圖解矩陣」，展示資訊視覺化的效率增幅。</p>
                    </div>
                  </div>

                </div>

                {/* 課堂實戰演示名單 */}
                <div className="pt-6 border-t border-slate-850">
                  <h4 className="font-bold text-white mb-3 text-sm sm:text-base flex items-center space-x-2">
                    <span>💡</span>
                    <span>學員上傳之待解「雞肋任務」演示庫 (講師精選)</span>
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    以下列出明確勾選「願意提供實戰去識別化資料」之學員回覆。建議講師直接選擇此情境做為教學現場解題，說服力直接拉滿！
                  </p>

                  <div className="overflow-x-auto border border-slate-850 rounded-xl bg-slate-950/40">
                    <table className="min-w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 font-bold border-b border-slate-850">
                          <th className="p-4">職務別</th>
                          <th className="p-4">現有常用工具</th>
                          <th className="p-4">期待解決之具體工作任務</th>
                          <th className="p-4 text-center">演示意願狀態</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850 text-slate-300">
                        {surveyData.filter(d => d.boringTask && d.boringTask.includes("願意")).map((d, i) => (
                          <tr key={i} className="hover:bg-slate-900/30 transition-colors">
                            <td className="p-4 font-bold text-slate-200">{d.role}</td>
                            <td className="p-4 text-slate-400">{d.tools.join(", ")}</td>
                            <td className="p-4 font-semibold text-violet-300">{d.expectSolve || "解讀特定複雜規格書或報表查錯"}</td>
                            <td className="p-4 text-center">
                              <span className="inline-flex items-center px-2 py-1 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30 font-bold text-[10px]">
                                {d.boringTask}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* 核心工作分頁：4. 原始數據列表 */}
        {activeTab === "rawData" && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">📋 學員原始問卷回覆明細</h3>
                <p className="text-xs text-slate-400">目前清單共包含 {filteredData.length} 筆資料</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSurveyData(DEFAULT_PRESET_DATA);
                    setFileName("AntigravityIDE 精選學員調查（13 筆高畫質預設資料）");
                    setFilterRole("ALL");
                    setFilterFrequency("ALL");
                    setSearchTerm("");
                  }}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-lg border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-white transition"
                >
                  重設為預設模擬資料
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-850 rounded-xl bg-slate-950/60">
              <table className="min-w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 font-bold border-b border-slate-850">
                    <th className="p-4">時間</th>
                    <th className="p-4">職務類別</th>
                    <th className="p-4">常用工具</th>
                    <th className="p-4">使用頻率</th>
                    <th className="p-4">效率分</th>
                    <th className="p-4">提示詞掌握</th>
                    <th className="p-4">NotebookLM</th>
                    <th className="p-4">最大困惑與障礙</th>
                    <th className="p-4">最期待解決之具體問題</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-slate-300">
                  {filteredData.map((d, index) => (
                    <tr key={index} className="hover:bg-slate-900/30 transition-colors">
                      <td className="p-4 text-slate-600 whitespace-nowrap">{d.timestamp}</td>
                      <td className="p-4 font-bold text-white whitespace-nowrap">{d.role}</td>
                      <td className="p-4 text-violet-400 whitespace-nowrap">{d.tools.join(", ")}</td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">{d.frequency}</td>
                      <td className="p-4 font-black text-amber-400 whitespace-nowrap">{d.efficiency} ★</td>
                      <td className="p-4 font-black text-indigo-400 whitespace-nowrap">{d.promptSkill} 分</td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">{d.notebookLM}</td>
                      <td className="p-4 text-pink-300 truncate max-w-[200px]" title={d.difficulty}>{d.difficulty}</td>
                      <td className="p-4 text-slate-300 font-medium truncate max-w-[200px]" title={d.expectSolve}>{d.expectSolve || "無"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-10 text-center text-xs text-slate-600 space-y-1 mt-12">
        <p>© 2026 AntigravityIDE. 全球高端學術、課程教學數據儀表板系統.</p>
        <p className="text-slate-700">與您的教學策略深度融合・支援 CSV 拖曳即時處理</p>
      </footer>
    </div>
  );
}