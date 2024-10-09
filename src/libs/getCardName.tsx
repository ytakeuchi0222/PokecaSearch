import * as type from "@/libs/interface";

export const getCardName = (cardName: type.CardName[], keyword: string) => {
    const result = [];
    for (const i of cardName) {
        if (i.en.toLowerCase().match(keyword.toLowerCase())) {
            result.push(i);
        }
    }
    console.log(result);
    return result;
};
