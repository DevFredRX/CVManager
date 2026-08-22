export default function Footer({ variant }) {

    if (variant === 'none') return null

    return (

        <>
        
            {variant === 'auth' ? (
                <footer className="form-footer">
                    <div>© CV Manager</div>
                    <div>La solution intelligente pour vos candidatures.</div>
                </footer>
            ) : (
                <footer className="default-footer"></footer>
            )}
            
        </>

    )

}