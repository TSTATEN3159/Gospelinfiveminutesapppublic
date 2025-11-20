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
const biblicalNames = ["Moses", "Abraham", "Isaac", "Jacob", "Joseph", "Samuel", "Elijah", "Elisha", "Isaiah", "Jeremiah", "Paul", "John", "James", "Andrew", "Philip", "Matthew", "Mark", "Luke", "Timothy", "Barnabas", "Silas", "Aaron", "Caleb", "Gideon", "Samson", "Solomon", "David", "Saul", "Peter", "Thomas", "Stephen", "Zechariah", "Nathan", "Ananias", "Cornelius", "Deborah"];
const biblicalBooks = ["Genesis", "Exodus", "Leviticus", "Psalms", "Proverbs", "Isaiah", "Jeremiah", "Ezekiel", "Daniel", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "Galatians", "Ephesians", "Philippians", "James", "1 Peter", "Revelation", "Ezra", "Nehemiah", "Malachi", "Judges", "Ruth"];

function generateWrongAnswers(correct: string, category: string, question: string): string[] {
  const wrong: string[] = [];
  const correctLower = correct.toLowerCase();
  const qLower = question.toLowerCase();
  
  // Doctrine questions
  if (category === "Doctrine") {
    if (correct === "The Light of the world" || correct === "Light of the world") {
      wrong.push("The Bread of Life", "The Door of the sheep", "The True Vine");
    } else if (correct === "The Good Shepherd" || correct === "Good Shepherd") {
      wrong.push("The Great Shepherd", "The Chief Shepherd", "The Door of the sheep");
    } else if (correct === "The power of God to salvation" || correct === "Power of God to salvation") {
      wrong.push("The wisdom of God", "The message of hope", "The way to heaven");
    } else if (correct === "Jesus" || correct === "Christ") {
      wrong.push("God the Father", "The Holy Spirit", "The prophets");
    } else if (correct === "Those who are led by the Spirit of God" || correct === "Led by the Spirit of God") {
      wrong.push("All who believe", "Those who do good works", "Those who obey the law");
    } else if (correct === "The precious blood of Christ" || correct === "Christ's blood") {
      wrong.push("Silver and gold", "Good works", "Faith alone");
    } else {
      wrong.push("By faith", "Through grace", "By works");
    }
  }
  
  // Apostles & Early Church
  else if (category === "Apostles & Early Church") {
    if (correct === "Peter (with John)" || correct === "Peter" || correct === "Peter and John") {
      wrong.push("John", "James", "Andrew");
    } else if (correct === "Cornelius") {
      wrong.push("Felix", "Festus", "Julius");
    } else if (correct === "Saul") {
      wrong.push("Paul", "Simon", "Stephen");
    } else if (correct === "Ananias") {
      wrong.push("Barnabas", "Silas", "Timothy");
    } else if (correct === "John" || correct === "The apostle John") {
      wrong.push("Peter", "James", "Paul");
    } else if (correct === "Simon" || correct === "Simon the sorcerer" || correct === "Simon Magus") {
      wrong.push("Philip", "Peter", "Stephen");
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
    if (correct === "Jonah") {
      wrong.push("Elijah", "Jeremiah", "Ezekiel");
    } else if (correct === "Solomon" || correct === "King Solomon") {
      wrong.push("David", "Saul", "Rehoboam");
    } else if (correct === "Deborah") {
      wrong.push("Esther", "Ruth", "Miriam");
    } else if (correct === "Zechariah" || correct === "Zacharias") {
      wrong.push("Simeon", "Joseph", "Eli");
    } else if (correct === "Aaron") {
      wrong.push("Moses", "Joshua", "Eleazar");
    } else if (correct === "Nathan" || correct === "The prophet Nathan") {
      wrong.push("Samuel", "Gad", "Elijah");
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
    if (correct === "Psalms" || correct === "The Book of Psalms") {
      wrong.push("Proverbs", "Song of Solomon", "Ecclesiastes");
    } else if (correct === "Acts" || correct === "The Acts of the Apostles") {
      wrong.push("Romans", "1 Corinthians", "Galatians");
    } else if (correct === "Judges") {
      wrong.push("Ruth", "1 Samuel", "Joshua");
    } else if (correct === "Ezekiel") {
      wrong.push("Jeremiah", "Daniel", "Isaiah");
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
    if (correct === "He ran to him and embraced him" || correct === "He ran to him") {
      wrong.push("He waited at the door", "He sent a servant", "He called the whole family");
    } else if (correct === "He buried it in the ground" || correct === "Buried it") {
      wrong.push("He invested it", "He gave it to the poor", "He doubled it");
    } else if (correct === "The wicked one" || correct === "Satan" || correct === "The devil") {
      wrong.push("Persecution", "Worldly cares", "Thorns");
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
      id: `q-chatgpt5-${Date.now()}-${q.id}`,
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
const inputPath = path.join(__dirname, "..", "attached_assets", "Pasted--id-151-difficulty-Easy-category-Doctrine-question-Accordin-1763662291413_1763662291414.txt");
const existingDataPath = path.join(__dirname, "..", "data", "bible-trivia.json");
const outputPath = path.join(__dirname, "..", "data", "bible-trivia.json");

console.log("📖 Reading new ChatGPT trivia questions...");
const rawData = fs.readFileSync(inputPath, "utf-8");

// Parse the file - it contains individual JSON objects separated by commas
// We need to wrap it in an array
const jsonArrayString = "[" + rawData + "]";
const chatgptQuestions: ChatGPTQuestion[] = JSON.parse(jsonArrayString);

console.log(`✓ Found ${chatgptQuestions.length} new questions from ChatGPT (IDs 151-175)`);

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
