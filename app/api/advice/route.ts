import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      income = 0,
      recurring = 0,
      leisure = 0,
      savings = 0,
      emergency = 0,
      investment = 0,
    } = await req.json();

    const insights: string[] = [];

    const totalExpenses = recurring + leisure + investment;
    const disposableIncome = income - totalExpenses;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    const emergencyMonths = recurring > 0 ? emergency / recurring : 0;

    // ---- SAVINGS INSIGHTS ----
    if (savingsRate < 10) {
      insights.push(
        `Your current savings rate is ${savingsRate.toFixed(1)}% of your income. 
        This is lower than the recommended 20%. Increasing savings even gradually will greatly improve your financial security and future planning.`
      );
    } else if (savingsRate < 20) {
      insights.push(
        `You are saving ${savingsRate.toFixed(1)}% of your income. 
        This is a good habit, but slightly below the ideal benchmark of 20%. 
        Try reducing small unnecessary expenses to boost this number.`
      );
    } else {
      insights.push(
        `Excellent! You are saving ${savingsRate.toFixed(1)}% of your income. 
        This is a strong financial habit that will help you build long-term wealth.`
      );
    }

    // ---- EMERGENCY FUND ----
    if (emergencyMonths < 1) {
      insights.push(
        `Your emergency fund covers only about ${emergencyMonths.toFixed(1)} months of expenses. 
        This is risky. Aim to build at least 3–6 months of essential expenses as a safety net.`
      );
    } else if (emergencyMonths < 3) {
      insights.push(
        `You have around ${emergencyMonths.toFixed(1)} months of expenses saved as emergency funds. 
        This is a good start, but increasing it to at least 3 months would provide better stability.`
      );
    } else {
      insights.push(
        `Great job! Your emergency fund can support you for about ${emergencyMonths.toFixed(1)} months, 
        giving you solid financial protection.`
      );
    }

    // ---- SPENDING BEHAVIOR ----
    if (income > 0) {
      const leisurePercent = (leisure / income) * 100;

      if (leisurePercent > 30) {
        insights.push(
          `You are spending ${leisurePercent.toFixed(1)}% of your income on leisure. 
          This is quite high and may be limiting your ability to save more. 
          Setting a monthly cap on entertainment expenses could help balance your finances.`
        );
      }
    }

    // ---- INVESTMENT ----
    if (investment === 0) {
      insights.push(
        `You currently have no monthly investments. 
        Starting even a small systematic investment plan can significantly improve your financial future through compounding.`
      );
    } else {
      insights.push(
        `You are investing ₹${investment} every month, which is a great habit. 
        Make sure your investments are diversified and aligned with your long-term goals.`
      );
    }

    // ---- OVERALL HEALTH ----
    if (disposableIncome < 0) {
      insights.push(
        `Warning: Your expenses are higher than your income. 
        This means you may fall into debt if this pattern continues. Immediate budget adjustments are recommended.`
      );
    } else {
      insights.push(
        `Overall your finances are reasonably balanced with some disposable income remaining each month. 
        Continue tracking expenses to maintain control.`
      );
    }

    // 🔥 IMPORTANT FIX – RETURN AS "advice"
    return NextResponse.json({
      advice: insights
    });

  } catch (error) {
    return NextResponse.json(
      { advice: ["Unable to generate insights at this time."] },
      { status: 500 }
    );
  }
}


