import { db } from './db';
import { readingPlans, readingPlanDays } from '../shared/schema';
import { eq, sql } from 'drizzle-orm';

// Old Testament reading plan - 365 days
const otReadings = [
  // Genesis (50 chapters over 17 days)
  { day: 1, readings: ['Genesis 1-3'], title: 'Creation and Fall' },
  { day: 2, readings: ['Genesis 4-7'], title: 'Cain and the Flood' },
  { day: 3, readings: ['Genesis 8-11'], title: 'Noah and Babel' },
  { day: 4, readings: ['Genesis 12-15'], title: "Abraham's Call" },
  { day: 5, readings: ['Genesis 16-19'], title: 'Hagar and Sodom' },
  { day: 6, readings: ['Genesis 20-23'], title: "Isaac's Birth" },
  { day: 7, readings: ['Genesis 24-26'], title: 'Isaac and Rebekah' },
  { day: 8, readings: ['Genesis 27-29'], title: 'Jacob and Esau' },
  { day: 9, readings: ['Genesis 30-32'], title: "Jacob's Family" },
  { day: 10, readings: ['Genesis 33-36'], title: 'Reconciliation' },
  { day: 11, readings: ['Genesis 37-39'], title: "Joseph's Dreams" },
  { day: 12, readings: ['Genesis 40-42'], title: 'Joseph in Egypt' },
  { day: 13, readings: ['Genesis 43-45'], title: 'Revelation to Brothers' },
  { day: 14, readings: ['Genesis 46-48'], title: 'Jacob in Egypt' },
  { day: 15, readings: ['Genesis 49-50'], title: "Jacob's Blessing" },
  
  // Exodus (40 chapters over 13 days)
  { day: 16, readings: ['Exodus 1-3'], title: 'Birth of Moses' },
  { day: 17, readings: ['Exodus 4-7'], title: 'Return to Egypt' },
  { day: 18, readings: ['Exodus 8-11'], title: 'The Plagues Begin' },
  { day: 19, readings: ['Exodus 12-14'], title: 'Passover and Exodus' },
  { day: 20, readings: ['Exodus 15-18'], title: 'Red Sea Crossing' },
  { day: 21, readings: ['Exodus 19-21'], title: 'The Ten Commandments' },
  { day: 22, readings: ['Exodus 22-24'], title: 'Book of the Covenant' },
  { day: 23, readings: ['Exodus 25-27'], title: 'Tabernacle Plans' },
  { day: 24, readings: ['Exodus 28-30'], title: 'Priestly Garments' },
  { day: 25, readings: ['Exodus 31-34'], title: 'The Golden Calf' },
  { day: 26, readings: ['Exodus 35-37'], title: 'Building the Tabernacle' },
  { day: 27, readings: ['Exodus 38-40'], title: 'Tabernacle Completed' },
  
  // Leviticus (27 chapters over 9 days)
  { day: 28, readings: ['Leviticus 1-3'], title: 'Offerings to God' },
  { day: 29, readings: ['Leviticus 4-7'], title: 'Sin and Guilt Offerings' },
  { day: 30, readings: ['Leviticus 8-10'], title: 'Priestly Ordination' },
  { day: 31, readings: ['Leviticus 11-13'], title: 'Clean and Unclean' },
  { day: 32, readings: ['Leviticus 14-16'], title: 'Day of Atonement' },
  { day: 33, readings: ['Leviticus 17-20'], title: 'Holiness Code' },
  { day: 34, readings: ['Leviticus 21-23'], title: 'Feasts and Festivals' },
  { day: 35, readings: ['Leviticus 24-25'], title: 'Jubilee Year' },
  { day: 36, readings: ['Leviticus 26-27'], title: 'Blessings and Curses' },
  
  // Numbers (36 chapters over 12 days)
  { day: 37, readings: ['Numbers 1-3'], title: 'Census of Israel' },
  { day: 38, readings: ['Numbers 4-6'], title: 'Levite Duties' },
  { day: 39, readings: ['Numbers 7-9'], title: 'Tabernacle Dedication' },
  { day: 40, readings: ['Numbers 10-12'], title: 'Journey Begins' },
  { day: 41, readings: ['Numbers 13-15'], title: 'Spying the Land' },
  { day: 42, readings: ['Numbers 16-18'], title: "Korah's Rebellion" },
  { day: 43, readings: ['Numbers 19-21'], title: 'Bronze Serpent' },
  { day: 44, readings: ['Numbers 22-24'], title: 'Balaam' },
  { day: 45, readings: ['Numbers 25-27'], title: 'Second Census' },
  { day: 46, readings: ['Numbers 28-30'], title: 'Offerings and Vows' },
  { day: 47, readings: ['Numbers 31-33'], title: 'Victory over Midian' },
  { day: 48, readings: ['Numbers 34-36'], title: 'Inheritance Laws' },
  
  // Deuteronomy (34 chapters over 11 days)
  { day: 49, readings: ['Deuteronomy 1-3'], title: "Moses' First Speech" },
  { day: 50, readings: ['Deuteronomy 4-6'], title: 'Shema: Hear O Israel' },
  { day: 51, readings: ['Deuteronomy 7-9'], title: 'Promised Land' },
  { day: 52, readings: ['Deuteronomy 10-12'], title: 'Love and Obey' },
  { day: 53, readings: ['Deuteronomy 13-16'], title: 'Feasts Renewed' },
  { day: 54, readings: ['Deuteronomy 17-20'], title: 'Laws for Kings' },
  { day: 55, readings: ['Deuteronomy 21-23'], title: 'Various Laws' },
  { day: 56, readings: ['Deuteronomy 24-27'], title: 'Blessings on Mount Gerizim' },
  { day: 57, readings: ['Deuteronomy 28-30'], title: 'Covenant Renewed' },
  { day: 58, readings: ['Deuteronomy 31-32'], title: "Moses' Song" },
  { day: 59, readings: ['Deuteronomy 33-34'], title: "Moses' Death" },
  
  // Joshua (24 chapters over 8 days)
  { day: 60, readings: ['Joshua 1-3'], title: 'Joshua Takes Command' },
  { day: 61, readings: ['Joshua 4-6'], title: 'Fall of Jericho' },
  { day: 62, readings: ['Joshua 7-9'], title: 'Achan and Gibeon' },
  { day: 63, readings: ['Joshua 10-12'], title: 'Conquest of Canaan' },
  { day: 64, readings: ['Joshua 13-15'], title: 'Dividing the Land' },
  { day: 65, readings: ['Joshua 16-18'], title: 'Tribal Allotments' },
  { day: 66, readings: ['Joshua 19-21'], title: 'Cities of Refuge' },
  { day: 67, readings: ['Joshua 22-24'], title: "Joshua's Farewell" },
  
  // Judges (21 chapters over 7 days)
  { day: 68, readings: ['Judges 1-3'], title: 'After Joshua' },
  { day: 69, readings: ['Judges 4-5'], title: 'Deborah and Barak' },
  { day: 70, readings: ['Judges 6-8'], title: 'Gideon' },
  { day: 71, readings: ['Judges 9-10'], title: 'Abimelech and Jephthah' },
  { day: 72, readings: ['Judges 11-13'], title: 'Jephthah and Samson' },
  { day: 73, readings: ['Judges 14-16'], title: "Samson's Strength" },
  { day: 74, readings: ['Judges 17-21'], title: "Israel's Dark Days" },
  
  // Ruth (4 chapters over 1 day)
  { day: 75, readings: ['Ruth 1-4'], title: 'Ruth and Boaz' },
  
  // 1 Samuel (31 chapters over 10 days)
  { day: 76, readings: ['1 Samuel 1-3'], title: "Samuel's Birth" },
  { day: 77, readings: ['1 Samuel 4-7'], title: 'Ark of the Covenant' },
  { day: 78, readings: ['1 Samuel 8-10'], title: 'Israel Demands a King' },
  { day: 79, readings: ['1 Samuel 11-13'], title: "Saul's Reign Begins" },
  { day: 80, readings: ['1 Samuel 14-16'], title: 'David Anointed' },
  { day: 81, readings: ['1 Samuel 17-19'], title: 'David and Goliath' },
  { day: 82, readings: ['1 Samuel 20-22'], title: 'Jonathan and David' },
  { day: 83, readings: ['1 Samuel 23-25'], title: 'David Spares Saul' },
  { day: 84, readings: ['1 Samuel 26-28'], title: 'Witch of Endor' },
  { day: 85, readings: ['1 Samuel 29-31'], title: "Saul's Death" },
  
  // 2 Samuel (24 chapters over 8 days)
  { day: 86, readings: ['2 Samuel 1-3'], title: 'David Becomes King' },
  { day: 87, readings: ['2 Samuel 4-6'], title: 'Ark to Jerusalem' },
  { day: 88, readings: ['2 Samuel 7-9'], title: 'Davidic Covenant' },
  { day: 89, readings: ['2 Samuel 10-12'], title: 'David and Bathsheba' },
  { day: 90, readings: ['2 Samuel 13-15'], title: "Absalom's Rebellion" },
  { day: 91, readings: ['2 Samuel 16-18'], title: "Absalom's Death" },
  { day: 92, readings: ['2 Samuel 19-21'], title: "David's Return" },
  { day: 93, readings: ['2 Samuel 22-24'], title: "David's Song" },
  
  // 1 Kings (22 chapters over 7 days)
  { day: 94, readings: ['1 Kings 1-3'], title: 'Solomon Becomes King' },
  { day: 95, readings: ['1 Kings 4-6'], title: 'Building the Temple' },
  { day: 96, readings: ['1 Kings 7-8'], title: 'Temple Dedication' },
  { day: 97, readings: ['1 Kings 9-11'], title: "Solomon's Glory and Fall" },
  { day: 98, readings: ['1 Kings 12-14'], title: 'Kingdom Divided' },
  { day: 99, readings: ['1 Kings 15-17'], title: 'Elijah the Prophet' },
  { day: 100, readings: ['1 Kings 18-22'], title: 'Elijah vs Baal' },
  
  // 2 Kings (25 chapters over 8 days)
  { day: 101, readings: ['2 Kings 1-3'], title: 'Elijah Taken Up' },
  { day: 102, readings: ['2 Kings 4-6'], title: "Elisha's Miracles" },
  { day: 103, readings: ['2 Kings 7-9'], title: 'Jehu Anointed' },
  { day: 104, readings: ['2 Kings 10-12'], title: 'Athaliah and Joash' },
  { day: 105, readings: ['2 Kings 13-15'], title: 'Kings of Israel' },
  { day: 106, readings: ['2 Kings 16-18'], title: 'Hezekiah' },
  { day: 107, readings: ['2 Kings 19-21'], title: "Hezekiah's Prayer" },
  { day: 108, readings: ['2 Kings 22-25'], title: 'Fall of Jerusalem' },
  
  // 1 Chronicles (29 chapters over 10 days)
  { day: 109, readings: ['1 Chronicles 1-3'], title: 'Genealogies from Adam' },
  { day: 110, readings: ['1 Chronicles 4-6'], title: 'Tribal Genealogies' },
  { day: 111, readings: ['1 Chronicles 7-9'], title: 'More Genealogies' },
  { day: 112, readings: ['1 Chronicles 10-12'], title: "Saul's Fall" },
  { day: 113, readings: ['1 Chronicles 13-15'], title: 'Ark to Jerusalem' },
  { day: 114, readings: ['1 Chronicles 16-18'], title: 'Psalm of Thanks' },
  { day: 115, readings: ['1 Chronicles 19-21'], title: "David's Wars" },
  { day: 116, readings: ['1 Chronicles 22-24'], title: 'Temple Preparations' },
  { day: 117, readings: ['1 Chronicles 25-27'], title: 'Levitical Duties' },
  { day: 118, readings: ['1 Chronicles 28-29'], title: "David's Charge to Solomon" },
  
  // 2 Chronicles (36 chapters over 12 days)
  { day: 119, readings: ['2 Chronicles 1-3'], title: "Solomon's Wisdom" },
  { day: 120, readings: ['2 Chronicles 4-6'], title: 'Temple Completed' },
  { day: 121, readings: ['2 Chronicles 7-9'], title: "God's Glory Fills Temple" },
  { day: 122, readings: ['2 Chronicles 10-12'], title: 'Rehoboam' },
  { day: 123, readings: ['2 Chronicles 13-16'], title: 'Asa Reforms' },
  { day: 124, readings: ['2 Chronicles 17-19'], title: 'Jehoshaphat' },
  { day: 125, readings: ['2 Chronicles 20-22'], title: "Jehoshaphat's Victory" },
  { day: 126, readings: ['2 Chronicles 23-25'], title: 'Joash and Amaziah' },
  { day: 127, readings: ['2 Chronicles 26-28'], title: 'Uzziah and Ahaz' },
  { day: 128, readings: ['2 Chronicles 29-31'], title: "Hezekiah's Reforms" },
  { day: 129, readings: ['2 Chronicles 32-34'], title: 'Josiah' },
  { day: 130, readings: ['2 Chronicles 35-36'], title: 'Fall of Judah' },
  
  // Ezra (10 chapters over 3 days)
  { day: 131, readings: ['Ezra 1-3'], title: 'Return from Exile' },
  { day: 132, readings: ['Ezra 4-7'], title: 'Rebuilding the Temple' },
  { day: 133, readings: ['Ezra 8-10'], title: "Ezra's Reforms" },
  
  // Nehemiah (13 chapters over 4 days)
  { day: 134, readings: ['Nehemiah 1-3'], title: 'Rebuilding the Wall' },
  { day: 135, readings: ['Nehemiah 4-7'], title: 'Opposition Overcome' },
  { day: 136, readings: ['Nehemiah 8-10'], title: 'Reading the Law' },
  { day: 137, readings: ['Nehemiah 11-13'], title: 'Dedication of Wall' },
  
  // Esther (10 chapters over 3 days)
  { day: 138, readings: ['Esther 1-3'], title: 'Queen Esther' },
  { day: 139, readings: ['Esther 4-7'], title: 'For Such a Time' },
  { day: 140, readings: ['Esther 8-10'], title: 'Deliverance of Jews' },
  
  // Job (42 chapters over 14 days)
  { day: 141, readings: ['Job 1-3'], title: "Job's Suffering" },
  { day: 142, readings: ['Job 4-7'], title: 'First Cycle of Speeches' },
  { day: 143, readings: ['Job 8-11'], title: 'Friends Respond' },
  { day: 144, readings: ['Job 12-15'], title: "Job's Defense" },
  { day: 145, readings: ['Job 16-19'], title: 'I Know My Redeemer Lives' },
  { day: 146, readings: ['Job 20-23'], title: 'Second Cycle' },
  { day: 147, readings: ['Job 24-28'], title: 'Wisdom from God' },
  { day: 148, readings: ['Job 29-31'], title: "Job's Final Defense" },
  { day: 149, readings: ['Job 32-34'], title: 'Elihu Speaks' },
  { day: 150, readings: ['Job 35-37'], title: "God's Greatness" },
  { day: 151, readings: ['Job 38-39'], title: 'God Answers Job' },
  { day: 152, readings: ['Job 40-42'], title: "Job's Restoration" },
  { day: 153, readings: ['Psalms 1-8'], title: 'Blessed is the Man' },
  { day: 154, readings: ['Psalms 9-16'], title: 'Trust in the Lord' },
  
  // Psalms (150 chapters over 50 days)
  { day: 155, readings: ['Psalms 17-21'], title: 'Prayer for Deliverance' },
  { day: 156, readings: ['Psalms 22-25'], title: 'The Lord is My Shepherd' },
  { day: 157, readings: ['Psalms 26-31'], title: 'Refuge and Strength' },
  { day: 158, readings: ['Psalms 32-35'], title: 'Blessed is He' },
  { day: 159, readings: ['Psalms 36-39'], title: 'Delight in the Lord' },
  { day: 160, readings: ['Psalms 40-44'], title: 'I Waited Patiently' },
  { day: 161, readings: ['Psalms 45-49'], title: 'God is Our Refuge' },
  { day: 162, readings: ['Psalms 50-54'], title: 'Create in Me' },
  { day: 163, readings: ['Psalms 55-59'], title: 'Cast Your Burden' },
  { day: 164, readings: ['Psalms 60-65'], title: 'You Crown the Year' },
  { day: 165, readings: ['Psalms 66-69'], title: 'Make a Joyful Noise' },
  { day: 166, readings: ['Psalms 70-73'], title: 'God is Good' },
  { day: 167, readings: ['Psalms 74-77'], title: 'How Long O Lord' },
  { day: 168, readings: ['Psalms 78-80'], title: 'Tell to the Coming Generation' },
  { day: 169, readings: ['Psalms 81-85'], title: 'Restore Us O God' },
  { day: 170, readings: ['Psalms 86-89'], title: 'Teach Me Your Way' },
  { day: 171, readings: ['Psalms 90-94'], title: 'From Everlasting' },
  { day: 172, readings: ['Psalms 95-100'], title: 'Sing to the Lord' },
  { day: 173, readings: ['Psalms 101-104'], title: 'Bless the Lord O My Soul' },
  { day: 174, readings: ['Psalms 105-107'], title: 'Give Thanks' },
  { day: 175, readings: ['Psalms 108-113'], title: 'Not to Us O Lord' },
  { day: 176, readings: ['Psalms 114-118'], title: 'The Stone the Builders Rejected' },
  { day: 177, readings: ['Psalms 119:1-88'], title: 'Your Word is a Lamp' },
  { day: 178, readings: ['Psalms 119:89-176'], title: 'I Love Your Law' },
  { day: 179, readings: ['Psalms 120-128'], title: 'Songs of Ascents' },
  { day: 180, readings: ['Psalms 129-135'], title: 'Out of the Depths' },
  { day: 181, readings: ['Psalms 136-139'], title: 'By the Waters of Babylon' },
  { day: 182, readings: ['Psalms 140-144'], title: 'Rescue Me O Lord' },
  { day: 183, readings: ['Psalms 145-150'], title: 'Let Everything Praise the Lord' },
  
  // Proverbs (31 chapters over 10 days)
  { day: 184, readings: ['Proverbs 1-3'], title: 'Fear of the Lord' },
  { day: 185, readings: ['Proverbs 4-6'], title: 'Get Wisdom' },
  { day: 186, readings: ['Proverbs 7-9'], title: 'Wisdom Calls Out' },
  { day: 187, readings: ['Proverbs 10-13'], title: 'Proverbs of Solomon' },
  { day: 188, readings: ['Proverbs 14-16'], title: 'Righteous Living' },
  { day: 189, readings: ['Proverbs 17-19'], title: 'A Friend Loves' },
  { day: 190, readings: ['Proverbs 20-22'], title: 'Train Up a Child' },
  { day: 191, readings: ['Proverbs 23-26'], title: 'Sayings of the Wise' },
  { day: 192, readings: ['Proverbs 27-29'], title: 'Faithful are the Wounds' },
  { day: 193, readings: ['Proverbs 30-31'], title: 'The Virtuous Woman' },
  
  // Ecclesiastes (12 chapters over 4 days)
  { day: 194, readings: ['Ecclesiastes 1-3'], title: 'Vanity of Vanities' },
  { day: 195, readings: ['Ecclesiastes 4-6'], title: 'A Time for Everything' },
  { day: 196, readings: ['Ecclesiastes 7-9'], title: 'Wisdom is Better' },
  { day: 197, readings: ['Ecclesiastes 10-12'], title: 'Remember Your Creator' },
  
  // Song of Solomon (8 chapters over 2 days)
  { day: 198, readings: ['Song of Solomon 1-4'], title: 'The Song of Songs' },
  { day: 199, readings: ['Song of Solomon 5-8'], title: 'Love is Strong' },
  
  // Isaiah (66 chapters over 22 days)
  { day: 200, readings: ['Isaiah 1-3'], title: 'Vision of Isaiah' },
  { day: 201, readings: ['Isaiah 4-6'], title: 'Here Am I' },
  { day: 202, readings: ['Isaiah 7-9'], title: 'Unto Us a Child' },
  { day: 203, readings: ['Isaiah 10-12'], title: 'The Remnant' },
  { day: 204, readings: ['Isaiah 13-16'], title: 'Prophecies Against Nations' },
  { day: 205, readings: ['Isaiah 17-21'], title: 'The Desert by the Sea' },
  { day: 206, readings: ['Isaiah 22-25'], title: 'Swallow Up Death' },
  { day: 207, readings: ['Isaiah 26-28'], title: 'Trust in the Lord' },
  { day: 208, readings: ['Isaiah 29-31'], title: 'Woe to Ariel' },
  { day: 209, readings: ['Isaiah 32-35'], title: 'The Wilderness Shall Blossom' },
  { day: 210, readings: ['Isaiah 36-39'], title: "Hezekiah's Illness" },
  { day: 211, readings: ['Isaiah 40-42'], title: 'Comfort My People' },
  { day: 212, readings: ['Isaiah 43-45'], title: 'I Have Called You' },
  { day: 213, readings: ['Isaiah 46-48'], title: 'Declare Things to Come' },
  { day: 214, readings: ['Isaiah 49-51'], title: 'The Servant of the Lord' },
  { day: 215, readings: ['Isaiah 52-54'], title: 'Man of Sorrows' },
  { day: 216, readings: ['Isaiah 55-57'], title: 'Seek the Lord' },
  { day: 217, readings: ['Isaiah 58-60'], title: 'Arise, Shine' },
  { day: 218, readings: ['Isaiah 61-63'], title: 'Year of the Lord' },
  { day: 219, readings: ['Isaiah 64-66'], title: 'New Heavens and New Earth' },
  
  // Jeremiah (52 chapters over 17 days)
  { day: 220, readings: ['Jeremiah 1-3'], title: 'Call of Jeremiah' },
  { day: 221, readings: ['Jeremiah 4-6'], title: 'Disaster from the North' },
  { day: 222, readings: ['Jeremiah 7-9'], title: 'The Temple Sermon' },
  { day: 223, readings: ['Jeremiah 10-12'], title: 'Idols are Worthless' },
  { day: 224, readings: ['Jeremiah 13-15'], title: 'The Ruined Belt' },
  { day: 225, readings: ['Jeremiah 16-19'], title: 'Celibacy of Jeremiah' },
  { day: 226, readings: ['Jeremiah 20-22'], title: 'Pashhur Strikes Jeremiah' },
  { day: 227, readings: ['Jeremiah 23-25'], title: 'Righteous Branch' },
  { day: 228, readings: ['Jeremiah 26-29'], title: 'Letter to the Exiles' },
  { day: 229, readings: ['Jeremiah 30-32'], title: 'New Covenant' },
  { day: 230, readings: ['Jeremiah 33-36'], title: 'The Scroll' },
  { day: 231, readings: ['Jeremiah 37-40'], title: 'Jeremiah in Prison' },
  { day: 232, readings: ['Jeremiah 41-44'], title: 'Gedaliah Assassinated' },
  { day: 233, readings: ['Jeremiah 45-48'], title: 'Prophecies Against Nations' },
  { day: 234, readings: ['Jeremiah 49-50'], title: 'Against Babylon' },
  { day: 235, readings: ['Jeremiah 51-52'], title: 'Fall of Jerusalem' },
  
  // Lamentations (5 chapters over 2 days)
  { day: 236, readings: ['Lamentations 1-3'], title: 'How Lonely Sits the City' },
  { day: 237, readings: ['Lamentations 4-5'], title: 'Great is Your Faithfulness' },
  
  // Ezekiel (48 chapters over 16 days)
  { day: 238, readings: ['Ezekiel 1-3'], title: 'Vision of God' },
  { day: 239, readings: ['Ezekiel 4-7'], title: 'Siege of Jerusalem' },
  { day: 240, readings: ['Ezekiel 8-11'], title: 'Glory Departs the Temple' },
  { day: 241, readings: ['Ezekiel 12-14'], title: 'False Prophets' },
  { day: 242, readings: ['Ezekiel 15-17'], title: 'The Vine and the Eagles' },
  { day: 243, readings: ['Ezekiel 18-20'], title: 'Soul That Sins' },
  { day: 244, readings: ['Ezekiel 21-23'], title: 'Sword of the Lord' },
  { day: 245, readings: ['Ezekiel 24-27'], title: 'The Cooking Pot' },
  { day: 246, readings: ['Ezekiel 28-30'], title: 'Lament for Tyre' },
  { day: 247, readings: ['Ezekiel 31-33'], title: 'Watchman' },
  { day: 248, readings: ['Ezekiel 34-36'], title: 'The Good Shepherd' },
  { day: 249, readings: ['Ezekiel 37-39'], title: 'Valley of Dry Bones' },
  { day: 250, readings: ['Ezekiel 40-42'], title: 'New Temple Vision' },
  { day: 251, readings: ['Ezekiel 43-45'], title: 'Glory Returns' },
  { day: 252, readings: ['Ezekiel 46-48'], title: 'River from the Temple' },
  
  // Daniel (12 chapters over 4 days)
  { day: 253, readings: ['Daniel 1-3'], title: 'Fiery Furnace' },
  { day: 254, readings: ['Daniel 4-6'], title: 'Lions Den' },
  { day: 255, readings: ['Daniel 7-9'], title: 'Seventy Weeks' },
  { day: 256, readings: ['Daniel 10-12'], title: 'Vision of the End' },
  
  // Hosea (14 chapters over 5 days)
  { day: 257, readings: ['Hosea 1-4'], title: 'Gomer and Israel' },
  { day: 258, readings: ['Hosea 5-8'], title: 'Come Let Us Return' },
  { day: 259, readings: ['Hosea 9-11'], title: 'Out of Egypt' },
  { day: 260, readings: ['Hosea 12-14'], title: 'Return O Israel' },
  
  // Joel (3 chapters over 1 day)
  { day: 261, readings: ['Joel 1-3'], title: 'Pour Out My Spirit' },
  
  // Amos (9 chapters over 3 days)
  { day: 262, readings: ['Amos 1-3'], title: 'Roar of the Lion' },
  { day: 263, readings: ['Amos 4-6'], title: 'Seek the Lord' },
  { day: 264, readings: ['Amos 7-9'], title: 'Visions of Judgment' },
  
  // Obadiah (1 chapter)
  { day: 265, readings: ['Obadiah 1'], title: 'Against Edom' },
  
  // Jonah (4 chapters over 1 day)
  { day: 266, readings: ['Jonah 1-4'], title: 'The Great Fish' },
  
  // Micah (7 chapters over 2 days)
  { day: 267, readings: ['Micah 1-4'], title: 'What Does the Lord Require' },
  { day: 268, readings: ['Micah 5-7'], title: 'Bethlehem Ephrathah' },
  
  // Nahum (3 chapters over 1 day)
  { day: 269, readings: ['Nahum 1-3'], title: 'Fall of Nineveh' },
  
  // Habakkuk (3 chapters over 1 day)
  { day: 270, readings: ['Habakkuk 1-3'], title: 'The Just Shall Live by Faith' },
  
  // Zephaniah (3 chapters over 1 day)
  { day: 271, readings: ['Zephaniah 1-3'], title: 'Day of the Lord' },
  
  // Haggai (2 chapters over 1 day)
  { day: 272, readings: ['Haggai 1-2'], title: 'Rebuild the Temple' },
  
  // Zechariah (14 chapters over 5 days)
  { day: 273, readings: ['Zechariah 1-3'], title: 'Man Among the Myrtles' },
  { day: 274, readings: ['Zechariah 4-6'], title: 'The Lampstand' },
  { day: 275, readings: ['Zechariah 7-10'], title: 'Not By Might' },
  { day: 276, readings: ['Zechariah 11-14'], title: 'The Good Shepherd' },
  
  // Malachi (4 chapters over 1 day)
  { day: 277, readings: ['Malachi 1-4'], title: 'Return to Me' },
  
  // Remainder days for review/reflection (365 - 277 = 88 days)
  // These can be used for rereading key passages, extra study, or catch-up days
  ...Array.from({ length: 88 }, (_, i) => ({
    day: 278 + i,
    readings: ['Review Day'],
    title: `Reflection and Review ${i + 1}`
  }))
];

// New Testament reading plan - base 89 days covering all NT books
const ntBaseReadings = [
  // Matthew (28 chapters over 10 days)
  { day: 1, readings: ['Matthew 1-2'], title: 'Birth of Jesus' },
  { day: 2, readings: ['Matthew 3-4'], title: 'Baptism and Temptation' },
  { day: 3, readings: ['Matthew 5-7'], title: 'Sermon on the Mount' },
  { day: 4, readings: ['Matthew 8-10'], title: 'Miracles and Disciples' },
  { day: 5, readings: ['Matthew 11-13'], title: 'Parables of the Kingdom' },
  { day: 6, readings: ['Matthew 14-16'], title: 'Walking on Water' },
  { day: 7, readings: ['Matthew 17-19'], title: 'Transfiguration' },
  { day: 8, readings: ['Matthew 20-22'], title: 'Triumphal Entry' },
  { day: 9, readings: ['Matthew 23-25'], title: 'Olivet Discourse' },
  { day: 10, readings: ['Matthew 26-28'], title: 'Crucifixion and Resurrection' },
  
  // Mark (16 chapters over 5 days)
  { day: 11, readings: ['Mark 1-3'], title: 'Beginning of the Gospel' },
  { day: 12, readings: ['Mark 4-6'], title: 'Parables and Miracles' },
  { day: 13, readings: ['Mark 7-9'], title: 'The Transfiguration' },
  { day: 14, readings: ['Mark 10-12'], title: 'Journey to Jerusalem' },
  { day: 15, readings: ['Mark 13-16'], title: 'Passion and Resurrection' },
  
  // Luke (24 chapters over 8 days)
  { day: 16, readings: ['Luke 1-2'], title: 'The Nativity' },
  { day: 17, readings: ['Luke 3-5'], title: 'Ministry Begins' },
  { day: 18, readings: ['Luke 6-8'], title: 'Blessed Are the Poor' },
  { day: 19, readings: ['Luke 9-10'], title: 'Sending of the Twelve' },
  { day: 20, readings: ['Luke 11-13'], title: 'The Good Samaritan' },
  { day: 21, readings: ['Luke 14-16'], title: 'Prodigal Son' },
  { day: 22, readings: ['Luke 17-19'], title: 'Zacchaeus' },
  { day: 23, readings: ['Luke 20-22'], title: 'The Last Supper' },
  { day: 24, readings: ['Luke 23-24'], title: 'He is Risen' },
  
  // John (21 chapters over 7 days)
  { day: 25, readings: ['John 1-3'], title: 'The Word Became Flesh' },
  { day: 26, readings: ['John 4-6'], title: 'Living Water' },
  { day: 27, readings: ['John 7-9'], title: 'Light of the World' },
  { day: 28, readings: ['John 10-12'], title: 'The Good Shepherd' },
  { day: 29, readings: ['John 13-15'], title: 'I Am the Vine' },
  { day: 30, readings: ['John 16-18'], title: 'The High Priestly Prayer' },
  { day: 31, readings: ['John 19-21'], title: 'It Is Finished' },
  
  // Acts (28 chapters over 9 days)
  { day: 32, readings: ['Acts 1-3'], title: 'Ascension and Pentecost' },
  { day: 33, readings: ['Acts 4-6'], title: 'The Church Grows' },
  { day: 34, readings: ['Acts 7-9'], title: "Saul's Conversion" },
  { day: 35, readings: ['Acts 10-12'], title: 'Peter and Cornelius' },
  { day: 36, readings: ['Acts 13-15'], title: 'First Missionary Journey' },
  { day: 37, readings: ['Acts 16-18'], title: 'Macedonian Call' },
  { day: 38, readings: ['Acts 19-21'], title: 'Riot in Ephesus' },
  { day: 39, readings: ['Acts 22-25'], title: "Paul's Defense" },
  { day: 40, readings: ['Acts 26-28'], title: 'Journey to Rome' },
  
  // Romans (16 chapters over 5 days)
  { day: 41, readings: ['Romans 1-3'], title: 'All Have Sinned' },
  { day: 42, readings: ['Romans 4-6'], title: 'Justified by Faith' },
  { day: 43, readings: ['Romans 7-9'], title: 'Life in the Spirit' },
  { day: 44, readings: ['Romans 10-12'], title: 'Call on the Name' },
  { day: 45, readings: ['Romans 13-16'], title: 'Love Your Neighbor' },
  
  // 1 Corinthians (16 chapters over 5 days)
  { day: 46, readings: ['1 Corinthians 1-4'], title: 'Divisions in the Church' },
  { day: 47, readings: ['1 Corinthians 5-8'], title: 'Church Discipline' },
  { day: 48, readings: ['1 Corinthians 9-11'], title: 'Run the Race' },
  { day: 49, readings: ['1 Corinthians 12-14'], title: 'Spiritual Gifts' },
  { day: 50, readings: ['1 Corinthians 15-16'], title: 'The Resurrection' },
  
  // 2 Corinthians (13 chapters over 4 days)
  { day: 51, readings: ['2 Corinthians 1-4'], title: 'Comfort in Affliction' },
  { day: 52, readings: ['2 Corinthians 5-8'], title: 'New Creation' },
  { day: 53, readings: ['2 Corinthians 9-11'], title: 'Cheerful Giver' },
  { day: 54, readings: ['2 Corinthians 12-13'], title: "Paul's Thorn" },
  
  // Galatians (6 chapters over 2 days)
  { day: 55, readings: ['Galatians 1-3'], title: 'Faith Not Works' },
  { day: 56, readings: ['Galatians 4-6'], title: 'Fruit of the Spirit' },
  
  // Ephesians (6 chapters over 2 days)
  { day: 57, readings: ['Ephesians 1-3'], title: 'Blessed in Christ' },
  { day: 58, readings: ['Ephesians 4-6'], title: 'Armor of God' },
  
  // Philippians (4 chapters over 1 day)
  { day: 59, readings: ['Philippians 1-4'], title: 'Rejoice in the Lord' },
  
  // Colossians (4 chapters over 1 day)
  { day: 60, readings: ['Colossians 1-4'], title: 'Christ is Supreme' },
  
  // 1 Thessalonians (5 chapters over 2 days)
  { day: 61, readings: ['1 Thessalonians 1-3'], title: 'Faith, Love, and Hope' },
  { day: 62, readings: ['1 Thessalonians 4-5'], title: 'The Coming of the Lord' },
  
  // 2 Thessalonians (3 chapters over 1 day)
  { day: 63, readings: ['2 Thessalonians 1-3'], title: 'Stand Firm' },
  
  // 1 Timothy (6 chapters over 2 days)
  { day: 64, readings: ['1 Timothy 1-3'], title: 'Qualifications for Leaders' },
  { day: 65, readings: ['1 Timothy 4-6'], title: 'Fight the Good Fight' },
  
  // 2 Timothy (4 chapters over 1 day)
  { day: 66, readings: ['2 Timothy 1-4'], title: 'Guard the Deposit' },
  
  // Titus (3 chapters over 1 day)
  { day: 67, readings: ['Titus 1-3'], title: 'Sound Doctrine' },
  
  // Philemon (1 chapter)
  { day: 68, readings: ['Philemon 1'], title: 'A Plea for Onesimus' },
  
  // Hebrews (13 chapters over 4 days)
  { day: 69, readings: ['Hebrews 1-4'], title: 'Jesus is Superior' },
  { day: 70, readings: ['Hebrews 5-8'], title: 'Our Great High Priest' },
  { day: 71, readings: ['Hebrews 9-10'], title: 'Once for All' },
  { day: 72, readings: ['Hebrews 11-13'], title: 'Hall of Faith' },
  
  // James (5 chapters over 2 days)
  { day: 73, readings: ['James 1-3'], title: 'Faith Without Works' },
  { day: 74, readings: ['James 4-5'], title: 'Draw Near to God' },
  
  // 1 Peter (5 chapters over 2 days)
  { day: 75, readings: ['1 Peter 1-3'], title: 'Living Hope' },
  { day: 76, readings: ['1 Peter 4-5'], title: 'Cast Your Cares' },
  
  // 2 Peter (3 chapters over 1 day)
  { day: 77, readings: ['2 Peter 1-3'], title: 'Make Your Calling Sure' },
  
  // 1 John (5 chapters over 2 days)
  { day: 78, readings: ['1 John 1-3'], title: 'God is Light' },
  { day: 79, readings: ['1 John 4-5'], title: 'God is Love' },
  
  // 2 John (1 chapter)
  { day: 80, readings: ['2 John 1'], title: 'Walk in Love' },
  
  // 3 John (1 chapter)
  { day: 81, readings: ['3 John 1'], title: 'Imitate Good' },
  
  // Jude (1 chapter)
  { day: 82, readings: ['Jude 1'], title: 'Contend for the Faith' },
  
  // Revelation (22 chapters over 7 days)
  { day: 83, readings: ['Revelation 1-3'], title: 'Letters to the Churches' },
  { day: 84, readings: ['Revelation 4-6'], title: 'The Throne Room' },
  { day: 85, readings: ['Revelation 7-9'], title: 'The Seven Seals' },
  { day: 86, readings: ['Revelation 10-13'], title: 'The Two Witnesses' },
  { day: 87, readings: ['Revelation 14-16'], title: 'Seven Bowls of Wrath' },
  { day: 88, readings: ['Revelation 17-19'], title: 'Fall of Babylon' },
  { day: 89, readings: ['Revelation 20-22'], title: 'New Heaven and New Earth' }
];

// Build full 365-day NT reading plan by repeating the cycle 4 times
const ntReadings = [
  ...ntBaseReadings,
  // Second cycle (days 90-178)
  ...ntBaseReadings.map((reading, i) => ({
    ...reading,
    day: 90 + i,
    title: `${reading.title} (Cycle 2)`
  })),
  // Third cycle (days 179-267)
  ...ntBaseReadings.map((reading, i) => ({
    ...reading,
    day: 179 + i,
    title: `${reading.title} (Cycle 3)`
  })),
  // Fourth cycle (days 268-356)
  ...ntBaseReadings.map((reading, i) => ({
    ...reading,
    day: 268 + i,
    title: `${reading.title} (Cycle 4)`
  })),
  // Final review days (357-365)
  ...Array.from({ length: 9 }, (_, i) => ({
    day: 357 + i,
    readings: ['Review and Reflection'],
    title: `Year-End Reflection ${i + 1}`
  }))
];

async function seedReadingPlans() {
  try {
    console.log('Starting to seed reading plans...');
    
    // Get plan IDs
    const plans = await db.select().from(readingPlans).where(
      sql`${readingPlans.name} IN ('Old Testament in 1 Year', 'New Testament in 1 Year')`
    );
    
    const otPlan = plans.find(p => p.name === 'Old Testament in 1 Year');
    const ntPlan = plans.find(p => p.name === 'New Testament in 1 Year');
    
    if (!otPlan || !ntPlan) {
      throw new Error('Reading plans not found in database');
    }
    
    console.log('Found plans:', { otPlan: otPlan.name, ntPlan: ntPlan.name });
    
    // Insert OT readings in batches
    console.log('Inserting Old Testament readings...');
    const otBatchSize = 50;
    for (let i = 0; i < otReadings.length; i += otBatchSize) {
      const batch = otReadings.slice(i, i + otBatchSize);
      await db.insert(readingPlanDays).values(
        batch.map(r => ({
          planId: otPlan.id,
          dayNumber: r.day,
          readings: r.readings,
          title: r.title
        }))
      );
      console.log(`Inserted OT days ${i + 1}-${Math.min(i + otBatchSize, otReadings.length)}`);
    }
    
    // Insert NT readings in batches
    console.log('Inserting New Testament readings...');
    const ntBatchSize = 50;
    for (let i = 0; i < ntReadings.length; i += ntBatchSize) {
      const batch = ntReadings.slice(i, i + ntBatchSize);
      await db.insert(readingPlanDays).values(
        batch.map(r => ({
          planId: ntPlan.id,
          dayNumber: r.day,
          readings: r.readings,
          title: r.title
        }))
      );
      console.log(`Inserted NT days ${i + 1}-${Math.min(i + ntBatchSize, ntReadings.length)}`);
    }
    
    console.log('Successfully seeded all reading plans!');
    console.log(`Total OT days: ${otReadings.length}`);
    console.log(`Total NT days: ${ntReadings.length}`);
    
  } catch (error) {
    console.error('Error seeding reading plans:', error);
    throw error;
  }
}

// Run the seed function
seedReadingPlans().then(() => {
  console.log('Seeding complete!');
  process.exit(0);
}).catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
