// Automatically gather all markdown files from the src/notes folder
const noteFiles = import.meta.glob('../notes/*.md', { query: '?raw', eager: true });

export const notes = Object.entries(noteFiles).map(([path, module]) => {
  const content = module.default;
  const fileName = path.split('/').pop().replace('.md', '');
  
  // Extract emoji from filename if present
  const emojiMatch = fileName.match(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g);
  const emoji = emojiMatch ? emojiMatch.join('') : "";

  // Simple extraction of metadata from the markdown content
  const lines = content.split('\n');
  
  // Extract Title (from first # header)
  const titleLine = lines.find(line => line.startsWith('# '));
  const title = titleLine ? titleLine.replace('# ', '').trim() : fileName;
  
  // Extract Date (from line containing "Date: ")
  const dateLine = lines.find(line => line.toLowerCase().includes('date:'));
  const date = dateLine ? dateLine.split(':')[1].trim() : "2025";

  // Extract Category (from line containing "Category: ")
  const categoryLine = lines.find(line => line.toLowerCase().includes('category:'));
  const category = categoryLine ? categoryLine.split(':')[1].trim() : "Thoughts";

  // The "body" is everything except the title, date, and category lines
  const body = lines
    .filter(line => 
      !line.startsWith('# ') && 
      !line.toLowerCase().includes('date:') && 
      !line.toLowerCase().includes('category:')
    )
    .join('\n')
    .trim();

  return {
    title,
    date,
    category,
    body,
    emoji,
    link: "#", // Placeholder for navigation
    content
  };
});
