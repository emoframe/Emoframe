import Image from "next/image"

const contents: {picture: string, name: string, role: string}[] = [
    {
        picture: '/images/logo_sem_nome_dark.svg',
        name: 'Lorem Ipsum',
        role: 'Lorem Ipsum',
    },
    {
        picture: '/images/logo_sem_nome_dark.svg',
        name: 'Lorem Ipsum',
        role: 'Lorem Ipsum',
    },
    {
        picture: '/images/logo_sem_nome_dark.svg',
        name: 'Lorem Ipsum',
        role: 'Lorem Ipsum',
    },
    {
        picture: '/images/logo_sem_nome_dark.svg',
        name: 'Lorem Ipsum',
        role: 'Lorem Ipsum',
    },
]

export default function About(){
    return (
        <div className="h-full my-20 max-w-screen-lg">
            <p className="font-extralight text-justify mb-8">O <b>EmoFrame</b> é um projeto da USP lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue risus sed tortor commodo scelerisque at ac odio. Duis aliquet enim ut pharetra efficitur. Etiam auctor sapien metus. Donec vestibulum nisi at pulvinar facilisis. Mauris mollis fringilla nisi, id consectetur tortor ornare in. Nullam dignissim placerat pulvinar. Donec vel volutpat nulla, non ullamcorper mi. Nunc aliquam ante eget sem vestibulum, ut viverra ex auctor. Nam iaculis purus quis nisl rhoncus, a iaculis felis ullamcorper. Etiam eget tellus at ipsum maximus gravida sed et ante. Duis maximus elementum nunc, tempor dignissim mauris. Mauris commodo magna augue, sit amet volutpat dolor suscipit sed. Fusce sit amet semper nibh. Ut mattis, mi eget dictum vestibulum, dolor mauris lobortis arcu, eu eleifend ligula diam non mauris.</p>
            <div className="w-full flex flex-col items-center mb-8">
                <h2 className="text-2xl font-bold mb-6">Equipe</h2>
                <div className="w-full flex flex-wrap justify-center gap-5">
                    {contents.map(({picture, name, role}, i) => (
                        <div key={i} className="bg-primary-background p-5 rounded-lg max-w-xs flex flex-col justify-between gap-4">
                            <Image src={picture} alt="" width="200" height="200"/>
                            <h2 className="text-xl text-center font-semibold">{name}</h2>
                            <p className="text-xl font-extralight text-center">{role}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6">Publicações</h2>
            </div>
        </div>
    )
}