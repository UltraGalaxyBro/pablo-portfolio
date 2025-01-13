import { Head } from "@inertiajs/react";
import PortfolioLayout from "@/Layouts/PortfolioLayout";
import PortfolioHero from "@/Components/Welcome/PortfolioHero";
import PortfolioProjectsSection from "@/Components/Welcome/PortfolioProjectsSection";

export default function Welcome({ auth, projects }) {
    return (
        <>
            <PortfolioLayout auth={auth}>
                <Head title="Bem-vindo(a)" />
                <PortfolioHero />
                <PortfolioProjectsSection projects={projects} />
            </PortfolioLayout>
        </>
    );
}