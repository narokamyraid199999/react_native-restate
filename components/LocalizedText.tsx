import React from "react";
import { Text, TextProps } from "react-native";
import { useLanguageFont, getFontFamily } from "@/lib/useLanguageFont";

interface LocalizedTextProps extends TextProps {
  fontWeight?:
    | "regular"
    | "medium"
    | "bold"
    | "semibold"
    | "light"
    | "extrabold";
}

const weightMap: Record<
  string,
  "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
> = {
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
};

export const LocalizedText = React.forwardRef<Text, LocalizedTextProps>(
  ({ fontWeight = "regular", style, className, ...props }, ref) => {
    const { isArabic } = useLanguageFont();

    // Extract font weight from className if provided
    const fontWeightFromClass = className?.match(
      /font-(rubik|cairo)(?:-(bold|medium|semibold|light|extrabold))?/,
    );
    const weight = (fontWeightFromClass?.[2] || fontWeight) as
      | "regular"
      | "medium"
      | "bold"
      | "semibold"
      | "light"
      | "extrabold";

    const fontFamily = getFontFamily(weight, isArabic ? "ar" : "en");

    // Remove old font classes and apply the correct one
    const cleanedClassName = className
      ?.replace(
        /font-(rubik|cairo)(?:-(bold|medium|semibold|light|extrabold))?/g,
        "",
      )
      .trim();

    return (
      <Text
        ref={ref}
        style={[
          {
            fontFamily,
            fontWeight: weightMap[weight],
          },
          style,
        ]}
        className={cleanedClassName}
        {...props}
      />
    );
  },
);

LocalizedText.displayName = "LocalizedText";
