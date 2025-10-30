import { storage } from "./storage";

// Sample studies data to seed the database
const sampleStudies = [
  {
    slug: "walking-with-jesus",
    title: "Walking with Jesus: A 30-Day Journey",
    author: "Dr. Sarah Mitchell",
    description: "Discover the profound joy and peace that comes from walking daily with our Savior. This comprehensive study explores Christ's teachings and how they transform our everyday lives through practical application and deep reflection.",
    category: "Discipleship",
    duration: "30 days",
    difficulty: "Beginner" as const,
    lessonsCount: 30,
    isFeatured: true
  },
  {
    slug: "faith-in-times-of-trial",
    title: "Faith in Times of Trial",
    author: "Pastor Mark Johnson",
    description: "Learn how biblical characters overcame adversity through unwavering faith and trust in God's plan.",
    category: "Encouragement",
    duration: "14 days",
    difficulty: "Intermediate" as const,
    lessonsCount: 14,
    isFeatured: false
  },
  {
    slug: "fruit-of-the-spirit",
    title: "The Fruit of the Spirit",
    author: "Rev. Lisa Thompson",
    description: "A deep dive into Galatians 5:22-23, exploring how to cultivate spiritual fruit in your daily walk.",
    category: "Character",
    duration: "21 days",
    difficulty: "Intermediate" as const,
    lessonsCount: 21,
    isFeatured: false
  },
  {
    slug: "prayer-that-changes-everything",
    title: "Prayer That Changes Everything",
    author: "Bishop James Wilson",
    description: "Transform your prayer life and experience God's power through effective, biblical prayer principles.",
    category: "Prayer",
    duration: "10 days",
    difficulty: "Beginner" as const,
    lessonsCount: 10,
    isFeatured: false
  },
  {
    slug: "understanding-biblical-prophecy",
    title: "Understanding Biblical Prophecy",
    author: "Dr. Michael Roberts",
    description: "Explore the prophetic books of the Bible and their relevance to our modern world and future hope.",
    category: "Prophecy",
    duration: "45 days",
    difficulty: "Advanced" as const,
    lessonsCount: 45,
    isFeatured: false
  },
  {
    slug: "love-like-jesus",
    title: "Love Like Jesus",
    author: "Rev. Grace Adams",
    description: "Learn to love others with the sacrificial, unconditional love that Jesus demonstrated throughout His ministry.",
    category: "Love",
    duration: "7 days",
    difficulty: "Beginner" as const,
    lessonsCount: 7,
    isFeatured: false
  }
];

// Lesson titles and verses to generate lessons
const lessonTitles = [
  "Beginning Your Journey", "Learning to Trust", "Finding Joy", "Growing in Faith",
  "Prayer and Devotion", "Walking in Love", "Overcoming Challenges", "Understanding Grace",
  "Building Character", "Sharing Your Faith", "Finding Peace", "Seeking Wisdom",
  "Serving Others", "Spiritual Discipline", "God's Promises", "Living with Purpose",
  "Cultivating Hope", "Embracing Change", "Finding Strength", "Understanding Scripture",
  "Walking in Truth", "Pursuing Holiness", "Celebrating Victory", "Enduring Trials",
  "Growing Deeper", "Reflecting Christ", "Living Boldly", "Trusting God's Timing",
  "Experiencing Freedom", "Maturing in Faith", "Walking in Power", "Finishing Strong",
  "Abiding in Christ", "Seeking God's Will", "Standing Firm", "Practicing Gratitude",
  "Bearing Good Fruit", "Living by Faith", "Resting in God", "Walking in Obedience",
  "Developing Discernment", "Strengthening Your Foundation", "Living Courageously", "Embracing Transformation",
  "Deepening Your Relationship"
];

const verses = [
  { ref: "Matthew 11:28-30", text: "Come to me, all you who are weary and burdened, and I will give you rest." },
  { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding." },
  { ref: "Nehemiah 8:10", text: "The joy of the Lord is your strength." },
  { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him." },
  { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." },
  { ref: "1 John 4:19", text: "We love because he first loved us." },
  { ref: "James 1:2-4", text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds." },
  { ref: "Ephesians 2:8-9", text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God." },
  { ref: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control." },
  { ref: "Matthew 28:19-20", text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." },
  { ref: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing." },
  { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
  { ref: "2 Timothy 1:7", text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline." },
  { ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength." },
  { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." }
];

async function seedStudies() {
  console.log('🌱 Starting Bible studies seed...');

  try {
    for (const studyData of sampleStudies) {
      console.log(`\n📖 Creating study: ${studyData.title}`);
      
      // Create the study topic
      const study = await storage.createStudy(
        {
          slug: studyData.slug,
          defaultLanguage: 'en',
          isFeatured: studyData.isFeatured,
          isPublished: true,
          lessonsCount: studyData.lessonsCount
        },
        {
          studyId: '', // Will be filled by storage
          language: 'en',
          title: studyData.title,
          author: studyData.author,
          description: studyData.description,
          category: studyData.category,
          duration: studyData.duration,
          difficulty: studyData.difficulty
        }
      );

      console.log(`  ✅ Created study with ID: ${study.id}`);

      // Create lessons for this study
      console.log(`  📝 Creating ${studyData.lessonsCount} lessons...`);
      
      for (let i = 0; i < studyData.lessonsCount; i++) {
        const dayNumber = i + 1;
        const verse = verses[i % verses.length];
        const title = lessonTitles[i % lessonTitles.length] || `Day ${dayNumber} Lesson`;
        
        await storage.createLesson(
          {
            studyId: study.id,
            dayNumber,
            isPublished: true
          },
          {
            lessonId: '', // Will be filled by storage
            language: 'en',
            title,
            verseReference: verse.ref,
            verseText: verse.text,
            content: `Welcome to Day ${dayNumber} of "${studyData.title}". ${studyData.description} Today we continue our journey of spiritual growth and deeper understanding of God's Word. Each day brings new opportunities to grow closer to Christ and discover His perfect will for our lives.`,
            reflectionQuestions: JSON.stringify([
              "How does today's scripture apply to your current life situation?",
              "What is God teaching you through this lesson?",
              "How can you put this into practice today?"
            ]),
            prayer: `Heavenly Father, thank You for Day ${dayNumber} of this journey. Help me to apply what I've learned today and to grow closer to You. Guide my steps and fill me with Your wisdom. In Jesus' name, Amen.`
          }
        );
      }

      console.log(`  ✅ Created ${studyData.lessonsCount} lessons`);
    }

    console.log('\n🎉 Bible studies seed completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`  - ${sampleStudies.length} studies created`);
    console.log(`  - ${sampleStudies.reduce((sum, s) => sum + s.lessonsCount, 0)} total lessons created`);
    
  } catch (error) {
    console.error('❌ Error seeding studies:', error);
    throw error;
  }
}

export { seedStudies };

// Run the seed immediately
seedStudies()
  .then(() => {
    console.log('\n✨ Seed script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seed script failed:', error);
    process.exit(1);
  });
