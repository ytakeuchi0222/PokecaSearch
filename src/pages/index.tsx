import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import { useCallback, useEffect, useState } from "react";

import * as type from "@/libs/interface";
import { Header } from "@/compornents/Header";
import { CardList } from "@/compornents/CardList";
import { DetailCardList } from "@/compornents/DetailCardList";
import { getCardList } from "@/libs/getCardList";
import { getCardName } from "@/libs/getCardName";

export default function Home({ cardData, cardName }: type.HomeProps) {
    const [keyword, setKeyword] = useState<string>("");
    const [viewCardData, setViewCardData] = useState<type.CardData[]>([]);
    const [activeData, setActiveData] = useState("");
    const [nameList, setNameList] = useState<type.CardName[]>([]);

    const keywordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setKeyword(e.target.value);
        },
        []
    );

    useEffect(() => {
        console.log("keyword:", keyword);
        const result = getCardName(cardName, keyword);
        setNameList(result);
        const result2 = getCardList(result, cardData);
        setViewCardData(result2);
    }, [keyword]);

    return (
        <>
            <section className="wrapper">
                <Header
                    keyword={keyword}
                    keywordChange={keywordChange}
                ></Header>
                <ul className="NameList">
                    {nameList &&
                        nameList.length < 30 &&
                        nameList.map((Name, index) => (
                            <li key={index}>{Name.en}</li>
                        ))}
                </ul>
                <CardList
                    viewCardData={viewCardData}
                    setActiveData={setActiveData}
                ></CardList>
                <DetailCardList
                    viewCardData={viewCardData}
                    activeData={activeData}
                ></DetailCardList>

                {/* <pre>{JSON.stringify(cardName, null, 2)}</pre> */}
            </section>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const filePath = path.join(process.cwd(), "src/csv/PokemonCardList.csv");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const records: type.CardData[] = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
    });

    const filePath2 = path.join(process.cwd(), "src/csv/PokecaSearch.csv");
    const fileContent2 = fs.readFileSync(filePath2, "utf-8");
    const records2: type.CardData[] = parse(fileContent2, {
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
