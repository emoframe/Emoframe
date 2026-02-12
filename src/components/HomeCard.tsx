import Image from "next/image"
import { cn } from "@/lib/utils"
import { HomeModel } from "@/types/forms";

interface HomeCardInfo{
  title: string,
  description: string,
  image: string,
  odd?: boolean,
  type: HomeModel
}

const statusColorMap = {
  [HomeModel.Avaliation]: 'border-[#FDC314] text-[#FDC314]',
  [HomeModel.Tool]: 'border-[#1881BF] text-[#1881BF]',
  [HomeModel.Process]: 'border-[#EF7700] text-[#EF7700]',
  [HomeModel.Support]: 'border-[#6EA05A] text-[#6EA05A]',
};

const HomeCard = ({title, description, image, odd=true, type} : HomeCardInfo) => {

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-between w-full max-w-5xl gap-8 px-4 py-6",
        odd ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      
      <div className={cn(
          statusColorMap[type], 
          "border-2 p-6 md:p-8 rounded-xl w-full md:w-1/2 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]"  
        )}>
        <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
        <p className="text-[#777777] w-full md:w-3/4 mt-4 md:mt-6 text-sm md:text-base">
          {description}
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center w-full md:w-auto">
        <Image
          src={image}
          alt={title} 
          height={240} 
          width={240}
          className="object-contain w-40 h-40 md:w-60 md:h-60" 
        />
      </div>

    </div>
  )
}

export default HomeCard