const PaperCard = ({ paper }) => {
  const getViewableUrl = (url) => {
    return url.replace('/raw/upload/', '/raw/upload/fl_attachment/')
  }

  return (
    <div className="flex items-center justify-between bg-[#0F172A] border border-gray-700/50 rounded-xl px-4 py-3">
      <div>
        <p className="text-white text-sm font-medium">
          Exam {paper.examYear}
        </p>
        <p className="text-gray-500 text-xs">
          Semester {paper.semester}
        </p>
      </div>
      <a
        href={getViewableUrl(paper.fileUrl)}
        target="_blank"
        rel="noreferrer"
        className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 px-4 py-2 rounded-lg text-xs font-medium hover:bg-indigo-600 hover:text-white transition">
        Download PDF
      </a>
    </div>
  )
}

export default PaperCard