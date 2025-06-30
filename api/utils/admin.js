import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import prisma from "./db.js";
import { Database, Resource, getModelByName } from "@adminjs/prisma"
import { dark, light, noSidebar } from "@adminjs/themes"
import bcrypt, { hash } from "bcrypt";

AdminJS.registerAdapter({ Database, Resource })

const admin = new AdminJS({
    branding: {
        logo: false,
        companyName: "CSHUB",

    },
    rootPath: "/admin",
    defaultTheme: light.id,
    availableThemes: [light, noSidebar, dark],
    resources: [
        {
            resource: { model: getModelByName("User"), client: prisma }, options: {
                actions: {
                    new: {
                        before: async (request) => {
                            const password = request.payload?.password;
                            const hash = await bcrypt.hash(password, 12);
                            request.payload = { ...request.payload, password: hash }
                            return request
                        },

                    },
                    edit: {
                        before: async (request) => {
                            const plain = request.payload.password;
                            request.payload = { ...request.payload, password: await bcrypt.hash(plain, 12) }
                            return request;
                        }
                    }
                },
                icon: "User",
                name: "Accounts",
                label: "Accounts",
                navigation: null,
                properties: {
                    ["created_at"]: { isVisible: { list: false, show: true, edit: false } },
                    ["google_id"]: { isVisible: { list: false, view: false } }
                }
            }
        },



        {
            resource: { model: getModelByName("Document"), client: prisma }, options: {

                navigation: null,
                properties: {
                    ["owner"]: { isVisible: { list: true, show: true } }
                },
                actions: {
                    new: {
                        before: async (request) => {
                            const module_id = request.payload.module;
                            request.payload = { ...request.payload, owner: "fbc04bbc-8633-49d5-bc52-00027c1b0e41", module: parseInt(module_id) }
                            console.log(request.payload)
                            return request;
                        }
                    }
                }

            }
        },


        {
            resource: { model: getModelByName("Module"), client: prisma }, options: {

                navigation: null,
                properties: {
                    ["created_at"]: {
                        isVisible: { list: false }
                    },
                    ["updated_at"]: {
                        isVisible: { list: false }
                    }
                }

            }
        },
    ]
});


const adminRouter = AdminJSExpress.buildRouter(admin);

export { admin, adminRouter }