import { Outlet } from "react-router-dom";


export default function MainLayout() {
    return (
        <div className="bg-white container mx-auto max-w-full ">
            <main className="flex-grow container max-w-4/6 mx-auto px-4 py-6">
                <Outlet /> 
            </main>
        </div>
    );
}