import{r as o,j as t,i as k,o as z,L as E,a as A,b as C}from"../chunks/chunk-BK4YcTEG.js";/* empty css                      */import"../chunks/chunk-25N4ygma.js";/* empty css                      *//* empty css                      */function g(n){return new Map([["bug","#a6b91a"],["dark","#705746"],["dragon","#6f35fc"],["electric","#f7d02c"],["fairy","#d685ad"],["fighting","#c22e28"],["fire","#ee8130"],["flying","#a98ff3"],["ghost","#735797"],["grass","#7ac74c"],["ground","#e2bf65"],["ice","#96d9d6"],["normal","#a8a77a"],["poison","#a33ea1"],["psychic","#f95587"],["rock","#b6a136"],["steel","#b7b7ce"],["water","#6390f0"]]).get(n)||"#777"}const U=()=>{const[n,d]=o.useState([]),[y,x]=o.useState([]),[c,v]=o.useState(""),[i,T]=o.useState(""),[S,p]=o.useState(!1),[r,u]=o.useState(1),h=30;o.useEffect(()=>{(async()=>{p(!0);try{const a=(r-1)*h,l=await(await fetch(`https://pokedex.coda.memento-dev.fr/pokemon?limit=${h}&offset=${a}`,{headers:{Authorization:"Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi"}})).json(),j=await Promise.all(l.map(async m=>{const b=await(await fetch(`https://pokedex.coda.memento-dev.fr/pokemon/${m.slug}`,{headers:{Authorization:"Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi"}})).json();return{...m,types:b.current.types}}));d(j)}catch(a){console.error("Erreur lors du chargement des Pokémon :",a)}finally{p(!1)}})()},[r]),o.useEffect(()=>{(async()=>{try{const s=await(await fetch("https://pokedex.coda.memento-dev.fr/type",{headers:{Authorization:"Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi"}})).json();x(s)}catch(a){console.error("Erreur lors du chargement des types :",a)}})()},[]);const w=e=>e.length===1?g(e[0].slug):`linear-gradient(45deg, ${e.map(s=>g(s.slug)).join(", ")})`,P=n.filter(e=>{const a=e.name.toLowerCase().includes(c.toLowerCase()),s=i?e.types.some(l=>l.slug===i):!0;return a&&s}),f=e=>{e==="next"?u(a=>a+1):e==="prev"&&r>1&&u(a=>a-1)};return t.jsxs("div",{className:"p-4",children:[t.jsx("h1",{className:"text-3xl font-bold text-center mb-4",children:"Liste des Pokémon"}),t.jsxs("div",{className:"flex justify-center mb-4",children:[t.jsx("input",{type:"text",value:c,onChange:e=>v(e.target.value),placeholder:"Rechercher un Pokémon...",className:"border border-gray-300 rounded p-2 w-full max-w-md"}),t.jsxs("select",{value:i,onChange:e=>T(e.target.value),className:"ml-2 border border-gray-300 rounded p-2",children:[t.jsx("option",{value:"",children:"Tous les types"}),y.map(e=>t.jsx("option",{value:e.slug,children:e.name},e.slug))]})]}),S?t.jsx("p",{className:"text-center",children:"Chargement des Pokémon..."}):t.jsxs("div",{children:[t.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4",children:P.map(e=>t.jsxs("div",{className:"p-0 overflow-x-hidden rounded-md text-center shadow-lg hover:shadow-2xl transition-shadow relative",style:{background:w(e.types),color:"white"},children:[t.jsx("img",{src:e.sprites.normal.male,alt:e.name,className:"mx-auto mt-8"}),t.jsx("p",{className:"font-bold text-lg h-full w-full bg-gradient-to-t from-stone-950/0 via-stone-950/0 to-stone-950/80 absolute bottom-0",children:e.name})]},e.id))}),t.jsxs("div",{className:"flex justify-between items-center mt-6",children:[t.jsx("button",{disabled:r===1,onClick:()=>f("prev"),className:"bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50",children:"Précédent"}),t.jsxs("p",{children:["Page ",r]}),t.jsx("button",{onClick:()=>f("next"),className:"bg-gray-500 text-white px-4 py-2 rounded",children:"Suivant"})]})]})]})},D=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"})),$={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:k}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:z}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layouts/LayoutDefault.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:E}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"My Vike App"}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:A}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:C}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/index/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:D}}};export{$ as configValuesSerialized};
