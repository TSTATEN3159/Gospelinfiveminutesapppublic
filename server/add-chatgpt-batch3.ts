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
const biblicalNames = ["Moses", "Abraham", "Isaac", "Jacob", "Joseph", "Samuel", "Elijah", "Elisha", "Isaiah", "Jeremiah", "Paul", "John", "James", "Andrew", "Philip", "Matthew", "Mark", "Luke", "Timothy", "Barnabas", "Silas", "Aaron", "Caleb", "Gideon", "Samson", "Solomon", "David", "Saul", "Peter", "Thomas", "Bartholomew", "Stephen", "Apollos", "Titus"];
const biblicalBooks = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "Psalms", "Proverbs", "Isaiah", "Jeremiah", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "Galatians", "Ephesians", "Philippians", "James", "1 Peter", "Revelation"];

function generateWrongAnswers(correct: string, category: string, question: string): string[] {
  const wrong: string[] = [];
  const correctLower = correct.toLowerCase();
  const qLower = question.toLowerCase();
  
  // Doctrine questions
  if (category === "Doctrine") {
    if (correct === "The Man Christ Jesus" || correct === "Jesus Christ") {
      wrong.push("The Holy Spirit", "The prophets", "The apostles");
    } else if (correct === "A lamp to my feet and a light to my path") {
      wrong.push("A sword for battle", "A shield of protection", "A crown of glory");
    } else if (correct === "The Holy Spirit") {
      wrong.push("The apostles", "The prophets", "God the Father");
    } else if (correct === "Christ died for us while we were still sinners" || correct === "Christ died for us") {
      wrong.push("He gave us the law", "He sent prophets to guide us", "He created the world for us");
    } else if (correct === "Our faith is futile and we are still in our sins") {
      wrong.push("We would still have hope", "We could still be saved", "The gospel would still be true");
    } else {
      wrong.push("By faith alone", "Through grace", "By works");
    }
  }
  
  // Apostles & Early Church
  else if (category === "Apostles & Early Church") {
    if (correct === "Tentmaker") {
      wrong.push("Fisherman", "Tax collector", "Carpenter");
    } else if (correct === "John") {
      wrong.push("Peter", "James", "Andrew");
    } else if (correct === "Philip") {
      wrong.push("Peter", "Stephen", "Barnabas");
    } else if (correct === "Thomas") {
      wrong.push("Peter", "John", "James");
    } else if (correct === "Paul") {
      wrong.push("Peter", "John", "James");
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
      wrong.push("Solomon", "Saul", "Samuel");
    } else if (correct === "Job") {
      wrong.push("Abraham", "Noah", "Joseph");
    } else if (correct === "Solomon") {
      wrong.push("David", "Saul", "Hezekiah");
    } else if (correct === "Jephthah") {
      wrong.push("Gideon", "Samson", "Jair");
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
    if (correct === "Exodus") {
      wrong.push("Leviticus", "Numbers", "Deuteronomy");
    } else if (correct === "Song of Solomon") {
      wrong.push("Psalms", "Proverbs", "Ecclesiastes");
    } else if (correct === "John") {
      wrong.push("Matthew", "Mark", "Luke");
    } else if (correct === "James") {
      wrong.push("1 Peter", "1 John", "Jude");
    } else if (correct === "Deuteronomy") {
      wrong.push("Exodus", "Leviticus", "Numbers");
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
    if (correct === "It stood firm" || correct === "It did not fall") {
      wrong.push("It fell down", "It was damaged", "It needed repairs");
    } else if (correct === "Oil") {
      wrong.push("Water", "Wine", "Incense");
    } else if (correct === "The Parable of the Hidden Treasure") {
      wrong.push("The Parable of the Pearl", "The Parable of the Sower", "The Parable of the Talents");
    } else if (correct === "Ten" || correct === "10") {
      wrong.push("Five", "Twelve", "Seven");
    } else {
      wrong.push("The world", "False teachers", "Persecution");
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
      id: `q-chatgpt3-${Date.now()}-${q.id}`,
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
const inputPath = path.join(__dirname, "..", "attached_assets", "Pasted--id-101-difficulty-Easy-category-Doctrine-question-Who-is-t-1763661984992_1763661984992.txt");
const existingDataPath = path.join(__dirname, "..", "data", "bible-trivia.json");
const outputPath = path.join(__dirname, "..", "data", "bible-trivia.json");

console.log("📖 Reading new ChatGPT trivia questions...");
const rawData = fs.readFileSync(inputPath, "utf-8");

// Parse the file - it contains individual JSON objects separated by commas
// We need to wrap it in an array
const jsonArrayString = "[" + rawData + "]";
const chatgptQuestions: ChatGPTQuestion[] = JSON.parse(jsonArrayString);

console.log(`✓ Found ${chatgptQuestions.length} new questions from ChatGPT (IDs 101-123)`);

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
