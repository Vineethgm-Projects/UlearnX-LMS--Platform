const AuthLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
    return (
        <div className="h-screen flex items-center justify-center bg-black">
            {children}
        </div>
    );
}
export default AuthLayout;