import { createElement } from "./component.js";





const messageBtn = createElement(
  "button",
  {
    className:["border-2 border-red-500","p-2","w-36", "h-22", "flex", "flex-col","text-sm"]
  },
  [
    createElement(
      "i",
      {
        className:[
          "fa-solid","fa-message","text-xl"
        ]
      },
    ),
        "Messages"

  ]
);

const groupBtn = createElement(
  "button",
  {
    className:["border-2 border-red-500","p-2","w-36", "h-22", "flex", "flex-col","text-sm"]
  },
  [
    createElement(
      "i",
      {
        className:[
         "fa-solid","fa-user-group","text-xl"
        ]
      },
    ),
        "Groupes"

  ]
);

const diffusionBtn = createElement(
  "button",
  {
    className:["border-2 border-red-500","p-2","w-36", "h-22", "flex", "flex-col","text-sm"]
  },
  [
    createElement(
      "i",
      {
        className:[

        ]
      },
      "logo"
    ),
        "Diffusions"

  ]
);


const archiveBtn = createElement(
  "button",
  {
    className:["border-2 border-red-500","p-2","w-36", "h-22", "flex", "flex-col","text-sm"]
  },
  [
    createElement(
      "i",
      {
        className:[
          "fa-solid", "fa-box-archive","text-xl"
        ]
      },
    ),
        "Archives"

  ]
);

const nouveauBtn = createElement(
  "button",
  {
    className:["border-2 border-red-500","p-2","w-36", "h-22", "flex", "flex-col"]
  },
  [
    createElement(
      "i",
      {
        className:[
          "fa-solid", "fa-plus","text-xl"

        ]
      },
    ),
        "Nouveau"

  ]
);

const sidebar = createElement(
  "div",
  {
    className:["w-1/12","h-full","bg-slate-100" ,"flex","items-center","justify-center","flex","flex-col","gap-3","rounded-tl-xl","rounded-bl-xl"]
  },
  [
    messageBtn,
    groupBtn,
    diffusionBtn,
    archiveBtn,
    nouveauBtn
  ]
);

const barreRecherche = createElement(
  "input",
  {
    type:"text",
    placeholder:"Rechercher",
    className:["focus:outline-none","w-full","rounded-md","mt-3","p-2"]
  }
);


const discussion = createElement(
  "div",
  {
    className:["w-3/12","h-full","bg-slate-200","p-3"]
  },[
    createElement("h1",{className:["text-xl"]},"Discussions"),
        barreRecherche

  ]
);


const actions = createElement(
  "div",
  {
    className : ["w-[40%]","h-full","bg-slate-500"]
  }
);

const photo_profil = createElement(
  "div",
  {
    className : ["w-[3.9%]","h-full","rounded-full","bg-slate-500"]
  }
);

const headerZoneMessage = createElement(
  "div",
  {
    className:["w-full","h-[7%]","bg-red-50","p-2","rounded-tr-xl","flex","justify-between","items-center"]
  },
  [
    photo_profil,
    actions
  ]
);

const corpsZoneMessage = createElement(
  "div",
  {
    className:["w-full","h-[83%]","bg-red-100"]
  }
);

const textMessage  = createElement(
  "input",
   {
    type:"text",
    className:["w-[90%]","h-[70%]","bg-red-800","rounded-xl"]
  }
);

const envoyer = createElement(
  "button",
  {
    className : ["w-[5%]","h-[80%]","rounded-full","bg-slate-500"]
  }
)

const inputZoneMessage = createElement(
  "div",
  {
    className:["w-full","h-[10%]","bg-red-300","rounded-br-xl","py-2","px-4","flex","items-center","justify-between"]
  },
  [
    textMessage,
    envoyer]
);

const zoneMessage = createElement(
  "div",
  {
    className:["w-8/12","h-full","bg-slate-300","rounded-tr-xl","rounded-br-xl"]
  },
  [
    headerZoneMessage,
    corpsZoneMessage,
    inputZoneMessage
  ]
);






const container =createElement(
  "div",
  {
    className:["w-11/12","h-full","border","bg-white","rounded-xl","flex","shadow-2xl",],
  },
  [
    sidebar,
    discussion,
    zoneMessage
  ]
);


const app = createElement(
  "div",
  {
    className:["w-screen h-screen bg-slate-50","flex","justify-center","items-center","py-7"]
  },
  [
      container  
  ]
);


const body = document.querySelector("body");

body.append(app);