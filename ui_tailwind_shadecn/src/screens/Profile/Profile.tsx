
import {
    Layers,
    Menu,
    Search,
} from "lucide-react"

import {
    Twitter,
    LinkedIn,
    Instagram
} from '@/components/custom_ui/Svg'

import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from "react-router-dom"
import { Logo } from "@/components/custom_ui/Svg"
import { useEffect } from "react"
import { useCategories } from '@/hooks/useCategories';
import { NavSkeleton } from "@/components/custom_ui/skeleton/NavSkeleton"
import { useParams } from 'react-router-dom';
import { NavProfile } from "@/components/custom_ui/NavBar/NavProfile"
import { MainAuth } from "@/screens/Auth/MainAuth";

import { useLoginStore } from "@/store/Auth"
import { RenderComponents } from "@/components/custom_ui/components/RenderComponents"
import { ComponentType } from "@/enums/iframEnums"
import { useCreateComponentsStore } from '@/store/components/view.components';
import { ComponentData } from "@/types/ComponentData.type"

export function Profile() {

    interface ComponentsViewProps {
        status: string;
    }

    function ComponentsView({ status }: ComponentsViewProps) {
        const {
            componentsPending,
            componentsInReview,
            componentsRejected,
            componentsDraft,
            myComponents,
            fetchComponentsByStatusIfNeeded,
        } = useCreateComponentsStore();

        useEffect(() => {
            fetchComponentsByStatusIfNeeded(status);
        }, [status, fetchComponentsByStatusIfNeeded]);

        let components: ComponentData[] | null = [];

        switch (status) {
            case 'published':
                components = myComponents;
                break;
            case 'pending':
                components = componentsPending;
                break;
            case 'in_review':
                components = componentsInReview;
                break;
            case 'rejected':
                components = componentsRejected;
                break;
            case 'draft':
                components = componentsDraft;
                break;
            default:
                components = myComponents;
                break;
        }

        return (
            <>
                <RenderComponents components={components} type={ComponentType.COMPONENTS} />
            </>
        );
    }

    type componentsParamType = {
        catogries?: string;
    };

    const userInfo = useLoginStore.getState();
    const { catogries } = useParams<componentsParamType>();

    const categries = useCategories();

    return (
        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr]">
                <div className="hidden md:block">
                    <div className="fixed h-full">
                        <div className="flex h-full max-h-screen flex-col gap-2 relative">
                            <Link to={"/"}>
                                <div className="flex h-14 items-center cursor-pointer px-4 lg:h-[60px] lg:p-6">
                                    <Logo /> <h3 className=" px-2 font-bold">Ui Components</h3>
                                </div>
                            </Link>
                            {/* [mask-image:linear-gradient(to_top,transparent,white_50%,white_100%,transparent)] */}
                            <div className="flex-1 overflow-scroll  relative z-20 max-w-7xl ">
                                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                    <div>
                                        {categries.length > 0 ? (
                                            categries.map((category, index) => (
                                                <div className="transition duration-1000 ease-in-out relative">
                                                    <Link
                                                        to={`/${category}`}
                                                        key={index}
                                                        className={`${category === catogries ? 'text-primary bg-muted' : ''
                                                            } hover:bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition duration-500 ease-in-out my-1`}
                                                    >
                                                        {category}
                                                    </Link>
                                                </div>
                                            ))
                                        ) : (
                                            <>
                                                <NavSkeleton />
                                            </>
                                        )}
                                    </div>
                                </nav>
                            </div>

                        </div>
                    </div>
                </div>
                {userInfo.isLoggedIn ?
                    <>
                        <div className="flex flex-col px-4">
                            <header className="flex h-14 items-center gap-4  lg:h-[60px] ">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="shrink-0 md:hidden"
                                        >
                                            <Menu className="h-5 w-5" />
                                            <span className="sr-only">Toggle navigation menu</span>
                                        </Button>
                                    </SheetTrigger>

                                    <SheetContent side="left" className="flex flex-col">
                                        <nav className="grid gap-2 text-lg font-medium overflow-scroll">
                                            {categries.length > 0 ? (
                                                categries.map((category, index) => (
                                                    <div className="transition duration-1000 ease-in-out">
                                                        <Link
                                                            key={index}
                                                            to={`/${category}`} // Assuming each category corresponds to a route
                                                            className="hover:bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition duration-500 ease-in-out my-1"
                                                        >
                                                            {category}
                                                        </Link>
                                                    </div>
                                                ))
                                            ) : (
                                                <>
                                                    <NavSkeleton />
                                                </>
                                            )}
                                        </nav>
                                        <div className="mt-auto">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Join With Us </CardTitle>
                                                    <CardDescription>
                                                        Join the Revolution of Open Source UI
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Button size="sm" className="w-full">
                                                        Joing
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </SheetContent>

                                </Sheet>
                                <div className="w-full flex-1">
                                    <form>
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="search"
                                                placeholder="Search Components..."
                                                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="mr-3">
                                    <Link to={"/create"}>
                                        <Button>
                                            <Layers className="mr-2 h-4 w-4" /> Create New One
                                        </Button>
                                    </Link>


                                </div>
                                <NavProfile />
                            </header>
                            <main className="flex flex-1 flex-col gap-4 lg:gap-6 ">
                                <section className="text-gray-400  body-font">
                                    <div className="container px-5 py-5 mx-auto">
                                        <div className="flex items-center mx-auto border-b pb-10 mb-2 sm:flex-row flex-col">
                                            <div className="sm:w-72 sm:h-72 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-indigo-400  flex-shrink-0">
                                                <img src={userInfo?.user?.avatar_url || ""} alt="" />
                                            </div>
                                            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">

                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                                            {userInfo.user?.name}
                                                        </h1>
                                                    </div>
                                                    <div >
                                                        <div className="flex">
                                                            <Link to={"/"}>
                                                                <div className="px-2 cursor-pointer">
                                                                    <Twitter />
                                                                </div>
                                                            </Link>

                                                            <Link to={"/"}>
                                                                <div className="px-2 cursor-pointer">
                                                                    <Instagram />
                                                                </div>
                                                            </Link>

                                                            <Link to={"/"}>
                                                                <div className="px-2 cursor-pointer">
                                                                    <LinkedIn />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h2 className="text-white text-lg title-font font-medium mb-2">
                                                    {userInfo.user?.company}
                                                </h2>
                                                <blockquote className="my-6 border-l-2 pl-6 italic">
                                                    {userInfo.user?.bio}
                                                </blockquote>
                                                <div className="flex">
                                                    <div className="px-2">
                                                        <Link to={userInfo.user?.html_url || ""}><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                                            {userInfo.user?.location || ""}
                                                        </code>
                                                        </Link>
                                                    </div>
                                                    <div className="px-2">
                                                        <Link to={userInfo.user?.blog || ""}><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                                            @Website uri
                                                        </code>
                                                        </Link>
                                                    </div>
                                                    <div className="px-2">
                                                        <Link to={userInfo.user?.html_url || ""}><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                                            @github url
                                                        </code>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Tabs defaultValue="components" className="w-[100%]">
                                            <TabsList className="grid w-full grid-cols-6">
                                                <TabsTrigger value="components">
                                                    {/* <LogoPlain width={15} height={15} /> */}
                                                    My Components</TabsTrigger>
                                                <TabsTrigger value="review">In Review</TabsTrigger>
                                                <TabsTrigger value="draft">In Draft</TabsTrigger>
                                                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                                                <TabsTrigger value="liked">Liked</TabsTrigger>
                                                <TabsTrigger value="saved">Saved</TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="components">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>All Components</CardTitle>
                                                        <CardDescription>List of all components that were posted</CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-2">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            <ComponentsView status="published" />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>

                                            <TabsContent value="review">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>In Review</CardTitle>
                                                        <CardDescription>
                                                            Please wait for the approval
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-2">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            <ComponentsView status="in_review" />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="draft">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Draft</CardTitle>
                                                        <CardDescription>
                                                            My draft
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-2">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            <ComponentsView status="draft" />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="rejected">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Rejected</CardTitle>
                                                        <CardDescription>
                                                            Please review and send for approval
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-2">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            <ComponentsView status="rejected" />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="liked">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Liked</CardTitle>
                                                        <CardDescription>
                                                            My Liked
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-2">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            <ComponentsView status="my_components" />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="Saved">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Saved</CardTitle>
                                                        <CardDescription>
                                                            My Saves
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-2">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            <ComponentsView status="my_components" />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </section>
                            </main>
                        </div>

                    </>
                    :
                    <MainAuth />
                }


            </div>
        </>

    )
}


