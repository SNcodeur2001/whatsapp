import { createElement } from "./component.js";
import { iconColors } from "./colors.js";

// Tableau pour stocker les contacts
let contacts = [
  {
    id: 1,
    nom: "Jean Dupont",
    telephone: "+33123456789",
    photo: "https://via.placeholder.com/40",
    dernierMessage: "Salut, comment ça va ?",
    heure: "14:30"
  },
  {
    id: 2,
    nom: "Marie Martin",
    telephone: "+33987654321",
    photo: "https://via.placeholder.com/40",
    dernierMessage: "À bientôt !",
    heure: "12:15"
  }
];

// Fonction pour créer le formulaire modal d'ajout de contact
const createContactModal = () => {
  const modalOverlay = createElement(
    "div",
    {
      className: ["fixed", "inset-0", "bg-black", "bg-opacity-50", "flex", "justify-center", "items-center", "z-50"]
    }
  );

  const modalContent = createElement(
    "div",
    {
      className: ["bg-white", "rounded-lg", "p-6", "w-96", "shadow-xl"]
    }
  );

  const modalHeader = createElement(
    "div",
    {
      className: ["flex", "justify-between", "items-center", "mb-4"]
    },
    [
      createElement("h2", { className: ["text-xl", "font-bold"] }, "Ajouter un contact"),
      createElement(
        "button",
        {
          className: ["text-gray-500", "hover:text-gray-700", "text-xl"],
          onclick: () => document.body.removeChild(modalOverlay)
        },
        "×"
      )
    ]
  );

  const nomInput = createElement(
    "input",
    {
      type: "text",
      placeholder: "Nom du contact",
      className: ["w-full", "p-3", "border", "border-gray-300", "rounded-md", "mb-3", "focus:outline-none", "focus:border-blue-500"],
      id: "nomContact"
    }
  );

  const telephoneInput = createElement(
    "input",
    {
      type: "tel",
      placeholder: "Numéro de téléphone",
      className: ["w-full", "p-3", "border", "border-gray-300", "rounded-md", "mb-3", "focus:outline-none", "focus:border-blue-500"],
      id: "telephoneContact"
    }
  );

  const photoInput = createElement(
    "input",
    {
      type: "url",
      placeholder: "URL de la photo (optionnel)",
      className: ["w-full", "p-3", "border", "border-gray-300", "rounded-md", "mb-4", "focus:outline-none", "focus:border-blue-500"],
      id: "photoContact"
    }
  );

  const buttonContainer = createElement(
    "div",
    {
      className: ["flex", "justify-end", "gap-3"]
    }
  );

  const cancelButton = createElement(
    "button",
    {
      className: ["px-4", "py-2", "bg-gray-300", "text-gray-700", "rounded-md", "hover:bg-gray-400"],
      onclick: () => document.body.removeChild(modalOverlay)
    },
    "Annuler"
  );

  const saveButton = createElement(
    "button",
    {
      className: ["px-4", "py-2", "bg-blue-500", "text-white", "rounded-md", "hover:bg-blue-600"],
      onclick: () => handleSaveContact(modalOverlay)
    },
    "Enregistrer"
  );

  buttonContainer.append(cancelButton, saveButton);
  modalContent.append(modalHeader, nomInput, telephoneInput, photoInput, buttonContainer);
  modalOverlay.append(modalContent);

  return modalOverlay;
};

// Fonction pour gérer l'enregistrement du contact
const handleSaveContact = (modalOverlay) => {
  const nom = document.getElementById('nomContact').value.trim();
  const telephone = document.getElementById('telephoneContact').value.trim();
  const photo = document.getElementById('photoContact').value.trim();

  if (!nom || !telephone) {
    alert('Veuillez remplir au moins le nom et le téléphone');
    return;
  }

  // Créer le nouveau contact
  const newContact = {
    id: Date.now(), // ID basé sur le timestamp
    nom: nom,
    telephone: telephone,
    photo: photo || "https://via.placeholder.com/40",
    dernierMessage: "Nouveau contact",
    heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  };

  // Ajouter le contact à la liste
  contacts.unshift(newContact); // Ajouter au début

  // Mettre à jour l'affichage des discussions
  updateDiscussionsList();

  // Fermer le modal
  document.body.removeChild(modalOverlay);
};

// Fonction pour créer un élément de discussion
const createDiscussionItem = (contact) => {
  return createElement(
    "div",
    {
      className: ["flex", "items-center", "p-3", "hover:bg-gray-100", "cursor-pointer", "border-b", "border-gray-200"],
      onclick: () => selectContact(contact)
    },
    [
      createElement(
        "img",
        {
          src: contact.photo,
          alt: contact.nom,
          className: ["w-10", "h-10", "rounded-full", "mr-3", "object-cover"]
        }
      ),
      createElement(
        "div",
        {
          className: ["flex-1"]
        },
        [
          createElement(
            "div",
            {
              className: ["flex", "justify-between", "items-center"]
            },
            [
              createElement("h3", { className: ["font-semibold", "text-sm"] }, contact.nom),
              createElement("span", { className: ["text-xs", "text-gray-500"] }, contact.heure)
            ]
          ),
          createElement("p", { className: ["text-xs", "text-gray-600", "truncate"] }, contact.dernierMessage)
        ]
      )
    ]
  );
};

// Fonction pour mettre à jour la liste des discussions
const updateDiscussionsList = () => {
  // Trouver le conteneur des discussions
  const discussionContainer = document.querySelector('.w-3\\/12');
  
  // Supprimer l'ancienne liste s'il y en a une
  const existingList = discussionContainer.querySelector('.discussions-list');
  if (existingList) {
    existingList.remove();
  }

  // Créer la nouvelle liste
  const discussionsList = createElement(
    "div",
    {
      className: ["discussions-list", "mt-4", "overflow-y-auto", "max-h-full"]
    },
    contacts.map(contact => createDiscussionItem(contact))
  );

  discussionContainer.append(discussionsList);
};

// Fonction pour sélectionner un contact (optionnel - pour future implémentation)
const selectContact = (contact) => {
  console.log('Contact sélectionné:', contact);
  // Ici vous pouvez implémenter la logique pour afficher la conversation avec ce contact
};

// Modification du bouton "Nouveau"
const nouveauBtn = createElement(
  "button",
  {
    className: ["border-2", "border-red-500", "p-2", "w-32", "h-22", "flex", "flex-col"],
    onclick: () => {
      const modal = createContactModal();
      document.body.appendChild(modal);
    }
  },
  [
    createElement(
      "i",
      {
        className: ["fa-solid", "fa-plus", "text-xl"]
      }
    ),
    "Nouveau"
  ]
);

// Autres boutons (inchangés)
const messageBtn = createElement(
  "button",
  {
    className: ["border-2", "border-red-500", "p-2", "w-32", "h-22", "flex", "flex-col", "text-sm"]
  },
  [
    createElement(
      "i",
      {
        className: ["fa-solid", "fa-message", "text-xl"]
      }
    ),
    "Messages"
  ]
);

const groupBtn = createElement(
  "button",
  {
    className: ["border-2", "border-red-500", "p-2", "w-32", "h-22", "flex", "flex-col", "text-sm"]
  },
  [
    createElement(
      "i",
      {
        className: ["fa-solid", "fa-user-group", "text-xl"]
      }
    ),
    "Groupes"
  ]
);

const diffusionBtn = createElement(
  "button",
  {
    className: ["border-2", "border-red-500", "p-2", "w-32", "h-22", "flex", "flex-col", "text-sm"]
  },
  [
    createElement(
      "i",
      {
        className: []
      },
      "logo"
    ),
    "Diffusions"
  ]
);

const archiveBtn = createElement(
  "button",
  {
    className: ["border-2", "border-red-500", "p-2", "w-32", "h-22", "flex", "flex-col", "text-sm"]
  },
  [
    createElement(
      "i",
      {
        className: ["fa-solid", "fa-box-archive", "text-xl"]
      }
    ),
    "Archives"
  ]
);

const sidebar = createElement(
  "div",
  {
    className: ["w-1/12", "h-full", "bg-[#f0efe8]", "flex", "items-center", "justify-center", "flex", "flex-col", "gap-3", "rounded-tl-xl", "rounded-bl-xl"]
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
    type: "text",
    placeholder: "Rechercher",
    className: ["focus:outline-none", "w-full", "rounded-md", "mt-3", "p-2"],
    oninput: (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredContacts = contacts.filter(contact => 
        contact.nom.toLowerCase().includes(searchTerm)
      );
      
      // Mettre à jour l'affichage avec les contacts filtrés
      const discussionContainer = document.querySelector('.w-3\\/12');
      const existingList = discussionContainer.querySelector('.discussions-list');
      if (existingList) {
        existingList.remove();
      }

      const discussionsList = createElement(
        "div",
        {
          className: ["discussions-list", "mt-4", "overflow-y-auto", "max-h-full"]
        },
        filteredContacts.map(contact => createDiscussionItem(contact))
      );

      discussionContainer.append(discussionsList);
    }
  }
);

const discussion = createElement(
  "div",
  {
    className: ["w-3/12", "h-full", "bg-[#f9f7f5]", "p-3"]
  },
  [
    createElement("h1", { className: ["text-xl"] }, "Discussions"),
    barreRecherche
  ]
);

// Reste du code inchangé...
const actions = createElement(
  "div",
  {
    className: ["w-[25%]", "h-full", "text-xl", "flex", "justify-around", "items-center"],
    vFor: {
      each: ["fa-solid fa-delete-left", "fa-solid fa-box-archive", "fa-solid fa-square", "fa-solid fa-trash"],
      render: (item) => {
        const iconKey = item.split(" ").pop();
        const color = iconColors[iconKey] || "text-black";
        return createElement(
          "div",
          {
            className: ["w-[17%]", "h-full", "border-2", `border-${color}`, "rounded-full", "flex", "justify-around", "items-center"]
          },
          [
            createElement(
              "i",
              {
                className: [...item.split(" "), color]
              }
            )
          ]
        )
      }
    }
  }
);

const photo_profil = createElement(
  "div",
  {
    className: ["w-[3.6%]", "h-full", "rounded-full", "bg-slate-500"]
  }
);

const headerZoneMessage = createElement(
  "div",
  {
    className: ["w-full", "h-[7%]", "bg-[#efe7d7]", "p-2", "rounded-tr-xl", "flex", "justify-between", "items-center", "border-2", "border-b-white"]
  },
  [
    photo_profil,
    actions
  ]
);

const corpsZoneMessage = createElement(
  "div",
  {
    className: ["w-full", "h-[83%]", "bg-[#efe7d7]"]
  }
);

const textMessage = createElement(
  "input",
  {
    type: "text",
    className: ["w-[94%]", "h-[70%]", "bg-[#f2eff0]", "rounded-xl"]
  }
);

const envoyer = createElement(
  "button",
  {
    className: ["w-[5%]", "h-[80%]", "rounded-full", "bg-green-500", "flex", "justify-center", "items-center"]
  },
  [
    createElement("i",
      {
        className: ["fa-solid", " fa-arrow-right", "text-xl", "text-white"]
      }
    )
  ]
);

const inputZoneMessage = createElement(
  "div",
  {
    className: ["w-full", "h-[10%]", "rounded-br-xl", "py-2", "px-2", "flex", "items-center", "justify-between"]
  },
  [
    textMessage,
    envoyer
  ]
);

const zoneMessage = createElement(
  "div",
  {
    className: ["w-8/12", "h-full", "rounded-tr-xl", "rounded-br-xl", "bg-[#f9f7f5]"]
  },
  [
    headerZoneMessage,
    corpsZoneMessage,
    inputZoneMessage
  ]
);

const container = createElement(
  "div",
  {
    className: ["w-11/12", "h-full", "border", "bg-white", "rounded-xl", "flex", "shadow-2xl"]
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
    className: ["w-screen h-screen bg-slate-50", "flex", "justify-center", "items-center", "py-7"]
  },
  [
    container
  ]
);

const body = document.querySelector("body");
body.append(app);

// Initialiser l'affichage des discussions au chargement
updateDiscussionsList();