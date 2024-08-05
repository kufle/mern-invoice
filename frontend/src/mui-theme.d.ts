// mui-theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    indigo?: PaletteColor;
    orange?: PaletteColor;
    green?: PaletteColor;
    blue?: PaletteColor;
    yellow?: PaletteColor;
    darkRed?: PaletteColor;
  }

  interface PaletteOptions {
    indigo?: PaletteColorOptions;
    orange?: PaletteColorOptions;
    green?: PaletteColorOptions;
    blue?: PaletteColorOptions;
    yellow?: PaletteColorOptions;
    darkRed?: PaletteColorOptions;
  }
}