const PaperCard = ({ paper }) => {
  const getViewableUrl = (url) => {
    return url.replace('/raw/upload/', '/raw/upload/fl_attachment/')
  }

  return (
    <div className="flex items-center justify-between bg-[#F8FAFF] border border-gray-100 rounded-xl px-4 py-3">
      <div>
        <p className="text-[#1A1A2E] text-sm font-medium">Exam {paper.examYear}</p>
        <p className="text-gray-400 text-xs">Semester {paper.semester}</p>
      </div>
      <a
        href={getViewableUrl(paper.fileUrl)}
        target="_blank"
        rel="noreferrer"
        className="bg-[#437FC7] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#3a6fb0] transition"
      >
        Download PDF
      </a>
    </div>
  )
}

export default PaperCard