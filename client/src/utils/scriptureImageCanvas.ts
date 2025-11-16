// Canvas text auto-fit helper for Scripture Image Generator

interface DrawOptions {
  verseText: string;
  reference: string;
  version?: string;
  backgroundUrl: string;
  width: number;
  height: number;
  baseFontSize: number;
  minFontSize?: number;
  textColor?: string;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const w of words) {
    // Check if single word is too long
    const wordMetrics = ctx.measureText(w);
    if (wordMetrics.width > maxWidth) {
      // If we have accumulated text, push it first
      if (current) {
        lines.push(current);
        current = "";
      }
      // Split the long word character by character
      let chunk = "";
      for (const char of w) {
        const testChunk = chunk + char;
        const chunkMetrics = ctx.measureText(testChunk);
        if (chunkMetrics.width > maxWidth && chunk) {
          lines.push(chunk);
          chunk = char;
        } else {
          chunk = testChunk;
        }
      }
      if (chunk) {
        current = chunk;
      }
      continue;
    }

    const test = current ? current + " " + w : w;
    const metrics = ctx.measureText(test);
    if (metrics.width > maxWidth && current) {
      lines.push(current);
      current = w;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function drawScriptureImage(
  canvas: HTMLCanvasElement,
  opts: DrawOptions
): Promise<void> {
  const {
    verseText,
    reference,
    version,
    backgroundUrl,
    width,
    height,
    baseFontSize,
    minFontSize = 18,
    textColor = "#ffffff"
  } = opts;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = width;
  canvas.height = height;

  // Load background image
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = backgroundUrl;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject();
  }).catch(() => {
    // fallback: solid background if image fails
  });

  // Draw background (if loaded)
  ctx.clearRect(0, 0, width, height);
  if (img.width && img.height) {
    // cover behavior - center the image properly
    const scale = Math.max(width / img.width, height / img.height);
    const x = (width / 2) - (img.width * scale) / 2;
    const y = (height / 2) - (img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  } else {
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, width, height);
  }

  // Optional dark overlay for text contrast
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, 0, width, height);

  // Text box padding
  const paddingX = Math.floor(width * 0.08);
  const paddingTop = Math.floor(height * 0.18);
  const paddingBottom = Math.floor(height * 0.20);

  const textBoxWidth = width - paddingX * 2;
  const textBoxHeight = height - paddingTop - paddingBottom;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Auto-fit font size
  let fontSize = baseFontSize;
  let lines: string[] = [];
  while (fontSize >= minFontSize) {
    ctx.font = `500 ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    lines = wrapText(ctx, verseText, textBoxWidth);

    const lineHeight = fontSize * 1.3;
    const totalTextHeight = lines.length * lineHeight;

    if (totalTextHeight <= textBoxHeight) {
      break;
    }
    fontSize -= 1;
  }

  // Draw main verse text
  ctx.fillStyle = textColor;
  const lineHeight = fontSize * 1.3;
  const textBlockHeight = lines.length * lineHeight;
  let currentY = paddingTop + textBoxHeight / 2 - textBlockHeight / 2;

  for (const line of lines) {
    ctx.fillText(line, width / 2, currentY);
    currentY += lineHeight;
  }

  // Draw reference + version below
  const refFontSize = Math.max(18, Math.floor(fontSize * 0.7));
  ctx.font = `600 ${refFontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.9)";

  const refLine = version ? `${reference} (${version})` : reference;
  ctx.fillText(refLine, width / 2, height - Math.floor(height * 0.08));
}
