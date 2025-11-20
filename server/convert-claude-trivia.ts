import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ClaudeQuestion {
  id: number;
  question: string;
  answer: string;
  category: string;
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

// Wrong answer pools for different question types
const biblicalNames = ["Moses", "Abraham", "Isaac", "Jacob", "Joseph", "Samuel", "Elijah", "Elisha", "Isaiah", "Jeremiah", "Paul", "John", "James", "Andrew", "Philip", "Matthew", "Mark", "Luke", "Timothy", "Barnabas", "Silas", "Aaron", "Caleb", "Gideon", "Samson", "Solomon", "David", "Saul", "Peter", "Thomas", "Bartholomew"];
const biblicalPlaces = ["Jerusalem", "Bethlehem", "Nazareth", "Jericho", "Egypt", "Babylon", "Damascus", "Samaria", "Galilee", "Capernaum", "Bethany", "Emmaus", "Antioch", "Corinth", "Ephesus", "Rome", "Athens", "Sodom", "Gomorrah", "Nineveh"];
const biblicalBooks = ["Genesis", "Exodus", "Leviticus", "Psalms", "Proverbs", "Isaiah", "Jeremiah", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "Revelation", "Daniel", "Ezekiel"];

function inferDifficulty(question: string, answer: string): "beginner" | "intermediate" | "advanced" {
  const qLower = question.toLowerCase();
  const aLower = answer.toLowerCase();
  
  // Advanced questions - specific details, numbers, technical terms
  if (
    qLower.includes("how old") ||
    qLower.includes("how many books") ||
    qLower.includes("what language") ||
    qLower.includes("pentateuch") ||
    qLower.includes("methuselah") ||
    qLower.includes("matthias") ||
    qLower.includes("patmos") ||
    qLower.includes("uriah") ||
    qLower.includes("shadrach") ||
    answer.includes("969") ||
    answer.includes("Shadrach") ||
    answer.includes("Matthias")
  ) {
    return "advanced";
  }
  
  // Intermediate questions - require some knowledge
  if (
    qLower.includes("what instrument") ||
    qLower.includes("occupation") ||
    qLower.includes("replaced") ||
    qLower.includes("successor") ||
    qLower.includes("what woman") ||
    qLower.includes("queen") ||
    qLower.includes("mother-in-law") ||
    qLower.includes("name changed") ||
    qLower.includes("road to") ||
    qLower.includes("interpret") ||
    qLower.includes("name before")
  ) {
    return "intermediate";
  }
  
  // Beginner questions - basic Bible knowledge
  return "beginner";
}

function generateWrongAnswers(correct: string, question: string, category: string): string[] {
  const wrong: string[] = [];
  const qLower = question.toLowerCase();
  const correctLower = correct.toLowerCase();
  
  // Number-based questions
  if (qLower.includes("how many")) {
    if (correct === "6 days") {
      wrong.push("7 days", "5 days", "8 days");
    } else if (correct === "10") {
      wrong.push("7", "12", "40");
    } else if (correct === "12") {
      wrong.push("10", "7", "11");
    } else if (correct === "3 days") {
      wrong.push("2 days", "7 days", "40 days");
    } else if (correct === "40 days") {
      wrong.push("3 days", "7 days", "50 days");
    } else if (correct === "66") {
      wrong.push("65", "67", "70");
    } else if (correct === "39") {
      wrong.push("38", "40", "27");
    } else if (correct === "27") {
      wrong.push("26", "28", "39");
    } else if (correct === "969 years old") {
      wrong.push("950 years old", "930 years old", "777 years old");
    } else {
      wrong.push("7", "12", "40");
    }
  }
  
  // People questions
  else if (qLower.includes("who ")) {
    if (correct === "Mary and Joseph") {
      wrong.push("Elizabeth and Zechariah", "Abraham and Sarah", "Isaac and Rebecca");
    } else if (correct === "Shadrach, Meshach, and Abednego") {
      wrong.push("Daniel, Ezra, and Nehemiah", "Peter, James, and John", "Abraham, Isaac, and Jacob");
    } else {
      const candidates = biblicalNames.filter(name => 
        name.toLowerCase() !== correctLower && !correct.includes(name)
      );
      const shuffled = candidates.sort(() => Math.random() - 0.5);
      wrong.push(...shuffled.slice(0, 3));
    }
  }
  
  // Place questions
  else if (qLower.includes("where") || qLower.includes("what town") || qLower.includes("what city") || qLower.includes("what garden") || qLower.includes("what river") || qLower.includes("what sea") || qLower.includes("what island") || qLower.includes("what mountain")) {
    if (correct === "The Red Sea") {
      wrong.push("The Mediterranean Sea", "The Dead Sea", "The Sea of Galilee");
    } else if (correct === "The Nile River") {
      wrong.push("The Jordan River", "The Euphrates River", "The Tigris River");
    } else if (correct === "Garden of Eden") {
      wrong.push("Garden of Gethsemane", "Garden of Solomon", "Hanging Gardens of Babylon");
    } else if (correct === "Garden of Gethsemane") {
      wrong.push("Garden of Eden", "Olive Garden", "Solomon's Garden");
    } else if (correct === "Mount of Transfiguration (or Mount Tabor)") {
      wrong.push("Mount Sinai", "Mount Carmel", "Mount of Olives");
    } else {
      const candidates = biblicalPlaces.filter(place => 
        place.toLowerCase() !== correctLower && !correct.includes(place)
      );
      const shuffled = candidates.sort(() => Math.random() - 0.5);
      wrong.push(...shuffled.slice(0, 3));
    }
  }
  
  // Book questions
  else if (qLower.includes("what book") || qLower.includes("what are the first five books")) {
    if (correct === "The Pentateuch or Torah") {
      wrong.push("The Gospels", "The Prophets", "The Epistles");
    } else {
      const candidates = biblicalBooks.filter(book => 
        book.toLowerCase() !== correctLower && !correct.includes(book)
      );
      const shuffled = candidates.sort(() => Math.random() - 0.5);
      wrong.push(...shuffled.slice(0, 3));
    }
  }
  
  // Language questions
  else if (qLower.includes("what language")) {
    if (correct === "Hebrew") {
      wrong.push("Aramaic", "Greek", "Latin");
    } else if (correct === "Greek") {
      wrong.push("Hebrew", "Aramaic", "Latin");
    }
  }
  
  // Specific answer questions
  else if (correct === "Wine") {
    wrong.push("Bread", "Oil", "Milk");
  } else if (correct === "A sling and stone") {
    wrong.push("A sword", "A spear", "A bow and arrow");
  } else if (correct === "Gold, frankincense, and myrrh") {
    wrong.push("Silver, gold, and jewels", "Bread, wine, and oil", "Sheep, cattle, and doves");
  } else if (correct === "Jesus wept") {
    wrong.push("God is love", "Rejoice always", "Jesus saves");
  } else if (correct === "Water") {
    wrong.push("Air", "Fire", "Clouds");
  } else if (correct === "5 loaves and 2 fish") {
    wrong.push("7 loaves and 2 fish", "3 loaves and 5 fish", "12 loaves and 2 fish");
  } else if (correct === "The Temple") {
    wrong.push("The Palace", "The Ark", "The Tabernacle");
  } else if (correct === "Dreams") {
    wrong.push("Visions", "Prophecies", "Languages");
  } else if (correct === "Tax collector") {
    wrong.push("Fisherman", "Carpenter", "Tentmaker");
  } else if (correct === "The Holy Spirit came upon the disciples") {
    wrong.push("Jesus ascended to heaven", "The temple veil was torn", "The disciples received power");
  } else if (correct === "Sunday") {
    wrong.push("Saturday", "Friday", "Monday");
  } else if (correct === "The Sermon on the Mount") {
    wrong.push("The Sermon on the Plain", "The Olivet Discourse", "The Great Commission");
  } else if (correct === "The Lord's Prayer") {
    wrong.push("The Beatitudes", "The Great Commission", "The Golden Rule");
  } else if (correct === "Do unto others as you would have them do unto you") {
    wrong.push("Love your enemies", "Turn the other cheek", "Give to the poor");
  } else if (correct === "A ladder reaching to heaven") {
    wrong.push("Angels ascending and descending", "A burning bush", "A pillar of fire");
  } else if (correct === "Blood (goat's blood)") {
    wrong.push("Mud", "Wine", "Ink");
  } else if (correct === "The harp (or lyre)") {
    wrong.push("The trumpet", "The flute", "The drum");
  } else if (correct === "Road to Damascus") {
    wrong.push("Road to Emmaus", "Road to Jericho", "Road to Jerusalem");
  }
  
  // Default fallback
  else {
    wrong.push("Not specified", "Unknown", "Not mentioned in the Bible");
  }
  
  // Ensure we have exactly 3 unique wrong answers
  const uniqueWrong = Array.from(new Set(wrong));
  while (uniqueWrong.length < 3) {
    uniqueWrong.push(`Alternative answer ${uniqueWrong.length + 1}`);
  }
  
  return uniqueWrong.slice(0, 3);
}

function convertClaudeQuestions(claudeQuestions: ClaudeQuestion[]): TriviaQuestion[] {
  const converted: TriviaQuestion[] = [];
  
  for (const q of claudeQuestions) {
    const level = inferDifficulty(q.question, q.answer);
    const wrongAnswers = generateWrongAnswers(q.answer, q.question, q.category);
    
    // Create choices array with correct answer and wrong answers
    const choices = [q.answer, ...wrongAnswers];
    
    // Shuffle choices
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    // Find position of correct answer after shuffle
    const correctIndex = choices.indexOf(q.answer);
    
    converted.push({
      id: `q-claude-${Date.now()}-${q.id}`,
      level,
      question: q.question,
      choices,
      correctIndex,
      reference: q.category, // Using category as reference since we don't have specific verses
      explanation: `Biblical knowledge question from the ${q.category}.`,
      category: q.category
    });
  }
  
  return converted;
}

// Main execution
const inputPath = path.join(__dirname, "..", "attached_assets", "Pasted--questions-id-1-question-How-many-days-did-God-take-to-create--1763660685010_1763660685011.txt");
const existingDataPath = path.join(__dirname, "..", "data", "bible-trivia.json");
const outputPath = path.join(__dirname, "..", "data", "bible-trivia.json");

console.log("📖 Reading Claude.ai trivia questions...");
const rawData = fs.readFileSync(inputPath, "utf-8");
const claudeData = JSON.parse(rawData);
const claudeQuestions: ClaudeQuestion[] = claudeData.questions;

console.log(`✓ Found ${claudeQuestions.length} questions from Claude.ai`);

console.log("📖 Reading existing ChatGPT questions...");
const existingData = fs.readFileSync(existingDataPath, "utf-8");
const existingQuestions: TriviaQuestion[] = JSON.parse(existingData);
console.log(`✓ Found ${existingQuestions.length} existing ChatGPT questions`);

console.log("🔄 Converting Claude.ai questions to multiple-choice format...");
const convertedQuestions = convertClaudeQuestions(claudeQuestions);

console.log(`✓ Converted ${convertedQuestions.length} Claude.ai questions`);

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

console.log("\nBreakdown by source:");
console.log(`  ChatGPT: ${existingQuestions.length} questions`);
console.log(`  Claude.ai: ${convertedQuestions.length} questions`);

console.log("\n💾 Writing combined questions to bible-trivia.json...");
fs.writeFileSync(outputPath, JSON.stringify(allQuestions, null, 2));

console.log("✅ Successfully added Claude.ai questions!");
console.log(`📁 Output: ${outputPath}`);
