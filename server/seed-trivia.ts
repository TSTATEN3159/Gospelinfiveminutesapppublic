import { db } from "./db";
import { triviaQuestions, type InsertTriviaQuestion } from "@shared/schema";

async function seedTriviaQuestions() {
  console.log("🎯 Starting trivia questions seed...");

  // Delete existing trivia questions
  console.log("Clearing existing trivia questions...");
  await db.delete(triviaQuestions);

  // Easy questions (10)
  const easyQuestions: Omit<InsertTriviaQuestion, 'id' | 'createdAt'>[] = [
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who built the ark to survive the great flood?",
      options: ["Moses", "Noah", "Abraham", "David"],
      correctAnswer: 1,
      verseReference: "GEN.6.19",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did God create on the first day?",
      options: ["Animals", "Light", "Plants", "Humans"],
      correctAnswer: 1,
      verseReference: "GEN.1.3",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was swallowed by a great fish?",
      options: ["Jonah", "Job", "Joshua", "Jeremiah"],
      correctAnswer: 0,
      verseReference: "JON.1.17",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "How many disciples did Jesus choose?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      verseReference: "MAT.10.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did Jesus turn water into at the wedding?",
      options: ["Bread", "Wine", "Oil", "Honey"],
      correctAnswer: 1,
      verseReference: "JHN.2.9",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who betrayed Jesus with a kiss?",
      options: ["Peter", "John", "Judas", "Thomas"],
      correctAnswer: 2,
      verseReference: "MAT.26.49",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What were the names of Adam and Eve's first two sons?",
      options: ["Cain and Abel", "Jacob and Esau", "Isaac and Ishmael", "Peter and Andrew"],
      correctAnswer: 0,
      verseReference: "GEN.4.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "How many days and nights did it rain during the flood?",
      options: ["30", "40", "50", "60"],
      correctAnswer: 1,
      verseReference: "GEN.7.12",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did Moses part to help the Israelites escape Egypt?",
      options: ["The Jordan River", "The Red Sea", "The Dead Sea", "The Mediterranean Sea"],
      correctAnswer: 1,
      verseReference: "EXO.14.21",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was the strongest man in the Bible?",
      options: ["David", "Goliath", "Samson", "Solomon"],
      correctAnswer: 2,
      verseReference: "JDG.16.17",
      isActive: true
    }
  ];

  // Medium questions (10)
  const mediumQuestions: Omit<InsertTriviaQuestion, 'id' | 'createdAt'>[] = [
    {
      language: 'en',
      difficulty: 'medium',
      question: "Which king of Israel was known for his wisdom?",
      options: ["David", "Solomon", "Saul", "Hezekiah"],
      correctAnswer: 1,
      verseReference: "1KI.3.12",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What was Paul's name before his conversion?",
      options: ["Silas", "Saul", "Simon", "Stephen"],
      correctAnswer: 1,
      verseReference: "ACT.13.9",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "How many plagues did God send upon Egypt?",
      options: ["7", "8", "9", "10"],
      correctAnswer: 3,
      verseReference: "EXO.7.14",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Which prophet was taken up to heaven in a whirlwind?",
      options: ["Elijah", "Elisha", "Isaiah", "Ezekiel"],
      correctAnswer: 0,
      verseReference: "2KI.2.11",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who interpreted Pharaoh's dreams about seven fat and seven lean cows?",
      options: ["Daniel", "Joseph", "Moses", "Aaron"],
      correctAnswer: 1,
      verseReference: "GEN.41.25",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What was the name of the garden where Adam and Eve lived?",
      options: ["Eden", "Gethsemane", "Olive", "Paradise"],
      correctAnswer: 0,
      verseReference: "GEN.2.8",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Which woman helped the Israelite spies in Jericho?",
      options: ["Ruth", "Rahab", "Rachel", "Rebecca"],
      correctAnswer: 1,
      verseReference: "JOS.2.4",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who wrote the majority of the Psalms?",
      options: ["Solomon", "Moses", "David", "Asaph"],
      correctAnswer: 2,
      verseReference: "PSA.18.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "How many books are in the New Testament?",
      options: ["24", "25", "26", "27"],
      correctAnswer: 3,
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Which apostle was a tax collector before following Jesus?",
      options: ["Peter", "Matthew", "James", "John"],
      correctAnswer: 1,
      verseReference: "MAT.9.9",
      isActive: true
    }
  ];

  // Difficult questions (10)
  const difficultQuestions: Omit<InsertTriviaQuestion, 'id' | 'createdAt'>[] = [
    {
      language: 'en',
      difficulty: 'difficult',
      question: "In which book of the Bible is the story of Job found?",
      options: ["Psalms", "Proverbs", "Job", "Ecclesiastes"],
      correctAnswer: 2,
      verseReference: "JOB.1.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many generations are listed from Abraham to Jesus in Matthew's genealogy?",
      options: ["37", "38", "39", "40"],
      correctAnswer: 2,
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which king of Babylon saw the writing on the wall?",
      options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
      correctAnswer: 1,
      verseReference: "DAN.5.5",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the name of Abraham's nephew who was saved from Sodom?",
      options: ["Isaac", "Ishmael", "Lot", "Laban"],
      correctAnswer: 2,
      verseReference: "GEN.19.16",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which apostle replaced Judas Iscariot?",
      options: ["Matthias", "Mark", "Luke", "Barnabas"],
      correctAnswer: 0,
      verseReference: "ACT.1.26",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many years did Methuselah live?",
      options: ["929", "949", "959", "969"],
      correctAnswer: 3,
      verseReference: "GEN.5.27",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which judge of Israel made a foolish vow concerning his daughter?",
      options: ["Gideon", "Jephthah", "Samson", "Samuel"],
      correctAnswer: 1,
      verseReference: "JDG.11.30",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the original language of most of the Old Testament?",
      options: ["Greek", "Latin", "Hebrew", "Aramaic"],
      correctAnswer: 2,
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which city was Jonah told to go to preach?",
      options: ["Babylon", "Nineveh", "Damascus", "Tyre"],
      correctAnswer: 1,
      verseReference: "JON.1.2",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many silver pieces did Judas receive for betraying Jesus?",
      options: ["20", "25", "30", "35"],
      correctAnswer: 2,
      verseReference: "MAT.26.15",
      isActive: true
    }
  ];

  // Insert all questions
  const allQuestions = [...easyQuestions, ...mediumQuestions, ...difficultQuestions];
  
  console.log(`Inserting ${allQuestions.length} trivia questions...`);
  await db.insert(triviaQuestions).values(allQuestions);

  console.log("✅ Trivia questions seed complete!");
  console.log(`   - ${easyQuestions.length} easy questions`);
  console.log(`   - ${mediumQuestions.length} medium questions`);
  console.log(`   - ${difficultQuestions.length} difficult questions`);
  console.log(`   - Total: ${allQuestions.length} questions`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedTriviaQuestions()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Seed failed:", error);
      process.exit(1);
    });
}

export { seedTriviaQuestions };
