import { db } from '@/db';
import { books } from '@/db/schema';

async function main() {
    const sampleBooks = [
        {
            title: 'Billy Lionheart',
            bookNumber: 1,
            coverImageUrl: '/images/book1-cover.jpg',
            summary: 'Meet Billy, a courageous young boy with a heart as bold as a lion. When his village is threatened, Billy must find the strength within himself to become the hero everyone needs.',
            setting: 'A small village on the edge of a mystical forest',
            hooplaLink: 'https://www.hoopladigital.com/title/example1',
            fableLink: 'https://www.fable.co/book/example1',
            buyLink: 'https://www.amazon.com/billy-lionheart',
            barnesNobleLink: 'https://www.barnesandnoble.com/w/billy-lionheart',
            authorWebsiteLink: 'https://www.authorsiteexample.com/billy-lionheart',
            createdAt: '2024-01-15T10:00:00.000Z',
        },
        {
            title: 'Billy & Bluma: Double Trouble',
            bookNumber: 2,
            coverImageUrl: '/images/book2-cover.jpg',
            summary: 'Billy teams up with his fearless friend Bluma in an adventure filled with mischief and magic. Together, they\'re double the trouble and double the fun!',
            setting: 'The enchanted kingdom of Aventura',
            hooplaLink: 'https://www.hoopladigital.com/title/example2',
            fableLink: 'https://www.fable.co/book/example2',
            buyLink: 'https://www.amazon.com/billy-bluma-double-trouble',
            barnesNobleLink: 'https://www.barnesandnoble.com/w/billy-bluma-double-trouble',
            authorWebsiteLink: 'https://www.authorsiteexample.com/billy-bluma',
            createdAt: '2024-03-20T10:00:00.000Z',
        },
        {
            title: 'Secret Hero & His Flying Lion',
            bookNumber: 3,
            coverImageUrl: '/images/book3-cover.jpg',
            summary: 'Billy discovers an ancient secret that transforms his loyal companion into a magnificent flying lion. Together, they must save both the mortal and magical worlds from a looming darkness.',
            setting: 'Between the mortal realm and the sky kingdom',
            hooplaLink: 'https://www.hoopladigital.com/title/example3',
            fableLink: 'https://www.fable.co/book/example3',
            buyLink: 'https://www.amazon.com/secret-hero-flying-lion',
            barnesNobleLink: 'https://www.barnesandnoble.com/w/secret-hero-flying-lion',
            authorWebsiteLink: 'https://www.authorsiteexample.com/secret-hero',
            createdAt: '2024-06-10T10:00:00.000Z',
        },
    ];

    await db.insert(books).values(sampleBooks);
    
    console.log('✅ Books seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});