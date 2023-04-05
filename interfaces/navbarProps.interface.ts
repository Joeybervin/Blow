import { CookieValueTypes } from "cookies-next";

export interface NavbarProps {
    visibility: string;
    theme: CookieValueTypes;
    onChangeTheme: (newTheme: CookieValueTypes) => void;
}