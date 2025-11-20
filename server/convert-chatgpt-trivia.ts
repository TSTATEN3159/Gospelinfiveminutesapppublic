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
const biblicalNames = ["Moses", "Abraham", "Isaac", "Jacob", "Joseph", "Samuel", "Elijah", "Elisha", "Isaiah", "Jeremiah", "Paul", "John", "James", "Andrew", "Philip", "Matthew", "Mark", "Luke", "Timothy", "Barnabas", "Silas", "Aaron", "Caleb", "Gideon", "Samson", "Solomon", "Rehoboam", "Hezekiah", "Ezra", "Nehemiah", "Esther", "Ruth", "Naomi", "Deborah", "Hannah", "Sarah", "Rebecca", "Rachel", "Leah", "Miriam"];
const biblicalPlaces = ["Jerusalem", "Bethlehem", "Nazareth", "Jericho", "Egypt", "Babylon", "Damascus", "Samaria", "Galilee", "Capernaum", "Bethany", "Emmaus", "Antioch", "Corinth", "Ephesus", "Rome", "Athens", "Philippi", "Thessalonica", "Nineveh", "Ur", "Haran"];
const biblicalBooks = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "Psalms", "Proverbs", "Isaiah", "Jeremiah", "Ezekiel", "Daniel", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "Hebrews", "James", "1 Peter", "2 Peter", "Revelation"];
const numbers = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Forty", "Seventy"];

function generateWrongAnswers(correct: string, category: string, question: string): string[] {
  const wrong: string[] = [];
  const correctLower = correct.toLowerCase();
  
  // People questions - use biblical names
  if (category === "People" || question.includes("Who ")) {
    const candidates = biblicalNames.filter(name => 
      name.toLowerCase() !== correctLower && 
      !correct.includes(name) && 
      !name.includes(correct.split(" ")[0])
    );
    for (let i = 0; i < 3 && i < candidates.length; i++) {
      wrong.push(candidates[Math.floor(Math.random() * candidates.length)]);
    }
  }
  
  // Place questions
  else if (question.includes("Where ") || question.includes("place") || question.includes("city")) {
    const candidates = biblicalPlaces.filter(place => 
      place.toLowerCase() !== correctLower && !correct.includes(place)
    );
    for (let i = 0; i < 3 && i < candidates.length; i++) {
      wrong.push(candidates[Math.floor(Math.random() * candidates.length)]);
    }
  }
  
  // Book questions
  else if (category === "Books of the Bible" || question.includes("book")) {
    const candidates = biblicalBooks.filter(book => 
      book.toLowerCase() !== correctLower && !correct.includes(book)
    );
    for (let i = 0; i < 3 && i < candidates.length; i++) {
      wrong.push(candidates[Math.floor(Math.random() * candidates.length)]);
    }
  }
  
  // Number questions
  else if (question.includes("How many") || question.includes("Which day")) {
    if (correct.includes("Twelve") || correct.includes("12")) {
      wrong.push("Ten", "Seven", "Seventy");
    } else if (correct.includes("Five")) {
      wrong.push("Three loaves and two fish", "Seven loaves and two fish", "Four loaves and one fish");
    } else if (correct.includes("seventh")) {
      wrong.push("The sixth day", "The first day", "The third day");
    } else if (correct.includes("first day")) {
      wrong.push("The seventh day", "The third day", "Saturday");
    } else {
      const candidates = numbers.filter(num => !correct.includes(num));
      for (let i = 0; i < 3 && i < candidates.length; i++) {
        wrong.push(candidates[Math.floor(Math.random() * candidates.length)]);
      }
    }
  }
  
  // Generic/custom wrong answers based on the question
  else {
    // Specific wrong answers for common questions
    if (question.includes("water into")) {
      wrong.push("Bread", "Oil", "Milk");
    } else if (question.includes("ark")) {
      wrong.push("Abraham", "Moses", "Enoch");
    } else if (question.includes("Goliath")) {
      wrong.push("Saul", "Jonathan", "Samuel");
    } else if (question.includes("rainbow")) {
      wrong.push("A dove", "A cloud", "An altar");
    } else if (question.includes("Gospel")) {
      wrong.push("Great message", "God's word", "God's power");
    } else if (question.includes("greatest commandment")) {
      wrong.push("To love your neighbor as yourself", "To keep the Sabbath holy", "To honor your father and mother");
    } else if (question.includes("mediator")) {
      wrong.push("The Holy Spirit", "Moses", "The Church");
    } else if (question.includes("shepherd")) {
      wrong.push("Jesus", "David", "Moses");
    } else if (question.includes("way, the truth")) {
      wrong.push("The Holy Spirit", "The Father", "The Gospel");
    } else if (question.includes("wages of sin")) {
      wrong.push("Separation", "Punishment", "Hell");
    } else if (question.includes("saved")) {
      wrong.push("By faith alone", "By good works", "By repentance");
    } else if (question.includes("swallowed by")) {
      wrong.push("Elijah", "Jeremiah", "Amos");
    } else if (question.includes("valley of dry bones")) {
      wrong.push("Jeremiah", "Isaiah", "Daniel");
    } else if (question.includes("Melchizedek")) {
      wrong.push("Aaron", "Zadok", "Eli");
    } else {
      // Default wrong answers
      wrong.push("Unknown", "Not mentioned", "Unclear");
    }
  }
  
  // Ensure we have 3 unique wrong answers
  const uniqueWrong = Array.from(new Set(wrong));
  while (uniqueWrong.length < 3) {
    uniqueWrong.push(`Option ${uniqueWrong.length + 1}`);
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
    const correctIndex = 0;
    
    // Shuffle choices
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    // Find new position of correct answer after shuffle
    const finalCorrectIndex = choices.indexOf(q.correct_answer);
    
    converted.push({
      id: `q-${Date.now()}-${q.id}`,
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
const inputPath = path.join(__dirname, "..", "attached_assets", "bible_trivia_60_questions_1763657813219.json");
const outputPath = path.join(__dirname, "..", "data", "bible-trivia.json");

console.log("📖 Reading ChatGPT trivia questions...");
const rawData = fs.readFileSync(inputPath, "utf-8");
const chatgptQuestions: ChatGPTQuestion[] = JSON.parse(rawData);

console.log(`✓ Found ${chatgptQuestions.length} questions from ChatGPT`);

console.log("🔄 Converting to multiple-choice format...");
const convertedQuestions = convertQuestions(chatgptQuestions);

console.log(`✓ Converted ${convertedQuestions.length} questions`);
console.log("\n📊 Breakdown by level:");
const byLevel = convertedQuestions.reduce((acc, q) => {
  acc[q.level] = (acc[q.level] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

Object.entries(byLevel).forEach(([level, count]) => {
  console.log(`  ${level}: ${count} questions`);
});

console.log("\n💾 Writing to bible-trivia.json...");
fs.writeFileSync(outputPath, JSON.stringify(convertedQuestions, null, 2));

console.log("✅ Successfully replaced all trivia questions!");
console.log(`📁 Output: ${outputPath}`);
