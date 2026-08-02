import React from "react";

interface RichContentRendererProps {
  content: any;
}

export default function RichContentRenderer({ content }: RichContentRendererProps) {
  if (!content) {
    return <p className="text-slate-400 italic">Konten tidak tersedia.</p>;
  }

  // Jika content berupa string biasa (Text / Markdown)
  if (typeof content === "string") {
    const paragraphs = content.split("\n\n").filter(Boolean);
    return (
      <div className="space-y-4 text-slate-300 leading-relaxed text-base">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  }

  // Jika content berupa object Rich Text Contentful (memiliki `json` atau `nodeType`)
  const richJson = content.json || content;

  if (richJson && richJson.nodeType === "document" && Array.isArray(richJson.content)) {
    return (
      <div className="space-y-6 text-slate-300 leading-relaxed text-base">
        {richJson.content.map((node: any, idx: number) => renderRichNode(node, idx))}
      </div>
    );
  }

  return <p className="text-slate-400 italic">Format konten tidak dapat ditampilkan.</p>;
}

function renderRichNode(node: any, index: number): React.ReactNode {
  if (!node) return null;

  switch (node.nodeType) {
    case "paragraph":
      return (
        <p key={index} className="text-slate-300 leading-relaxed">
          {renderNodeContent(node.content)}
        </p>
      );
    case "heading-1":
      return (
        <h1 key={index} className="text-2xl font-bold text-white mt-6 mb-3">
          {renderNodeContent(node.content)}
        </h1>
      );
    case "heading-2":
      return (
        <h2 key={index} className="text-xl font-bold text-white mt-5 mb-2">
          {renderNodeContent(node.content)}
        </h2>
      );
    case "heading-3":
      return (
        <h3 key={index} className="text-lg font-semibold text-emerald-400 mt-4 mb-2">
          {renderNodeContent(node.content)}
        </h3>
      );
    case "unordered-list":
      return (
        <ul key={index} className="list-disc list-inside space-y-2 pl-4 text-slate-300">
          {node.content?.map((item: any, i: number) => (
            <li key={i}>{renderNodeContent(item.content)}</li>
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol key={index} className="list-decimal list-inside space-y-2 pl-4 text-slate-300">
          {node.content?.map((item: any, i: number) => (
            <li key={i}>{renderNodeContent(item.content)}</li>
          ))}
        </ol>
      );
    case "blockquote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-emerald-500 pl-4 py-2 my-4 italic text-slate-400 bg-slate-900/50 rounded-r-lg"
        >
          {renderNodeContent(node.content)}
        </blockquote>
      );
    case "embedded-asset-block":
      const assetUrl = node.data?.target?.fields?.file?.url;
      const assetTitle = node.data?.target?.fields?.title || "Gambar Berita";
      if (assetUrl) {
        return (
          <div key={index} className="my-6 rounded-xl overflow-hidden border border-slate-800">
            <img
              src={assetUrl.startsWith("//") ? `https:${assetUrl}` : assetUrl}
              alt={assetTitle}
              className="w-full h-auto object-cover max-h-[500px]"
            />
            {assetTitle && (
              <p className="text-xs text-center text-slate-500 py-2 bg-slate-900">
                {assetTitle}
              </p>
            )}
          </div>
        );
      }
      return null;
    default:
      if (node.content) {
        return <div key={index}>{renderNodeContent(node.content)}</div>;
      }
      return null;
  }
}

function renderNodeContent(content: any[]): React.ReactNode {
  if (!Array.isArray(content)) return null;

  return content.map((child: any, i: number) => {
    if (child.nodeType === "text") {
      let textNode: React.ReactNode = child.value;

      if (child.marks && Array.isArray(child.marks)) {
        child.marks.forEach((mark: any) => {
          if (mark.type === "bold") {
            textNode = <strong key={i} className="font-semibold text-white">{textNode}</strong>;
          } else if (mark.type === "italic") {
            textNode = <em key={i}>{textNode}</em>;
          } else if (mark.type === "underline") {
            textNode = <u key={i}>{textNode}</u>;
          } else if (mark.type === "code") {
            textNode = (
              <code key={i} className="bg-slate-800 text-emerald-300 text-xs px-1.5 py-0.5 rounded">
                {textNode}
              </code>
            );
          }
        });
      }
      return <React.Fragment key={i}>{textNode}</React.Fragment>;
    } else if (child.nodeType === "hyperlink") {
      return (
        <a
          key={i}
          href={child.data?.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 underline hover:text-emerald-300"
        >
          {renderNodeContent(child.content)}
        </a>
      );
    } else if (child.content) {
      return <React.Fragment key={i}>{renderNodeContent(child.content)}</React.Fragment>;
    }
    return null;
  });
}
