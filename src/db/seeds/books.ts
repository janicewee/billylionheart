import { db } from '@/db';
import { books } from '@/db/schema';

async function main() {
    const sampleBooks = [
        {
            title: 'Billy Lionheart',
            bookNumber: 1,
            coverImageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/billylionheart-1764399456554.jpg?width=800&height=800&resize=contain',
            summary: 'After several attempts, Billy escapes from his foster home. Sort of. His lion nanny, Leonard, followed him on his quest, refusing to let him out of his sight. The pair gets hopelessly lost and settle in a land without any human in sight. Leonard meets the love of his life, the lioness Lina, and the pair adopts Billy as their eldest cub. Leonard and Lina have biological children of their own, raising their human cub with their lion cubs. Billy learns to talk to the animals and grows strong wrestling with young lions and living in the wild over the years. Billy finds a new lead on his biological parents and resumes his search, with his lion family in tow, dragging the entire pride into a series of wild adventures with Leonard masquerading as a human in the world of men, to watch over Billy.',
            setting: 'Seven year old Billy Lionheart lives with four foster parents and a lion nanny. He discovers that his biological parents who died when he was a toddler, have returned as resurrected immortals. Billy is determined to find them. So he runs away from home.',
            hooplaLink: 'https://www.hoopladigital.com/title/18055006',
            fableLink: 'https://fable.co/book/x-9798230757245',
            buyLink: 'https://books2read.com/u/mdxKd5',
            barnesNobleLink: 'https://www.barnesandnoble.com/w/billy-the-lion-boy-janice-wee/1147124637',
            authorWebsiteLink: 'https://www.janicewee.com/books/billy-the-lion-boy',
            createdAt: '2024-01-15T10:00:00.000Z',
        },
        {
            title: 'Billy & Bluma: Double Trouble',
            bookNumber: 2,
            coverImageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/billybluma-1764399456893.jpg?width=800&height=800&resize=contain',
            summary: 'Because of Leonard Lion\'s tooth mishap, Billy and Bluma stumble on a treasure map and a gold coin with Mathilda\'s face on it. Assuming that the map would lead them to Mathilda, they decide to follow the map and look for her. Leonard is against it, so they trick him and sneak out of St Lydia\'s Hearth, skipping orientation. Leonard pursues them and joins them in their quest. The map turns out to be a trap, leading them into the clutches of cult leader Junta. When they refuse to join Junta\'s cult, he sends Leonard away as trophy game in a private island while imprisoning Billy and Bluma in a dungeon. Can Billy and Bluma escape and save their lion guardian?',
            setting: 'Freshies Billy & Bluma are enrolled in high school but sneak out on an adventure when they are supposed to be at the orientation.',
            hooplaLink: '',
            fableLink: 'https://fable.co/book/x-9798230168522',
            buyLink: 'https://books2read.com/u/mYeeQP',
            barnesNobleLink: 'https://www.barnesandnoble.com/w/billy-bluma-double-trouble-janice-wee/1147316887',
            authorWebsiteLink: 'https://www.janicewee.com/books/billy-bluma-double-trouble',
            createdAt: '2024-03-20T10:00:00.000Z',
        },
        {
            title: 'Secret Hero & His Flying Lion',
            bookNumber: 3,
            coverImageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/secrethero-1764399456948.jpg?width=800&height=800&resize=contain',
            summary: 'Billy starts life afresh in boarding school, with Leonard Lion doing everything a lion can to watch over his human cub, even masquerading as a human adult with unconventional looks to go places where lions shouldn\'t, and comes back poisoned. His bestie, Bluma, and their new classmates team up to figure out who poisoned Leonard Lion. As the culprits get bolder, stakes increase. Can they stop the conspiracy before someone gets killed?',
            setting: 'Billy and Bluma return from their adventure just in time for their first day in St Lydia\'s Academy. Billy was given superhuman strength while Leonard Lion was given the ability to fly through the use of flying mitts. Billy\'s new strength is untamed while Leonard Lion can\'t control his flying mitts.',
            hooplaLink: '',
            fableLink: 'https://books2read.com/u/bpgDOX',
            buyLink: 'https://books2read.com/u/bpgDOX',
            barnesNobleLink: 'https://www.barnesandnoble.com/w/secret-hero-his-flying-lion-janice-wee/1147464475',
            authorWebsiteLink: 'https://www.janicewee.com/books/secret-hero-flying-lion',
            createdAt: '2024-06-10T10:00:00.000Z',
        },
    ];

    await db.insert(books).values(sampleBooks);
    
    console.log('✅ Books seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});