import { Card, CardContent, CardTitle } from "./ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function StoreItem({ data }: any) {
    return (
        <Card className="p-0 m-4 h-72 w-64">
            <CardContent className="p-0">
                <Carousel opts={{
                    loop: true,
                }}>
                    <CarouselContent className="w-full aspect-4/3 m-0">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="p-0">
                                <div>
                                    <img src="globe.svg"></img>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="translate-x-15" />
                    <CarouselNext className="-translate-x-15" />
                </Carousel>
                <div className="px-5">
                    <div className="flex flex-row justify-between items-baseline">
                        <h2 className="text-xl">{(data.price / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</h2>
                        <h3 className="text-md">{data.name}</h3>
                    </div>
                    <p className="text-neutral-500 text-xs">{data.description}</p>
                </div>
            </CardContent>
        </Card>
    )
}