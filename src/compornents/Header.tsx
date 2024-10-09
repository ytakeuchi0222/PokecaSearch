import { Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface HeaderProps {
    keyword: string;
    keywordChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const Header = ({ keyword, keywordChange }: HeaderProps) => {
    return (
        <header>
            <h1>
                <span>Pokeca</span>Search
            </h1>
            {/* <p>英語名から日本語のポケカ画像を検索</p> */}
            <Input
                type="text"
                value={keyword}
                onChange={keywordChange}
                placeholder="英語名で検索"
                variant="filled"
            />
        </header>
    );
};
