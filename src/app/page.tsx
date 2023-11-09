'use client';

import Image from "next/image";
import Reveal from "@/components/Reveal";


export default function Home() {
    return (
        <section className="flex justify-center items-center w-full">
            <div className="flex flex-nowrap flex-row items-center justify-between gap-6">
                <div className="relative w-fit">
                    <Reveal>
                        <h1 className="text-[5rem] font-black">
                            Emoframe
                        </h1>
                    </Reveal>
                    <Reveal>
                        <h2 className="text-2xl font-extralight">
                            Lorem ipsum dolor sit amet
                        </h2>
                    </Reveal>
                    <Reveal>
                        <p className="max-w-[700px] font-extralight">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci sagittis eu volutpat odio facilisis mauris sit amet. Vitae congue eu consequat ac felis. Odio morbi quis commodo odio aenean sed. Lobortis scelerisque fermentum dui faucibus in. At erat pellentesque adipiscing commodo elit at.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
