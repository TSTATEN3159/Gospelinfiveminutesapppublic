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
const biblicalNames = ["Moses", "Abraham", "Isaac", "Jacob", "Joseph", "Samuel", "Elijah", "Elisha", "Isaiah", "Jeremiah", "Paul", "John", "James", "Andrew", "Philip", "Matthew", "Mark", "Luke", "Timothy", "Barnabas", "Silas", "Aaron", "Caleb", "Gideon", "Samson", "Solomon", "David", "Saul", "Peter", "Thomas", "Bartholomew", "Stephen", "Apollos", "Titus", "Eutychus"];
const biblicalBooks = ["Genesis", "Exodus", "Leviticus", "Psalms", "Proverbs", "Isaiah", "Jeremiah", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "Hebrews", "James", "1 Peter", "2 Peter", "Revelation", "Daniel", "Ezekiel", "Nehemiah", "Jonah", "Habakkuk", "Lamentations"];

function generateWrongAnswers(correct: string, category: string, question: string): string[] {
  const wrong: string[] = [];
  const correctLower = correct.toLowerCase();
  const qLower = question.toLowerCase();
  
  // Doctrine questions
  if (category === "Doctrine") {
    if (correct === "So that whoever believes in Him should not perish but have everlasting life") {
      wrong.push("To condemn the world", "To show His power", "To establish a kingdom");
    } else if (correct === "The Lord Jesus" || correct === "Jesus is Lord") {
      wrong.push("The Gospel", "The cross", "The Holy Spirit");
    } else if (correct === "He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness") {
      wrong.push("He remembers our sins no more", "He casts our sins into the sea", "He covers our sins with His blood");
    } else if (correct === "Jesus Christ" && qLower.includes("redemption")) {
      wrong.push("The Holy Spirit", "The Father", "God's grace");
    } else if (correct === "By faith, not by sight") {
      wrong.push("By works, not by grace", "By love, not by knowledge", "By hope, not by despair");
    } else if (correct === "In Christ Jesus") {
      wrong.push("In the church", "In the Spirit", "In God's love");
    } else if (correct === "By faith in the Son of God") {
      wrong.push("By the law", "By grace alone", "By the Spirit");
    } else if (correct === "According to His mercy" || correct === "By His mercy") {
      wrong.push("By our faith", "By God's grace", "By His power");
    } else if (correct === "The Holy Spirit") {
      wrong.push("God the Father", "Jesus Christ", "The Word of God");
    } else if (correct === "To please God") {
      wrong.push("To be saved", "To enter heaven", "To do good works");
    } else if (correct === "Christ" && qLower.includes("head")) {
      wrong.push("The Holy Spirit", "The apostles", "The elders");
    } else {
      wrong.push("By faith", "By grace", "Through prayer");
    }
  }
  
  // People questions
  else if (category === "People" || category === "Apostles & Early Church") {
    if (correct === "Peter") {
      wrong.push("John", "James", "Andrew");
    } else if (correct === "Matthias") {
      wrong.push("Barnabas", "Silas", "Timothy");
    } else if (correct === "Saul") {
      wrong.push("Stephen", "Philip", "Barnabas");
    } else if (correct === "Barnabas") {
      wrong.push("Silas", "Timothy", "Titus");
    } else if (correct === "Eutychus") {
      wrong.push("Timothy", "Titus", "Apollos");
    } else if (correct === "John Mark" || correct === "Mark") {
      wrong.push("Luke", "Matthew", "Timothy");
    } else if (correct === "Seven men (often called deacons)" || correct === "Seven men") {
      wrong.push("Twelve apostles", "Seventy disciples", "Elders");
    } else if (correct === "Joseph") {
      wrong.push("Benjamin", "Judah", "Reuben");
    } else if (correct === "Moses") {
      wrong.push("Aaron", "Joshua", "Caleb");
    } else if (correct === "Elisha") {
      wrong.push("Elijah", "Isaiah", "Jeremiah");
    } else if (correct === "Ruth") {
      wrong.push("Naomi", "Esther", "Deborah");
    } else if (correct === "Eli") {
      wrong.push("Samuel", "Saul", "Aaron");
    } else if (correct === "Esther" || correct === "Queen Esther") {
      wrong.push("Vashti", "Ruth", "Deborah");
    } else if (correct === "Lydia") {
      wrong.push("Priscilla", "Mary", "Martha");
    } else if (correct === "Ananias and Sapphira") {
      wrong.push("Aquila and Priscilla", "Joseph and Mary", "Zacharias and Elizabeth");
    } else {
      const candidates = biblicalNames.filter(name => 
        name.toLowerCase() !== correctLower && !correct.includes(name)
      );
      const shuffled = candidates.sort(() => Math.random() - 0.5);
      wrong.push(...shuffled.slice(0, 3));
    }
  }
  
  // Books questions
  else if (category === "Books of the Bible") {
    if (correct === "Matthew" || correct === "The Gospel of Matthew") {
      wrong.push("Mark", "Luke", "John");
    } else if (correct === "1 Samuel") {
      wrong.push("2 Samuel", "1 Kings", "Judges");
    } else if (correct === "Acts" || correct === "The Acts of the Apostles") {
      wrong.push("Luke", "Romans", "1 Corinthians");
    } else if (correct === "Lamentations") {
      wrong.push("Jeremiah", "Isaiah", "Ezekiel");
    } else if (correct === "Jonah") {
      wrong.push("Nahum", "Micah", "Habakkuk");
    } else if (correct === "Philippians") {
      wrong.push("Ephesians", "Colossians", "1 Thessalonians");
    } else if (correct === "Habakkuk") {
      wrong.push("Nahum", "Zephaniah", "Haggai");
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
    if (correct === "The Parable of the Lost Sheep" || correct === "Parable of the Lost Sheep") {
      wrong.push("The Parable of the Lost Coin", "The Parable of the Prodigal Son", "The Parable of the Good Shepherd");
    } else if (correct === "The Samaritan" || correct === "A Samaritan") {
      wrong.push("The priest", "The Levite", "A merchant");
    } else if (correct === "The cares, riches, and pleasures of life") {
      wrong.push("Persecution and tribulation", "False teachers", "The world");
    } else if (correct === "They traded with them and gained more talents") {
      wrong.push("They buried them for safekeeping", "They gave them to the poor", "They kept them for themselves");
    } else if (correct === "The enemy, the devil" || correct === "The devil") {
      wrong.push("False prophets", "The world", "Evil spirits");
    } else if (correct === "In Abraham's bosom" || correct === "Abraham's bosom") {
      wrong.push("In paradise", "In heaven", "At God's throne");
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
      id: `q-chatgpt2-${Date.now()}-${q.id}`,
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
const inputPath = path.join(__dirname, "..", "attached_assets", "Pasted--id-61-difficulty-Easy-category-Doctrine-question-Acco-1763660989914_1763660989915.txt");
const existingDataPath = path.join(__dirname, "..", "data", "bible-trivia.json");
const outputPath = path.join(__dirname, "..", "data", "bible-trivia.json");

console.log("📖 Reading new ChatGPT trivia questions...");
const rawData = fs.readFileSync(inputPath, "utf-8");
const chatgptQuestions: ChatGPTQuestion[] = JSON.parse(rawData);

console.log(`✓ Found ${chatgptQuestions.length} new questions from ChatGPT (IDs 61-100)`);

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
