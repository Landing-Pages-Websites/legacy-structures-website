function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineMarkdown(value: string) {
  let html = escapeHtml(value);
  html = html.replace(/\\&amp;/g, "&amp;");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => {
    const safeHref = href.replace(/\\&/g, "&amp;");
    return `<a href="${safeHref}">${label}</a>`;
  });
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");
  return html;
}

export function markdownToHtml(markdown: string) {
  const lines = markdown.trim().split(/\r?\n/);
  const output: string[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      output.push(`<p>${inlineMarkdown(paragraph.join(" ").trim())}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      output.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      list = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
    } else if (/^#{2,3} /.test(trimmed)) {
      flushParagraph();
      flushList();
      const level = trimmed.startsWith("### ") ? 3 : 2;
      output.push(`<h${level}>${inlineMarkdown(trimmed.slice(level + 1))}</h${level}>`);
    } else if (/^\* /.test(trimmed) || /^- /.test(trimmed)) {
      flushParagraph();
      list.push(trimmed.slice(2));
    } else {
      flushList();
      paragraph.push(trimmed);
    }
  }
  flushParagraph();
  flushList();
  return output.join("");
}
