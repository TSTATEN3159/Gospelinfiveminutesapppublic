import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ChatGPTQuestion {
  id: number;
  difficulty: "Easy" | "Medium" | "Difficult";
  category: string;
  question: string;
  correct_answer: string;
  accepted_answers: string[];
  reference: string;
  explanation: string;
  context_verse: string;
}

interface TriviaQuestion {
  id: string;
  level: "beginner" | "intermediate" | "advanced";
  question: string;
  choices: string[];
  correctIndex: number;
  reference: string;
  explanation: string;
  category: string;
}

// Common wrong answers for different question types
const biblicalNames = ["Moses", "Abraham", "Isaac", "Jacob", "Joseph", "Samuel", "Elijah", "Elisha", "Isaiah", "Jeremiah", "Paul", "John", "James", "Andrew", "Philip", "Matthew", "Mark", "Luke", "Timothy", "Barnabas", "Silas", "Aaron", "Caleb", "Gideon", "Samson", "Solomon", "David", "Saul", "Peter", "Thomas", "Stephen", "Zechariah", "Nathan", "Ananias", "Cornelius", "Deborah", "Ezra"];
const biblicalBooks = ["Genesis", "Exodus", "Leviticus", "Psalms", "Proverbs", "Isaiah", "Jeremiah", "Ezekiel", "Daniel", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "Galatians", "Ephesians", "Philippians", "James", "1 Peter", "Revelation", "Ezra", "Nehemiah", "Malachi", "Judges", "Ruth"];

function generateWrongAnswers(correct: string, category: string, question: string): string[] {
  const wrong: string[] = [];
  const correctLower = correct.toLowerCase();
  const qLower = question.toLowerCase();
  
  // Doctrine questions
  if (category === "Doctrine") {
    if (correct === "Be born again" || correct === "Born again") {
      wrong.push("Be baptized", "Believe only", "Do good works");
    } else if (correct === "Walk in the Spirit" || correct === "Live by the Spirit") {
      wrong.push("Follow the law", "Deny yourself", "Pray without ceasing");
    } else if (correct === "The shedding of blood" || correct === "Shedding of blood") {
      wrong.push("Confession of sins", "Good works", "Repentance");
    } else if (correct === "My Shepherd" || correct === "The Lord is my Shepherd") {
      wrong.push("My King", "My Father", "My Redeemer");
    } else if (correct === "Faith") {
      wrong.push("Works", "Baptism", "Obedience");
    } else if (correct === "The faith once delivered to the saints" || correct === "The faith once for all delivered to the saints" || correct === "The faith") {
      wrong.push("Your personal beliefs", "Church traditions", "Modern interpretations");
    } else {
      wrong.push("By faith", "Through grace", "By works");
    }
  }
  
  // Apostles & Early Church
  else if (category === "Apostles & Early Church") {
    if (correct === "John") {
      wrong.push("Peter", "James", "Andrew");
    } else if (correct === "Agabus") {
      wrong.push("Philip", "Stephen", "Barnabas");
    } else if (correct === "Elymas the sorcerer" || correct === "Elymas" || correct === "Bar-Jesus") {
      wrong.push("Simon the sorcerer", "Ananias", "Sapphira");
    } else if (correct === "Barnabas") {
      wrong.push("Silas", "Timothy", "Titus");
    } else if (correct === "Peter") {
      wrong.push("John", "James", "Paul");
    } else {
      const candidates = biblicalNames.filter(name => 
        name.toLowerCase() !== correctLower && !correct.includes(name)
      );
      const shuffled = candidates.sort(() => Math.random() - 0.5);
      wrong.push(...shuffled.slice(0, 3));
    }
  }
  
  // People questions
  else if (category === "People") {
    if (correct === "David") {
      wrong.push("Saul", "Jonathan", "Solomon");
    } else if (correct === "Nathan") {
      wrong.push("Samuel", "Gad", "Elijah");
    } else if (correct === "Ezra") {
      wrong.push("Nehemiah", "Zerubbabel", "Joshua");
    } else if (correct === "Elijah") {
      wrong.push("Elisha", "Isaiah", "Jeremiah");
    } else if (correct === "Solomon" || correct === "King Solomon") {
      wrong.push("David", "Saul", "Rehoboam");
    } else if (correct === "Annas") {
      wrong.push("Caiaphas", "Herod", "Pilate");
    } else {
      const candidates = biblicalNames.filter(name => 
        name.toLowerCase() !== correctLower && !correct.includes(name)
      );
      const shuffled = candidates.sort(() => Math.random() - 0.5);
      wrong.push(...shuffled.slice(0, 3));
    }
  }
  
  // Books of the Bible
  else if (category === "Books of the Bible") {
    if (correct === "Genesis") {
      wrong.push("Exodus", "Leviticus", "Numbers");
    } else if (correct === "Daniel") {
      wrong.push("Ezekiel", "Jeremiah", "Isaiah");
    } else if (correct === "Isaiah") {
      wrong.push("Jeremiah", "Ezekiel", "Daniel");
    } else {
      const candidates = biblicalBooks.filter(book => 
        book.toLowerCase() !== correctLower && !correct.includes(book)
      );
      const shuffled = candidates.sort(() => Math.random() - 0.5);
      wrong.push(...shuffled.slice(0, 3));
    }
  }
  
  // Parables questions
  else if (category === "Parables") {
    if (correct === "Ten" || correct === "10") {
      wrong.push("Seven", "Twelve", "Five");
    } else if (correct === "The invited guests" || correct === "Those who were invited") {
      wrong.push("The servants", "The king", "The poor");
    } else if (correct === "Reduced their debts" || correct === "Cut their debts" || correct === "Lowered their debts") {
      wrong.push("Forgave them completely", "Increased their debts", "Demanded immediate payment");
    } else {
      wrong.push("The church", "Faith", "The kingdom");
    }
  }
  
  // Default fallback
  else {
    wrong.push("Not specified", "Unknown", "Not mentioned");
  }
  
  // Ensure we have exactly 3 unique wrong answers
  const uniqueWrong = Array.from(new Set(wrong));
  while (uniqueWrong.length < 3) {
    uniqueWrong.push(`Alternative answer ${uniqueWrong.length + 1}`);
  }
  
  return uniqueWrong.slice(0, 3);
}

function convertQuestions(chatgptQuestions: ChatGPTQuestion[]): TriviaQuestion[] {
  const converted: TriviaQuestion[] = [];
  
  for (const q of chatgptQuestions) {
    // Map difficulty to level
    const level = 
      q.difficulty === "Easy" ? "beginner" :
      q.difficulty === "Medium" ? "intermediate" :
      "advanced";
    
    // Generate wrong answers
    const wrongAnswers = generateWrongAnswers(q.correct_answer, q.category, q.question);
    
    // Create choices array and randomize position
    const choices = [q.correct_answer, ...wrongAnswers];
    
    // Shuffle choices
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    // Find new position of correct answer after shuffle
    const finalCorrectIndex = choices.indexOf(q.correct_answer);
    
    converted.push({
      id: `q-chatgpt6-${Date.now()}-${q.id}`,
      level,
      question: q.question,
      choices,
      correctIndex: finalCorrectIndex,
      reference: q.reference,
      explanation: q.explanation,
      category: q.category
    });
  }
  
  return converted;
}

// Main execution
const inputPath = path.join(__dirname, "..", "attached_assets", "Pasted--id-176-difficulty-Easy-category-Doctrine-question-Accordin-1763662689122_1763662689123.txt");
const existingDataPath = path.join(__dirname, "..", "data", "bible-trivia.json");
const outputPath = path.join(__dirname, "..", "data", "bible-trivia.json");

console.log("📖 Reading new ChatGPT trivia questions...");
const rawData = fs.readFileSync(inputPath, "utf-8");

// Parse the file - it contains individual JSON objects separated by commas
// We need to wrap it in an array
const jsonArrayString = "[" + rawData + "]";
const chatgptQuestions: ChatGPTQuestion[] = JSON.parse(jsonArrayString);

console.log(`✓ Found ${chatgptQuestions.length} new questions from ChatGPT (IDs 176-200)`);

console.log("📖 Reading existing trivia questions...");
const existingData = fs.readFileSync(existingDataPath, "utf-8");
const existingQuestions: TriviaQuestion[] = JSON.parse(existingData);
console.log(`✓ Found ${existingQuestions.length} existing questions`);

console.log("🔄 Converting new ChatGPT questions to multiple-choice format...");
const convertedQuestions = convertQuestions(chatgptQuestions);

console.log(`✓ Converted ${convertedQuestions.length} new ChatGPT questions`);

// Combine all questions
const allQuestions = [...existingQuestions, ...convertedQuestions];

console.log(`\n📊 Total questions: ${allQuestions.length}`);
console.log("\nBreakdown by level:");
const byLevel = allQuestions.reduce((acc, q) => {
  acc[q.level] = (acc[q.level] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

Object.entries(byLevel).forEach(([level, count]) => {
  console.log(`  ${level}: ${count} questions`);
});

console.log("\n💾 Writing all questions to bible-trivia.json...");
fs.writeFileSync(outputPath, JSON.stringify(allQuestions, null, 2));

console.log("✅ Successfully added new ChatGPT questions!");
console.log(`📁 Output: ${outputPath}`);
console.log(`\n🎯 New total: ${allQuestions.length} questions`);
