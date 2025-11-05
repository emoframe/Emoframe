
import Image, { type ImageProps } from "next/image"
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

const HomeCard = ({title, description, image, odd=true,type} : HomeCardInfo) => {

  return (
    <div className={odd ? 'flex items-center justify-between w-2/4' : 'flex flex-row-reverse items-center justify-between w-2/4'}>
      <div className={cn(statusColorMap[type], "border-2 max-w-screen-sm p-8 rounded-xl")}>
        <h3 className="text-3xl font-bold ">{title}</h3>
        <p className="text-[#777777] w-3/4 mt-6">{description}</p>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Image
        src={image}
        alt="Imagem referente ao texto ao lado"
        height="240"
        width="240"
        />
      </div>
    </div>
  )
}

export default HomeCard