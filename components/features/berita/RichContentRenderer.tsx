

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";

interface RichContentRendererProps {
  content: any;
}

/**
 * Komponen RichContentRenderer
 * 
 * Pengolah dan penyaji dokumen Rich Text dari Contentful ke elemen-elemen HTML/React yang dinamis.
 * Mendukung paragraf, judul (H1-H6), daftar (ul/ol), kutipan (blockquote), gambar bersampul,
 * tabel interaktif, format teks (tebal, miring, garis bawah, kode), serta tautan aman.
 *
 * @param {RichContentRendererProps} props - Properti komponen berisi objek konten Rich Text.
 * @returns {JSX.Element} Elemen terstruktur dokumen berita/artikel.
 */
export default function RichContentRenderer({ content }: RichContentRendererProps) {
  if (!content) {
    return <p className="italic opacity-70">Konten tidak tersedia.</p>;
  }

  // Penanganan jika konten dikirim berupa teks biasa (string)
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

  // Penanganan jika konten merupakan dokumen Rich Text Contentful
  if (richJson && richJson.nodeType === "document" && Array.isArray(richJson.content)) {
    return (
      <>
        {richJson.content.map((node: any, idx: number) => renderRichNode(node, idx))}
      </>
    );
  }

  return <p className="italic opacity-70">Format konten tidak dapat ditampilkan.</p>;
}

/**
 * Menerjemahkan satu simpul (node) dokumen Rich Text ke komponen React.
 */
function renderRichNode(node: any, index: number): React.ReactNode {
  if (!node) return null;

  switch (node.nodeType) {
    case "paragraph": {
      // Abaikan paragraf kosong tanpa teks
      if (!node.content || node.content.length === 0) return null;
      const allEmpty = node.content.every(
        (c: any) => c.nodeType === "text" && (!c.value || c.value.trim() === "")
      );
      if (allEmpty) return null;
      return <p key={index}>{renderNodeContent(node.content)}</p>;
    }
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
          <figure key={index} className="my-8 w-full">
            <div className="relative w-full overflow-hidden rounded-xl shadow-md border border-gray-100 bg-carbony">
              <Image
                src={assetUrl.startsWith("//") ? `https:${assetUrl}` : assetUrl}
                alt={assetTitle}
                width={1200}
                height={675}
                sizes="(max-width: 1200px) 100vw, 1200px"
                style={{ width: "100%", height: "auto" }}
                className="rounded-xl object-cover"
              />
            </div>
            {assetTitle && assetTitle !== "Gambar Berita" && (
              <figcaption className="mt-2.5 text-center text-xs text-slate-500 font-sans">{assetTitle}</figcaption>
            )}
          </figure>
        );
      }
      return null;
    case "table":
      return (
        <div key={index} className="not-prose w-full my-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse m-0 p-0">
              <tbody>
                {node.content?.map((rowNode: any, rIdx: number) => renderRichNode(rowNode, rIdx))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "table-row":
      return (
        <tr key={index} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50/50 transition-colors">
          {node.content?.map((cellNode: any, cIdx: number) => renderRichNode(cellNode, cIdx))}
        </tr>
      );
    case "table-header-cell":
      return (
        <th
          key={index}
          className="bg-slate-100/90 text-carbony font-sans font-bold px-4 sm:px-5 py-3 border-r border-slate-200 last:border-r-0 text-xs sm:text-sm uppercase tracking-wider align-middle m-0"
        >
          <div className="m-0 p-0 leading-normal font-bold text-carbony">
            {renderCellContent(node.content)}
          </div>
        </th>
      );
    case "table-cell":
      return (
        <td
          key={index}
          className="px-4 sm:px-5 py-3 text-slate-700 font-sans border-r border-slate-200 last:border-r-0 text-sm sm:text-base leading-normal align-middle m-0 bg-white"
        >
          <div className="m-0 p-0 leading-normal text-slate-700">
            {renderCellContent(node.content)}
          </div>
        </td>
      );
    case "hr":
      return <hr key={index} />;
    default:
      if (node.content) {
        return <div key={index}>{renderNodeContent(node.content)}</div>;
      }
      return null;
  }
}

/**
 * Validasi dan sanitisasi URL agar aman dari bahaya XSS / tautan berbahaya.
 */
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

/**
 * Penyaji isi di dalam sel tabel.
 */
function renderCellContent(content: any[]): React.ReactNode {
  if (!Array.isArray(content)) return null;

  return content.map((child: any, i: number) => {
    if (child.nodeType === "paragraph") {
      return <span key={i} className="inline">{renderNodeContent(child.content)}</span>;
    }
    if (child.nodeType === "text" || child.nodeType === "hyperlink") {
      return renderNodeContent([child]);
    }
    return renderRichNode(child, i);
  });
}

/**
 * Penyaji teks inline beserta format penekanan (bold, italic, underline, code, hyperlink).
 */
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
    } else if (child.nodeType === "paragraph") {
      return <span key={i} className="inline">{renderNodeContent(child.content)}</span>;
    } else if (child.content) {
      return <React.Fragment key={i}>{renderNodeContent(child.content)}</React.Fragment>;
    }
    return null;
  });
}
