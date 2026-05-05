import Link from 'next/link'

export const Menu: React.FC = () => {
    return (
        <aside className="column is-2 is-narrow-mobile is-fullheight section is-ridden-mobile">
            <p className="munu-label is-hidden-touch">
                Minhas Vendas
            </p>
            <ul className="menu-list">
                <MenuItem href="/" label="Home" />
                <MenuItem href="/" label="Cadastros" />
                <MenuItem href="/" label="Config" />
                <MenuItem href="/" label="Sair" />

            </ul>
        </aside>
    )
}

interface MenuItensProps {
    href: string;
    label: string;
}

const MenuItem: React.FC<MenuItensProps> = (props: MenuItensProps) => {
    return (
        <li>
            <Link href={props.href}>
                <span className="icon"></span> {props.label}
            </Link>

        </li>
    );
}