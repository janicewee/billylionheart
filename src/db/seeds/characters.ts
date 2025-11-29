import { db } from '@/db';
import { characters } from '@/db/schema';

async function main() {
    const sampleCharacters = [
        {
            name: 'Billy',
            description: 'A brave young boy with a lion\'s heart, destined to become a hero',
            species: 'Human',
            type: 'Mortal',
            appearsInBooks: [1, 2, 3],
            createdAt: '2024-01-01T12:00:00.000Z',
        },
        {
            name: 'Bluma',
            description: 'A fearless and clever girl who loves adventure and mischief',
            species: 'Human',
            type: 'Mortal',
            appearsInBooks: [2, 3],
            createdAt: '2024-01-01T12:00:00.000Z',
        },
        {
            name: 'Leo the Lion',
            description: 'A majestic lion with ancient magic, loyal protector and friend',
            species: 'Lion',
            type: 'Immortal',
            appearsInBooks: [1, 2, 3],
            createdAt: '2024-01-01T12:00:00.000Z',
        },
        {
            name: 'Monkey Sage',
            description: 'An ancient wise monkey who guides heroes on their journey',
            species: 'Monkey',
            type: 'Immortal',
            appearsInBooks: [1],
            createdAt: '2024-01-01T12:00:00.000Z',
        },
        {
            name: 'Shadow Wolf',
            description: 'A cunning wolf who seeks to spread darkness across the land',
            species: 'Wolf',
            type: 'Mortal',
            appearsInBooks: [2],
            createdAt: '2024-01-01T12:00:00.000Z',
        },
        {
            name: 'Crystal Phoenix',
            description: 'A radiant phoenix who guards the gateway between realms',
            species: 'Phoenix',
            type: 'Immortal',
            appearsInBooks: [3],
            createdAt: '2024-01-01T12:00:00.000Z',
        },
        {
            name: 'Mayor Badger',
            description: 'The kind-hearted mayor of Billy\'s village',
            species: 'Badger',
            type: 'Animal',
            appearsInBooks: [1, 2],
            createdAt: '2024-01-01T12:00:00.000Z',
        },
        {
            name: 'Trixie the Fox',
            description: 'A mischievous fox with a good heart beneath her pranks',
            species: 'Fox',
            type: 'Animal',
            appearsInBooks: [2, 3],
            createdAt: '2024-01-01T12:00:00.000Z',
        },
    ];

    await db.insert(characters).values(sampleCharacters);
    
    console.log('✅ Characters seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});