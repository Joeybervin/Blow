
interface inputProps {
    onChange : React.ChangeEventHandler<HTMLInputElement>;
    value: string;
}

const SearchInput: React.FC<inputProps> = ({onChange, value}) => {
    return (
        <span className="relative">
            <svg className="absolute left-0 inset-y-0 fill-current w-6 h-6 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="scale(-1 1)"><path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z" fill="#333333" /></svg>
            <input
                type="search"
                placeholder="Rechercher..."
                className="input input-bordered rounded w-full pl-10"
                onChange={onChange}
                value={value}
            />
            <svg className="absolute right-0 inset-y-0 fill-current w-6 h-6 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 18.825s5-6.08 5-8.82c0-2.741-2.239-4.963-5-4.963s-5 2.222-5 4.963c0 2.74 5 8.82 5 8.82Zm1.532 1.313L12 22l-1.532-1.862-.234-.291a49.949 49.949 0 0 1-2.384-3.25 34.244 34.244 0 0 1-1.13-1.794C5.624 12.92 5 11.37 5 10.005A7.002 7.002 0 0 1 12 3c3.854 0 7 3.123 7 7.005 0 1.365-.623 2.916-1.72 4.798a34.244 34.244 0 0 1-1.13 1.794 49.949 49.949 0 0 1-2.618 3.54ZM12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" fill="#333333" /></svg>
        </span>
    )
}

export default SearchInput;