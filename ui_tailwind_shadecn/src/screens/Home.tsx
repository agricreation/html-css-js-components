import {
    CircleUser,
    Menu,
    Search
} from "lucide-react"

import {SearchIcon} from '../components/custom_ui/Svg';

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
//   } from "@/components/ui/tooltip"
  

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { Link } from "react-router-dom"

import { Input } from "@/components/ui/input"

import {Logo, LogoPlain} from "@/components/custom_ui/Svg"

import Teams from '../components/custom_ui/Teams';
import BlogCard from '../components/custom_ui/BlogCard';
import Content from '../components/custom_ui/Content';
import Extension from '../components/custom_ui/Extensions';
import Footer from '@/components/custom_ui/Footer';
import YoutubeContent from '../components/custom_ui/YoutubeContent';
import Community from '../components/custom_ui/Community';
import OutputsOfComponents from "@/components/custom_ui/OutputComponents"
import { ComponentType } from "@/enums/iframEnums"
// import { ContainerScroll } from "@/components/ui/container-scrool-animation";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";


// import {fetchCategories} from '@/api/components/categories';

// // import useFetchData from '@/hooks/use_fetch_data.hooks';
// import {useCategoriesStore} from '@/store/store';


export function Dashboard() {

    const { setTheme } = useTheme()
    const words = [
        {
          text: "Save",
        },
        {
          text: "and",
        },
        {
          text: "Share",
        },
        {
          text: "Your",
        },
        {
          text: "Creative",
        },
        {
          text: "Design",
        },
        {
          text: "to",
        },
        {
          text: "Open",
          className: "text-blue-500 dark:text-blue-500",
        },
        {
            text: "Source.",
            className: "text-blue-500 dark:text-blue-500",
          },
      ];
    return (
        <div className="flex min-h-screen w-full flex-col font-primary">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Logo />
                    <Link
                        to={`/}`}
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        UiComponents
                    </Link>
                    <Link
                       to={`/${"components"}`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        components 
                    </Link>

                    <Link
                        to={`/`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                        More{' '}
                                        {/* <CaretDownIcon
                                                        className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                                                        aria-hidden
                                                    /> */}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
                                        <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
                                            <li className="row-span-3 grid">
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="focus:shadow-violet7 from-purple9 to-indigo9 flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                                                        href="/"
                                                    >
                                                        <svg aria-hidden width="38" height="38" viewBox="0 0 25 25" fill="white">
                                                            <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                                                            <path d="M12 0H4V8H12V0Z"></path>
                                                            <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                                                        </svg>
                                                        <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] ">
                                                            Radix Primitives
                                                        </div>
                                                        <p className="text-mauve4 text-[14px] leading-[1.3]">
                                                            Unstyled, accessible components for React.
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                    </Link>
                </nav>
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
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                        <Logo />
                            <Link to={`/}`} className="hover:text-foreground">
                                Dashboard
                            </Link>
                            <Link
                                to={`/`}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Orders
                            </Link>
                            <Link
                                to={`/`}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Products
                            </Link>
                            <Link
                                to={`/`}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Customers
                            </Link>
                            <Link
                                to={`/`}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Analytics
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search components..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <main>
            <div className="py-6">
    <h1 className="scroll-m-20 text-6xl font-semibold tracking-tight lg:text-6xl text-center leading-10 font-stretch-150 font-opsz-28 font-GRAD-525.3399658203125">
        Open Source Awesome Ui-Componenets
        <br />
        for your next projects
    </h1>
</div>

<div className="flex flex-col items-center justify-center ">
      <TypewriterEffectSmooth words={words} />
      </div>
                <div>
                    <div className="w-full flex justify-center">
                        <div className="w-8/12 relative mt-2 rounded-md shadow-sm flex justify-center py-4 ">
                            <input
                                type="text"
                                name="price"
                                id="price"
                                className="

                               border-gradient-blue
                                animate-pulse
                                placeholder:text-muted-foreground  w-full rounded-full  bg-background text-xl border-2  p-4 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Explore all ui Components"
                            />

                            <button className="absolute px-6 inset-y-0 flex right-0 items-center hover:text-primary animate-pulse">
                              <SearchIcon />  <span className="px-1">Search</span>
                            </button>

                        </div>

                    </div>

                    <div className="flex justify-center hover:animate-pulse">
                    <Button >
                            <LogoPlain /> Search Components
                    </Button>
                    </div>

                </div>
       <div className="flex flex-col overflow-hidden">
   
    </div>


  <div className="flex flex-col text-center w-full mb-10 pt-10 ">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
        Popular Components That you might like to use
      </h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-primary">
        Most popular components 
      </p>
 </div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
    <div ><OutputsOfComponents html="Testing" css="Testing" js="testing" type={ComponentType.COMPONENTS}/>

    {/* <a className=" items-center">
          <span className="flex justify-between flex-row pt-1"> 
            <span className="title-font font-medium">Holden Caulfield</span>
            <span className="title-font font-thin text-gray-200">Holden Caulfield</span>
          </span>
    </a> */}
    
</div>
    <div ><OutputsOfComponents html="Testing" css="Testing" js="testing"  type={ComponentType.COMPONENTS}/></div>
    <div ><OutputsOfComponents html="Testing" css="Testing" js="testing"  type={ComponentType.COMPONENTS}/></div>
    <div ><OutputsOfComponents html="Testing" css="Testing" js="testing"  type={ComponentType.COMPONENTS}/></div>
    <div ><OutputsOfComponents html="Testing" css="Testing" js="testing"  type={ComponentType.COMPONENTS}/></div>
    <div ><OutputsOfComponents html="Testing" css="Testing" js="testing"  type={ComponentType.COMPONENTS}/></div>
    <div ><OutputsOfComponents html="Testing" css="Testing" js="testing"  type={ComponentType.COMPONENTS}/></div>
    <div ><OutputsOfComponents html="Testing" css="Testing" js="testing"  type={ComponentType.COMPONENTS}/></div>
    <div ><OutputsOfComponents html="Testing" css="Testing" js="testing"  type={ComponentType.COMPONENTS}/></div>
</div>

<div className="flex justify-center mt-10 hover:animate-pulse">
                    <Button >
                    <LogoPlain /> Explore All Components
                    </Button>
</div>

        <Teams />
        <BlogCard />
        <Content />
        <Extension />
        <YoutubeContent />
        <Community />
        <Footer />

            </main>
        </div>
    )
}


export function TypographyH4() {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            People stopped telling jokes
        </h4>
    )
}
