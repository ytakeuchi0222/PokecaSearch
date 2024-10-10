import * as type from "@/libs/interface";

export const getCardList = (
    result: type.CardName[],
    cardData: type.CardData[]
): type.CardData[] => {
    // cardDataをハッシュマップに変換
    const cardDataMap = cardData.reduce((map, card) => {
        if (!map.has(card.name)) {
            map.set(card.name, []);
        }
        map.get(card.name)?.push(card);
        return map;
    }, new Map<string, type.CardData[]>());

    // resultとcardDataMapを組み合わせてresult2を作成
    const result2 = result.flatMap((j) => {
        return Array.from(cardDataMap.entries())
            .filter(([name]) => name.includes(j.ja))
            .flatMap(([, cards]) => cards);
    });

    return result2;
};
