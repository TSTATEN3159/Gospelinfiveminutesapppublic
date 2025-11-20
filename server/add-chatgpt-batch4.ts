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
const biblicalNames = ["Moses", "Abraham", "Isaac", "Jacob", "Joseph", "Samuel", "Elijah", "Elisha", "Isaiah", "Jeremiah", "Paul", "John", "James", "Andrew", "Philip", "Matthew", "Mark", "Luke", "Timothy", "Barnabas", "Silas", "Aaron", "Caleb", "Gideon", "Samson", "Solomon", "David", "Saul", "Peter", "Thomas", "Stephen"];
const biblicalBooks = ["Genesis", "Exodus", "Leviticus", "Psalms", "Proverbs", "Isaiah", "Jeremiah", "Ezekiel", "Daniel", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "Galatians", "Ephesians", "Philippians", "James", "1 Peter", "Revelation", "Ezra", "Nehemiah", "Malachi"];

function generateWrongAnswers(correct: string, category: string, question: string): string[] {
  const wrong: string[] = [];
  const correctLower = correct.toLowerCase();
  const qLower = question.toLowerCase();
  
  // Parables questions
  if (category === "Parables") {
    if (correct === "Ten thousand talents" || correct === "10,000 talents") {
      wrong.push("One hundred denarii", "Five thousand talents", "One million denarii");
    } else if (correct === "The kingdom of heaven" || correct === "The kingdom") {
      wrong.push("Faith", "The church", "God's love");
    } else if (correct === "'Behold, the bridegroom is coming'" || correct === "Behold, the bridegroom is coming" || correct === "The bridegroom is coming") {
      wrong.push("Wake up and pray", "The master is here", "Prepare the feast");
    } else if (correct === "Because he acted shrewdly" || correct === "He acted wisely") {
      wrong.push("Because he was honest", "Because he repented", "Because he was faithful");
    } else if (correct === "A robe, a ring, and sandals") {
      wrong.push("A feast and celebration", "Gold and silver", "New clothes only");
    } else if (correct === "The world") {
      wrong.push("The church", "Israel", "The kingdom");
    } else {
      wrong.push("The church", "Faith", "The kingdom");
    }
  }
  
  // Doctrine questions
  else if (category === "Doctrine") {
    if (correct === "Living and powerful" || correct === "Alive and active") {
      wrong.push("Ancient and wise", "Holy and perfect", "True and eternal");
    } else if (correct === "Inspiration of God" || correct === "God's inspiration" || correct === "God-breathed") {
      wrong.push("Human wisdom", "Divine revelation only", "Apostolic tradition");
    } else if (correct === "To visit orphans and widows in their trouble and keep oneself unspotted from the world") {
      wrong.push("To attend church regularly", "To pray without ceasing", "To give generously to the poor");
    } else if (correct === "All have sinned and fall short of the glory of God" || correct === "All have sinned") {
      wrong.push("Only some have sinned", "Most people are good", "Only unbelievers have sinned");
    } else if (correct === "The right to become children of God" || correct === "To become children of God") {
      wrong.push("Eternal life in heaven", "The right to judge others", "Authority over creation");
    } else if (correct === "All the fullness of the Godhead" || correct === "The fullness of God" || correct === "Fullness of the Godhead") {
      wrong.push("The Holy Spirit only", "Divine wisdom", "God's glory");
    } else {
      wrong.push("By faith", "Through grace", "By works");
    }
  }
  
  // People questions
  else if (category === "People") {
    if (correct === "Jacob" || correct === "Israel") {
      wrong.push("Isaac", "Esau", "Joseph");
    } else if (correct === "Samuel") {
      wrong.push("Eli", "Saul", "David");
    } else if (correct === "Elijah") {
      wrong.push("Elisha", "Nathan", "Isaiah");
    } else if (correct === "Samson") {
      wrong.push("Gideon", "Jephthah", "Deborah");
    } else if (correct === "The Queen of Sheba" || correct === "Queen of Sheba") {
      wrong.push("Queen Jezebel", "Queen Esther", "Queen Vashti");
    } else {
      const candidates = biblicalNames.filter(name => 
        name.toLowerCase() !== correctLower && !correct.includes(name)
      );
      const shuffled = candidates.sort(() => Math.random() - 0.5);
      wrong.push(...shuffled.slice(0, 3));
    }
  }
  
  // Apostles & Early Church
  else if (category === "Apostles & Early Church") {
    if (correct === "Peter") {
      wrong.push("John", "James", "Andrew");
    } else if (correct === "Stephen") {
      wrong.push("Philip", "Paul", "Barnabas");
    } else if (correct === "James the son of Zebedee" || correct === "James") {
      wrong.push("John", "Peter", "Andrew");
    } else if (correct === "Philip") {
      wrong.push("Peter", "Stephen", "Barnabas");
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
    } else if (correct === "Malachi") {
      wrong.push("Zechariah", "Haggai", "Zephaniah");
    } else if (correct === "Luke") {
      wrong.push("Matthew", "Mark", "John");
    } else if (correct === "Ezra") {
      wrong.push("Nehemiah", "Esther", "Daniel");
    } else {
      const candidates = biblicalBooks.filter(book => 
        book.toLowerCase() !== correctLower && !correct.includes(book)
      );
      const shuffled = candidates.sort(() => Math.random() - 0.5);
      wrong.push(...shuffled.slice(0, 3));
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
      id: `q-chatgpt4-${Date.now()}-${q.id}`,
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
const inputPath = path.join(__dirname, "..", "attached_assets", "Pasted--id-124-difficulty-Difficult-category-Parables-question-In--1763662107851_1763662107852.txt");
const existingDataPath = path.join(__dirname, "..", "data", "bible-trivia.json");
const outputPath = path.join(__dirname, "..", "data", "bible-trivia.json");

console.log("📖 Reading new ChatGPT trivia questions...");
const rawData = fs.readFileSync(inputPath, "utf-8");

// Parse the file - it contains individual JSON objects separated by commas
// We need to wrap it in an array
const jsonArrayString = "[" + rawData + "]";
const chatgptQuestions: ChatGPTQuestion[] = JSON.parse(jsonArrayString);

console.log(`✓ Found ${chatgptQuestions.length} new questions from ChatGPT (IDs 124-150)`);

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
