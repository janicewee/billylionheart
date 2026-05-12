import Navigation from '@/components/Navigation';

const readAlongs = [
  {
    book: 'Billy The Lion Boy',
    videoId: 'QPCYGzhgunc',
  },
  {
    book: 'Billy & Bluma. Double Trouble.',
    videoId: 'XNVi7WatawE',
  },
];

export default function ReadAlongPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      <div className="container py-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Read Along with Momma Janice</h1>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
          Indie author, and mother of two, Janice Wee reads books from her series, The Adventures of Billy Lionheart.
        </p>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-14">
          Let your kids join in the fun and read along with her.
        </p>

        <div className="space-y-14">
          {readAlongs.map((item) => (
            <div key={item.videoId} className="space-y-3">
              <h2 className="text-2xl font-semibold">{item.book}</h2>
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${item.videoId}`}
                  title={`Read Along - ${item.book}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
