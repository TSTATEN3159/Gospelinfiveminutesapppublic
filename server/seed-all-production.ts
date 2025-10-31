/**
 * Master seed script to populate production database with all content
 * Run this to seed devotionals, reading plans, trivia, and Bible studies
 */

import { db } from './db.js';

async function seedAllProduction() {
  console.log('🌱 Starting production database seeding...\n');

  try {
    // Import and run devotionals seed
    console.log('📖 Seeding devotionals...');
    const { seedDevotionals } = await import('./seed-devotionals.js');
    await seedDevotionals();
    console.log('✅ Devotionals seeded\n');

    // Import and run reading plans seed
    console.log('📚 Seeding reading plans...');
    const { seedBibleInYear } = await import('./seed-bible-in-1-year.js');
    await seedBibleInYear();
    console.log('✅ Reading plans seeded\n');

    // Import and run trivia seed
    console.log('🎯 Seeding trivia questions...');
    const { seedTrivia } = await import('./seed-trivia.js');
    await seedTrivia();
    console.log('✅ Trivia seeded\n');

    // Import and run Bible studies seed
    console.log('📝 Seeding Bible studies...');
    const { seedStudies } = await import('./seed-studies.js');
    await seedStudies();
    console.log('✅ Bible studies seeded\n');

    console.log('🎉 Production database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding production database:', error);
    process.exit(1);
  }
}

// Run the seed script
seedAllProduction();
