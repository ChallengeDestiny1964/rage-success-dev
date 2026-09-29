const nav = ["Overview", "Data", "Features", "Models", "Validation", "Deploy"];

const models = [
  { name: "Gradient Boosting", score: 0.86, best: true },
  { name: "Random Forest", score: 0.84 },
  { name: "Logistic Regression", score: 0.83 },
  { name: "SVM (RBF)", score: 0.81 },
];

const features = [
  { name: "tenure", value: 100 },
  { name: "contract_type", value: 82 },
  { name: "monthly_charges", value: 64 },
  { name: "internet_service", value: 47 },
  { name: "payment_method", value: 33 },
];

export function AutoModelerScreen() {
  return (
    <div className="flex h-full w-full bg-[#f6f7f9] text-[15px] text-[#1f2328]">
      <aside className="flex w-[228px] shrink-0 flex-col border-r border-[#e4e7eb] bg-white px-5 py-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111827] text-[13px] font-bold text-white">
            AM
          </span>
          <span className="text-[17px] font-semibold tracking-tight">AutoModeler</span>
        </div>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a939e]">
          Project
        </p>
        <p className="mt-2 rounded-lg bg-[#f1f3f5] px-3 py-2 text-[14px] font-medium">
          Customer churn
        </p>
        <nav className="mt-6 space-y-1">
          {nav.map((item, index) => (
            <p
              key={item}
              className={`rounded-lg px-3 py-2 text-[14px] ${
                index === 3 ? "bg-[#111827] font-medium text-white" : "text-[#57606a]"
              }`}
            >
              {item}
            </p>
          ))}
        </nav>
        <div className="mt-auto rounded-xl border border-[#e4e7eb] p-3">
          <p className="text-[12px] text-[#8a939e]">Dataset</p>
          <p className="mt-1 text-[14px] font-medium">customers.csv</p>
          <p className="text-[12px] text-[#8a939e]">7,043 rows · 21 columns</p>
        </div>
      </aside>

      <section className="flex w-[520px] shrink-0 flex-col border-r border-[#e4e7eb] bg-white">
        <header className="flex items-center justify-between border-b border-[#e4e7eb] px-6 py-4">
          <p className="text-[16px] font-semibold">Model assistant</p>
          <span className="rounded-full bg-[#ecfdf3] px-2.5 py-1 text-[12px] font-medium text-[#067647]">
            Claude · streaming
          </span>
        </header>
        <div className="flex-1 space-y-5 overflow-hidden px-6 py-6">
          <div className="ml-auto max-w-[360px] rounded-2xl rounded-br-md bg-[#111827] px-4 py-3 text-white">
            Predict which customers will churn next month.
          </div>
          <div className="max-w-[420px] rounded-2xl rounded-bl-md bg-[#f1f3f5] px-4 py-3 leading-relaxed">
            I profiled <b>7,043 rows</b> and cleaned 11 missing values. Tenure and contract type
            carry the strongest signal.
          </div>
          <div className="max-w-[420px] rounded-2xl rounded-bl-md bg-[#f1f3f5] px-4 py-3 leading-relaxed">
            I trained 4 candidate models with 5-fold cross-validation.{" "}
            <b>Gradient Boosting</b> leads with <b>0.86 ROC-AUC</b>. Want me to explain its
            predictions or deploy it as an API?
            <span className="ml-1 inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-[#111827]" />
          </div>
          <div className="flex gap-2">
            {["Explain with SHAP", "Deploy model", "Compare features"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#e4e7eb] px-3 py-1.5 text-[13px] text-[#57606a]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-[#e4e7eb] p-4">
          <div className="flex items-center justify-between rounded-xl border border-[#d0d7de] px-4 py-3 text-[#8a939e]">
            Ask about your data…
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111827] text-white">
              ↑
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col gap-5 p-6">
        <div className="rounded-2xl border border-[#e4e7eb] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold">Model comparison</p>
            <p className="text-[12px] text-[#8a939e]">ROC-AUC · 5-fold CV</p>
          </div>
          <div className="mt-5 space-y-3.5">
            {models.map((model) => (
              <div key={model.name}>
                <div className="flex justify-between text-[13px]">
                  <span className={model.best ? "font-semibold" : "text-[#57606a]"}>
                    {model.name}
                  </span>
                  <span className="font-mono">{model.score.toFixed(2)}</span>
                </div>
                <div className="mt-1.5 h-2.5 rounded-full bg-[#f1f3f5]">
                  <div
                    className={`h-full rounded-full ${model.best ? "bg-[#0e7c80]" : "bg-[#c4ccd4]"}`}
                    style={{ width: `${(model.score - 0.6) * 250}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 rounded-2xl border border-[#e4e7eb] bg-white p-5">
          <p className="text-[15px] font-semibold">Top drivers (SHAP)</p>
          <div className="mt-5 space-y-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center gap-3">
                <span className="w-[130px] font-mono text-[12px] text-[#57606a]">
                  {feature.name}
                </span>
                <div className="h-5 flex-1 rounded bg-[#f1f3f5]">
                  <div
                    className="h-full rounded bg-gradient-to-r from-[#0e7c80] to-[#34b3a0]"
                    style={{ width: `${feature.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#111827] px-5 py-4 text-white">
          <div>
            <p className="text-[14px] font-semibold">Ready to deploy</p>
            <p className="text-[12px] text-white/60">FastAPI endpoint + prediction dashboard</p>
          </div>
          <span className="rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-[#111827]">
            Deploy
          </span>
        </div>
      </section>
    </div>
  );
}
