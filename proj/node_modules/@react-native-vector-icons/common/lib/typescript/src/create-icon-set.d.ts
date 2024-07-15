import React, { type Ref } from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';
export declare const DEFAULT_ICON_SIZE = 12;
export declare const DEFAULT_ICON_COLOR = "black";
export type IconProps<T> = TextProps & {
    name: T;
    size?: number;
    color?: TextStyle['color'];
    innerRef?: Ref<Text>;
};
export declare const createIconSet: <GM extends Record<string, number>>(glyphMap: GM, fontFamily: string, fontFile: string, fontStyle?: TextProps['style']) => React.ForwardRefExoticComponent<TextProps & {
    name: keyof GM;
    size?: number | undefined;
    color?: TextStyle['color'];
    innerRef?: React.Ref<Text> | undefined;
} & React.RefAttributes<Text>> & {
    getImageSource: (name: keyof GM, size?: number, color?: TextStyle['color']) => Promise<{
        uri: string;
        scale: number;
    } | undefined>;
    getImageSourceSync: (name: keyof GM, size?: number, color?: TextStyle['color']) => {
        uri: string;
        scale: number;
    } | undefined;
};
//# sourceMappingURL=create-icon-set.d.ts.map