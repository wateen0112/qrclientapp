export interface QrStyle {
  frameUrl?: string;
  frameFile?: null | File;
  foregroundColor: string;
  backgroundColor: string;
  qrPatternStyle: number | string;
  topLeftOuterCorner: { url?: string; color: string };
  topLeftInnerCorner: { url?: string; color: string };
  topRightOuterCorner: { url?: string; color: string };
  topRightInnerCorner: { url?: string; color: string };
  bottomLeftOuterCorner: { url?: string; color: string };
  bottomLeftInnerCorner: { url?: string; color: string };
  logoFile?: string;
  logoUrl?: string;
  qrUrl?: string;
}
