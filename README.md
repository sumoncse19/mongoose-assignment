## At first we should create our projects folder then open the project in terminal, and follow this steps:

### Step 1: Creating a package.json file

```
npm init
```

Here, we are asking some question we can go thorough with hit enter in every question but for entry point will be: ./dist/server.js. Or we can simply use this command:

```
npm init -y
```

### Step 2: Install express, mongoose, cors, dotenv, typescript - devDependencies

```
npm install express
```

```
npm install mongoose --save
```

```
npm i cors
```

```
npm i dotenv
```

Install all of these dependencies in one command:

```
npm install express mongoose cors dotenv
```

And install typescript as devDependencies

```
npm install typescript --save-dev
```

Create a typescript configuration file:

```
tsc --init
```

if `tsc --init` is not working then follow this command first:

```
npm i -g typescript
```

Now go to tsconfig.json file and change these line:

```
"target": "es2016",
```

```
"rootDir": "./src",
```

```
"outDir": "./dist",
```

And add these line in the first of the tsconfig.json file:

```
"include": ["src"], // which files to compile
"exclude": ["node_modules"],  // which files to skip
```

Then install type definition:

```
npm i --save-dev @type/node
```

```
npm i --save-dev @type/express
```

### Step 3: Create a basic file structure with basic code example:

#### Create src/app.ts:

```
import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Your server is running and hit the / route!',
  })
}

app.get('/', getAController)

export default app
```

#### Create src/app/config/index.ts:

```
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
}
```

#### Create src/server.ts file:

```
import app from './app'
import config from './app/config'
import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()
```

For run development application server install `ts-node-dev` as devDependencies:

```
npm i ts-node-dev --save-dev
```

### Step 4: Add this in package.json

```
"scripts": {
  "start:prod": "node ./dist/server.js",
  "start:dev": "ts-node-dev --respawn --transpile-only src/server",
  "build": "tsc",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## Summary of the above step:

Our main function call from server.ts file and it connect with our database and listen the app.ts. For organize credential of config file we create a index.ts file in src/app/config/index.ts and define all of the credential.

### Step 5: Setup eslint and prettier:

##### Installing Prettier:

```
npm install --save-dev prettier
```

Add these line in .prettierrc.json file:

```
{
  "semi": false,
  "singleQuote": true
}
```

##### Installing eslint:

Old: `npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev`

```
npm install --save-dev eslint @eslint/js @types/eslint__js typescript typescript-eslint
```

Eslint initialization:

```
npm init @eslint/config
```

or

```
npx eslint --init
```

Then it'll create a `eslint.config.mjs` automatically, if it not created then create this file in root folder. And paste this codeblock in this file:

```
// @ts-check

import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['node_modules/**', 'dist/**'], // Add your ignore patterns here
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
);
```

Or we can also paste this codeblock in this file by run this command `npm install eslint@^8.56.0`:

```
import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'

export default [
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**'], // Add your ignore patterns here
  },
  {
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
  { files: ['/*.{js,mjs,cjs,ts}'] },
]
```

Or we can also paste this codeblock in this file:

```
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['node_modules/**', 'dist/**'], // Add your ignore patterns here
  },
  {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
  },
  {
    files: ['**/*.ts'], // Specify file extensions to lint
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      // "@typescript-eslint/no-unused-vars": "error",
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
      // to enforce using type for object type definitions, can be type or interface
      // "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
  { files: ['/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]

```
