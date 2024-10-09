export interface CardData {
    name: string;
    image: string;
    no: number;
    url: string;
    category: number;
    // 他の必要なフィールドを追加
}
export interface CardName {
    no: number;
    en: string;
    ja: string;
}

export interface HomeProps {
    cardData: CardData[];
    cardName: CardName[];
}
