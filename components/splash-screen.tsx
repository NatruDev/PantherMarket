import Signup from "./sign-up-dialogue";

export default function Splash() {
    return (
        <div className="w-full h-full flex flex-col justify-end items-end bg-cover bg-[url(/TopofCathedralofLearning.jpg)]">
            <div className="flex flex-col justify-end items-center bg-linear-176 from-[#49494900] from-58% via-[#494949bb] via-60% to-[#FFB81C] to-60% w-full h-full">
                <div className="w-7xl h-[45%] flex flex-col items-start mx-20 py-36">
                    <h1 className="text-primary text-8xl">Panther Market</h1>
                    <h2 className="text-primary w-2/5 text-xl my-7">Buy and sell with verified Pitt students. Textbooks, furniture, apparel — no shipping, no strangers.</h2>
                    <Signup full={true}/>
                </div>
            </div>
        </div>
    )
}