import {ComponentsStore, ViewComponentStore, } from '@/types/ComponentStore.type'
import {CategoriesStore} from '@/types/CategoriesStore.type'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


// Create the store with zustand
export const useCategoriesStore = create<CategoriesStore>()(
  persist(
    (set) => ({
      categories: [],
      addCategories: (newCategories) => set((state) => ({
        categories: [...state.categories, ...newCategories],
      })),
    }),
    {
      name: 'catogries-store', 
      storage: createJSONStorage(() => sessionStorage), 
      partialize: (state) => ({ categories: state.categories}),
    }
  )
);

export const useComponentsStore = create<ComponentsStore>(() => ({
    all : [],
    navbar : [],
    buttons : [],
    carosel : [],
    hero_section : [],
    dropdown : [],
    testimonial : [],
    features : [],
    toggles : [],
    faq : [],
    forms : [],
    pricing : [],
    login_signup : [],
    accordian : [],
    cards : [],
    toggle : [],
    tabs : [],
    input : [],
    modals : [],
    notification : [],
    loader : [],
    countdown : [],
    contactus : [],
    footer : [],
    tooltip : [],
    others : [],
    checkbox : [],
    gradient : [],
    toast : [],
    search: [],
}));

export const useViewComponentStore = create<ViewComponentStore>(() => ({
    viewComponents: {
        html: "",
        css: "",
        js: "",
        catogries: "",
        folder_path: "",
        folder_name: "",
        isActive: false,
        type: "",
        like: {
          isLiked: false,
          likeCount: "0"
        },
        saved:{
          isSaved: false,
          savedCount: "0"
        },
        views:{
          count: ""
        },
        title: "",
        description: "",
        comments:{
            count: "",
            commentsList:[
              {
                comment:"",
                user:"",
                avatar:"",
                date:""
              }
            ]
          },
        admin: {
            _id: "",
            login: "",
            avatar_url: "",
            url: "",
            html_url: "",
            company: "",
            location: "",
            email: null,
            name: "",
            blog: "",
            bio: "",
            twitter_username: null,
            __v: 0,
        },
    },
}));