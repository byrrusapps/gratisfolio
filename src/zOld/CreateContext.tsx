// import { palette1, palette2, palette3 } from "@/app/create/scripts";
// import { createContext, useContext, useRef, useState, useMemo } from "react";

// interface CreateState {
// pos: number,
// setPos: (index: any) => void,
// Builder: Array<any>,
// cvData: object,
// avatar: string, 
// setAvatar: (avatar: any) => void,
// showAvatar: boolean,
// setShowAvatar: (showAvatar: boolean) => void,
// headings: object,
// setHeadings: React.Dispatch<
//   React.SetStateAction<{
//     value: Record<string, string>;
//     placeholder: Record<string, string>;
//   }>
// >

// }

// interface Headings {
//   value: Record<string, string>;
//   placeholder: Record<string, string>;
// }

// type Field = {
//   id: string;
//   value: any;
//   ignore?: boolean;
// };
// type ExtractField = {
//   icon?: string,
//   value?: any;
//   placeholder?: any;
//   ignore?: boolean;
// };
// type HandleSingleFormChange = {
//   id: string;
//   value: any;
//   ignore?: boolean;
//   setter: React.Dispatch<React.SetStateAction<Field[]>>;
// };


// const handleSingleFormChange = ({
//   id,
//   value,
//   ignore,
//   setter,
// }: HandleSingleFormChange) => {
//   setter((prev: Field[]) =>
//     prev.map((field) =>
//       field.id === id ? { ...field, ...(value !== undefined && { value }), ...(ignore !== undefined && { ignore }), } : field
//     )
//   );
// };
// const extractSingleInfo = ({icon, value, placeholder, ignore}:ExtractField) => {
  
//   const hasValue = value && value.length > 0;

//   if (hasValue) {
//     return { value, ignore, icon };
//   } else {
//     return { value: placeholder, ignore, icon };
//   }
// };
// function extractHeading({ headings, key }: { headings: Headings; key: string }) {
//   const val = headings.value[key];
//   const placeholder = headings.placeholder[key] || "";
//   return val && val.trim().length > 0 ? val : placeholder;
// }

// interface UseMultiFormParams<T extends string> {
//   keys: T[];
//   placeholders?: Record<T, string>;
// }

// const useMultiForm = <T extends string>({
//   keys,
//   placeholders = {} as Record<T, string>,
// }: UseMultiFormParams<T>) => {
//   const [forms, setForms] = useState<Record<T, string>[]>([]);

//   // ➕ Add new empty object
//   const add = () => {
//     const newEntry = Object.fromEntries(keys.map(k => [k, ""])) as Record<T, string>;
//     setForms(prev => [...prev, newEntry]);
//   };

//   // ➖ Remove object by index
//   const remove = (index: number) => {
//     setForms(prev => prev.filter((_, i) => i !== index));
//   };

//   // 🔁 Update a key’s value in a specific object
//   const update = (index: number, key: T, value: string) => {
//     setForms(prev =>
//       prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
//     );
//   };

//   // 🧠 Extract info with placeholders
//   const cvData = useMemo(() => {
//     return forms.map(form =>
//       Object.fromEntries(
//         keys.map(k => {
//           const val = form[k];
//           const placeholder = placeholders[k] || "";
//           const isValid = val !== null && val !== undefined && val.trim().length > 0;
//           return [k, isValid ? val : placeholder];
//         })
//       ) as Record<T, string>
//     );
//   }, [forms, keys, placeholders]);

//   return [forms, { add, remove, update, cvData }] as const;
// };

// const CreateContext = createContext<CreateState | undefined>(undefined);

// const CreateProvider = ({ children }: { children: React.ReactNode }) => {

// const [pos, setPos] = useState(0);

// const contentRef = useRef(null);
// const palettes = [palette1, palette2, palette3];
// const [palette, setPalette] = useState(palettes[0]);
// const [mode, setMode] = useState("light"); //light | dark
// const [layout, setLayout] = useState("spacious"); //spacious | compact


// const Lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor elit sit amet quam faucibus facilisis. Donec venenatis orci at ex tincidunt, eget euismod quam pellentesque.\n In hac habitasse platea dictumst. Ut mattis sagittis imperdiet.`;
// const Mauris = `Mauris sagittis faucibus arcu, ac consequat nisi semper at. Nullam nec iaculis dolor. Ut viverra neque at aliquam laoreet. Maecenas ut maximus mauris. Etiam ac ultrices enim.`;

// const [avatar, setAvatar] = useState("/images/default-av.jpg");
// const [showAvatar, setShowAvatar] = useState(true);

// const [headings, setHeadings] = useState({
// "value":{
// profession:"",
// profile:"",
// experience:"",
// contact:"",
// education:"",
// skills:"",
// references:"",
// },
// "placeholder":{
// profession:"Profession",
// profile:"Profile",
// experience:"Experience",
// contact:"Contact",
// education:"Education",
// skills:"Skills",
// references:"References",
// }
// });

// const extractedHeaders = {
// profile: extractHeading({ headings, key:"profile"}),
// experience: extractHeading({ headings, key:"experience"}),
// contact: extractHeading({ headings, key:"contact"}),
// education: extractHeading({ headings, key:"education"}),
// skills: extractHeading({ headings, key:"skills"}),
// profession: extractHeading({ headings, key:"profession" }),
// references: extractHeading({ headings, key:"references" }),
// }

// const [singleForms, setSingleForms] = Array ([
//   { 
//     id: "profession", label: "Profession", placeholder: "my profession",
//     value: "", type: "text", section: "work", required: true, icon:"work",
//   },
//   { 
//     id: "name", label: "Full Name", placeholder: "John Doe",
//     value: "", type: "text", icon:"id_card", section: "profile", required: true 
//   },
//   { 
//     id: "summary", label: "Profile Summary", placeholder: "Write a short bio...",
//     value: Mauris, type: "text", icon:"frame_person",
//     section: "profile", multiline: true, required: true 
//   },
//   { 
//     id: "email", label: "Email Address", placeholder: "johndoe@example.com",
//     value: "", type: "email", icon:"alternate_email",
//     section: "contact", required: false, ignore: false
//     },
//   { 
//     id: "phone", label: "Phone Number", placeholder: "+123 456 7890",
//     value: "", type: "tel", icon:"call",
//     section: "contact", required: false, ignore: false
//   },
//   { 
//     id: "website", label: "Website/Portfolio", placeholder: "https://yourportfolio.com",
//      value: "", type: "url", icon:"",
//     section: "contact", required: false, ignore: false
//      },
//   { 
//     id: "address", label: "Address", placeholder: "123 Street, City, Country",
//     value: "", type: "text", icon:"",
//     section: "contact", required: false, ignore: false, 
//    },
// ]);
// const contact = singleForms.filter(i => i.section === "contact").map((item) => {

// const newObj = extractSingleInfo(item);

// return newObj;

// });
// const profile = singleForms.filter(i => i.section !== "contact").reduce((acc, item) => {
//     const newObj = extractSingleInfo(item); 
//     acc[item.id] = newObj;
//     return acc;
//   }, {} as Record<string, any>
// );

// const experienceBase = {

// key: ["startYear", "endYear", "position", "company", "details"],

// placeholder: {
// startYear: "2022",
// endYear: "2026",
// position: "ENTER YOUR JOB POSITION HERE",
// company: "Company Name - street/state address here",
// details: Lorem,
// },

// }
// const [experience, { add:addExp, remove:removeExp, update:updateExp, cvData:expData }] = useMultiForm({
//   keys: experienceBase.key,
//   placeholders: experienceBase.placeholder,
// });

// const educationBase = {

// key: ["startYear", "endYear", "degree", "institution", "details"],

// placeholder: {
// startYear:"2010",
// endYear:"2016",
// degree: "YOUR DEGREE NAME HERE",
// institution:"University or College Name",
// details:Mauris,
// },

// };
// const [education, { add:addEdu, remove:removeEdu, update:updateEdu, cvData:eduData }] = useMultiForm({
//   keys: educationBase.key,
//   placeholders: educationBase.placeholder,
// });

// const skillBase = {

// key: ["skill", "proficiency", "details"],

// placeholder: {
// skill:"PHOTOSHOP",
// proficiency:80,
// details:Mauris,
// },

// };
// const [skill, { add:addSkill, remove:removeSkill, update:updateSkill, cvData:skillData }] = useMultiForm({
//   keys: experienceBase.key,
//   placeholders: experienceBase.placeholder,
// });

// const referencesBase = {

// key: ["name", "title", "refEmail", "refPhone"],

// placeholder: {
// name: "Jane Doe",
// title: "CEO",
// refEmail: "janedoe@example.com",
// refPhone: "+123 456 7890"
// },

// };
// const [references, { add:addReference, remove:removeReference, update:updateReference, cvData:referenceData }] = useMultiForm({
//   keys: referencesBase.key,
//   placeholders: referencesBase.placeholder,
// });

// const singleFormsBuilder = [
// {
// heading: extractedHeaders["profession"],
// toMap: singleForms.filter(i => i.section === "work"),
// setter: setSingleForms,
// handleChange: handleSingleFormChange,
// },
// {
// heading: extractedHeaders["profile"],
// toMap: singleForms.filter(i => i.section === "profile"),
// setter: setSingleForms,
// handleChange: handleSingleFormChange,
// },
// {
// heading: extractedHeaders["contact"],
// toMap: singleForms.filter(i => i.section === "contact"),
// setter: setSingleForms,
// handleChange: handleSingleFormChange,
// },
// ];

// const multiFormsBuilder = [

// {

// heading: extractedHeaders["experience"],
// keys: experienceBase.key,
// state: experience,

// functions:{
// add: addExp,
// remove: removeExp,
// update: updateExp,
// }

// },

// {

// heading: extractedHeaders["education"],
// keys: educationBase.key,
// state: education,

// functions:{
// add: addEdu,
// remove: removeEdu,
// update: updateEdu,
// }

// },

// {

// heading: extractedHeaders["skills"],
// keys: skillBase.key,
// state: skill,

// functions:{
// add: addSkill,
// remove: removeSkill,
// update: updateSkill,
// }

// },

// {

// heading: extractedHeaders["references"],
// keys: referencesBase.key,
// state: references,

// functions:{
// add: addReference,
// remove: removeReference,
// update: updateReference,
// }

// },

// ];

// const Builder = [
// {
// type: "single",
// content: singleFormsBuilder,
// },
// {
// type: "multi",
// content: multiFormsBuilder,
// },
// ];


// const cvData = {
// contact,
// ...(profile),
// experience: expData,
// education: eduData,
// skill: skillData,
// reference: referenceData,
// headings: extractHeading,
// avatar, showAvatar,
// mode, layout,
// contentRef,
// }


// return(
// <CreateContext.Provider
// value={{
// pos,
// setPos,
// Builder,
// cvData,
// avatar, setAvatar,
// showAvatar, setShowAvatar,
// palette, setPalette,
// layout, setLayout,
// mode, setMode,
// headings, setHeadings,
// contentRef,
// }}
// >

// {children}

// </CreateContext.Provider>
// )

// }

// const useCreate = () => {
// const context = useContext(CreateContext);
//   if (!context) throw new Error('useCreate must be used inside CreateProvider');
//   return context;
// }

// export { CreateProvider, useCreate};