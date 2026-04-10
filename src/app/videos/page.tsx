import Navigation from '@/components/Navigation';

const playlists = [
  {
    id: 'PLTXsSHtafNel8N_CVs_H6tOxA91Db0Cyz',
    title: 'Billy Lionheart – Playlist 1',
  },
  {
    id: 'PLTXsSHtafNelWVCgSjr2JM0kB7dIHbul2',
    title: 'Billy Lionheart – Playlist 2',
  },
  {
    id: 'PLTXsSHtafNeloKl2CUbJ2AbvgBh4bxGKm',
    title: 'Billy Lionheart – Playlist 3',
  },
  {
    id: 'PLTXsSHtafNekET9OznRGZUNbcul3iHZPd',
    title: 'Billy Lionheart – Playlist 4',
  },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      <div className="container py-16 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Videos</h1>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Watch the Adventures of Billy Lionheart video series
        </p>

        <div className="space-y-14">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="space-y-4">
              <h2 className="text-2xl font-semibold">{playlist.title}</h2>
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/videoseries?list=${playlist.id}`}
                  title={playlist.title}
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
