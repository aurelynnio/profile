import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GuoYing — Digital Craftsman';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f0e7db',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            color: '#00a86b',
            fontSize: 28,
            letterSpacing: 6,
            marginBottom: 24,
          }}
        >
          DIGITAL CRAFTSMAN
        </div>
        <div style={{ color: '#202023', fontSize: 96, fontWeight: 700 }}>
          GuoYing
        </div>
        <div style={{ color: '#8f7e6d', fontSize: 32, marginTop: 16 }}>
          Web development · 3D · Creative coding
        </div>
      </div>
    ),
    { ...size },
  );
}
