/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";

interface RichContentRendererProps {
  content: any;
}

export default function RichContentRenderer({ content }: RichContentRendererProps) {
  if (!content) {
    return <p className="italic opacity-70">Konten tidak tersedia.</p>;
  }

  if (typeof content === "string") {
    const paragraphs = content.split("\n\n").filter(Boolean);
    return (
      <>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </>
    );
  }

  const richJson = content.json || content;

  if (richJson && richJson.nodeType === "document" && Array.isArray(richJson.content)) {
    return (
      <>
        {richJson.content.map((node: any, idx: number) => renderRichNode(node, idx))}
      </>
    );
  }

  return <p className="italic opacity-70">Format konten tidak dapat ditampilkan.</p>;
}

function renderRichNode(node: any, index: number): React.ReactNode {
  if (!node) return null;

  switch (node.nodeType) {
    case "paragraph":
      return <p key={index}>{renderNodeContent(node.content)}</p>;
    case "heading-1":
      return <h1 key={index}>{renderNodeContent(node.content)}</h1>;
    case "heading-2":
      return <h2 key={index}>{renderNodeContent(node.content)}</h2>;
    case "heading-3":
      return <h3 key={index}>{renderNodeContent(node.content)}</h3>;
    case "heading-4":
      return <h4 key={index}>{renderNodeContent(node.content)}</h4>;
    case "heading-5":
      return <h5 key={index}>{renderNodeContent(node.content)}</h5>;
    case "heading-6":
      return <h6 key={index}>{renderNodeContent(node.content)}</h6>;
    case "unordered-list":
      return (
        <ul key={index}>
          {node.content?.map((item: any, i: number) => (
            <li key={i}>{renderNodeContent(item.content)}</li>
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol key={index}>
          {node.content?.map((item: any, i: number) => (
            <li key={i}>{renderNodeContent(item.content)}</li>
          ))}
        </ol>
      );
    case "blockquote":
      return <blockquote key={index}>{renderNodeContent(node.content)}</blockquote>;
    case "embedded-asset-block":
      const assetUrl = node.data?.target?.fields?.file?.url;
      const assetTitle = node.data?.target?.fields?.title || "Gambar Berita";
      if (assetUrl) {
        return (
          <figure key={index} className="my-10">
            <Image
              src={assetUrl.startsWith("//") ? `https:${assetUrl}` : assetUrl}
              alt={assetTitle}
              width={800}
              height={450}
              style={{ width: "100%", height: "auto" }}
              className="rounded-2xl shadow-md border border-gray-100"
            />
            {assetTitle && assetTitle !== "Gambar Berita" && (
              <figcaption className="mt-3 text-center text-sm text-gray-500">{assetTitle}</figcaption>
            )}
          </figure>
        );
      }
      return null;
    case "hr":
      return <hr key={index} />;
    default:
      if (node.content) {
        return <div key={index}>{renderNodeContent(node.content)}</div>;
      }
      return null;
  }
}

function sanitizeUri(uri?: string): string {
  if (!uri) return "#";
  const clean = uri.trim();
  if (
    clean.startsWith("http://") ||
    clean.startsWith("https://") ||
    clean.startsWith("mailto:") ||
    clean.startsWith("tel:") ||
    clean.startsWith("/") ||
    clean.startsWith("#")
  ) {
    return clean;
  }
  return "#";
}

function renderNodeContent(content: any[]): React.ReactNode {
  if (!Array.isArray(content)) return null;

  return content.map((child: any, i: number) => {
    if (child.nodeType === "text") {
      let textNode: React.ReactNode = child.value;

      if (child.marks && Array.isArray(child.marks)) {
        child.marks.forEach((mark: any) => {
          if (mark.type === "bold") {
            textNode = <strong key={i}>{textNode}</strong>;
          } else if (mark.type === "italic") {
            textNode = <em key={i}>{textNode}</em>;
          } else if (mark.type === "underline") {
            textNode = <u key={i}>{textNode}</u>;
          } else if (mark.type === "code") {
            textNode = <code key={i}>{textNode}</code>;
          }
        });
      }
      return <React.Fragment key={i}>{textNode}</React.Fragment>;
    } else if (child.nodeType === "hyperlink") {
      return (
        <a
          key={i}
          href={sanitizeUri(child.data?.uri)}
          target="_blank"
          rel="noopener noreferrer"
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
