import Image from "next/image";
import { CardData } from "@/libs/interface";

interface CardListProps {
    viewCardData: CardData[];
    activeData: string;
}

export const DetailCardList = ({ viewCardData, activeData }: CardListProps) => {
    const closePopUp = () => {
        console.log(activeData);
        const popUp = document.querySelector(".popUp");
        popUp?.classList.toggle("hidden");
        const popUpImg = document.querySelector(".popUp " + activeData);
        popUpImg?.classList.toggle("hidden");
    };
    return (
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
    );
};
