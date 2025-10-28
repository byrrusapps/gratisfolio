interface Routes {
icon: string,
text: string,
badge: boolean | undefined,
path: string
}

const AppRoutes: Routes[] = [

{
icon:"home",
text:"home",
badge:false,
path:"/",
},

{
icon:"files",
text:"my resumes",
badge:false,
path:"/my-resumes",
},

{
icon:"add",
text:"create",
badge:false,
path:"/charities",
},

{
icon:"account_circle",
text:"profile",
badge:false,
path:"/my-resumes",
},

{
icon:"settings",
text:"settings",
badge:false,
path:"/settings",
},

];

export default AppRoutes;