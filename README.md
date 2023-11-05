
Folder structure

├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   ├── axios/
│   │   └── client.js
│   ├── components/                        # Global Components
│   │   ├── SomeComponent/
│   │   │   ├── SomeComponent.jsx
│   │   │   ├── index.js
│   │   │   └── styles.scss
│   ├── config/
│   │   ├── route-name.config.js           # Define Route Path Here
│   │   ├── local-storage.config.js
│   │   └── app.config.js
│   ├── hoc/                               # Global Layout
│   ├── hooks/
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── components/                # Local Components
│   │   │   ├── styles.scss      
│   │   │   ├── Home.jsx              
│   │   │   └── index.js                  
│   ├── routes/
│   │   └── paths.route.js                 # Define Route Components Here
│   ├── services/
│   │   └── api-endpoints.service.js       # Define API Subdomain Here.
│   ├── store/
│   │   ├── slices/
│   │   └── store.js
│   └── theme/
│       └── scss/
│           └── colors.theme.scss          # Define Colors Here.
│   ├── translations/
|   │   ├── locales/
|   │       ├── en/                        # Define translation keys here
|   │       ├── ja/                        # Define translation keys here
|   │       ├── vi/                        # Define translation keys here
│   ├── utils/
│   └── index.js