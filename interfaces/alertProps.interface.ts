
import { HTMLAttributes } from "react";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    message: string;
    visibility: string;
}