/* assets/js/modules-data.js - Module Configuration & Content Data */
window.FinanceModulesData = [
  {
    id: 1,
    title: "Module 1: Financial Accounting",
    badge: "Foundation",
    desc: "Financial statements communicate the financial health and operational performance of an organization to internal and external stakeholders.",
    submodules: [
      {
        id: "1-1",
        number: "1.1",
        title: "Submodule 1.1: Income Statement",
        desc: "Understand revenue recognition, COGS, operating expenses, and net profit margins.",
        readTime: "5 mins"
      },
      {
        id: "1-2",
        number: "1.2",
        title: "Submodule 1.2: Balance Sheet",
        desc: "Explore current assets, fixed assets, debt obligations, and shareholders' equity.",
        readTime: "6 mins"
      },
      {
        id: "1-3",
        number: "1.3",
        title: "Submodule 1.3: Cash Flow Statement",
        desc: "Analyze operating, investing, and financing cash flows and cash reconciliation.",
        readTime: "6 mins"
      },
      {
        id: "1-4",
        number: "1.4",
        title: "Submodule 1.4: Linked 3 Statements",
        desc: "Understand how the three statements connect dynamically. Includes Module 1 Crossword Minigame required to unlock Module 2.",
        readTime: "10 mins",
        isMinigame: true,
        gameUrl: "submodule-1-game.html"
      }
    ]
  },
  {
    id: 2,
    title: "Module 2: Corporate Finance",
    badge: "Core Theory",
    desc: "Master capital allocation, risk-return trade-offs, corporate capital structures, and working capital optimization.",
    submodules: [
      {
        id: "2-1",
        number: "2.1",
        title: "Submodule 2.1: Time Value of Money",
        desc: "Master Present Value (PV), Future Value (FV), discounting, and compounding math.",
        readTime: "6 mins"
      },
      {
        id: "2-2",
        number: "2.2",
        title: "Submodule 2.2: Risk and Return",
        desc: "Evaluate portfolio risk, standard deviation, beta, and expected return principles.",
        readTime: "7 mins"
      },
      {
        id: "2-3",
        number: "2.3",
        title: "Submodule 2.3: Capital Budgeting",
        desc: "Assess capital investments using Net Present Value (NPV) and Internal Rate of Return (IRR).",
        readTime: "7 mins"
      },
      {
        id: "2-4",
        number: "2.4",
        title: "Submodule 2.4: Capital Structure",
        desc: "Understand debt vs equity financing, cost of capital, and optimal debt ratios.",
        readTime: "6 mins"
      },
      {
        id: "2-5",
        number: "2.5",
        title: "Submodule 2.5: Working Capital Management",
        desc: "Optimize liquidity, inventory turns, receivables, and payables cycles. Includes Type Racer Minigame required to unlock Module 3.",
        readTime: "10 mins",
        isMinigame: true,
        gameUrl: "submodule-2-game.html"
      }
    ]
  },
  {
    id: 3,
    title: "Module 3: DCF Valuation",
    badge: "Advanced",
    desc: "Build valuation models to project cash flows, determine discount rates, estimate terminal values, and perform sensitivity analysis.",
    submodules: [
      {
        id: "3-1",
        number: "3.1",
        title: "Submodule 3.1: Free Cash Flow",
        desc: "Calculate Free Cash Flow to Firm (FCFF) from EBIT, taxes, D&A, working capital, and CapEx.",
        readTime: "7 mins"
      },
      {
        id: "3-2",
        number: "3.2",
        title: "Submodule 3.2: Discount Rate",
        desc: "Determine WACC, cost of equity, debt tax shield, and risk-adjusted discount rates.",
        readTime: "8 mins"
      },
      {
        id: "3-3",
        number: "3.3",
        title: "Submodule 3.3: Terminal Value",
        desc: "Calculate terminal exit value using Perpetuity Growth and Exit Multiple approaches.",
        readTime: "8 mins"
      },
      {
        id: "3-4",
        number: "3.4",
        title: "Submodule 3.4: Sensitivity Analysis",
        desc: "Stress-test valuations using WACC vs growth rate matrices. Includes Millionaire Minigame required to unlock Module 4.",
        readTime: "10 mins",
        isMinigame: true,
        gameUrl: "submodule-3-game.html"
      }
    ]
  },
  {
    id: 4,
    title: "Module 4: Applied Finance",
    badge: "Professional",
    desc: "Explore institutional career verticals in sell-side, buy-side, asset management, and corporate strategy.",
    submodules: [
      {
        id: "4-1",
        number: "4.1",
        title: "Submodule 4.1: Investment Banking",
        desc: "Learn M&A deal execution, pitch books, capital raising, and sell-side advisory.",
        readTime: "7 mins"
      },
      {
        id: "4-2",
        number: "4.2",
        title: "Submodule 4.2: Equity Research",
        desc: "Write institutional equity research, target pricing, and stock recommendations.",
        readTime: "7 mins"
      },
      {
        id: "4-3",
        number: "4.3",
        title: "Submodule 4.3: Sales & Trading",
        desc: "Understand market making, equity/fixed income execution, and trading desk operations.",
        readTime: "7 mins"
      },
      {
        id: "4-4",
        number: "4.4",
        title: "Submodule 4.4: Private Equity",
        desc: "Analyze buyout strategies, deal sourcing, LBO models, and value creation levers.",
        readTime: "8 mins"
      },
      {
        id: "4-5",
        number: "4.5",
        title: "Submodule 4.5: Hedge Funds",
        desc: "Explore long/short equity, global macro, quantitative strategies, and risk management.",
        readTime: "8 mins"
      },
      {
        id: "4-6",
        number: "4.6",
        title: "Submodule 4.6: Asset Management",
        desc: "Understand institutional portfolio management, index tracking, and fiduciary oversight.",
        readTime: "7 mins"
      },
      {
        id: "4-7",
        number: "4.7",
        title: "Submodule 4.7: Corporate Finance",
        desc: "Master FP&A, treasury, strategic planning, and capital allocations. Includes Capstone Memory Flip Minigame to complete curriculum.",
        readTime: "12 mins",
        isMinigame: true,
        gameUrl: "submodule-4-game.html"
      }
    ]
  }
];
