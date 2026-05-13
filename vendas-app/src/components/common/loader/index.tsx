
interface LoaderProps {
    show: boolean;
}


export const Loader: React.FC<LoaderProps> = ({ show }) => {

    if (show) {
        <></>
    }
    return (
        <div id="loader" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%', 
            padding: '2rem 0',
            minHeight: '150px'
        }}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span className="has-text-grey mt-3">Carregando...</span>
        </div>
    );
}