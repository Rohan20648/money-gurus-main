import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const income = Number(body.income) || 0;
    const recurring = Number(body.recurring) || 0;
    const leisure = Number(body.leisure) || 0;
    const investment = Number(body.investment) || 0;
    const savings = Number(body.savings) || 0;
    const emergency = Number(body.emergency) || 0;

    const totalExpenses = recurring + leisure + investment;
    const disposableIncome = income - totalExpenses;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    const emergencyMonths = recurring > 0 ? emergency / recurring : 0;

    const insights: string[] = [];

    // ---- SAVINGS RATE INSIGHTS ----
    if (savingsRate === 0) {
      insights.push(
        `You are currently not saving any portion of your monthly income. 
        This is a critical financial risk because it leaves you with no buffer for emergencies or future goals. 
        Even starting with saving 5–10% of your income can dramatically improve your financial stability over time. 
        Consider setting up an automatic monthly transfer to a savings account as a first step.`
      );
    } 
    else if (savingsRate < 10) {
      insights.push(
        `Your current savings rate is only ${savingsRate.toFixed(1)}% of your income. 
        This is considered very low from a financial planning perspective. 
        Most experts recommend saving at least 20% of income to build long-term security. 
        At this level of saving, it may be difficult to achieve major goals like buying a house, traveling, or early retirement. 
        Try reducing discretionary expenses or increasing income to improve this rate.`
      );
    } 
    else if (savingsRate < 20) {
      insights.push(
        `You are saving around ${savingsRate.toFixed(1)}% of your income each month. 
        This shows financial awareness and discipline, but it is still slightly below the ideal target of 20%. 
        Increasing your savings rate gradually can have a huge long-term impact due to compound growth. 
        Even a small change such as cutting one unnecessary monthly subscription can help boost this percentage.`
      );
    } 
    else {
      insights.push(
        `Excellent financial habit! You are saving approximately ${savingsRate.toFixed(1)}% of your income. 
        This is above the recommended benchmark and puts you in a strong financial position. 
        Continuing this discipline will help you achieve financial independence, handle emergencies comfortably, 
        and build long-term wealth through investments.`
      );
    }

    // ---- EMERGENCY FUND INSIGHTS ----
    if (emergency === 0) {
      insights.push(
        `You currently have no emergency fund. 
        This is risky because unexpected expenses like medical bills, job loss, or urgent repairs can immediately create financial stress. 
        Building an emergency fund should be one of your top priorities before increasing leisure spending or risky investments. 
        Aim to save at least 3–6 months of essential living expenses.`
      );
    }
    else if (emergencyMonths < 1) {
      insights.push(
        `Your emergency fund can cover only about ${emergencyMonths.toFixed(1)} months of your basic expenses. 
        This provides very limited financial protection. 
        A single unexpected event could wipe out these savings quickly. 
        Consider diverting a portion of your monthly savings specifically toward strengthening this fund.`
      );
    }
    else if (emergencyMonths < 3) {
      insights.push(
        `You have an emergency fund that can sustain you for around ${emergencyMonths.toFixed(1)} months. 
        This is a positive start, but still below the generally recommended minimum of 3 months. 
        Gradually increasing this fund will give you more confidence and financial freedom in daily life.`
      );
    }
    else {
      insights.push(
        `Great job! Your emergency savings can cover approximately ${emergencyMonths.toFixed(1)} months of expenses. 
        This gives you a strong safety net and protects you from most short-term financial shocks. 
        With this foundation, you can focus more confidently on long-term investing and personal goals.`
      );
    }

    // ---- SPENDING BEHAVIOR INSIGHTS ----
    if (income > 0) {
      const leisurePercent = (leisure / income) * 100;

      if (leisurePercent > 40) {
        insights.push(
          `A very large portion of your income (${leisurePercent.toFixed(1)}%) is being spent on leisure and non-essential expenses. 
          While enjoying your money is important, this level of discretionary spending is likely preventing you from saving more effectively. 
          Creating a monthly entertainment budget could help bring better balance to your finances.`
        );
      } 
      else if (leisurePercent > 25) {
        insights.push(
          `You are spending about ${leisurePercent.toFixed(1)}% of your income on leisure activities. 
          This is reasonable, but slightly on the higher side. 
          Reducing this category by even a small amount could significantly improve your savings and investment potential.`
        );
      }
    }

    // ---- INVESTMENT INSIGHTS ----
    if (investment === 0) {
      insights.push(
        `You currently have no active monthly investments. 
        This means you may be missing out on the power of compound interest. 
        Even small regular investments in mutual funds, index funds, or retirement accounts can grow into substantial wealth over time. 
        Consider starting with a simple and low-risk investment plan.`
      );
    } 
    else {
      insights.push(
        `You are investing ₹${investment} every month, which is an excellent financial habit. 
        Regular investing builds long-term wealth and protects you from inflation. 
        Make sure these investments are diversified and aligned with your future goals such as retirement, education, or major purchases.`
      );
    }

    // ---- OVERALL FINANCIAL HEALTH ----
    if (disposableIncome < 0) {
      insights.push(
        `Warning: Your current expenses exceed your income. 
        This means you are effectively living beyond your means, which can lead to debt or financial stress. 
        Immediate action is recommended: review subscriptions, cut unnecessary costs, and create a strict monthly budget plan.`
      );
    } 
    else if (disposableIncome < income * 0.1) {
      insights.push(
        `After all expenses, you are left with only a small portion of disposable income each month. 
        This gives you very little flexibility for unexpected situations. 
        Improving either your income or reducing fixed expenses would greatly strengthen your financial position.`
      );
    } 
    else {
      insights.push(
        `Your finances appear to be well balanced. 
        You have a healthy amount of disposable income left after covering expenses, which gives you flexibility and control. 
        Continue monitoring your spending habits to maintain this positive situation.`
      );
    }

    return NextResponse.json({
      insights: insights
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate financial insights" },
      { status: 500 }
    );
  }
}

