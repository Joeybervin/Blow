export interface InputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    onGpsData: () => void;
    onEnterPressed: (value: any) => void;
}