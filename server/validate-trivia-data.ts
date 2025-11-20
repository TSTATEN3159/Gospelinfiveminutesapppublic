import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TriviaQuestion {
  id: string;
  level: string;
  question: string;
  choices: string[];
  correctIndex: number;
  reference?: string;
  explanation?: string;
  category?: string;
}

function validateTriviaData() {
  const dataPath = path.join(__dirname, "..", "data", "bible-trivia.json");
  
  console.log("🔍 Validating trivia data...");
  console.log(`📁 Reading from: ${dataPath}\n`);
  
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const triviaData: TriviaQuestion[] = JSON.parse(rawData);
  
  let totalQuestions = 0;
  let invalidQuestions = 0;
  const errors: string[] = [];
  
  // Group by level for reporting
  const byLevel = triviaData.reduce((acc, q) => {
    if (!acc[q.level]) acc[q.level] = [];
    acc[q.level].push(q);
    return acc;
  }, {} as Record<string, TriviaQuestion[]>);
  
  for (const [level, questions] of Object.entries(byLevel)) {
    console.log(`\n📚 Validating ${level} level (${questions.length} questions)...`);
    
    for (const q of questions) {
      totalQuestions++;
      
      // Check if correctIndex is within valid range
      if (q.correctIndex < 0 || q.correctIndex >= q.choices.length) {
        invalidQuestions++;
        errors.push(
          `❌ [${level}] Question ${q.id}: correctIndex ${q.correctIndex} is out of range (0-${q.choices.length - 1})\n` +
          `   Text: ${q.question.substring(0, 60)}...\n` +
          `   Choices: ${q.choices.map((c, i) => `${i}: ${c.substring(0, 30)}...`).join(", ")}`
        );
        continue;
      }
      
      // Check if choices array has at least 2 options
      if (q.choices.length < 2) {
        invalidQuestions++;
        errors.push(
          `❌ [${level}] Question ${q.id}: Not enough choices (${q.choices.length})\n` +
          `   Text: ${q.question.substring(0, 60)}...`
        );
        continue;
      }
      
      // Check for duplicate choices
      const uniqueChoices = new Set(q.choices);
      if (uniqueChoices.size !== q.choices.length) {
        invalidQuestions++;
        errors.push(
          `⚠️  [${level}] Question ${q.id}: Duplicate choices detected\n` +
          `   Text: ${q.question.substring(0, 60)}...\n` +
          `   Choices: ${q.choices.join(", ")}`
        );
      }
      
      // Check for missing or empty text
      if (!q.question || q.question.trim() === "") {
        invalidQuestions++;
        errors.push(
          `❌ [${level}] Question ${q.id}: Missing or empty question text`
        );
      }
      
      // Check for empty choices
      if (q.choices.some(c => !c || c.trim() === "")) {
        invalidQuestions++;
        errors.push(
          `❌ [${level}] Question ${q.id}: One or more empty choices\n` +
          `   Text: ${q.question.substring(0, 60)}...`
        );
      }
    }
  }
  
  console.log("\n" + "=".repeat(80));
  console.log("📊 VALIDATION SUMMARY");
  console.log("=".repeat(80));
  console.log(`Total questions validated: ${totalQuestions}`);
  console.log(`Invalid questions found: ${invalidQuestions}`);
  console.log(`Success rate: ${((totalQuestions - invalidQuestions) / totalQuestions * 100).toFixed(2)}%`);
  
  if (errors.length > 0) {
    console.log("\n⚠️  ERRORS FOUND:\n");
    errors.forEach(err => console.log(err + "\n"));
    process.exit(1);
  } else {
    console.log("\n✅ All trivia questions are valid!");
    console.log("✅ All correctIndex values point to valid answer choices");
    console.log("✅ Data integrity verified - safe for server-side grading");
    process.exit(0);
  }
}

// Run validation
validateTriviaData();
