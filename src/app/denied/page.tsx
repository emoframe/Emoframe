import Link from "next/link"

export default function Denied() {
    return (
        <section className="flex flex-col gap-12 items-center">
            <h1 className="text-5xl">Acesso Negado</h1>
            <p className="text-3xl max-w-2xl text-center">Você não possui permissão ou houve um erro ao acessar essa página.</p>
            <Link href="/" className="text-3xl underline">Retornar a página inicial</Link>
        </section>
    )
}