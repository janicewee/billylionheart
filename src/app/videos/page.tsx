import Navigation from '@/components/Navigation';

const bookSections = [
  {
    title: 'Billy The Lion Boy',
    videos: [
      { id: 'jCdb3QZ-fyw', label: 'Leonard - The Lion who accidentally ate a man. Prologue from Billy The Lion Boy' },
      { id: 'QPCYGzhgunc', label: "Storytime read along. The little boy who tried to fly. The author's reading of Chapter 1, Billy The Lion Boy" },
      { id: '82kpD5VMi-M', label: 'He ran away to find his real parents.' },
      { id: '1eAlI2Vnbqg', label: 'Billy The Lion Boy. Chapter 2' },
      { id: '1tr8mrQuQf8', label: 'His babysitter is a lion and he already escaped twice' },
    ],
  },
  {
    title: 'Billy & Bluma. Double Trouble',
    videos: [
      { id: 'C3ZsgxbwQ2E', label: 'Bluma - from prankster to hero' },
      { id: 'LPjdo7WRogI', label: 'A boy, a girl and a lion walk into trouble in Billy & Bluma. Double Trouble.' },
      { id: 'MfRjEy6pyg4', label: 'They followed a stranger and ended up in chains.' },
      { id: 'KXufmLKZva8', label: "They tied a boulder to the lion's tooth!" },
    ],
  },
  {
    title: 'Secret Hero & His Flying Lion',
    videos: [
      { id: 'IEhjTVnOAXk', label: 'The boy who lifted a mountain.' },
      { id: 'reZdAGNZs9I', label: 'Who poisoned Leonard Lion?' },
      { id: '_25vtHegnl4', label: 'Super powers. Out of control' },
      { id: '-al7PtfQ0pk', label: "Billy & Bluma in St Lydia's Academy" },
      { id: 'BL3c1tQFQkw', label: 'Secret Hero & His Flying Lion' },
    ],
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

        <div className="space-y-20">
          {bookSections.map((section) => (
            <div key={section.title} className="space-y-8">
              <h2 className="text-3xl font-bold">{section.title}</h2>
              <div className="space-y-8">
                {section.videos.map((video) => (
                  <div key={video.id} className="space-y-3">
                    <h3 className="text-lg font-medium text-muted-foreground">{video.label}</h3>
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.label}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
