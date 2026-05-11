import { useState, useEffect } from "react";

const STEPS = ["Profile", "Income", "Investments", "Review", "Goals", "Plan"];

const sectionStyle = {
  fontFamily: "'Georgia', serif",
};

const colors = {
  navy: "#0f265a",
  teal: "#0D9488",
  gold: "#F59E0B",
  light: "#F0F4FF",
  white: "#FFFFFF",
  text: "#1E293B",
  muted: "#64748B",
  border: "#CBD5E1",
  success: "#10B981",
  red: "#EF4444",
};

function ProgressBar({ step, total }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: i <= step ? colors.teal : colors.border,
              marginBottom: 4,
              transition: "background 0.3s",
            }}
          />
          <span
            style={{
              fontSize: 10,
              color: i === step ? colors.teal : colors.muted,
              fontWeight: i === step ? 700 : 400,
            }}
          >
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", prefix, help }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: colors.text,
          marginBottom: 4,
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: colors.muted,
              fontSize: 14,
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: prefix ? "10px 12px 10px 28px" : "10px 12px",
            borderRadius: 8,
            border: `1.5px solid ${colors.border}`,
            fontSize: 14,
            color: colors.text,
            background: colors.white,
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = colors.teal)}
          onBlur={(e) => (e.target.style.borderColor = colors.border)}
        />
      </div>
      {help && (
        <p style={{ margin: "4px 0 0", fontSize: 11, color: colors.muted }}>
          {help}
        </p>
      )}
    </div>
  );
}

function Card({ children, highlight, style: extraStyle }) {
  return (
    <div
      style={{
        background: highlight ? colors.light : colors.white,
        border: `1.5px solid ${highlight ? colors.teal : colors.border}`,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ color, children }) {
  return (
    <span
      style={{
        background: color + "22",
        color,
        border: `1px solid ${color}44`,
        borderRadius: 6,
        padding: "2px 8px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.3,
      }}
    >
      {children}
    </span>
  );
}

// --- Step Components ---

function StepProfile({ data, setData }) {
  return (
    <div>
      <h2
        style={{ fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 4 }}
      >
        Tell us about yourself
      </h2>
      <p style={{ color: colors.muted, fontSize: 13, marginBottom: 20 }}>
        This helps us personalise your tax analysis under Indian tax law (FY 2024–25).
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <InputField
          label="Full Name"
          value={data.name}
          onChange={(v) => setData({ ...data, name: v })}
        />
        <InputField
          label="Age"
          type="number"
          value={data.age}
          onChange={(v) => setData({ ...data, age: v })}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: colors.text,
              marginBottom: 4,
            }}
          >
            Employment Type
          </label>
          <select
            value={data.empType}
            onChange={(e) => setData({ ...data, empType: e.target.value })}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: `1.5px solid ${colors.border}`,
              fontSize: 14,
              color: colors.text,
              background: colors.white,
              outline: "none",
            }}
          >
            <option value="salaried">Salaried</option>
            <option value="selfemployed">Self-Employed / Freelancer</option>
            <option value="business">Business Owner</option>
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: colors.text,
              marginBottom: 4,
            }}
          >
            Tax Regime
          </label>
          <select
            value={data.regime}
            onChange={(e) => setData({ ...data, regime: e.target.value })}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: `1.5px solid ${colors.border}`,
              fontSize: 14,
              color: colors.text,
              background: colors.white,
              outline: "none",
            }}
          >
            <option value="old">Old Regime</option>
            <option value="new">New Regime</option>
          </select>
        </div>
      </div>
      <InputField
        label="City / State"
        value={data.city}
        onChange={(v) => setData({ ...data, city: v })}
        help="Used to calculate HRA & metro allowances"
      />
      {data.empType === "salaried" && (
        <div
          style={{
            background: colors.light,
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 12,
            color: colors.teal,
            fontWeight: 600,
          }}
        >
          💡 Salaried individuals can claim Standard Deduction of ₹50,000 automatically
        </div>
      )}
    </div>
  );
}

function StepIncome({ data, setData }) {
  return (
    <div>
      <h2
        style={{ fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 4 }}
      >
        Income & Salary Breakdown
      </h2>
      <p style={{ color: colors.muted, fontSize: 13, marginBottom: 20 }}>
        Enter your annual figures for FY 2024–25
      </p>
      <InputField
        label="Gross Annual Salary"
        prefix="₹"
        type="number"
        value={data.salary}
        onChange={(v) => setData({ ...data, salary: v })}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <InputField
          label="HRA Received (Annual)"
          prefix="₹"
          type="number"
          value={data.hra}
          onChange={(v) => setData({ ...data, hra: v })}
        />
        <InputField
          label="Rent Paid (Annual)"
          prefix="₹"
          type="number"
          value={data.rent}
          onChange={(v) => setData({ ...data, rent: v })}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <InputField
          label="Other Income (FD Interest, etc.)"
          prefix="₹"
          type="number"
          value={data.otherIncome}
          onChange={(v) => setData({ ...data, otherIncome: v })}
        />
        <InputField
          label="Rental Income"
          prefix="₹"
          type="number"
          value={data.rentalIncome}
          onChange={(v) => setData({ ...data, rentalIncome: v })}
        />
      </div>
      <InputField
        label="Home Loan Interest (if any)"
        prefix="₹"
        type="number"
        value={data.homeLoanInterest}
        onChange={(v) => setData({ ...data, homeLoanInterest: v })}
        help="Deductible up to ₹2,00,000 under Section 24(b)"
      />
    </div>
  );
}

function StepInvestments({ data, setData }) {
  return (
    <div>
      <h2
        style={{ fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 4 }}
      >
        Investments & Deductions
      </h2>
      <p style={{ color: colors.muted, fontSize: 13, marginBottom: 20 }}>
        What have you already invested this year?
      </p>
      <div
        style={{
          background: colors.light,
          borderRadius: 8,
          padding: "8px 14px",
          fontSize: 12,
          color: colors.navy,
          marginBottom: 16,
          fontWeight: 600,
        }}
      >
        80C Limit: ₹1,50,000 | 80D Limit: ₹25,000 (self) + ₹50,000 (parents)
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <InputField label="PPF / EPF" prefix="₹" type="number" value={data.ppf} onChange={(v) => setData({ ...data, ppf: v })} />
        <InputField label="ELSS Mutual Funds" prefix="₹" type="number" value={data.elss} onChange={(v) => setData({ ...data, elss: v })} />
        <InputField label="Life Insurance Premium" prefix="₹" type="number" value={data.lic} onChange={(v) => setData({ ...data, lic: v })} />
        <InputField label="NSC / Tax Saver FD" prefix="₹" type="number" value={data.nsc} onChange={(v) => setData({ ...data, nsc: v })} />
        <InputField label="Health Insurance (Self)" prefix="₹" type="number" value={data.healthSelf} onChange={(v) => setData({ ...data, healthSelf: v })} />
        <InputField label="Health Insurance (Parents)" prefix="₹" type="number" value={data.healthParents} onChange={(v) => setData({ ...data, healthParents: v })} />
        <InputField label="NPS Contribution (80CCD)" prefix="₹" type="number" value={data.nps} onChange={(v) => setData({ ...data, nps: v })} />
        <InputField label="Education Loan Interest (80E)" prefix="₹" type="number" value={data.eduLoan} onChange={(v) => setData({ ...data, eduLoan: v })} />
      </div>
      <InputField
        label="Donations (80G eligible)"
        prefix="₹"
        type="number"
        value={data.donations}
        onChange={(v) => setData({ ...data, donations: v })}
        help="50% or 100% deductible depending on the fund"
      />
    </div>
  );
}

function StepReview({ profile, income, investments, analysis }) {
  const fmt = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

  return (
    <div>
      <h2
        style={{ fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 4 }}
      >
        AI Tax Analysis
      </h2>
      <p style={{ color: colors.muted, fontSize: 13, marginBottom: 16 }}>
        Based on your inputs, here's what our AI found:
      </p>

      {/* Summary bar */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.navy}, #1a4080)`,
          borderRadius: 12,
          padding: "16px 20px",
          color: colors.white,
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Estimated Tax Payable</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{fmt(analysis.taxPayable)}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Potential Savings Found</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.gold }}>
            {fmt(analysis.potentialSavings)}
          </div>
        </div>
      </div>

      {/* Missed deductions */}
      <h3 style={{ fontSize: 14, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>
        🎯 Deductions You May Have Missed
      </h3>
      {analysis.missed.map((m, i) => (
        <Card key={i} highlight>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: colors.text }}>
                {m.title}
              </div>
              <div style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>
                {m.desc}
              </div>
            </div>
            <div style={{ textAlign: "right", marginLeft: 12 }}>
              <Tag color={colors.success}>{fmt(m.saving)}</Tag>
              <div style={{ fontSize: 10, color: colors.muted, marginTop: 4 }}>
                {m.section}
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Current deductions */}
      <h3 style={{ fontSize: 14, fontWeight: 700, color: colors.navy, marginBottom: 8, marginTop: 16 }}>
        ✅ Deductions Already Claimed
      </h3>
      {analysis.claimed.map((c, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: `1px solid ${colors.border}`,
            fontSize: 13,
          }}
        >
          <span style={{ color: colors.text }}>{c.title}</span>
          <span style={{ fontWeight: 600, color: colors.muted }}>{fmt(c.amount)}</span>
        </div>
      ))}
    </div>
  );
}

function StepGoals({ data, setData }) {
  return (
    <div>
      <h2
        style={{ fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 4 }}
      >
        Your Future Goals
      </h2>
      <p style={{ color: colors.muted, fontSize: 13, marginBottom: 20 }}>
        Tell us your financial targets so we can plan tax-efficient investments
      </p>
      <InputField
        label="Target Corpus in 5 Years"
        prefix="₹"
        type="number"
        value={data.corpus5yr}
        onChange={(v) => setData({ ...data, corpus5yr: v })}
        help="e.g. ₹50,00,000 for a house down payment"
      />
      <InputField
        label="Monthly Investable Surplus"
        prefix="₹"
        type="number"
        value={data.monthlySurplus}
        onChange={(v) => setData({ ...data, monthlySurplus: v })}
      />
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 600,
            color: colors.text,
            marginBottom: 8,
          }}
        >
          Goals (select all that apply)
        </label>
        {[
          "Buy a house",
          "Children's education",
          "Retirement planning",
          "Emergency fund",
          "Travel / lifestyle",
        ].map((goal) => (
          <label
            key={goal}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
              cursor: "pointer",
              fontSize: 13,
              color: colors.text,
            }}
          >
            <input
              type="checkbox"
              checked={(data.goals || []).includes(goal)}
              onChange={(e) => {
                const prev = data.goals || [];
                setData({
                  ...data,
                  goals: e.target.checked
                    ? [...prev, goal]
                    : prev.filter((g) => g !== goal),
                });
              }}
              style={{ accentColor: colors.teal, width: 16, height: 16 }}
            />
            {goal}
          </label>
        ))}
      </div>
      <InputField
        label="Risk Appetite"
        value={data.risk}
        onChange={(v) => setData({ ...data, risk: v })}
      />
      <select
        value={data.risk}
        onChange={(e) => setData({ ...data, risk: e.target.value })}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: `1.5px solid ${colors.border}`,
          fontSize: 14,
          color: colors.text,
          background: colors.white,
          outline: "none",
          marginTop: -8,
        }}
      >
        <option value="conservative">Conservative (FDs, Bonds)</option>
        <option value="moderate">Moderate (Balanced Funds)</option>
        <option value="aggressive">Aggressive (ELSS, Equities)</option>
      </select>
    </div>
  );
}

function StepPlan({ analysis, goals }) {
  const fmt = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

  return (
    <div>
      <h2
        style={{ fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 4 }}
      >
        Your Personalised Tax-Saving Plan
      </h2>
      <p style={{ color: colors.muted, fontSize: 13, marginBottom: 16 }}>
        AI-generated roadmap to maximise savings & hit your goals
      </p>

      {analysis.plan.map((item, i) => (
        <Card key={i}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: colors.teal,
                color: colors.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: colors.text }}>
                {item.action}
              </div>
              <div style={{ fontSize: 12, color: colors.muted, marginTop: 3 }}>
                {item.desc}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 8,
                  flexWrap: "wrap",
                }}
              >
                <Tag color={colors.teal}>{item.instrument}</Tag>
                <Tag color={colors.gold}>Save {fmt(item.taxSaved)} tax</Tag>
                <Tag color={colors.navy}>{item.section}</Tag>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <div
        style={{
          background: `linear-gradient(135deg, ${colors.teal}, #0a7a71)`,
          borderRadius: 12,
          padding: "16px 20px",
          color: colors.white,
          marginTop: 8,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 13, opacity: 0.85 }}>
          If you follow this plan, your projected tax saving is
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, margin: "4px 0" }}>
          {fmt(analysis.totalSavingWithPlan)}
        </div>
        <div style={{ fontSize: 12, opacity: 0.75 }}>
          That's money you keep — not the government.
        </div>
      </div>
    </div>
  );
}

// --- Main App ---
function computeAnalysis(profile, income, investments) {
  const sal = Number(income.salary) || 0;
  const ppf = Number(investments.ppf) || 0;
  const elss = Number(investments.elss) || 0;
  const lic = Number(investments.lic) || 0;
  const nsc = Number(investments.nsc) || 0;
  const healthSelf = Number(investments.healthSelf) || 0;
  const healthParents = Number(investments.healthParents) || 0;
  const nps = Number(investments.nps) || 0;
  const eduLoan = Number(investments.eduLoan) || 0;
  const donations = Number(investments.donations) || 0;
  const hra = Number(income.hra) || 0;
  const rent = Number(income.rent) || 0;
  const homeLoanInterest = Number(income.homeLoanInterest) || 0;

  const sec80C = Math.min(ppf + elss + lic + nsc, 150000);
  const sec80D = Math.min(healthSelf, 25000) + Math.min(healthParents, 50000);
  const sec80CCD = Math.min(nps, 50000);
  const sec80E = eduLoan;
  const sec80G = Math.min(donations * 0.5, sal * 0.1);
  const stdDeduction = profile.empType === "salaried" ? 50000 : 0;
  const sec24b = Math.min(homeLoanInterest, 200000);

  const hraExemption = rent > 0 ? Math.min(hra, rent - sal * 0.1, sal * 0.4) : 0;

  const totalDeductions =
    sec80C + sec80D + sec80CCD + sec80E + sec80G + stdDeduction + sec24b + hraExemption;
  const taxableIncome = Math.max(0, sal - totalDeductions);

  let tax = 0;
  if (taxableIncome > 1000000) tax = (taxableIncome - 1000000) * 0.3 + 112500;
  else if (taxableIncome > 500000) tax = (taxableIncome - 500000) * 0.2 + 12500;
  else if (taxableIncome > 250000) tax = (taxableIncome - 250000) * 0.05;
  tax = Math.round(tax * 1.04); // cess

  const missed = [];
  if (sec80C < 150000)
    missed.push({
      title: "Section 80C Gap",
      desc: `You've used ${((sec80C / 150000) * 100).toFixed(0)}% of your ₹1.5L limit. Top up with ELSS or PPF.`,
      saving: Math.round((150000 - sec80C) * 0.3),
      section: "Sec 80C",
    });
  if (nps === 0)
    missed.push({
      title: "NPS Additional Deduction",
      desc: "₹50,000 extra deduction over 80C via NPS under Section 80CCD(1B). Often missed!",
      saving: Math.round(50000 * 0.3),
      section: "Sec 80CCD(1B)",
    });
  if (healthSelf < 25000)
    missed.push({
      title: "Health Insurance Top-Up",
      desc: "You can claim up to ₹25,000 for health insurance for self/family.",
      saving: Math.round((25000 - healthSelf) * 0.3),
      section: "Sec 80D",
    });
  if (hraExemption === 0 && hra === 0 && rent > 0)
    missed.push({
      title: "HRA Exemption",
      desc: "If you receive HRA from employer, declare it to claim exemption on rent paid.",
      saving: Math.round(Math.min(rent * 0.4, sal * 0.1) * 0.3),
      section: "Sec 10(13A)",
    });

  const potentialSavings = missed.reduce((a, m) => a + m.saving, 0);

  const claimed = [
    { title: "Standard Deduction", amount: stdDeduction },
    { title: "Section 80C (PPF/ELSS/LIC)", amount: sec80C },
    { title: "Section 80D (Health Insurance)", amount: sec80D },
    { title: "Section 24(b) Home Loan Interest", amount: sec24b },
    { title: "HRA Exemption", amount: Math.max(0, hraExemption) },
  ].filter((c) => c.amount > 0);

  const plan = [
    {
      action: "Maximise NPS Contribution",
      desc: "Invest ₹50,000 in NPS for an additional deduction beyond the 80C limit.",
      instrument: "NPS Tier 1",
      taxSaved: 15000,
      section: "80CCD(1B)",
    },
    {
      action: "Top-up 80C via ELSS",
      desc: `Invest ₹${((150000 - sec80C) / 1000).toFixed(0)}K more in ELSS for market-linked growth + tax benefit.`,
      instrument: "ELSS Mutual Funds",
      taxSaved: Math.round((150000 - sec80C) * 0.3),
      section: "80C",
    },
    {
      action: "Buy Health Insurance",
      desc: "A ₹10L family floater plan costs ~₹18,000/yr and saves ₹5,400 in taxes.",
      instrument: "Health Floater Policy",
      taxSaved: Math.round(18000 * 0.3),
      section: "80D",
    },
    {
      action: "Contribute to PM-CARES / Charity",
      desc: "Donations to 80G funds give 50–100% deduction. Plan before March 31.",
      instrument: "PM-CARES / PM Relief Fund",
      taxSaved: Math.round(10000 * 0.3),
      section: "80G",
    },
  ];

  const totalSavingWithPlan = plan.reduce((a, p) => a + p.taxSaved, 0) + tax;

  return { taxPayable: tax, potentialSavings, missed, claimed, plan, totalSavingWithPlan };
}

export default function TaxMaxApp() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    empType: "salaried",
    regime: "old",
    city: "",
  });
  const [income, setIncome] = useState({
    salary: "",
    hra: "",
    rent: "",
    otherIncome: "",
    rentalIncome: "",
    homeLoanInterest: "",
  });
  const [investments, setInvestments] = useState({
    ppf: "",
    elss: "",
    lic: "",
    nsc: "",
    healthSelf: "",
    healthParents: "",
    nps: "",
    eduLoan: "",
    donations: "",
  });
  const [goals, setGoals] = useState({
    corpus5yr: "",
    monthlySurplus: "",
    goals: [],
    risk: "moderate",
  });

  const analysis = computeAnalysis(profile, income, investments);

  const canProceed = () => {
    if (step === 0) return profile.name && profile.age;
    if (step === 1) return Number(income.salary) > 0;
    return true;
  };

  return (
    <div
      style={{
        ...sectionStyle,
        minHeight: "100vh",
        background: "#F8FAFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: colors.navy,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.gold,
            fontWeight: 900,
            fontSize: 18,
          }}
        >
          ₹
        </div>
        <div>
          <div
            style={{ fontWeight: 800, fontSize: 18, color: colors.navy, letterSpacing: -0.5 }}
          >
            TaxMax AI
          </div>
          <div style={{ fontSize: 11, color: colors.muted }}>
            Find missed deductions · Plan smarter investments
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Tag color={colors.teal}>FY 2024–25</Tag>
        </div>
      </div>

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          background: colors.white,
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(15,37,87,0.08)",
          padding: "24px 28px",
        }}
      >
        <ProgressBar step={step} total={STEPS.length} />

        {step === 0 && (
          <StepProfile data={profile} setData={setProfile} />
        )}
        {step === 1 && (
          <StepIncome data={income} setData={setIncome} />
        )}
        {step === 2 && (
          <StepInvestments data={investments} setData={setInvestments} />
        )}
        {step === 3 && (
          <StepReview profile={profile} income={income} investments={investments} analysis={analysis} />
        )}
        {step === 4 && (
          <StepGoals data={goals} setData={setGoals} />
        )}
        {step === 5 && (
          <StepPlan analysis={analysis} goals={goals} />
        )}

        {/* Nav */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 24,
            justifyContent: step === 0 ? "flex-end" : "space-between",
          }}
        >
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: `1.5px solid ${colors.border}`,
                background: colors.white,
                color: colors.text,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              style={{
                padding: "10px 28px",
                borderRadius: 8,
                border: "none",
                background: canProceed() ? colors.teal : colors.border,
                color: colors.white,
                fontWeight: 700,
                fontSize: 14,
                cursor: canProceed() ? "pointer" : "not-allowed",
                transition: "background 0.2s",
              }}
            >
              {step === 2 ? "Analyse My Taxes →" : "Continue →"}
            </button>
          ) : (
            <button
              onClick={() => alert("Report saved! In production this would email you a PDF.")}
              style={{
                padding: "10px 28px",
                borderRadius: 8,
                border: "none",
                background: colors.gold,
                color: colors.navy,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              📥 Save My Plan
            </button>
          )}
        </div>
      </div>

      <div style={{ marginTop: 16, fontSize: 11, color: colors.muted, textAlign: "center" }}>
        This is an illustrative demo. Consult a CA for filing.
      </div>
    </div>
  );
}
