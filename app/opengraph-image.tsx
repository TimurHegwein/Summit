import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { EVENT_NAME, hero } from "@/content/event";

// Social card for link previews (LinkedIn, Slack, iMessage, X), rendered at
// build time: the hero photo under a brand-black fade, logo, title, tagline.
export const alt = `${EVENT_NAME} San Francisco: ${hero.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const file = (path: string) => readFile(join(process.cwd(), path));
const dataUrl = (bytes: Buffer, type: string) => `data:${type};base64,${bytes.toString("base64")}`;

export default async function Image() {
  const [photo, logo, manrope] = await Promise.all([
    file("public/sf-bridge.jpg"),
    file("public/logo_new_white_standard.png"),
    // Static instance of the kit's variable Manrope: Satori cannot read variable fonts.
    file("assets/Manrope-Medium.ttf"),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#0d0214",
        position: "relative",
        fontFamily: "Manrope",
      }}
    >
      <img
        src={dataUrl(photo, "image/jpeg")}
        alt=""
        width={1200}
        height={831}
        style={{ position: "absolute", right: -260, top: -100, width: 1200, height: 831, objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          display: "flex",
          background: "linear-gradient(90deg, #0d0214 0%, rgba(13,2,20,0.92) 45%, rgba(13,2,20,0.35) 80%, rgba(13,2,20,0.15) 100%)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: "100%" }}>
        <img src={dataUrl(logo, "image/png")} alt="" width={222} height={56} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, color: "#c9a5ef", letterSpacing: -4, lineHeight: 1 }}>{EVENT_NAME}</div>
          <div style={{ fontSize: 40, color: "#ffffff", marginTop: 24, maxWidth: 720, lineHeight: 1.2 }}>
            {hero.tagline}
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)", marginTop: 32 }}>
            Summit + Hackathon · San Francisco
          </div>
        </div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Manrope", data: manrope, style: "normal" }] },
  );
}
