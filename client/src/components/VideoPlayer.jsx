const VideoPlayer = ({ url }) => {
  const getEmbedUrl = (url) => {
    try {
      if (url.includes('youtu.be')) {
        const id = url.split('youtu.be/')[1].split('?')[0]
        return `https://www.youtube.com/embed/${id}`
      }
      if (url.includes('youtube.com/watch')) {
        const id = new URL(url).searchParams.get('v')
        return `https://www.youtube.com/embed/${id}`
      }
      return url
    } catch {
      return url
    }
  }

  return (
    <div className="rounded-xl overflow-hidden mt-2">
      <iframe
        src={getEmbedUrl(url)}
        className="w-full h-56 md:h-72"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  )
}

export default VideoPlayer