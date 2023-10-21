import NavBar from "@/components/NavBar/NavBar";
import Header from '@/components/Header/Header';
import Main from "@/components/Main/Main";
import TaskProvider from "@/contexts/TaksContext";

function Index(props) {
    return (
        <>
            <Header />
            <TaskProvider>
                <NavBar />
                <Main />
            </TaskProvider>
        </>
    )
}

export default Index;