interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <div className="relative">
      <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src={videoUrl}
          title="Video del curso"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
