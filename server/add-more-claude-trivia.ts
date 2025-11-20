import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ClaudeQuestion {
  id: number;
  question: string;
  answer: string;
  scripture: string;
  difficulty: "beginner" | "intermediate" | "expert";
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

// Common wrong answers for different question types
const biblicalNames = ["Moses", "Abraham", "Isaac", "Jacob", "Joseph", "Samuel", "Elijah", "Elisha", "Isaiah", "Jeremiah", "Paul", "John", "James", "Andrew", "Philip", "Matthew", "Mark", "Luke", "Timothy", "Barnabas", "Silas", "Aaron", "Caleb", "Gideon", "Samson", "Solomon", "David", "Saul", "Peter", "Thomas", "Bartholomew", "Stephen", "Apollos", "Titus", "Eutychus", "Nathan", "Daniel", "Ezekiel", "Hosea", "Joel", "Amos"];
const biblicalBooks = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "Revelation"];

function generateWrongAnswers(correct: string, category: string, question: string): string[] {
  const wrong: string[] = [];
  const correctLower = correct.toLowerCase();
  const qLower = question.toLowerCase();
  
  // Creation questions
  if (correct === "Light") {
    wrong.push("The heavens and earth", "The sun and moon", "Day and night");
  }
  // People questions
  else if (correct === "Eve") {
    wrong.push("Sarah", "Rebekah", "Rachel");
  }
  else if (correct === "A rainbow") {
    wrong.push("A dove", "An altar", "A covenant");
  }
  else if (correct === "His son Isaac") {
    wrong.push("A ram", "A lamb", "His firstborn");
  }
  else if (correct === "Rebekah") {
    wrong.push("Rachel", "Leah", "Sarah");
  }
  else if (correct === "Manna") {
    wrong.push("Quail", "Bread", "Grain");
  }
  else if (correct === "The rock at Horeb") {
    wrong.push("A rod", "The ground", "A stone tablet");
  }
  else if (correct === "Zacchaeus") {
    wrong.push("Matthew", "Levi", "Nicodemus");
  }
  else if (correct === "Helped an injured man") {
    wrong.push("Gave money to the poor", "Preached to the crowd", "Healed the sick");
  }
  else if (correct === "Mary") {
    wrong.push("Elizabeth", "Martha", "Mary Magdalene");
  }
  else if (correct === "A donkey") {
    wrong.push("A horse", "A camel", "A colt");
  }
  else if (correct === "30") {
    wrong.push("20", "40", "50");
  }
  else if (correct === "An angel") {
    wrong.push("Peter", "Mary Magdalene", "The disciples");
  }
  else if (correct === "The Gospels") {
    wrong.push("The Epistles", "The Prophets", "The Writings");
  }
  else if (correct === "Amen") {
    wrong.push("Forever", "The End", "Hallelujah");
  }
  else if (correct === "His birthright") {
    wrong.push("His blessing", "His inheritance", "His father's love");
  }
  else if (correct === "Aaron and Miriam") {
    wrong.push("Joshua and Caleb", "Nadab and Abihu", "Eleazar and Ithamar");
  }
  else if (correct === "His hair") {
    wrong.push("His beard", "His strength", "His chains");
  }
  else if (correct === "Philistine") {
    wrong.push("Moabite", "Ammonite", "Edomite");
  }
  else if (correct === "Gopher wood (or cypress)") {
    wrong.push("Cedar", "Acacia", "Oak");
  }
  else if (correct === "A serpent") {
    wrong.push("A snake", "A staff", "Water");
  }
  else if (correct === "Hannah") {
    wrong.push("Rachel", "Leah", "Rebekah");
  }
  else if (correct === "Samuel") {
    wrong.push("Saul", "David", "Elijah");
  }
  else if (correct === "Elhanan") {
    wrong.push("David", "Jonathan", "Abishai");
  }
  else if (correct === "Wisdom and understanding") {
    wrong.push("Riches and honor", "Long life", "Victory over enemies");
  }
  else if (correct === "Jesse") {
    wrong.push("Saul", "Samuel", "Eliab");
  }
  else if (correct === "Elijah") {
    wrong.push("Elisha", "Isaiah", "Jeremiah");
  }
  else if (correct === "Jerusalem") {
    wrong.push("Babylon", "Jericho", "Samaria");
  }
  else if (correct === "Nehemiah") {
    wrong.push("Ezra", "Zerubbabel", "Haggai");
  }
  else if (correct === "Approach the king without being summoned") {
    wrong.push("Save her people", "Reveal Haman's plot", "Fast for three days");
  }
  else if (correct === "Mordecai") {
    wrong.push("Haman", "Ahasuerus", "Xerxes");
  }
  else if (correct === "Psalms") {
    wrong.push("Proverbs", "Ecclesiastes", "Song of Solomon");
  }
  else if (correct === "Solomon (primarily)") {
    wrong.push("David", "Moses", "Isaiah");
  }
  else if (correct === "Am I my brother's keeper?") {
    wrong.push("I do not know", "He is in the field", "He went away");
  }
  else if (correct === "40 years") {
    wrong.push("7 years", "20 years", "70 years");
  }
  else if (correct === "Simon") {
    wrong.push("Andrew", "Cephas", "Jonah");
  }
  else if (correct === "James and John") {
    wrong.push("Peter and Andrew", "Philip and Bartholomew", "Matthew and Thomas");
  }
  else if (correct === "Caiaphas") {
    wrong.push("Annas", "Pilate", "Herod");
  }
  else if (correct === "The centurion of Capernaum") {
    wrong.push("Cornelius", "Julius", "The centurion at the cross");
  }
  else if (correct === "Lazarus") {
    wrong.push("The rich man", "The beggar", "The leper");
  }
  else if (correct === "Nicodemus") {
    wrong.push("Joseph of Arimathea", "Gamaliel", "Caiaphas");
  }
  else if (correct === "The Samaritan woman (unnamed)") {
    wrong.push("Mary Magdalene", "Martha", "Mary of Bethany");
  }
  else if (correct === "Tentmaker") {
    wrong.push("Fisherman", "Tax collector", "Physician");
  }
  else if (correct === "Barnabas") {
    wrong.push("Silas", "Timothy", "Titus");
  }
  else if (correct === "Eunice") {
    wrong.push("Lois", "Priscilla", "Lydia");
  }
  else if (correct === "Luke") {
    wrong.push("Paul", "Mark", "Matthew");
  }
  else if (correct === "They were unnamed in Scripture") {
    wrong.push("Dismas and Gestas", "Barabbas and Judas", "Simon and Alexander");
  }
  else if (correct === "7") {
    wrong.push("12", "10", "5");
  }
  else if (correct === "Seller of purple cloth") {
    wrong.push("Merchant", "Businesswoman", "Weaver");
  }
  else if (correct === "Joshua") {
    wrong.push("Caleb", "Aaron", "Eleazar");
  }
  else if (correct === "Lot") {
    wrong.push("Nahor", "Haran", "Terah");
  }
  else if (correct === "Shem, Ham, and Japheth") {
    wrong.push("Cain, Abel, and Seth", "Isaac, Ishmael, and Esau", "Reuben, Simeon, and Levi");
  }
  else if (correct === "Melchizedek") {
    wrong.push("Abimelech", "Lot", "Mamre");
  }
  else if (correct === "Esau") {
    wrong.push("Jacob", "Ishmael", "Esau's son");
  }
  else if (correct === "Jethro (also called Reuel)") {
    wrong.push("Aaron", "Hobab", "Zipporah's father");
  }
  else if (correct === "Achsah") {
    wrong.push("Deborah", "Jael", "Rahab");
  }
  else if (correct === "Ehud") {
    wrong.push("Gideon", "Shamgar", "Othniel");
  }
  else if (correct === "Deborah") {
    wrong.push("Jael", "Miriam", "Huldah");
  }
  else if (correct === "Abner") {
    wrong.push("Joab", "Abishai", "Amasa");
  }
  else if (correct === "Absalom") {
    wrong.push("Amnon", "Adonijah", "Solomon");
  }
  else if (correct === "Joab") {
    wrong.push("Abner", "Abishai", "Asahel");
  }
  else if (correct === "Zimri") {
    wrong.push("Omri", "Ahab", "Tibni");
  }
  else if (correct === "Jezebel") {
    wrong.push("Athaliah", "Bathsheba", "Michal");
  }
  else if (correct === "Josiah") {
    wrong.push("Hezekiah", "Manasseh", "Amon");
  }
  else if (correct === "She is unnamed in Scripture") {
    wrong.push("Sarah", "Rachel", "Dinah");
  }
  else if (correct === "Nebuchadnezzar") {
    wrong.push("Belshazzar", "Darius", "Cyrus");
  }
  else if (correct === "Hosea") {
    wrong.push("Amos", "Joel", "Micah");
  }
  else if (correct === "Zechariah") {
    wrong.push("Zacharias", "Simeon", "Joseph");
  }
  else if (correct === "A garden near Golgotha (unnamed)") {
    wrong.push("Garden of Gethsemane", "Joseph's garden", "The King's garden");
  }
  else if (correct === "Thomas (called Didymus)") {
    wrong.push("James the Less", "Thaddaeus", "Simon the Zealot");
  }
  else if (correct === "Quirinius") {
    wrong.push("Pilate", "Herod", "Caesar Augustus");
  }
  else if (correct === "Simon of Cyrene") {
    wrong.push("Simon Peter", "Simon the Zealot", "Simon the leper");
  }
  
  // Default fallback - use biblical names if answer contains a name
  else if (biblicalNames.some(name => correctLower.includes(name.toLowerCase()))) {
    const candidates = biblicalNames.filter(name => 
      name.toLowerCase() !== correctLower && !correct.includes(name)
    );
    const shuffled = candidates.sort(() => Math.random() - 0.5);
    wrong.push(...shuffled.slice(0, 3));
  }
  // Default for other types
  else {
    wrong.push("Not mentioned", "Unknown", "Not specified");
  }
  
  // Ensure we have exactly 3 unique wrong answers
  const uniqueWrong = Array.from(new Set(wrong));
  while (uniqueWrong.length < 3) {
    uniqueWrong.push(`Alternative ${uniqueWrong.length + 1}`);
  }
  
  return uniqueWrong.slice(0, 3);
}

function convertQuestions(claudeQuestions: ClaudeQuestion[]): TriviaQuestion[] {
  const converted: TriviaQuestion[] = [];
  
  for (const q of claudeQuestions) {
    // Map difficulty to level (expert -> advanced)
    const level = 
      q.difficulty === "beginner" ? "beginner" :
      q.difficulty === "intermediate" ? "intermediate" :
      "advanced";
    
    // Generate wrong answers
    const wrongAnswers = generateWrongAnswers(q.answer, q.category, q.question);
    
    // Create choices array and randomize position
    const choices = [q.answer, ...wrongAnswers];
    
    // Shuffle choices
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    // Find new position of correct answer after shuffle
    const finalCorrectIndex = choices.indexOf(q.answer);
    
    // Generate explanation
    const explanation = `According to ${q.scripture}, the answer is ${q.answer}.`;
    
    converted.push({
      id: `q-claude2-${Date.now()}-${q.id}`,
      level,
      question: q.question,
      choices,
      correctIndex: finalCorrectIndex,
      reference: q.scripture,
      explanation,
      category: q.category
    });
  }
  
  return converted;
}

// Main execution
const inputPath = path.join(__dirname, "..", "attached_assets", "Pasted--questions-id-76-question-What-did-God-create-on-the-first-day-1763661636659_1763661636660.txt");
const existingDataPath = path.join(__dirname, "..", "data", "bible-trivia.json");
const outputPath = path.join(__dirname, "..", "data", "bible-trivia.json");

console.log("📖 Reading new Claude.ai trivia questions...");
const rawData = fs.readFileSync(inputPath, "utf-8");
const data = JSON.parse(rawData);
const claudeQuestions: ClaudeQuestion[] = data.questions;

console.log(`✓ Found ${claudeQuestions.length} new questions from Claude.ai (IDs 76-150)`);

console.log("📖 Reading existing trivia questions...");
const existingData = fs.readFileSync(existingDataPath, "utf-8");
const existingQuestions: TriviaQuestion[] = JSON.parse(existingData);
console.log(`✓ Found ${existingQuestions.length} existing questions`);

console.log("🔄 Converting new Claude.ai questions to multiple-choice format...");
const convertedQuestions = convertQuestions(claudeQuestions);

console.log(`✓ Converted ${convertedQuestions.length} new Claude.ai questions`);

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

console.log("✅ Successfully added new Claude.ai questions!");
console.log(`📁 Output: ${outputPath}`);
console.log(`\n🎯 New total: ${allQuestions.length} questions`);
