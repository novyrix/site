import { ImageResponse } from "next/og";

export const alt = "Novyrix. Development, engineered.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          overflow: "hidden",
          background: "#f7f7f7",
          color: "#1a1a1a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", width: "100%", height: 24, background: "#fd6304" }} />
        {[240, 480, 720, 960].map((left) => (
          <div
            key={left}
            style={{
              position: "absolute",
              top: 24,
              bottom: 0,
              left,
              display: "flex",
              width: 1,
              background: "rgba(26,26,26,0.14)",
            }}
          />
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "38px 58px 0",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 18, height: 18, background: "#fd6304" }} />
            NOVYRIX
          </div>
          <div style={{ display: "flex", color: "#fd6304" }}>NAIROBI / GLOBAL</div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px 58px 34px",
          }}
        >
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: "-0.065em" }}>
            Development,
          </div>
          <div
            style={{
              display: "flex",
              marginTop: -8,
              color: "#fd6304",
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.065em",
            }}
          >
            engineered.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(26,26,26,0.28)",
            padding: "24px 58px 28px",
            fontSize: 18,
          }}
        >
          <div style={{ display: "flex" }}>SOFTWARE / AUTOMATION / BITCOIN</div>
          <div style={{ display: "flex", color: "#5d5d58" }}>novyrix.com</div>
        </div>
      </div>
    ),
    size,
  );
}
