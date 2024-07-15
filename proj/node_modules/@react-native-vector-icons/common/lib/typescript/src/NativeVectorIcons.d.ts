import type { TurboModule } from 'react-native';
export interface Spec extends TurboModule {
    getImageForFont(fontName: string, glyph: string, fontSize: number, color: number): Promise<string>;
    getImageForFontSync(fontName: string, glyph: string, fontSize: number, color: number): string;
    loadFontWithFileName(fontFileName: string, extension: string, subdirectory?: string): Promise<void>;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeVectorIcons.d.ts.map