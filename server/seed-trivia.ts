import { db } from "./db";
import { triviaQuestions, type InsertTriviaQuestion } from "@shared/schema";

async function seedTriviaQuestions() {
  console.log("🎯 Starting trivia questions seed...");

  console.log("Clearing existing trivia questions...");
  await db.delete(triviaQuestions);

  // EASY QUESTIONS (50 total)
  const easyQuestions: Omit<InsertTriviaQuestion, 'id' | 'createdAt'>[] = [
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who built the ark to survive the great flood?",
      options: ["Moses", "Noah", "Abraham", "David"],
      correctAnswer: 1,
      hint: "His name rhymes with 'boat'",
      verseReference: "GEN.6.19",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did God create on the first day?",
      options: ["Animals", "Light", "Plants", "Humans"],
      correctAnswer: 1,
      hint: "Think of what came before everything else",
      verseReference: "GEN.1.3",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was swallowed by a great fish?",
      options: ["Jonah", "Job", "Joshua", "Jeremiah"],
      correctAnswer: 0,
      hint: "He tried to run away from God",
      verseReference: "JON.1.17",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "How many disciples did Jesus choose?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      hint: "Same number as the tribes of Israel",
      verseReference: "MAT.10.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did Jesus turn water into at the wedding?",
      options: ["Bread", "Wine", "Oil", "Honey"],
      correctAnswer: 1,
      hint: "This was His first miracle",
      verseReference: "JHN.2.9",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who betrayed Jesus with a kiss?",
      options: ["Peter", "John", "Judas", "Thomas"],
      correctAnswer: 2,
      hint: "He was one of the twelve disciples",
      verseReference: "MAT.26.49",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What were the names of Adam and Eve's first two sons?",
      options: ["Cain and Abel", "Jacob and Esau", "Isaac and Ishmael", "Peter and Andrew"],
      correctAnswer: 0,
      hint: "One killed the other",
      verseReference: "GEN.4.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "How many days and nights did it rain during the flood?",
      options: ["30", "40", "50", "60"],
      correctAnswer: 1,
      hint: "This number appears many times in the Bible",
      verseReference: "GEN.7.12",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did Moses part to help the Israelites escape Egypt?",
      options: ["The Jordan River", "The Red Sea", "The Dead Sea", "The Mediterranean Sea"],
      correctAnswer: 1,
      hint: "The color is in its name",
      verseReference: "EXO.14.21",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was the strongest man in the Bible?",
      options: ["David", "Goliath", "Samson", "Solomon"],
      correctAnswer: 2,
      hint: "His strength was in his hair",
      verseReference: "JDG.16.17",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who killed Goliath?",
      options: ["David", "Samuel", "Saul", "Jonathan"],
      correctAnswer: 0,
      hint: "He later became king",
      verseReference: "1SA.17.50",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was the first man God created?",
      options: ["Noah", "Abraham", "Adam", "Moses"],
      correctAnswer: 2,
      hint: "He lived in the Garden of Eden",
      verseReference: "GEN.2.7",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did God use to destroy the earth in Noah's time?",
      options: ["Fire", "Flood", "Earthquake", "Plague"],
      correctAnswer: 1,
      hint: "It involved lots of water",
      verseReference: "GEN.7.17",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was Jesus' mother?",
      options: ["Martha", "Mary", "Elizabeth", "Sarah"],
      correctAnswer: 1,
      hint: "Her name starts with 'M'",
      verseReference: "LUK.1.30",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "In what town was Jesus born?",
      options: ["Jerusalem", "Nazareth", "Bethlehem", "Capernaum"],
      correctAnswer: 2,
      hint: "A famous star appeared over this town",
      verseReference: "MAT.2.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "How many days was Jesus in the wilderness?",
      options: ["10", "20", "30", "40"],
      correctAnswer: 3,
      hint: "Same number of days it rained during the flood",
      verseReference: "MAT.4.2",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who baptized Jesus?",
      options: ["Peter", "John the Baptist", "James", "Paul"],
      correctAnswer: 1,
      hint: "His name describes what he did",
      verseReference: "MAT.3.13",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What is the first book of the Bible?",
      options: ["Exodus", "Genesis", "Psalms", "Matthew"],
      correctAnswer: 1,
      hint: "It means 'beginning'",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What is the last book of the Bible?",
      options: ["Revelation", "Jude", "3 John", "Acts"],
      correctAnswer: 0,
      hint: "It's about the end times",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "How many commandments did God give Moses?",
      options: ["5", "7", "10", "12"],
      correctAnswer: 2,
      hint: "Count on your fingers",
      verseReference: "EXO.20.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was Abraham's wife?",
      options: ["Rachel", "Rebecca", "Sarah", "Ruth"],
      correctAnswer: 2,
      hint: "She laughed when told she'd have a baby",
      verseReference: "GEN.17.15",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did Jacob give to Joseph that made his brothers jealous?",
      options: ["A ring", "A coat", "A sword", "A crown"],
      correctAnswer: 1,
      hint: "It had many colors",
      verseReference: "GEN.37.3",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who led the Israelites out of Egypt?",
      options: ["Joshua", "Moses", "Aaron", "David"],
      correctAnswer: 1,
      hint: "He parted the Red Sea",
      verseReference: "EXO.3.10",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What animal spoke to Balaam?",
      options: ["A donkey", "A serpent", "A dove", "A raven"],
      correctAnswer: 0,
      hint: "It's a stubborn animal",
      verseReference: "NUM.22.28",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What bird brought food to Elijah?",
      options: ["Eagles", "Doves", "Ravens", "Sparrows"],
      correctAnswer: 2,
      hint: "They're large black birds",
      verseReference: "1KI.17.6",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "How many brothers did Joseph have?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 1,
      hint: "Twelve sons total, minus Joseph",
      verseReference: "GEN.35.22",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who climbed a tree to see Jesus?",
      options: ["Peter", "Zacchaeus", "Matthew", "Nathanael"],
      correctAnswer: 1,
      hint: "He was short and a tax collector",
      verseReference: "LUK.19.4",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did Jesus walk on?",
      options: ["Water", "Clouds", "Mountains", "Desert"],
      correctAnswer: 0,
      hint: "The disciples were in a boat",
      verseReference: "MAT.14.25",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was the father of Jesus on Earth?",
      options: ["Joseph", "Zechariah", "Simeon", "John"],
      correctAnswer: 0,
      hint: "He was a carpenter",
      verseReference: "MAT.1.19",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did Jesus feed the 5,000 with?",
      options: ["Fish and bread", "Manna", "Wine and bread", "Quail and bread"],
      correctAnswer: 0,
      hint: "A boy brought his lunch",
      verseReference: "JHN.6.9",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who denied Jesus three times?",
      options: ["John", "Peter", "Thomas", "James"],
      correctAnswer: 1,
      hint: "Jesus predicted he would do this",
      verseReference: "MAT.26.75",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "On what day did God rest?",
      options: ["Fifth", "Sixth", "Seventh", "First"],
      correctAnswer: 2,
      hint: "It became the Sabbath",
      verseReference: "GEN.2.2",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did Eve eat in the Garden of Eden?",
      options: ["An apple", "Fruit from the forbidden tree", "Grapes", "Figs"],
      correctAnswer: 1,
      hint: "It wasn't allowed",
      verseReference: "GEN.3.6",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who wrote most of the New Testament letters?",
      options: ["Peter", "James", "Paul", "John"],
      correctAnswer: 2,
      hint: "His name used to be Saul",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What city walls fell down after the Israelites marched around them?",
      options: ["Jerusalem", "Bethlehem", "Jericho", "Babylon"],
      correctAnswer: 2,
      hint: "They marched for seven days",
      verseReference: "JOS.6.20",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was the wisest king of Israel?",
      options: ["David", "Solomon", "Saul", "Hezekiah"],
      correctAnswer: 1,
      hint: "God gave him wisdom when he asked",
      verseReference: "1KI.3.12",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did the dove bring back to Noah?",
      options: ["A twig", "An olive branch", "A flower", "Nothing"],
      correctAnswer: 1,
      hint: "It's a symbol of peace",
      verseReference: "GEN.8.11",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "How many people were saved on Noah's ark?",
      options: ["2", "4", "6", "8"],
      correctAnswer: 3,
      hint: "Noah, his wife, his sons, and their wives",
      verseReference: "GEN.7.13",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was the first king of Israel?",
      options: ["David", "Solomon", "Saul", "Samuel"],
      correctAnswer: 2,
      hint: "Later he became jealous of David",
      verseReference: "1SA.10.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What sea did Jesus calm during a storm?",
      options: ["Red Sea", "Dead Sea", "Sea of Galilee", "Mediterranean Sea"],
      correctAnswer: 2,
      hint: "The disciples were fishing there",
      verseReference: "MAR.4.39",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was thrown into a den of lions?",
      options: ["David", "Daniel", "Joseph", "Jeremiah"],
      correctAnswer: 1,
      hint: "God shut the lions' mouths",
      verseReference: "DAN.6.16",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was the disciple that doubted Jesus' resurrection?",
      options: ["Peter", "John", "Thomas", "Andrew"],
      correctAnswer: 2,
      hint: "He wanted to see Jesus' wounds",
      verseReference: "JHN.20.25",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What language was the New Testament originally written in?",
      options: ["Hebrew", "Aramaic", "Greek", "Latin"],
      correctAnswer: 2,
      hint: "The common language of the Roman Empire",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was the oldest man in the Bible?",
      options: ["Adam", "Noah", "Methuselah", "Abraham"],
      correctAnswer: 2,
      hint: "He lived 969 years",
      verseReference: "GEN.5.27",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did God send to feed the Israelites in the desert?",
      options: ["Bread", "Manna", "Fish", "Quail"],
      correctAnswer: 1,
      hint: "It appeared on the ground each morning",
      verseReference: "EXO.16.15",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was swallowed up by the earth for rebelling?",
      options: ["Korah", "Esau", "Cain", "Absalom"],
      correctAnswer: 0,
      hint: "He challenged Moses' authority",
      verseReference: "NUM.16.32",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What did John the Baptist eat in the wilderness?",
      options: ["Fish", "Manna", "Locusts and honey", "Bread"],
      correctAnswer: 2,
      hint: "Not a typical diet",
      verseReference: "MAT.3.4",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was raised from the dead by Jesus in Bethany?",
      options: ["Jairus' daughter", "The widow's son", "Lazarus", "Dorcas"],
      correctAnswer: 2,
      hint: "He was the brother of Mary and Martha",
      verseReference: "JHN.11.43",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "What animal did Jesus ride into Jerusalem?",
      options: ["A horse", "A donkey", "A camel", "A mule"],
      correctAnswer: 1,
      hint: "It's a humble animal",
      verseReference: "MAT.21.7",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'easy',
      question: "Who was the tax collector who climbed a sycamore tree?",
      options: ["Matthew", "Zacchaeus", "Levi", "Simon"],
      correctAnswer: 1,
      hint: "He was short in stature",
      verseReference: "LUK.19.2",
      isActive: true
    }
  ];

  // MEDIUM QUESTIONS (50 total)
  const mediumQuestions: Omit<InsertTriviaQuestion, 'id' | 'createdAt'>[] = [
    {
      language: 'en',
      difficulty: 'medium',
      question: "Which king of Israel was known for his wisdom?",
      options: ["David", "Solomon", "Saul", "Hezekiah"],
      correctAnswer: 1,
      hint: "He asked God for wisdom instead of riches",
      verseReference: "1KI.3.12",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What was Paul's name before his conversion?",
      options: ["Silas", "Saul", "Simon", "Stephen"],
      correctAnswer: 1,
      hint: "He persecuted Christians before becoming one",
      verseReference: "ACT.13.9",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "How many plagues did God send upon Egypt?",
      options: ["7", "8", "9", "10"],
      correctAnswer: 3,
      hint: "The last one was the death of firstborn",
      verseReference: "EXO.7.14",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Which prophet was taken up to heaven in a whirlwind?",
      options: ["Elijah", "Elisha", "Isaiah", "Ezekiel"],
      correctAnswer: 0,
      hint: "He never died; God took him directly",
      verseReference: "2KI.2.11",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who interpreted Pharaoh's dreams about seven fat and seven lean cows?",
      options: ["Daniel", "Joseph", "Moses", "Aaron"],
      correctAnswer: 1,
      hint: "He was sold into slavery by his brothers",
      verseReference: "GEN.41.25",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What was the name of the garden where Adam and Eve lived?",
      options: ["Eden", "Gethsemane", "Olive", "Paradise"],
      correctAnswer: 0,
      hint: "It was eastward in this location",
      verseReference: "GEN.2.8",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Which woman helped the Israelite spies in Jericho?",
      options: ["Ruth", "Rahab", "Rachel", "Rebecca"],
      correctAnswer: 1,
      hint: "She hung a scarlet cord in her window",
      verseReference: "JOS.2.4",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who wrote the majority of the Psalms?",
      options: ["Solomon", "Moses", "David", "Asaph"],
      correctAnswer: 2,
      hint: "He was called 'a man after God's own heart'",
      verseReference: "PSA.18.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "How many books are in the New Testament?",
      options: ["24", "25", "26", "27"],
      correctAnswer: 3,
      hint: "From Matthew to Revelation",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Which apostle was a tax collector before following Jesus?",
      options: ["Peter", "Matthew", "James", "John"],
      correctAnswer: 1,
      hint: "He also wrote a Gospel",
      verseReference: "MAT.9.9",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was the mother of John the Baptist?",
      options: ["Mary", "Elizabeth", "Anna", "Hannah"],
      correctAnswer: 1,
      hint: "She was Mary's relative",
      verseReference: "LUK.1.13",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Which disciple walked on water with Jesus?",
      options: ["John", "Peter", "Andrew", "James"],
      correctAnswer: 1,
      hint: "He began to sink when he doubted",
      verseReference: "MAT.14.29",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What was the occupation of Luke?",
      options: ["Fisherman", "Tax collector", "Physician", "Tentmaker"],
      correctAnswer: 2,
      hint: "He wrote detailed medical observations",
      verseReference: "COL.4.14",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who succeeded Moses as leader of Israel?",
      options: ["Aaron", "Joshua", "Caleb", "Samuel"],
      correctAnswer: 1,
      hint: "He led them into the Promised Land",
      verseReference: "JOS.1.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What did Esau sell to Jacob?",
      options: ["His coat", "His birthright", "His land", "His animals"],
      correctAnswer: 1,
      hint: "He traded it for a bowl of stew",
      verseReference: "GEN.25.33",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was the first martyr of the Christian church?",
      options: ["Peter", "Paul", "Stephen", "James"],
      correctAnswer: 2,
      hint: "He was stoned to death",
      verseReference: "ACT.7.59",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "How many years did the Israelites wander in the wilderness?",
      options: ["20", "30", "40", "50"],
      correctAnswer: 2,
      hint: "One year for each day the spies explored Canaan",
      verseReference: "NUM.14.33",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What did Delilah cut to make Samson weak?",
      options: ["His beard", "His hair", "His nails", "His robe"],
      correctAnswer: 1,
      hint: "It was the source of his strength",
      verseReference: "JDG.16.19",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was David's best friend?",
      options: ["Samuel", "Solomon", "Jonathan", "Nathan"],
      correctAnswer: 2,
      hint: "He was Saul's son",
      verseReference: "1SA.18.3",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What did Moses' staff turn into?",
      options: ["A sword", "A serpent", "A rod of fire", "A tree"],
      correctAnswer: 1,
      hint: "It demonstrated God's power to Pharaoh",
      verseReference: "EXO.4.3",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was Ruth's mother-in-law?",
      options: ["Rachel", "Rebecca", "Naomi", "Hannah"],
      correctAnswer: 2,
      hint: "Ruth refused to leave her",
      verseReference: "RUT.1.16",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What did God provide for Abraham to sacrifice instead of Isaac?",
      options: ["A lamb", "A ram", "A goat", "A dove"],
      correctAnswer: 1,
      hint: "It was caught in a thicket",
      verseReference: "GEN.22.13",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "How many fish did the disciples catch after Jesus' resurrection?",
      options: ["100", "120", "153", "200"],
      correctAnswer: 2,
      hint: "It's a specific number mentioned in John",
      verseReference: "JHN.21.11",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who built the first temple in Jerusalem?",
      options: ["David", "Solomon", "Hezekiah", "Josiah"],
      correctAnswer: 1,
      hint: "His father gathered the materials",
      verseReference: "1KI.6.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What was the name of Moses' sister?",
      options: ["Deborah", "Miriam", "Rachel", "Leah"],
      correctAnswer: 1,
      hint: "She watched over baby Moses in the basket",
      verseReference: "EXO.15.20",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was the king of Judah when Jesus was born?",
      options: ["Herod", "Pilate", "Caesar", "Agrippa"],
      correctAnswer: 0,
      hint: "He ordered the killing of baby boys",
      verseReference: "MAT.2.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What tribe was Paul from?",
      options: ["Judah", "Levi", "Benjamin", "Ephraim"],
      correctAnswer: 2,
      hint: "The smallest of the twelve tribes",
      verseReference: "ROM.11.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was the judge who asked God for a sign with a fleece?",
      options: ["Samson", "Gideon", "Jephthah", "Deborah"],
      correctAnswer: 1,
      hint: "He defeated the Midianites with 300 men",
      verseReference: "JDG.6.37",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "How many sons did Jacob have?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      hint: "They became the twelve tribes of Israel",
      verseReference: "GEN.35.22",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who baptized the Ethiopian eunuch?",
      options: ["Peter", "Philip", "Paul", "Barnabas"],
      correctAnswer: 1,
      hint: "He was one of the seven deacons",
      verseReference: "ACT.8.38",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What did the priests carry in front of the Israelites when crossing the Jordan?",
      options: ["The Ten Commandments", "The Ark of the Covenant", "A golden calf", "Aaron's rod"],
      correctAnswer: 1,
      hint: "It contained the Ten Commandments",
      verseReference: "JOS.3.14",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was the Roman governor who sentenced Jesus to death?",
      options: ["Herod", "Pilate", "Felix", "Festus"],
      correctAnswer: 1,
      hint: "He washed his hands of the decision",
      verseReference: "MAT.27.2",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What sea did the Israelites cross to escape Egypt?",
      options: ["Dead Sea", "Red Sea", "Mediterranean Sea", "Sea of Galilee"],
      correctAnswer: 1,
      hint: "Moses parted it",
      verseReference: "EXO.14.21",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was the cupbearer to the king of Persia who rebuilt Jerusalem's walls?",
      options: ["Ezra", "Nehemiah", "Daniel", "Mordecai"],
      correctAnswer: 1,
      hint: "He led the rebuilding in 52 days",
      verseReference: "NEH.2.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What kind of tree did Zacchaeus climb?",
      options: ["Fig", "Olive", "Sycamore", "Cedar"],
      correctAnswer: 2,
      hint: "It's mentioned specifically in Luke",
      verseReference: "LUK.19.4",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was the high priest when Jesus was arrested?",
      options: ["Annas", "Caiaphas", "Ananias", "Alexander"],
      correctAnswer: 1,
      hint: "Jesus was taken to his house first",
      verseReference: "MAT.26.57",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "How many times did the Israelites march around Jericho on the seventh day?",
      options: ["3", "5", "7", "10"],
      correctAnswer: 2,
      hint: "A perfect number in the Bible",
      verseReference: "JOS.6.15",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was the woman judge who led Israel?",
      options: ["Esther", "Ruth", "Deborah", "Miriam"],
      correctAnswer: 2,
      hint: "She sat under a palm tree",
      verseReference: "JDG.4.4",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What island was Paul shipwrecked on?",
      options: ["Cyprus", "Crete", "Malta", "Rhodes"],
      correctAnswer: 2,
      hint: "The natives showed unusual kindness",
      verseReference: "ACT.28.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who said 'Here am I, send me'?",
      options: ["Jeremiah", "Isaiah", "Ezekiel", "Daniel"],
      correctAnswer: 1,
      hint: "He had a vision in the temple",
      verseReference: "ISA.6.8",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What did Jesus write in the sand?",
      options: ["The Ten Commandments", "Names", "Unknown", "A message"],
      correctAnswer: 2,
      hint: "The Bible doesn't tell us",
      verseReference: "JHN.8.6",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "How many pieces of silver was Joseph sold for?",
      options: ["10", "20", "30", "40"],
      correctAnswer: 1,
      hint: "Less than Judas received",
      verseReference: "GEN.37.28",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was the mother of Samuel?",
      options: ["Sarah", "Hannah", "Rachel", "Leah"],
      correctAnswer: 1,
      hint: "She prayed for a son at the temple",
      verseReference: "1SA.1.20",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What was the name of Abraham's first son?",
      options: ["Isaac", "Ishmael", "Jacob", "Esau"],
      correctAnswer: 1,
      hint: "His mother was Hagar",
      verseReference: "GEN.16.15",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was the king after Solomon?",
      options: ["Rehoboam", "Jeroboam", "David", "Asa"],
      correctAnswer: 0,
      hint: "The kingdom split during his reign",
      verseReference: "1KI.11.43",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "How many lepers did Jesus heal who came back to thank Him?",
      options: ["1", "2", "5", "10"],
      correctAnswer: 0,
      hint: "Only one out of ten returned",
      verseReference: "LUK.17.17",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who was sold as a slave and became second in command in Egypt?",
      options: ["Moses", "Joseph", "Daniel", "David"],
      correctAnswer: 1,
      hint: "His brothers sold him",
      verseReference: "GEN.41.40",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "What weapon did David use to kill Goliath?",
      options: ["A sword", "A spear", "A sling", "An arrow"],
      correctAnswer: 2,
      hint: "He picked up five smooth stones",
      verseReference: "1SA.17.50",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Where did Jesus perform his first miracle?",
      options: ["Jerusalem", "Bethlehem", "Cana", "Nazareth"],
      correctAnswer: 2,
      hint: "It was at a wedding",
      verseReference: "JHN.2.11",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'medium',
      question: "Who found baby Moses in the basket?",
      options: ["Pharaoh's daughter", "Pharaoh's wife", "A Hebrew woman", "Moses' sister"],
      correctAnswer: 0,
      hint: "She adopted him as her own",
      verseReference: "EXO.2.5",
      isActive: true
    }
  ];

  // DIFFICULT QUESTIONS (50 total)
  const difficultQuestions: Omit<InsertTriviaQuestion, 'id' | 'createdAt'>[] = [
    {
      language: 'en',
      difficulty: 'difficult',
      question: "In which book of the Bible is the story of Job found?",
      options: ["Psalms", "Proverbs", "Job", "Ecclesiastes"],
      correctAnswer: 2,
      hint: "It's named after him",
      verseReference: "JOB.1.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many generations are listed from Abraham to Jesus in Matthew's genealogy?",
      options: ["37", "38", "39", "40"],
      correctAnswer: 2,
      hint: "Matthew organizes them in three sets of fourteen",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which king of Babylon saw the writing on the wall?",
      options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
      correctAnswer: 1,
      hint: "Daniel interpreted the message",
      verseReference: "DAN.5.5",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the name of Abraham's nephew who was saved from Sodom?",
      options: ["Isaac", "Ishmael", "Lot", "Laban"],
      correctAnswer: 2,
      hint: "His wife looked back and turned to salt",
      verseReference: "GEN.19.16",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which apostle replaced Judas Iscariot?",
      options: ["Matthias", "Mark", "Luke", "Barnabas"],
      correctAnswer: 0,
      hint: "They cast lots to choose him",
      verseReference: "ACT.1.26",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many years did Methuselah live?",
      options: ["929", "949", "959", "969"],
      correctAnswer: 3,
      hint: "He lived longer than anyone",
      verseReference: "GEN.5.27",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which judge of Israel made a foolish vow concerning his daughter?",
      options: ["Gideon", "Jephthah", "Samson", "Samuel"],
      correctAnswer: 1,
      hint: "He said he'd sacrifice whoever came out of his house first",
      verseReference: "JDG.11.30",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the original language of most of the Old Testament?",
      options: ["Greek", "Latin", "Hebrew", "Aramaic"],
      correctAnswer: 2,
      hint: "The language of the Israelites",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which city was Jonah told to go to preach?",
      options: ["Babylon", "Nineveh", "Damascus", "Tyre"],
      correctAnswer: 1,
      hint: "It was the capital of Assyria",
      verseReference: "JON.1.2",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many silver pieces did Judas receive for betraying Jesus?",
      options: ["20", "25", "30", "35"],
      correctAnswer: 2,
      hint: "The price of a slave",
      verseReference: "MAT.26.15",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Who was the king of Israel when Elijah prophesied?",
      options: ["Ahab", "Jehoshaphat", "Asa", "Omri"],
      correctAnswer: 0,
      hint: "He was married to Jezebel",
      verseReference: "1KI.16.29",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many times did Peter say we should forgive someone?",
      options: ["Seven times", "Seventy times seven", "Forty times", "A hundred times"],
      correctAnswer: 1,
      hint: "Jesus taught unlimited forgiveness",
      verseReference: "MAT.18.22",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Who was the Roman centurion whose servant Jesus healed?",
      options: ["Julius", "Cornelius", "Not named", "Marcus"],
      correctAnswer: 2,
      hint: "The Bible doesn't give his name",
      verseReference: "MAT.8.5",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What did Nehemiah do before leading the rebuilding of Jerusalem's walls?",
      options: ["He was a priest", "He was cupbearer to the king", "He was a scribe", "He was a soldier"],
      correctAnswer: 1,
      hint: "He served the Persian king",
      verseReference: "NEH.1.11",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many chapters are in the book of Psalms?",
      options: ["100", "120", "150", "200"],
      correctAnswer: 2,
      hint: "It's the longest book in the Bible",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which prophet married a prostitute as commanded by God?",
      options: ["Isaiah", "Jeremiah", "Ezekiel", "Hosea"],
      correctAnswer: 3,
      hint: "It symbolized Israel's unfaithfulness",
      verseReference: "HOS.1.2",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the name of the field bought with Judas' money?",
      options: ["Field of Blood", "Potter's Field", "Akeldama", "All of these"],
      correctAnswer: 3,
      hint: "It had multiple names",
      verseReference: "MAT.27.8",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many sons did Noah have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      hint: "Shem, Ham, and Japheth",
      verseReference: "GEN.6.10",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Who was the first person to see Jesus after His resurrection?",
      options: ["Peter", "John", "Mary Magdalene", "The disciples"],
      correctAnswer: 2,
      hint: "She thought He was the gardener",
      verseReference: "JHN.20.14",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was Paul's profession?",
      options: ["Fisherman", "Tax collector", "Tentmaker", "Carpenter"],
      correctAnswer: 2,
      hint: "He worked with his hands",
      verseReference: "ACT.18.3",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many books did John write in the New Testament?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      hint: "Gospel, three letters, and Revelation",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the name of the garden where Jesus prayed before His arrest?",
      options: ["Eden", "Gethsemane", "Kidron", "Olivet"],
      correctAnswer: 1,
      hint: "It means 'olive press'",
      verseReference: "MAT.26.36",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Who was the father of King David?",
      options: ["Boaz", "Jesse", "Obed", "Salmon"],
      correctAnswer: 1,
      hint: "He was from Bethlehem",
      verseReference: "1SA.16.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many years did it take to build Solomon's temple?",
      options: ["5", "7", "10", "20"],
      correctAnswer: 1,
      hint: "A perfect number in Scripture",
      verseReference: "1KI.6.38",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Who was the high priest when David ate the showbread?",
      options: ["Eli", "Ahimelech", "Abiathar", "Zadok"],
      correctAnswer: 1,
      hint: "Jesus mentioned this story",
      verseReference: "1SA.21.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the name of Moses' father-in-law?",
      options: ["Jethro", "Hobab", "Reuel", "All of these"],
      correctAnswer: 3,
      hint: "He had multiple names",
      verseReference: "EXO.3.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which book comes after Joel in the Old Testament?",
      options: ["Amos", "Hosea", "Micah", "Obadiah"],
      correctAnswer: 0,
      hint: "He was a shepherd from Tekoa",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How old was Abraham when Isaac was born?",
      options: ["75", "90", "100", "120"],
      correctAnswer: 2,
      hint: "Sarah laughed because they were so old",
      verseReference: "GEN.21.5",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the name of the servant Abraham sent to find a wife for Isaac?",
      options: ["Eleazar", "Eliezer", "Not named", "Hagar"],
      correctAnswer: 2,
      hint: "The Bible doesn't give his name in this story",
      verseReference: "GEN.24.2",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which king had a dream about a statue with different metals?",
      options: ["Pharaoh", "Nebuchadnezzar", "Belshazzar", "Cyrus"],
      correctAnswer: 1,
      hint: "Daniel interpreted it",
      verseReference: "DAN.2.31",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many total years was Israel in Egypt?",
      options: ["400", "430", "450", "500"],
      correctAnswer: 1,
      hint: "The exact number is given in Exodus",
      verseReference: "EXO.12.40",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Who was the father of Methuselah?",
      options: ["Adam", "Seth", "Enoch", "Noah"],
      correctAnswer: 2,
      hint: "He walked with God and never died",
      verseReference: "GEN.5.21",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the first of the ten plagues on Egypt?",
      options: ["Frogs", "Gnats", "Water to blood", "Darkness"],
      correctAnswer: 2,
      hint: "The Nile turned red",
      verseReference: "EXO.7.20",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many stones did David pick up to fight Goliath?",
      options: ["1", "3", "5", "7"],
      correctAnswer: 2,
      hint: "He only needed one",
      verseReference: "1SA.17.40",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Which Roman emperor was in power when Jesus was born?",
      options: ["Tiberius", "Augustus", "Nero", "Claudius"],
      correctAnswer: 1,
      hint: "A census was ordered in his name",
      verseReference: "LUK.2.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the name of the sorcerer Paul encountered in Cyprus?",
      options: ["Simon", "Bar-Jesus", "Elymas", "Both B and C"],
      correctAnswer: 3,
      hint: "He had two names",
      verseReference: "ACT.13.6",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many people did Jesus feed with five loaves and two fish?",
      options: ["3,000", "4,000", "5,000", "10,000"],
      correctAnswer: 2,
      hint: "Not counting women and children",
      verseReference: "MAT.14.21",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was Barnabas' original name?",
      options: ["Joseph", "John", "Mark", "Saul"],
      correctAnswer: 0,
      hint: "Barnabas means 'son of encouragement'",
      verseReference: "ACT.4.36",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many psalms did Asaph write?",
      options: ["7", "10", "12", "15"],
      correctAnswer: 2,
      hint: "Psalms 50 and 73-83",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Who was the mother of James and John?",
      options: ["Mary", "Salome", "Joanna", "Susanna"],
      correctAnswer: 1,
      hint: "She asked Jesus for special positions for her sons",
      verseReference: "MAT.20.20",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the name of the place where Jesus ascended?",
      options: ["Mount of Olives", "Bethany", "Olivet", "All of these"],
      correctAnswer: 3,
      hint: "They're all the same location",
      verseReference: "ACT.1.12",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many times did God call Samuel before he recognized it?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      hint: "Eli finally helped him understand",
      verseReference: "1SA.3.8",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was the name of Potiphar's wife?",
      options: ["Asenath", "Zipporah", "Not given", "Rachel"],
      correctAnswer: 2,
      hint: "The Bible never mentions it",
      verseReference: "GEN.39.7",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many times is 'Amen' used at the end of a psalm?",
      options: ["Never", "Only in Psalm 150", "Five times", "Every psalm"],
      correctAnswer: 2,
      hint: "It marks the end of each of the five books",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Who was the king of Tyre who helped Solomon build the temple?",
      options: ["Hiram", "Huram", "Both A and B", "Neither"],
      correctAnswer: 2,
      hint: "Same person, different spelling",
      verseReference: "1KI.5.1",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What was Peter's original name?",
      options: ["Simon", "Simeon", "Cephas", "All of these"],
      correctAnswer: 3,
      hint: "He had multiple names",
      verseReference: "JHN.1.42",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many chapters are in the book of Revelation?",
      options: ["20", "21", "22", "24"],
      correctAnswer: 2,
      hint: "Same number as books in the Hebrew Bible",
      verseReference: null,
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "Who was the prophet that anointed David as king?",
      options: ["Eli", "Samuel", "Nathan", "Gad"],
      correctAnswer: 1,
      hint: "He also anointed Saul",
      verseReference: "1SA.16.13",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "What metal was used for the serpent Moses made in the wilderness?",
      options: ["Gold", "Silver", "Bronze", "Brass"],
      correctAnswer: 2,
      hint: "Looking at it would heal snakebites",
      verseReference: "NUM.21.9",
      isActive: true
    },
    {
      language: 'en',
      difficulty: 'difficult',
      question: "How many stones were used to build the memorial when Israel crossed the Jordan?",
      options: ["7", "10", "12", "24"],
      correctAnswer: 3,
      hint: "Twelve at Gilgal and twelve in the river",
      verseReference: "JOS.4.9",
      isActive: true
    }
  ];

  const allQuestions = [...easyQuestions, ...mediumQuestions, ...difficultQuestions];
  
  console.log(`Inserting ${allQuestions.length} trivia questions...`);
  await db.insert(triviaQuestions).values(allQuestions);

  console.log("✅ Trivia questions seed complete!");
  console.log(`   - ${easyQuestions.length} easy questions`);
  console.log(`   - ${mediumQuestions.length} medium questions`);
  console.log(`   - ${difficultQuestions.length} difficult questions`);
  console.log(`   - Total: ${allQuestions.length} questions`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedTriviaQuestions()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Seed failed:", error);
      process.exit(1);
    });
}

export { seedTriviaQuestions };
