import * as type from "@/libs/interface";
export const getCardList = (
    result: type.CardName[],
    cardData: type.CardData[]
) => {
    const result2 = [];
    for (const j of result) {
        for (const k of cardData) {
            if (k.name.match(j.ja)) {
                result2.push(k);
            }
        }
    }
    return result2;
};
