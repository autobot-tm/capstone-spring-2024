# <div align="center" >Capstone Project Coding Conventions</div>

<h3 align="center">The sef of guidelines for team to follow a project</h3>

---

0.0. **Script** 

```javascript
yarn reset // delete and re-install all dependencies
yarn commit // please use it to commit please read the docs of commitizen here : https://github.com/commitizen/cz-cli
yarn start-dev // start dev environment
yarn start-prod // start production environment
```


1. **Function Name** should be named as verb

```javascript
const signIn = (async() = {});
```

2. **Variable Name** should be named as noun

```javascript
const name = 'user name';
```

3. **Boolean Variable Name** should be started with prefix _"is"_ or _"has"_

```javascript
const isPasswordMatched = false;
```

4. **File Naming Style** should be use ke-bab style <span style="color:yellow">_ke-bab."type".js_</span>
```javascript
auth-tokens.util.ts;
```
5. **Components Naming Style** should be use Pascal style <span style="color:yellow">_Component.jsx_</span>
```javascript
Component.jsx;
```

6. **Function Naming Style** should be use camelCase
```javascript
const signIn = (async() = {});
```

7. **If Statement Declaration** should be make with the curly brace block instead of inline-code

```javascript
if (isValid) {
  /* Do somethin*/
}
```

8. **Folder structure**
```

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
```