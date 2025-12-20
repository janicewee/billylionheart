import { db } from '@/db';
import { books, characters } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const sampleBooks = [
            {
                title: 'The Adventures of Billy Lionheart (Book 1)',
                bookNumber: 1,
                coverImageUrl: '/book1-cover.jpg',
                summary: 'Billy Lionheart was born during the chaotic era. After his parents and community were slaughtered, he was raised by rescue pilots in their community of misfits. This is where his adventures begin as he bonds with baby Bluma and learns to navigate a dangerous world.',
                setting: 'A post-apocalyptic world during the chaotic era, leading into the new Utopian world after the Battle of Armageddon',
                createdAt: new Date().toISOString(),
            },
            {
                title: 'The Adventures of Billy Lionheart (Book 2)',
                bookNumber: 2,
                coverImageUrl: '/book2-cover.jpg',
                summary: 'Billy continues his adventures in the new Utopian world, separated from Bluma as they move to different kingdoms. His naughty but adorable personality shines as he learns to fly and explores his new home in Jayden\'s kingdom.',
                setting: 'Jayden\'s kingdom in the new Utopian world after the Battle of Armageddon',
                createdAt: new Date().toISOString(),
            },
            {
                title: 'The Adventures of Billy Lionheart (Book 3)',
                bookNumber: 3,
                coverImageUrl: '/book3-cover.jpg',
                summary: 'The final book in the Billy Lionheart series follows Billy\'s continued growth and adventures as he masters flying and faces new challenges in the Utopian world, setting the stage for his future with Bluma in adulthood.',
                setting: 'The kingdoms of the new Utopian world',
                createdAt: new Date().toISOString(),
            }
        ];

        const sampleCharacters = [
            {
                name: 'Leonard Lion',
                species: 'Lion',
                type: 'Animal',
                description: "A Lion. Billy's nanny, guardian and eventually, Papa Lion.",
                appearsInBooks: [1, 2, 3],
                createdAt: new Date().toISOString(),
            },
            {
                name: 'Billy Lionheart',
                species: 'Human',
                type: 'Mortal',
                description: 'A human boy. Mortal. The main character in this series.',
                appearsInBooks: [1, 2, 3],
                createdAt: new Date().toISOString(),
            },
            {
                name: 'Ava',
                species: 'Human',
                type: 'Mortal',
                description: "A human woman. Leonard's counsellor and one of Billy's foster parents.",
                appearsInBooks: [1, 2, 3],
                createdAt: new Date().toISOString(),
            }
        ];

        // Check if books already exist
        const existingBooks = await db.select().from(books);
        if (existingBooks.length === 0) {
            await db.insert(books).values(sampleBooks);
        }

        const existingCharacters = await db.select().from(characters);
        if (existingCharacters.length === 0) {
            await db.insert(characters).values(sampleCharacters);
        }

        return NextResponse.json({ message: '✅ Database seeded successfully' });
    } catch (error) {
        console.error('❌ Seeder failed:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
