import * as type from "@/libs/interface";

export const getCardName = (cardName: type.CardName[], keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();
    const result = cardName.filter((i) =>
        i.en.toLowerCase().includes(lowerKeyword)
    );
    //console.log(result);
    return result;
};
