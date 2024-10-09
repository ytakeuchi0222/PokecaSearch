import Image from "next/image";
import { CardData } from "@/libs/interface";

interface CardListProps {
    viewCardData: CardData[];
    setActiveData: (data: string) => void;
}
export const CardList = ({ viewCardData, setActiveData }: CardListProps) => {
    const popUp = (e: React.MouseEvent<HTMLLIElement>) => {
        console.log(e.currentTarget.className);
        const popUp = document.querySelector(".popUp");
        popUp?.classList.toggle("hidden");
        const popUpImg: HTMLElement | null = document.querySelector(
            ".popUp " + "." + e.currentTarget.className
        );
        popUpImg?.classList.toggle("hidden");
        setActiveData("." + e.currentTarget.className);

        const scrollPosition = window.scrollY || window.pageYOffset;
        console.log(`Card  clicked. Scroll position: ${scrollPosition}px`);
        if (popUpImg) popUpImg.style.marginTop = `${scrollPosition + 20}px`;
    };
    return (
        <ul>
            {viewCardData &&
                viewCardData.map((card, index) => (
                    <li key={index} onClick={popUp} className={`popup${index}`}>
                        <Image
                            src={card.url}
                            alt={card.name}
                            width={256}
                            height={357}
                        />
                    </li>
                ))}
        </ul>
    );
};
