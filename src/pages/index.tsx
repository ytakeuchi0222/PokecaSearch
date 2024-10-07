import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@chakra-ui/react";
interface CardData {
    name: string;
    image: string;
    no: number;
    url: string;
    category: number;
    // 他の必要なフィールドを追加
}

interface HomeProps {
    cardData: CardData[];
    cardName: { en: string; ja: string }[];
}

export default function Home({ cardData, cardName }: HomeProps) {
    const [keyword, setKeyword] = useState<string>("");
    const [viewCardData, setViewCardData] = useState<CardData[]>([]);
    const [activeData, setActiveData] = useState("");

    const keywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    useEffect(() => {
        console.log("keyword:", keyword);
        let result = [];
        for (const i of cardName) {
            if (i.en.toLowerCase().match(keyword.toLowerCase())) {
                result.push(i);
                console.log(i.name);
            }
        }
        console.log(result);

        let result2 = [];
        for (const j of result) {
            for (const k of cardData) {
                //if (j.ja.match(k.name)) {
                if (k.name.match(j.ja)) {
                    result2.push(k);
                    console.log(k.name);
                    console.log(j.ja);
                }
            }
        }
        setViewCardData(result2);
    }, [keyword]);

    const popUp = (e: React.MouseEvent<HTMLLIElement>) => {
        console.log(e.currentTarget.className);
        const popUp = document.querySelector(".popUp");
        popUp.classList.toggle("hidden");
        const popUpImg = document.querySelector(
            ".popUp " + "." + e.currentTarget.className
        );
        popUpImg.classList.toggle("hidden");
        setActiveData("." + e.currentTarget.className);

        const scrollPosition = window.scrollY || window.pageYOffset;
        console.log(`Card  clicked. Scroll position: ${scrollPosition}px`);

        popUpImg.style.marginTop = `${scrollPosition}px`;
    };
    const closePopUp = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(activeData);
        const popUp = document.querySelector(".popUp");
        popUp.classList.toggle("hidden");
        const popUpImg = document.querySelector(".popUp " + activeData);
        popUpImg.classList.toggle("hidden");
    };

    return (
        <>
            <section className="wrapper">
                <h1>PokecaSearch</h1>
                <p>英語名で検索すると日本語のポケカ画像を検索できるサイト</p>
                <Input
                    type="text"
                    value={keyword}
                    onChange={keywordChange}
                    placeholder="英語名で検索"
                    size="md"
                    variant="filled"
                />
                {/* <pre>{JSON.stringify(viewCardData, null, 2)}</pre> */}
                <ul>
                    {viewCardData &&
                        viewCardData.map((card, index) => (
                            <li
                                key={index}
                                onClick={popUp}
                                className={`popup${index}`}
                            >
                                <Image
                                    src={card.url}
                                    alt={card.name}
                                    width={256}
                                    height={357}
                                />
                            </li>
                        ))}
                </ul>

                <div className="popUp hidden" onClick={closePopUp}>
                    {viewCardData.map((card, index) => (
                        <div key={index} className={`hidden popup${index}`}>
                            <Image
                                src={card.url}
                                alt={card.name}
                                width={640}
                                height={894}
                            />
                        </div>
                    ))}
                </div>

                {/* <pre>{JSON.stringify(cardName, null, 2)}</pre> */}
            </section>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const filePath = path.join(process.cwd(), "src/csv/PokemonCardList.csv");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const records: CardData[] = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
    });

    const filePath2 = path.join(process.cwd(), "src/csv/PokecaSearch.csv");
    const fileContent2 = fs.readFileSync(filePath2, "utf-8");
    const records2: CardData[] = parse(fileContent2, {
        columns: true,
        skip_empty_lines: true,
    });

    return {
        props: {
            cardData: records,
            cardName: records2,
        },
    };
};
